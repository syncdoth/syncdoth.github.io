---
layout: post
title: Introducing easy HW acceleration for PyTorch
date: 2021-07-30 00:16:00
description: Multi-GPU / TPU setting with PyTorch made easy with huggingface accelerate.
giscus_comments: true
tags: machine-learning
categories: Tutorial
---

## Multi-GPU with PyTorch

The two most popular deep learning frameworks are arguably Tensorflow and PyTorch.
There are many difference and similarities between the two, and one notable
difference is about HW acceleration device management. For Tensorflow, after
they updated their API to V2.0, most of the device management is done automatically:
in most cases, the default behaviour is to use all the available gpus possible,
and no explicit device placement code for each tensor object is needed. However,
in PyTorch, the default is to not use any HW acceleration, and the device
placement for each tensor is manual. This makes the tensor's placement explicit
and easy to follow, yet difficult and tedious in many occasions. For example,
multi-GPU setting or TPU setting with PyTorch requires quite a bit of knowledge
about multi-process (or multi-threaded) programming, distributed computing, etc.
all of which are done in the background of the tensorflow engine.

## Introducing accelerate

Recently, Huggingface released a library called
[accelerate](https://github.com/huggingface/accelerate), which, as the name
suggests, contains ready-to-use APIs for hardware accelerations. What's notable
about this library is that it only requires few lines of code changed from
vanilla PyTorch code! An example from the official [repo](https://github.com/huggingface/accelerate/blob/main/README.md):

{% highlight python linenos %}
  import torch
  import torch.nn.functional as F
  from datasets import load_dataset
+ from accelerate import Accelerator

- device = 'cpu'
+ accelerator = Accelerator()

- model = torch.nn.Transformer().to(device)
+ model = torch.nn.Transformer()
  optimizer = torch.optim.Adam(model.parameters())

  dataset = load_dataset('my_dataset')
  data = torch.utils.data.DataLoader(dataset, shuffle=True)

+ model, optimizer, data = accelerator.prepare(model, optimizer, data)

  model.train()
  for epoch in range(10):
      for source, targets in data:
-         source = source.to(device)
-         targets = targets.to(device)

          optimizer.zero_grad()

          output = model(source)
          loss = F.cross_entropy(output, targets)

-         loss.backward()
+         accelerator.backward(loss)

          optimizer.step()
{% endhighlight %}

### Structure

---
*Currently, the documentation of `accelerate` is not complete: except for the main*
*class and examples, there is almost no documentation for different classes.*

---
The main class is `Accelerator`, defined [here](https://github.com/huggingface/accelerate/blob/main/src/accelerate/accelerator.py).
The main methods include:
* `prepare`: it prepares the model, dataloader, and optimizer for the specified
             device configuration. After this, the model is wrapped as
             `torch.DistributedDataParallel` object.
* `backward`: instead of `loss.backward()`, `accelerator.backward(loss)` should be called.
* `print`: instead of plain python `print()`, `accelerator.print()` should be called,
           so that it is printed only once in the main process.
* `gather`: gathers tensors in different devices into one place.
* `save`: instead of `torch.save(model, path)`, `accelerator.save(model, path)`
          should be called. This saves the model only once in the main process.

`gather` method is mostly used with **distributed evaluation**:

{% highlight python linenos %}
  preds = []
  targets = []
  for inputs, targets in validation_dataloader:
      predictions = model(inputs)
      # Gather all predictions and targets
      preds.append(accelerator.gather(predictions))
      targets.append(accelerator.gather(targets))

  # perform evaluation...
{% endhighlight %}

### Tips

Always remember that the `model` that you `prepare`d is now a
`torch.DistributedDataParallel` object; you will not be able to call class
specific methods of the `model`, such as `save_pretrained` of the huggingface
`transformers.PretrainedModel` class. Also, note that the model saved with
`accelerator.save` is also a `torch.DistributedDataParallel` object, and requires
distributed setting when loading, which might be a little bit of a pain in the neck.
You can refer to this [tutorial](https://pytorch.org/tutorials/intermediate/ddp_tutorial.html#save-and-load-checkpoints)
for what setup is needed to load the model.

It is difficult to avoid this problem without looking at the source code:
referring to the `accelerator.save` at
[here](https://github.com/huggingface/accelerate/blob/b08fd560a4d6b7427f9fbb51a767393699afbd95/src/accelerate/utils.py#L270):

{% highlight python linenos %}
  def save(obj, f):
      """
      Save the data to disk. Use in place of :obj:`torch.save()`.
      Args:
          obj: The data to save
          f: The file (or file-like object) to use to save the data
      """
      if AcceleratorState().distributed_type == DistributedType.TPU:
          xm.save(obj, f)
      elif AcceleratorState().local_process_index == 0:
          torch.save(obj, f)
{% endhighlight %}

Note that `AcceleratorState()` is not a class bound property, but a singleton class
that all instances of this class have the same state. Therefore, we can write a
custom code to save the actual model wrapped by `torch.DistributedDataParallel`:

{% highlight python linenos %}
  from accelerate.state import AcceleratorState
  from accelerate.utils import save

  def custom_save(model, f, save_module_only=False):
      """
      Save the data to disk. Use in place of :obj:`torch.save()`.
      Args:
          model: pytorch model. DistributedDataParallel class.
          f: The file (or file-like object) to use to save the data
          save_module_only: save the wrapped module only.
      """
      if not save_module_only:
          save(model, f)
      else:
          torch.save(model.module, f)

  # save
  custom_save(model, 'model.pt', save_module_only=True)
  # ...
  # load
  loaded_model = torch.load('model.pt')
{% endhighlight %}


## Alternatives

* Huggingface `transformers` already provides `Trainer` module, which takes care
of hardware accelerations automatically. However, this is pretty much made only
for the models provided in the `transformers` library, so it is less general.

* Another great alternative is [pytorch-lightning](https://www.pytorchlightning.ai/) module. This is analogous
to `keras` library made for PyTorch: the actual gradient update procedures are
hidden from the developers, allowing them to focus only on the model's architecture.
This is indeed a great module and provides much more than just hardware
acceleration; logging, tensorboard, checkpointing, training loop, and many other
non-modeling codes are provided with simple options to the API. The only downside
is that one has to refactor the code quite significantly to the required format
of the module, which might not be feasible in the later stages of the project.
For example, when I am working on a NLP related task, my go-to model would be
`bert-base-cased`. This model can fit quite well within one GPU with 12GB of
vRAM, so I wouldn't worry about multi-gpu when I start coding up the project.
However, as the project proceeds, I might require larger models, longer text,
larger batch size to save time, and whatever reason that calls for multi-gpu
setting. In that case, completely revamping the code to fit with `pytorch-lightning`
module might be too much of a work, while using `accelerate` requries only a
few lines of code modified.
