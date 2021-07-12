---
layout: page
title: "First Python Projects: Why not Physics?"
description: My first Python Toy Project
img: /assets/img/gravity/play.gif
importance: 4
github: https://github.com/syncdoth/Gravity-Modulator
category: fun
---
After taking an introductory class to Python (COMP 1021 at HKUST, 2017 Fall),
I was fascinated by what programming can do, and wanted to play around with it
during the free time. The last project of the coursework was about creating a
shooting game, which required knowledge about GUI programming using `turtle`
module and screen updating, based on time derivatives, $$ dy/dt $$. I found that
this would be a perfect environment to test out some simple physics simulations
using the law of kinematics!

***

<img class="img-fluid rounded z-depth-0" src="{{ site.baseurl }}/assets/img/gravity/start_page.png">

## Idea

The idea was simple: create a platform, a piston, and a ball. The piston and the
ball are placed onto the platform. Upon start, user is prompted to enter a
target force value in Newton. Then, the piston is fired with the force specified
in the input.

The movement of the ball is then updated every milisecond, and the time
derivative of the ball is defined by the initial velocity of the ball, gravity,
and the elasticity of the ball: the ball was simulated to have elastic collision
with the walls and the floor.

<img class="img-fluid rounded z-depth-0" src="{{ site.baseurl }}/assets/img/gravity/play.gif">

***
## In Hindsight...

Since this was my very first individual project, there were a lof of errors and
mistakes that can be fixed. First of all, I did not make use of any OOP
techniques, and the code looks pretty unorganized. Most of the variables are
global, making them hard to debug. Also, collision control was buggy, and as a
simple fix, the collision detecting algorithm sacrified precision, and the ball
bounces around even before hitting the wall.

There are some extra features that would be nice to add:
1. Friction and air resistance factor
2. current speed indicator

and many others.
