---
layout: post
title: "Big NLP Trends from 2016 to 2022"
date: 2023-02-20 19:40:00 +0800
description: Recent trends in NLP from Attention to ChatGPT
giscus_comments: true
tags: NLP LM AI ML Deep-learning
categories: Review
---

## Disclaimer

This post may include some personal interpretation of the technologies introduced
in here. Some of the information might be wrong. Feel free to leave a comment!

### Pre 2016: Seq2Seq

In the Deep Natural Language Processing field, RNN was dominating the research
community. The most notable model architecture is Sequence to Sequence (Seq2Seq),
which used a bidirectional RNN encoder and an auto-regressive RNN decoder.

### 2016: Attention

An intuitive neural module called Attention was developed in 2016, and showed
great improvement on Machine Translation task when applied on top of the encoder
hidden states of Seq2Seq models.

### 2017: Transformers

In a truly ground-breaking paper "Attention is All You Need", a model architecture
called Transformers was introduced, which substituted all recurrent operation over
the sequences of RNN with a technique called self-attention.

### 2018: GPT, BERT - Era of Pre-Trained Language Models

2018 was the era of Pre-Trained Language Models (PTLMs), which started with
Generative PreTraining (GPT) models, by OpenAI. This model only had transformer
decoder stacks, and was trained using traditional, unidirectional Language Modeling
Objective, or Next Token Prediction.

Google soon followed with Bidirectional Encoder Representations from Transformers (BERT),
with a novel task of Masked Language Modeling (MLM). Given a text, 30% of the tokens
(words) were randomly masked, and the model was trained to predict what the tokens
are given other words in the text. BERT is a bidirectional encoder-only architecture.

GPT is trained to predict next token based on previous tokens, so it can be used to
generate text, auto-regressively. Therefore, it became the signature model for
Natural Language Generation (NLG).

On the other Hand, BERT's MLM objective allowed the model to model both the forward
(next token given previous tokens) and backward (previous token given future tokens)
contexts, (hence, bidirectional), it could obtain higher performance in
text-classification-style tasks, dominating most of Natural Language Understanding (NLU)
benchmarks.

Note that both next token prediction and MLM objective do not require any label,
but vast amount of text corpus. Therefore, this method was called self-supervised
learning (SSL). Both BERT and GPT were pre-trained using SSL on large corpus and
obtained considerable amount of natural language knowledge encoded within them.
From this point on, the major direction of research was to

1. Create another PTLM
   - This entails one or many of the following:
      - creating a new dataset (cleaner & larger)
      - creating a new objective
      - creating a new model architecture
2. Fine-tune the PTLM for another task
   - Fine-tuning refers to the training of Pre-Trained models on a smaller,
   task-oriented dataset. This approach achived much better result than training
   a new model from scratch on the task dataset.

### 2019: Larger Models

Better PTLMs, with more dataset and more parameters were released, such as GPT2,
roberta-large, etc. They went to upwards of **2~3B** parameters.

- In today's terms, 2~3B is not "large" at all.

## 2020: GPT3, T5
### GPT3

OpenAI's GPT3 was released. However, GPT3 was not just a model; it brought forth
a lot of changes in the research directions of NLP.

#### Closed Source

GPT3 was released as a closed-source, API only model, that users have to pay.
This was the moment where OpenAI stopped being open.

#### Pretraining with Code data

GPT3 pretraining data include code from github. Training on code data allowed
the model to obtain some level of abstractive reasoning abilities.

- This led to the launch of Co-Pilot too.

#### Rise of LLM & In-Context Learning

The term Large Language Models (LLMs) started to catch fire, since GPT3 was truly
large, with whopping **175B** parameters. With such huge scale came an unexpected
ability of these models, which was called few-shot exemplar learning, which later
was generalized to a term called In-Context Learning.

famous LLMs are:
- OPT (facebook, 175B)
- PALM (GOogle, 540B)
- GPT-NeoX / GPT-J (EleutherAI)
- Bloom (Bigscience)

#### Prompt Engineering

Since GPT3 was only accessible through an API that takes textual input, what
text prompt that goes into the model was important to obtain better output. This
led to a subfield named prompt engineering, where various algorithms were proposed
to find a textual prompt that would allow users to use GPT3 (or sometimes other models)
better.

- This later inspired the rise of Prompt Tuning

### T5

All tasks represented in text and solved with single transformer encoder-decoder
architecture.

- I think this laid the foundation for instruction tuning later.
- There is a similar model called T0 from Bigscience, which is pretrained to allow
  zero-shot inference on many NLP tasks using the same architecture as T5.

### 2021

#### Parameter Efficient Fine-Tuning (PEFT)

With the SOTA models being extra large, it was increasingly difficult to train
these models on reasonable amount of GPUs. Also, tuning the entire model often
resulted in problems like catastrophic forgetting. Researchers started to come
up with ideas later organized as **Parameter Efficient Fine-Tuning (PEFT)**, which
freezes the entire model weights except for a few parts (or introduce some small
extra weights) and only tune that part on the task-oriented data.

Most of the time, PEFT under-performed full finetuning. However, Prompt Tuning
showed above SOTA performance in many benchmarks, and took the community by a
storm.

Prompt Tuning, or Soft Prompt Tuning, is a method of tuning a set of continuous vectors
in the embedding / latent space of the model, that are prepended to the text
embedding matrix. This way, the model itself is entirely frozen, and only a small
set of vectors prepended to the input are trained using the gradient that flows through
the model. This method achieved SOTA in many NLU tasks, taking the NLP trend of 2021.

#### Chain of Thought Prompting

This prompting guided the model to "think step by step": this allowed the model
to reason sequential steps to solving a problem, resulting in a more coherent
reasoning of hard problems.

### 2022: Instruction Tuning

Instruction tuning is sometimes called an alignment task: aligning language models
with human usage of them. Most of the time, users "asks" or "instructs" the language
models to generate some text; therefore, training these models to follow textual
instruction can greatly increase their usability.

Similar to the idea of T5, all different NLP tasks are represented as text, prepended
with a natural language instruction of how to solve the task. This way, the LMs
can model the dependency between the instruction, problem, and the answer, and
since all of them are text, they become stronger at generalization and obtain strong
zero-shot abilities.

Notable models are:
- OPT-IML (Facebook)
- FLAN, Flan-T5 (Google)
- InstructGPT (GPT 3.5 family), ChatGPT (OpenAI)
- T0 (Bigscience, kind of)

### ChatGPT

ChatGPT deserves its own section, because it was THE AI Phenomenon of 2000s.

On top of InstructGPT, it was trained using Reinforcement Learning from Human Feedbacks (RLHF);
basically, they hired a lot of human annotators (allegedly 1000) to "talk" with the
current state of the model and give feedback in the form of score & suggested answer.
This way, ChatGPT could really generate truly human-level text. Also, thanks to
175B parameter scale, it stored tremendous amount of world knowledge, and can
nearly be used as a search engine.

However, it is still limited in that it "hallucinates": it generates very plausible
text that is entirely false.
