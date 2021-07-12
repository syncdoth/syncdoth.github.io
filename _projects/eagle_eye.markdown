---
layout: page
title: "Medical AI: Detecting Pneumonia (feat. Covid-19)"
description: AI Lab Korea Open Lab 8th Research
img: /assets/img/eagle-eye/third.png
importance: 2
github: https://github.com/syncdoth/Eagle-Eye-Pneumonia-Detection
category: work
---

Since this project is very well documented in the official website, I will only
leave a link to the project here.

[ai-lab.kr/opens/eagle-eye](https://www.ai-lab.kr/opens/601005bf7f1e709c2c2d78ac)

### Rough Intro

* Developed a model to detect pneumonia regions from chest X-Ray images.
* Current research direction in the field is either of 2 directions:
  1. Detect the region of pneumonia inside the image
  2. Given a X Ray image, classify which type (the source of the disease) of
     pneumonia the patient has
* We thought, why not both?

### Problem

The main problem was data scarcity. To train detection model, we need region of
interest labeled, called bounding boxes of the object, which, in our case, is the
location of the infection. For such data, we could find them from past kaggle
challenges hosted by [NIH](https://www.kaggle.com/nih-chest-xrays/data)
or [RSNA](e.com/c/rsna-pneumonia-detection-challenge). However, these datasets
do not contain information of source of infection: so fine-grained classification
cannot be performed.

There exists other line of datasets, which include specific types of pneumonias
and chest X Ray images (including Covid). However, these datasets are targeted
towards the calssification problem, and no bounding box informations are included.

-> we had to come up with some solution to utilize both types of dataset!

### Solution

The solution was to use two different models: **One Detection, One Classification**,
and use them to complement each other!



The idea was like this: train Detection model on NIH and RSNA dataset. Then, train
Classification model on the datasets including fine-grained information. Then,

1. Use the classification model to infer the types of pneumonia in NIH and RSNA
   dataset images, and use them to fine tune the Detection Model.

   ![alt text](/assets/img/eagle-eye/first.png)

2. After making detection boxed with the detection model, use classification model
   to further classify each box.

   ![alt text](/assets/img/eagle-eye/second.png)

First method is inspired from a semi supervised learning methid called
**pseudo labeling**. Although our method is not perfectly in line with this method,
but the concept is similar in that using the model output to make use of unlabeled data.

The second method is a more popular method used in various industries specializing
in CV: most of the time, they make use of YOLO based models for real time services.
However, these models sacrifice accuracy for speed, so to further improve their
accuracy, they train a separate classifier to aid the predictions of YOLO model.

### Results
![alt text](/assets/img/eagle-eye/third.png)

The final results can be visulaized as above. Our mAP score was around 0.32 with
the second approach: this is on par with other detection model performances,
which only focuses on the existence of the pneumonia. Therefore, our model can be
considered to have some meaningful contributions in the field by introducing a
**complementary model training pipleline** for making use of heterogenous dataset
for fine-grained pneumonia detection task.