---
layout: post
title: "AINize + Gradio: Easiest Automatic ML model deployment"
date: 2022-06-24 00:12:00
description: Serving a simple demo page (along with REST API) for you ML model on the web.
giscus_comments: true
tags: machine-learning deployment docker
categories: Tutorial
---

Machine Learning is great. You can train models to do a lot of fancy things, like
analyze the text for you, or generate images from descriptions. However, in their
raw forms, what they do is simply take numbers and return numbers, which are uninterpretable
to naked human eyes. Most of the time, to show off your model, you would need some
demo page that can interactively take input and generate output from and to users with ease.
This has been very difficult before: you would need to

1. Build inference server (REST or grpc)
2. Deploy to Backend Server
3. Build a frontend page and connect it to the inference server

Beling AI developers/researchers, these works might have been too much of an extra work.
However, I stumpled upon two awesome projects that make these procedures much easier!

## What are they?

### Gradio

[Gradio](https://gradio.app) is an open source project that generates a simple frontend to demonstrate
your ML model wrapped in a inference function. It also sets up a REST API that can be
called from http requests. This is used in [huggingface hub](https://huggingface.co/models).

### AINize

[AINize](https://ainize.ai/) is a free service that automatically deploys the connected github
repository based on the repository's dockerfile. You can use this to serve anything,
really! (it doesn't even have to be AI or ML related: just anything that can be dockerized)

## Step 1. Setup Gradio Service

A sample Gradio service interface has this syntax:

{% highlight python linenos %}
import gradio as gr

iface = gr.Interface(
           fn=model_infer_fn,
           inputs=[
               gr.Textbox(lines=2, placeholder="text here...", label='sentence'),
               gr.Slider(minimum=0.1,
                                maximum=1.0,
                                step=0.1,
                                default=0.5,
                                label='threshold'),
           ],
           outputs=[
               gr.Textbox(type="auto", label="prediction"),
           ],
           title='Demo',
           theme='peach',
        )
 iface.launch()
{% endhighlight %}

This creates an interface with:

* 2 inputs: 1 string input and 1 slider input (float values)
* 1 output panel: a textbox

*You can take a look at different options for input and outputs in the*
*[official documentation](https://gradio.app/docs/#components).*

Also, you would need to define `model_infer_fn`, which takes the inputs (1 string and 1 float) and
returns a string. A simple example would be:
{% highlight python linenos %}

model = Model()  # some model you trained

def model_infer_fn(text, threshold):
    pred = model(text)
    return 'positive' if pred >= treshold else 'negative'
{% endhighlight %}

For me, I like to create a `ModelInterface` class for this:
{% highlight python linenos %}
class ModelInterface:

    def __init__(self, *args, **kwargs):
        self.model = ModelClass(*args, **kwargs)

    def infer(self, inputs):
        pred = self.model(inputs)

        # process output: text, image, plot, etc.
        output =

        return output

    def interpret(self, *args):
        """
        returns the contribution of each input component.
        """
        pass

...
model = ModelInterface(args.model_name)
iface = gr.Interface(
           fn=model.infer,
...
{% endhighlight %}

Putting the `gr.Interface` in the main function and `ModelInterface` together, the
`serve.py` file would look something like this:

{% highlight python linenos %}
 import argparse

 import gradio as gr

 # your trained model class
 from models import ModelClass


 class ModelInterface:

    def __init__(self, *args, **kwargs):
        self.model = ModelClass(*args, **kwargs)

    def infer(self, inputs):
        pred = self.model(inputs)

        # process output: text, image, plot, etc.
        output =

        return output

    def interpret(self, *args):
        """
        returns the contribution of each input component.
        """
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model_name", type=str)
    args = parser.parse_args()
    model = ModelInterface(args.model_name)

    iface = gr.Interface(
        fn=model.infer,
        inputs=[
            gr.Textbox(lines=2, placeholder="text here...", label='sentence'),
            gr.Slider(minimum=0.1,
                             maximum=1.0,
                             step=0.1,
                             default=0.5,
                             label='threshold'),
        ],
        outputs=[
            gr.Textbox(type="auto", label="prediction"),
        ],
        title='Demo',
        theme='peach',
        interpretation=model.interpret,
    )
    iface.launch(server_name="0.0.0.0")


if __name__ == '__main__':
    main()
{% endhighlight %}

## Step 2. Dockerize

AINize works with Dockerized repositories, and finds entry point from the repository's
`DOCKERFILE` in the root directory. We can setup the `DOCKERFILE` as follows:

{% highlight docker linenos %}
FROM pytorch/pytorch:1.8.1-cuda10.2-cudnn7-devel  # base docker image from docker hub
RUN pip install pip --upgrade
RUN pip install gradio Jinja2  # install required packages

# setup directory
COPY . /app
WORKDIR /app

# gradio uses port 7860 by default
EXPOSE 7860

# run the serve.py
CMD ["python", "serve.py"]
{% endhighlight %}

## Step 3. Deploy to AINize

Go to AINize dashboard.

1. Copy and paste the url of your github repo to search bar.
2. Select the branch for deployment.
3. Wait until the setup is over.
4. In the deployment dashboard, click the pencil button to edit environment variables and add 7860 to ports.


Voila! You now have deployed your service to the web, with both the frontend demo and backend REST API setup!