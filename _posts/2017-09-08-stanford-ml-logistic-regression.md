---
layout: post
title:  Stanford机器学习笔记——Logistic Regression
date:   2017-09-08 17:30:00 +0800
---

* TOC
{:toc}

### 1. Sigmoid

线性回归针对的是连续值，逻辑回归则是针对离散的分类问题。如图所示：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-1.png)

需要注意的是，虽然绘图是在二维平面内，但是数据其实是有三个维度：$$x_1$$，$$x_2$$ 和 $$y$$。假设：

$$ f_\theta(x)=\theta^Tx=\theta_0+\theta_1x_1+\theta_2x_2 $$

则：

$$
\begin{array}{}
y = \begin{cases}
1 & {\text{if}}\ f_\theta(x)\geq0 \\
0 & {\text{if}}\ f_\theta(x)<0 \\ 
\end{cases}
\end{array}
$$

令：

$$ h_\theta(x)=g(f_\theta(x))=g(\theta^Tx)=\frac{1}{1+e^{-\theta^Tx}} $$

如图：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-2.png)

则：

$$
\begin{array}{}
y = \begin{cases}
1 & {\text{if}}\ h_\theta(x)\geq0.5 \\
0 & {\text{if}}\ h_\theta(x)<0.5 \\ 
\end{cases}
\end{array}
$$

### 2. Cost Function

令：

$$
\begin{array}{}
Cost(h_\theta(x),y) = \begin{cases}
-log(h_\theta(x)) & {\text{if}}\ y=1 \\
-log(1-h_\theta(x)) & {\text{if}}\ y=0 \\ 
\end{cases}
\end{array}
$$

图像如下：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-3.png)

- $$ y=1 $$ 时
    + 若 $$ h_\theta(x)=1 $$，则 $$ Cost=0 $$
    + 若 $$ h_\theta(x)=0 $$，则 $$ Cost\rightarrow\infty $$
- $$ y=0 $$ 时
    + 若 $$ h_\theta(x)=1 $$，则 $$ Cost\rightarrow\infty $$
    + 若 $$ h_\theta(x)=0 $$，则 $$ Cost=0 $$

将以上两种情况统一起来，可以得到：

$$ Cost(h_\theta(x),y)=-ylog(h_\theta(x))-(1-y)log(1-h_\theta(x)) $$

令：

$$ J(\theta)=\frac{1}{m}\sum_{i=1}^{m}Cost(h_\theta(x^{(i)}),y^{(i)})=-\frac{1}{m}\sum_{i=1}^{m}[y^{(i)}logh_\theta(x^{(i)})+(1-y^{(i)})log(1-h_\theta(x^{(i)}))] $$

运行梯度下降，即对于 $$ j=0,1,...n $$：

$$ \theta_j:=\theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta) $$

在只有一个样本的情况下：

$$
\begin{array}{}\\
\frac{\partial}{\partial\theta_j}J(\theta) & = & -(y\frac{1}{g(\theta^Tx)}-(1-y)\frac{1}{1-g(\theta^Tx)})\frac{\partial}{\partial\theta_j}g(\theta^Tx) \\
& = & -(y\frac{1}{g(\theta^Tx)}-(1-y)\frac{1}{1-g(\theta^Tx)})g(\theta^Tx)(1-g(\theta^Tx))\frac{\partial}{\partial\theta_j}\theta^Tx \\
& = & -(y(1-g(\theta^Tx))-(1-y)g(\theta^Tx))x_j \\
& = & (h_\theta(x)-y)x_j \\
\end{array}
$$

> 对于 Sigmoid 函数：
> 
> $$ g(z)=\frac{1}{1+e^{-z}} $$
> 
> 由于：
> 
> $$ g'(z)=\frac{e^{-z}}{(1+e^{-z})^2}=\frac{1}{1+e^{-z}}\frac{e^{-z}}{1+e^{-z}}=g(z)(1-g(z)) $$
> 
> 因此：
> 
> $$ \frac{\partial}{\partial\theta_j}g(\theta^Tx)=g(\theta^Tx)(1-g(\theta^Tx))\frac{\partial}{\partial\theta_j}\theta^Tx $$

因此对于 $$ j=0,1,...n $$：

$$ \theta_j:=\theta_j-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_j^{(i)} $$

与线性回归的形式是一致的。

### 3. 多类分类

假如一共有 $$k$$ 类，如果求某个样本属于第 $$i$$ 类的可能性，则将 $$i$$ 类作为是 $$y=1$$，其它 $$k-1$$ 类作为是 $$y=0$$。因此：

$$ h_\theta^{(i)}(x)=P(y=i|x;\theta)\space\space\space\space\space\space(i=1,2,...,k) $$

对于一个样本 $$x$$，选取最大的 $$h_\theta^{(i)}(x)$$，则该样本属于第 $$i$$ 类。


