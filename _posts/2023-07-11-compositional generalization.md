---
layout: post
title: "Compositional Generalization"
date: 2023-07-11 19:40:00 +0800
description: What is compositional generalization problem and why is this interesting?
giscus_comments: true
tags: NLP LM AI ML Deep-learning
categories: Review
---

Compositional generalization has a quite long history. However, I would like to
briefly review recent works that caught my eye, and how important they are.

## What is it?

Compositional Generalization is about *can AI models generalize using different*
*sub-knowledge in a compositional way to solve a more complex task?* A simple example
from the well-known benchmark [SCAN](https://arxiv.org/abs/1711.00350) is:
"If you know `JUMP`, `WALK`, and `WALK TWICE`, you should be able to understand
`JUMP TWICE`." Conventional Seq2seq methods (as of 2020, uni-RNN, bi-RNN, Transformers)
all failed dramatically in this task.

## Why is it important?

Compositional generalization can be interpreted or is related to a lot of different
fields, such as OOD robustness (generalization direction), disentaglement (compositional direction),
logical reasoning, or distantly, transfer learning. Since each of them has shown remarkable successes in
different fields, I think this task has not been as hot as it could be. Moreover, one of the
"emergent abilities" of LLMs include showing traces of some level of compositional
generalization ability, such as being able to translate from language A -> B when
it has been only trained on A -> C and C -> B / B -> C pairs (forgot the source, will update 😅).

However, it is still an important task because it is what makes the AI reach human level reasoning.
As Noam Chomsky puts it, human language has "infinite uses of finite means." Humans compose finite
set of meanings, tools, functions, etc. into infinite possibilities, which makes us creative.

## Does Current LLM has it?

This is extensively explored by a recent UW paper: [Faith and Fate: Limits of Transformer Compositionality](https://arxiv.org/abs/2305.18654).
The short answer is: No.

## Can Neural Networks do it?

Yes and No. Some works such as LANE solve the SCAN generalization task to 100% accuracy.
However, [Teaching Arithmentics to Small Transformers](https://arxiv.org/abs/2307.03381) shows that
it fails to generalize for arithmetic in longer digits. [Faith and Fate: Limits of Transformer Compositionality](https://arxiv.org/abs/2305.18654)
also shows that as the reasoning chain gets wider and deeper, Transformers (or similar auto-regressive sequence models)
is likely to fail.

### RWKV-4 Demo

A recent [tweet](https://twitter.com/BlinkDL_AI/status/1677593798531223552?s=20)
from BlinkDL (developer of RWKV, a very cool project that builds 100% RNN-based LM!)
showed that a small RWKV model can solve high-digit arithmetics, trained similarly
(with reversed digit tricks) as in [Teaching Arithmentics to Small Transformers](https://arxiv.org/abs/2307.03381).

I ran a quick experiment on it: (code [link](https://t.co/7HXdo9Tulw)) can this
generalize to longer digits? The findings suggest **NO**.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RWKV_math_10x10.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
   RWKV-4Neo 2.9M model, trained from scratch by BlinkDL (maintainer), evaluated by me. Used 100 random examples per each k1 digits x k2 digits.
</div>

## What do we need compositional generalization?

We don't know it for sure yet. But, we know that simple MLE + Seq2Seq is not going to cut it.
Either we need some auxiliary tasks, different loss, or different modules.

### Must Read:

- [Faith and Fate: Limits of Transformer Compositionality](https://arxiv.org/abs/2305.18654)
- [Teaching Arithmentics to Small Transformers](https://arxiv.org/abs/2307.03381)
- [RWKV Math Demo](https://github.com/BlinkDL/RWKV-LM/tree/main/RWKV-v4neo/math_demo)

