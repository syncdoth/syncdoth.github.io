---
layout: page
title: "Research Project: Biological RNN"
description: Undergraduate Research Opportunity Program Results of 2020 Summer
img: /assets/img/bio-rnn/Force3.png
importance: 3
github: https://github.com/syncdoth/FORCE-RNN
category: work
---

During the summer of 2020, I participated in a project called
*RNN for Biological Neural Networks* as a research assistant. The lab was
consisted of mostly biology majoring researchers, so I was there to contribute
more of a computational perspective to the whole modeling procedure, and compare
the methodologies with conventional ML.

# What's the difference?

We usually learn that artificial neural networks are inspied from
our actual biological neural networks. However, as of now, the two have walked
very different paths.

The main driving difference is the objective of the two:

* Artificial Neural Network aims to acquire model complexity and
  **predictive power** for the input data. Therefore, not much restrictions are
  applied as to the direction of application of development.
* Biological Neural Network aims to actually model how the real neural network
  behaves, so there are many restrictions as to what is biologically plausible
  or not.

The keyword is "biological plausibility". One main difference caused by this is
the learning algorithm. In machine learning applications, gradient descent and
backpropagation is dominating. However, this algorithm is not very biologically
plausible, especially in the RNN setting: the RNN version of back propagation,
or back propagation through time, is conceptually generating error signals in
the future and training neurons in the past using it, which is physically
inplausible.

# Learning algorithms

In this project, I reviewed 2 algorithms: FORCE (Sussillo and Abbott 2009) and
Full-FORCE (DePasquale et all 2018).

1. [FORCE](https://www.notion.so/FORCE-Algorithm-482db8b4ec0b4714adadd2aa8adee701)
2. [Full-FORCE](https://www.notion.so/Full-Force-Algorithm-a12f9312e1494d5bad58d60078e6e373)

## Experiment

### Comparison to ML

For comparison to conventional ML, I tested the Full-FORCE algorithm on a very
old RNN benchmark problem: Embedded Reber Grammar. It was found that Full-FORCE
has the ability to fit the data well just as LSTM models on this task.

### Target Experiments

The target of the project was to reproduced the findings of the
[Andalman et all, 2019, Neuronal Dynamics Regulating Brain and Behavioral
State Transitions]

* the authors did not respond to my request to their data, so I made use of synthetic
data with different sine functions.
