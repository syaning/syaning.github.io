---
layout: post
title:  Stanford机器学习笔记——SVM
date:   2017-09-14 10:45:00 +0800
---

* TOC
{:toc}

### 1. 优化目标

SVM 即支持向量机（Support Vector Machines），是一种大间距分类算法。

回顾在逻辑回归中，一个样本的损失函数为：

$$ Cost(h_\theta(x),y)=-ylog(h_\theta(x))-(1-y)log(1-h_\theta(x)) $$

即：

$$ Cost(x,y)=-ylog\frac{1}{1+e^{-\theta^Tx}}-(1-y)log(1-\frac{1}{1+e^{-\theta^Tx}}) $$

- 当 $$ y=1 $$ 时：$$ Cost(x,y)=-log\frac{1}{1+e^{-\theta^Tx}} $$
- 当 $$ y=0 $$ 时：$$ Cost(x,y)=-log(1-\frac{1}{1+e^{-\theta^Tx}}) $$

函数图像如下：

![]({{site.baseurl}}/images/stanford-ml/svm-1.png)

回顾在逻辑回归中：

- 当 $$ y=1 $$ 时，需要 $$ \theta^Tx\geq0 $$
- 当 $$ y=0 $$ 时，需要 $$ \theta^Tx<0 $$

现在我们用另一个图像来近似拟合上面的损失函数，来得到一个更加严格的约束：

![]({{site.baseurl}}/images/stanford-ml/svm-2.png)

因此：

- 当 $$ y=1 $$ 时，需要 $$ \theta^Tx\geq1 $$
- 当 $$ y=0 $$ 时，需要 $$ \theta^Tx\leq-1 $$

我们记 $$ y=1 $$ 的损失函数为 $$ cost_1 $$，记 $$ y=0 $$ 的损失函数为 $$ cost_0 $$。令 SVM 的优化目标为：

$$ \underset{\theta}{min}C\sum_{i=1}^{m}[y^{(i)}cost_1(\theta^Tx^{(i)})+(1-y^{(i)})cost_0(\theta^Tx^{(i)})]+\frac{1}{2}\sum_{j=1}^{n}\theta_j^2 $$

假设将 $$ C $$ 设置的比较大，那么我们希望：

$$ \sum_{i=1}^{m}[y^{(i)}cost_1(\theta^Tx^{(i)})+(1-y^{(i)})cost_0(\theta^Tx^{(i)})]=0 $$

因此我们的优化目标为：

$$ \underset{\theta}{min}\frac{1}{2}\sum_{j=1}^{n}\theta_j^2 $$

### 2. 大间距分类

SVM 能够很好地进行大间距分类。如图：

![]({{site.baseurl}}/images/stanford-ml/svm-3.svg)

图中，三条线都能够将两类分开，但是很明显，实线比另外两条虚线划分的更好。因为两个类别的样本到实线的距离相对较大，而到虚线的距离相对较小，因此容易误判。

在数学上，两个向量点乘：

$$ \vec{u}\cdot\vec{v}=\vec{u}^T\vec{v}=p\Vert\vec{v}\Vert $$

其中：

- $$ p $$ 表示向量 $$ \vec{u} $$ 在向量 $$ \vec{v} $$ 方向上投影的长度
- $$ \Vert\vec{v}\Vert $$ 表示向量 $$ \vec{v} $$ 的长度

因此：

$$ \theta^Tx = p\Vert\theta\Vert $$

其中 $$ p $$ 表示 $$ x $$ 在 $$ \theta $$ 方向的投影长度。我们知道 $$ \theta $$ 为分界线的法向量反向，因此 $$ p $$ 可以在一定程度上反映 $$ x $$ 到分割线的距离。因此我们希望 $$ p $$ 尽量大，也就是 $$ \Vert\theta\Vert $$ 尽量小。而：$$ \Vert\theta\Vert^2=\sum_{j=1}^{n}\theta_j^2 $$，因此这也就与前面的优化目标相一致了。

### 3. Gaussian Kernel

上面的分析我们假设都是线性可分的，然而实际上许多情况并非是线性可分。在这种情况下，我们可以通过将样本特征通过一定的函数映射，转化为线性可分。这里以高斯核为例。

将样本的 $$ n $$ 个特征映射为新的 $$ k $$ 个特征 $$ f_1,f_2,...,f_k $$。首先我们先选择 $$ k $$ 个点 $$ l^{(1)},l^{(2)},...,l^{(k)} $$，定义：

$$ f_i=similarity(x,l^{(i)})=e^{-\frac{\Vert{x-l^{(i)}\Vert^2}}{2\sigma^2}}=e^{-\frac{\sum_{j=1}^{n}(x_j-l_j^{(i)})^2}{2\sigma^2}} $$

- 若 $$ x\approx{l^{(i)}} $$，则 $$ f_i\approx1 $$
- 若 $$ x $$ 离 $$ l^{(i)} $$ 很远，则 $$ f_i\approx0 $$

下面是当 $$ l^{(1)}=\left[\begin{array}{}3 \\ 5 \\\end{array}\right] $$ 时，$$ f_1 $$ 的图像：

![]({{site.baseurl}}/images/stanford-ml/svm-4.png)

在得到这些新的特征后，我们对这些新的特征使用 SVM。

在实际过程中，如何选择参照点 $$ l^{(i)} $$ 呢？实际上，可以直接将 $$ m $$ 个样本点作为 $$ m $$ 个参照点，即：

$$ l^{(1)}=x^{(1)},l^{(2)}=x^{(2)},...,l^{(m)}=x^{(m)} $$