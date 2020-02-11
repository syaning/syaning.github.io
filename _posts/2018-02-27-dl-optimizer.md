---
layout: post
title:  DeepLearning笔记(4)——优化算法
date:   2018-02-27 20:00:00 +0800
---

* TOC
{:toc}

## 1. BGD

BGD即批量梯度下降（Batch Gradient Descent），是最原始的梯度下降形式，即每次使用所有训练样本来进行梯度下降。

优点是得到的是全局最优解。

缺点是在样本数量较大的情况下，BGD会运行的很慢。

## 2. SGD

SGD即随机梯度下降（Stochastic Gradient Descent），即每次使用一个样本来进行梯度下降。

优点是训练速度会比较快。

缺点是在样本数量较大的情况下，可能只用到了其中一部分数据就完成了训练，得到的只是全局最优解。另外，单一样本的噪声较大，所以每次执行梯度下降，并不一定总是朝着最优的方向前进。

SGD和BGD的优化过程比较如下图所示：

![]({{site.baseurl}}/images/deeplearning/4-1.png)

## 3. MBGD

MBGD即小批量梯度下降（Mini-Batch Gradient Descent），它是BGD和SGD的折中，即每次使用一部分的样本来进行训练。

批量大小的选择遵循以下原则：

- 如果数据量较小，直接使用BGD，即 $batch\text{-}size=m$
- 数据量较大的情况下，一般 $batch\text{-}size$ 为64到512之间，并且设置成2的次方会好一些，如64、128等
- 还要考虑机器的GPU/GPU开销

MBGD和SGD的优化过程比较如下图所示：

![]({{site.baseurl}}/images/deeplearning/4-2.png)

## 4. 指数加权平均

指数加权平均（Exponentially weighted averages）是一种对数据的处理方法，在之后要介绍的的优化算法中，用到了该方法。

假设有一组数据 $\theta_1,\theta_2,\dots,\theta_m$，令：

$$
\begin{array}{}
v_0=0 \\
v_t=\beta v_{t-1}+(1-\beta)\theta_t\ ,&(0<\beta<1)
\end{array}
$$

则此时 $v_1,v_2,\dots,v_m$ 即为指数加权平均后的数据。如下图所示：

![]({{site.baseurl}}/images/deeplearning/4-3.png)

- $\beta$ 越大加权平均后的数据越平缓，极端情况 $\beta$ 为0，则等于原始数据
- $\frac{1}{1-\beta}$ 表示的是平均的是最近的数据数量，例如 $\beta=0.9$，则表示加权平均后的每条数据是由原始数据的10条数据平均而得到

但是考虑到假如 $\beta=0.9$，那么 $v_1=0.1\theta_1$，显然在最初的几条数据偏差都较大，因此可以进行偏差修正（bias correction），计算如下：

$$
\begin{array}{}
v_0=0 \\
v_t=\beta v_{t-1}+(1-\beta)\theta_t\ ,&(0<\beta<1) \\
v_t=\frac{v_t}{1-\beta^t}
\end{array}
$$

效果如图所示：

![]({{site.baseurl}}/images/deeplearning/4-4.png)

可以看到，在初期，偏差修正后的数据表现更好；在后期，两条线基本重合。

## 5. Momentum

过程如下：

- 初始化 $v_{dW}=0,v_{db}=0$
- 在每次迭代中，计算出当前mini-batch的 $dW,db$
    - $v_{dW}=\beta v_{dW}+(1-\beta)dW$
    - $v_{db}=\beta v_{db}+(1-\beta)db$
    - $W:=W-\alpha v_{dW},b:=b-\alpha v_{db}$

其中 $\beta$ 通常取0.9。

Momentum的效率通常要好于不适用Momentum，通过上面的过程可以发现：本次梯度下降的数值是一个加权平均，因此如果本次梯度下降的方向与上次方向相反，上次的更新会对本次有一个减速的作用例如过本次梯度下降的方向与上次方向相同，则上次的更新会对本次有一个正向的加速作用。

