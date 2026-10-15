---
title: Research
description: Questions I explore across language models, grounded generation, generalization, and world models.
---

My work sits across natural language processing, multimodal AI, and trustworthy machine learning. I am especially interested in language models: how to adapt their behavior at inference time, ground them in evidence, and understand the limits of their reasoning. I also care about the engineering that makes large-scale model training practical.

## Inference-time optimization

Language models are increasingly capable, but their behavior depends strongly on the properties of their training data. No dataset can be perfect, so models will always learn some undesirable attributes. I am interested in inference-time adaptation: controllable generation and constrained modeling methods that steer a model toward explicit goals without requiring a new training run.

## Knowledge grounding

Hallucination, or confabulation, remains a central challenge for generative AI. Reference-grounded generation is one important direction for making AI systems safer and more dependable. My work explores ways to use retrieved knowledge during decoding, while checking whether generated content remains supported by that knowledge.

## Compositional generalization

Human language has “infinite uses of finite means.” People combine a finite set of concepts and operations to create new possibilities. I am interested in whether current language models can compose familiar knowledge in the same way, and in how their ability to generalize changes when tasks require combinations they did not see during training.

## World models

World models connect to the commonsense knowledge people use to reason about everyday events. My earlier work studied commonsense reasoning and the construction and evaluation of commonsense knowledge bases. I remain interested in how AI systems represent what happens in the world and use those representations to reason.

## Related work

See the [publication list](/publications/) for papers related to these questions.
