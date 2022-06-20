---
layout: post
title: Mathematical Notations for Democracy
date: 2022-06-21 00:53:00
description: As an engineer / scientist, it is sometimes easier for me to express my thoughts with solid mathematical definition and models. This is my attempt to express the core idea of democracy in terms of math.
---

## Objective Function of a Society

What is the objective of any kind of social structure or ideology? I believe it is to provide a framework for making decisions that set the course of humanity towards a certain direction. Ideally, we want the directions to point toward something ultimately “good” for humanity, be it justice, utopia, or whatever you want to call it.

Let’s express this mathematically. Suppose there exists a space $$S \sub \R^n$$ such that can express the state of humankind, i.e., there are $$n$$ different independent variables that can succinctly and sufficiently capture all aspects of the humanity. (This is obviously impossible in the real world, but let’s suppose this is possible.)

Let $$s \in S$$ be the state of humanity at some point. We believe there exists a singular ideal state for the humankind, $$u \in S$$. Then, the objective function of any rational society will be:

$$
J = \min_{s}(\|s - u\|)
$$

which means that the goal of a society is to find state $$s$$ such that it is the closest to (or reaches) the utopian state $$u$$.

In real life, there is a big problem with this objective function: we do not know $$u$$. Therefore, real life social architectures or societal algorithms should make some assumptions and try to approximate $$u$$.

## Democratic Algorithm

The way we do this in democracy is kind of similar to gradient descent. In gradient descent, we take the instantaneous gradient from the current state’s point on the loss surface, and move toward that direction. In democracy, we ask everyone what they think, and we take the direction that the most people agree with. So, we make policies and progress as a society in that direction iteratively. If we call this direction $$d \in \R^n$$, this iterative algorithm can be expressed as the following:

$$
s_{t+1} := s_t + d_t
$$

So now the question is, how do we get $$d$$?

### 1. Equal Vote

In the most pure form of democracy, everyone should get an equal vote, and the direction should be just the sum of all opinions. Let $$P \sub \R^n$$ be a set of people in a society, and let $$v_i \in P$$ be an opinion vector, which represents person $$i$$’s opinion on what the humanity should do, or progress toward, to reach utopia. Then, $$d$$ should simply be:

$$
d = \sum v_i
$$

### 2. + Meritocracy

In a more realistic model, some people’s opinion could carry more weight, depending on their intelligence, education level, social status, etc. Let $$w \in \R^{|P|}$$ be a weight vector, which leads to $$d$$ being:

$$
d = \sum_i^{|P|} w_i v_i
$$

### 3. + Representativeness / Delegation

Being even more practical, in real world, we have representative democracy, in which the public delegates their ability to directly influence the direction $$d$$ (which is incarnated in the form of a policy) to certain politicians. Therefore, $$w_i \approx 0$$ for most people except for a few politicians.

### 4. Practical Implementation

However, this is still ideal: in real world, we cannot take the vector sum of opinions like as we do in math. Usually what happens is that we vote and select one vector that the most people agreed on. If we consider the weight vector $$w$$ to carry the number of votes that certain opinion got, $$d$$ is defined as

$$
d = v_i, \text{ where } i = \argmax (w)
$$

## Analysis

The theoretical guarantee of a democracy is that any given time $$t$$, $$d_t$$ is something that at least the majority of the population (or the delegated population) agreed on.

However, similar to gradient descent having no guarantee of converging at the global maximum if the loss plane is not “smooth”, the democratic algorithm does not guarantee reaching $$u$$. In other words, we cannot guarantee the following:

$$
s_0 + \sum_t^T d_t = u
$$

This is because:

1. People cannot actually know where $$u$$ is.
2. $$d_t$$ is solely decided through consensus of the population $$P$$ at time $$t$$.

The democratic algorithm will converge to a state $$s_t$$ if $$d_t = 0,$$ which happens when the population $$P_t$$ agrees that $$s_t$$  is “as good as it can get”, or agrees that $$s_t = u$$, even if this is false!

This means that the best we could do with democracy is to find some “local minimum”, where the majority of the population do not want change, and agrees that it is as good as it can get for the mankind.

In other words, the assumption of democratic algorithm is that the ultimate consensus state is equivalent to $$u$$.