如图所示，不适用Momentum的时候，梯度下降如蓝色线条所示；使用了Momentum的时候，梯度下降如红色线条所示。

![]({{site.baseurl}}/images/deeplearning/4-5.svg)

## 6. RMSprop

全称为 Root Mean Square Prop，同样可以加速梯度下降。过程如下：

- 初始化 $S_{dW}=0,S_{db}=0$
- 在每次迭代中，计算出当前mini-batch的 $dW,db$
    - $S_{dW}=\beta S_{dW}+(1-\beta)(dW)^2$
    - $S_{db}=\beta S_{db}+(1-\beta)(db)^2$
    - $W:=W-\alpha\frac{dW}{\sqrt{S_{dW}}},b:=b-\alpha\frac{db}{\sqrt{S_{db}}}$

## 7. Adam

Adam优化算法是将Momentum和RMSprop结合起来。过程如下：

- 初始化 $v_{dW}=0,S_{dW}=0,v_{db}=0,S_{db}=0$
- 在第t次迭代中
    1. 计算出当前mini-batch的 $dW,db$
    2. 计算 $v_{dW},v_{db},S_{dW},S_{db}$
        - $v_{dW}=\beta_1v_{dW}+(1-\beta_1)dW$
        - $v_{db}=\beta_1v_{db}+(1-\beta_1)db$
        - $S_{dW}=\beta_2S_{dW}+(1-\beta_2)(dW)^2$
        - $S_{db}=\beta_2S_{db}+(1-\beta_2)(db)^2$
    3. 偏差修正
        - $v_{dW}^{corrected}=\frac{v_{dW}}{1-\beta_1^t}$
        - $v_{db}^{corrected}=\frac{v_{db}}{1-\beta_1^t}$
        - $S_{dW}^{corrected}=\frac{S_{dW}}{1-\beta_2^t}$
        - $S_{db}^{corrected}=\frac{S_{db}}{1-\beta_2^t}$
    4. 更新 $W,b$，其中 $\epsilon$ 为一个很小的数，通常取 $10^{-8}$，是为了防止分母为0
        - $W:=W-\alpha\frac{v_{dW}^{corrected}}{\sqrt{S_{dW}^{corrected}}+\epsilon}$
        - $b:=b-\alpha\frac{v_{db}^{corrected}}{\sqrt{S_{db}^{corrected}}+\epsilon}$

该算法中涉及到了以下几个超参数：

- $\alpha$：需要调整
- $\beta_1$：通常取0.9
- $\beta_2$：通常取0.999
- $\epsilon$：通常取 $10^{-8}$

通常会使用默认的 $\beta_1,\beta_2,\epsilon$，然后去不断调整 $\alpha$，以达到最好的优化效果。

在梯度下降过程中，由于每一个mini-batch都会存在着一定的噪音，因此最终会在最优点附近左右摆动。换言之，在优化初期，可以使用较大的学习速率，但是之后如果继续使用较大的学习速率，会导致在最优点附近的摆动较大；因此随着训练的进行，可以使用较小的学习速率，从而减小在最优点附近的摆动幅度。

![]({{site.baseurl}}/images/deeplearning/4-6.png)

如图，在不使用学习率衰减的情况下，优化过程如蓝色线条所示；使用了学习率衰减的情况下，优化过程如绿色线条所示。

每遍历一遍训练集为一个epoch，则：

$\alpha=\frac{1}{1+decay\text{-}rate\times epoch\text{-}num}\alpha_0$

另外还有：

- $\alpha=0.95^{epoch\text{-}num}\alpha_0$
- $\alpha=\frac{k}{\sqrt{epoch\text{-}num}}\alpha_0$，$k$ 是一个常数
- $\alpha=\frac{k}{\sqrt{t}}\alpha_0$，$k$ 是一个常数，$t$ 为迭代次数
- 离散的学习率