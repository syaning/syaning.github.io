---
layout: post
title:  DeepLearning笔记(12)——风格迁移
date:   2018-04-03 14:30:00 +0800
---

* TOC
{:toc}

## 1. 风格迁移

![]({{site.baseurl}}/images/deeplearning/12-1.png)

## 2. 算法

具体可以参考论文 [A Neural Algorithm of Artistic Style](https://arxiv.org/abs/1508.06576)。

- C：内容图
- S：风格图
- G：生成图

定义代价函数：

$$J(G)=\alpha J_{content}(C,G)+\beta J_{style}(S,G)$$

算法过程为：

1. 随机生成G
2. 使用梯度下降来减小 $J(G)$，即 $G:=G-\frac{\partial}{\partial G}J(G)$

## 3. 内容代价函数

- 选取中间层 $l$，不要太浅的网络层，也不要太深的网络层
- 使用预训练好的卷积网络，例如VGG
- 计算激活值 $$a^{[l](C)}$$ 和 $$a^{[l](G)}$$
- 令 $$J_{content}(C,G)=\mid\mid{a^{[l](C)}-a^{[l](G)}}\mid\mid^2$$

## 4. 风格代价函数

对于卷积网络的中间层 $l$ 层，我们可以计算它的风格矩阵。

- 令 $a_{ijk}^{[l]}$ 表示第 $l$ 层某一点的激活值（$a^{[l]}$ 尺寸为 $n_H^{[l]} \times n_W^{[l]} \times n_C^{[l]}$）
- 令 $G^{[l]}$ 表示第 $l$ 层的风格矩阵。$G^{[l]}$ 尺寸为 $n_C^{[l]} \times n_C^{[l]}$，其中每一项表示两个通道之间的相关性

则：

$$G_{kk'}^{[l]}=\sum_{i=1}^{n_H^{[l]}}\sum_{j=1}^{n_W^{[l]}}a_{ijk}^{[l]}a_{ijk'}^{[l]}$$

令 $$G^{[l](S)}$$ 表示风格图的风格矩阵，$$G^{[l](G)}$$ 表示生成图的风格矩阵，则：

$$
\begin{array}{}
J_{style}^{[l]}(S,G)&=&\frac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2}\mid\mid{G^{[l](S)}-G^{[l](G)}}\mid\mid^2 \\
&=&\frac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2}\sum_{k=1}^{n_C^{[l]}}\sum_{k'=1}^{n_C^{[l]}}(G_{kk'}^{[l](S)}-G_{kk'}^{[l](G)})^2
\end{array}
$$

从而：

$$J_{style}(S,G)=\sum_l\lambda^{[l]}J_{style}^{[l]}(S,G)$$