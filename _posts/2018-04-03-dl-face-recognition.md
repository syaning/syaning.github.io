---
layout: post
title:  DeepLearning笔记(11)——人脸识别
date:   2018-04-03 14:30:00 +0800
---

* TOC
{:toc}

## 1. 人脸验证和人脸识别

- 人脸验证（Face Verification）：1对1问题，即输入图片，判断图片是否是正确的那个人（即已经有了一个人的信息）
- 人脸识别（Face Recognition）：1对n问题，即输入图片，需要输出对应的那个人信息（即已经有了n个人的信息）

## 2. One-Shot 学习

对于图像的识别，通常需要大量的标注样本。对于一个企业的人脸识别系统，可能数据库中只有每个员工的一张照片，那么就需要通过这一个样本来进行学习，这就是one-shot learning，即单样本学习。

相似度函数，用 $d(img1,img2)$ 表示两张图片之间的不同程度（即两张图片的差异值）。如果两张图片是同一个人，则输出值会很小；如果两张图片是不同的人，则输出值会很大。定义一个阈值 $\tau$，如果 $d(img1,img2)\leq\tau$，则认为是同一个人；否则认为是不同的人。

## 3. Siamese Network

即孪生网络。相关论文可以参考 [DeepFace: Closing the Gap to Human-Level Performance in Face Verification](https://www.cv-foundation.org/openaccess/content_cvpr_2014/papers/Taigman_DeepFace_Closing_the_2014_CVPR_paper.pdf)

假设有两张人脸的图片 $x^{(1)},x^{(2)}$，分别通过卷积网络来得到一个向量（即softmax之前的向量）$f(x^{(1)}),f(x^{(2)})$，认为是这张图片的encoding，则：

$$d(x^{(1)},x^{(2)})=\mid\mid{f(x^{(1)})-f(x^{(2)})}\mid\mid^2$$

在训练的时候，要对训练样本中的任意一对 $x^{(i)},x^{(j)}$，保证当两张图片是同一个人的时候，$d(x^{(i)},x^{(j)})$ 很小；当两张图片是不同人的时候，$d(x^{(i)},x^{(j)})$ 很大。

## 4. Triplet 损失

![]({{site.baseurl}}/images/deeplearning/11-1.png)

其中：

- A (Anchor)
- P (Positive)：正样本，即和Anchor是同一个人
- N (Negetive)：负样本，即和Anchor是不同的人

需要满足：

$$\underbrace{\mid\mid{f(A)-f(P)}\mid\mid^2}_\text{d(A,P)}\leq\underbrace{\mid\mid{f(A)-f(N)}\mid\mid^2}_\text{d(A,N)}$$

即：

$$\underbrace{\mid\mid{f(A)-f(P)}\mid\mid^2}_\text{d(A,P)}-\underbrace{\mid\mid{f(A)-f(N)}\mid\mid^2}_\text{d(A,N)}\leq0$$

但是这种情况下，如果每张图片的encoding都是一个零向量，则上面的式子总是满足的。因此需要：

$$\underbrace{\mid\mid{f(A)-f(P)}\mid\mid^2}_\text{d(A,P)}-\underbrace{\mid\mid{f(A)-f(N)}\mid\mid^2}_\text{d(A,N)}+\underbrace{\alpha}_\text{margin}\leq0$$

定义损失函数：

$$\mathcal{L}(A,P,N)=\max(\mid\mid{f(A)-f(P)}\mid\mid^2-\mid\mid{f(A)-f(N)}\mid\mid^2+\alpha,0)$$

则整个网络的损失函数为：

$$J=\sum_{i=1}^m\mathcal{L}(A^{(i)},P^{(i)},N^{(i)})$$

那么如何选择这三元组呢？如果是随机选择的话，很有可能A和N的差异会很大，从而导致网络不需要过多学习就可以轻易地进行区分。为了避免这种情况，需要选取 $d(A,P)\approx d(A,N)$ 的样本。更多细节可以参考论文 [FaceNet: A Unified Embedding for Face Recognition and Clustering](https://arxiv.org/abs/1503.03832)。

## 5. 二分类

也可以将人脸识别当做一个二分类的问题。

![]({{site.baseurl}}/images/deeplearning/11-2.png)

如图所示，两张图片 $x^{(i)},x^{(j)}$ 分别经过同一个卷积网络得到编码 $f(x^{(i)}),f(x^{(j)})$ （假设编码是128维的向量），然后令：

$$\hat{y}=\sigma(\sum_{k=1}^{128}w_i\mid{f(x^{(i)})_k-f(x^{(j)})_k}\mid+b)$$

即将人脸识别当做一个监督学习，将成对的图片作为训练样本。如果两张图片是同一个人，则标签为1；如果两张图片是不同的人，则标签为0。