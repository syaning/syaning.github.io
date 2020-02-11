---
layout: post
title:  Stanford机器学习笔记——Regularization
date:   2017-09-10 10:30:00 +0800
---

* TOC
{:toc}

### 1. 过拟合

在线性回归和逻辑回归中，容易出现过拟合的情况，即训练模型可以很好地适用于训练集，得到代价函数 $$ J(\theta)≈0 $$，但是这样的模型并无法泛化，对于测试数据，会偏差很大。

在样本特征数多，而样本数少的情况下，很容易发生过拟合。解决过拟合的方法：

1. 减少使用的特征数
2. 正则化

### 2. Linear Regression Regularization

修改 Cost Function 为：

$$ J(\theta)=\frac{1}{2m}[\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right))^2+\lambda\sum_{j=1}^{n}\theta_j^2] $$

在梯度下降过程中：

$$
\begin{array}{}
\begin{cases}
  \theta_0:=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_0^{(i)} \\
  \theta_j:=\theta_j-\alpha[\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_j^{(i)}+\frac{\lambda}{m}\theta_j] & j=1,2,...,n \\ 
\end{cases}
\end{array}
$$

对于正规方程解法：

$$
\theta=(X^TX+\lambda
\underbrace{
  \left[\begin{array}{}
    0\\
    &1 \\
    &&1\\
    &&&.\\
    &&&&.\\
    &&&&&.\\
    &&&&&&1\\
  \end{array}\right]
}_{(n+1)\times(n+1)}
)^{-1}X^Ty
$$

### 3. Logistic Regression Regularization

修改 Cost Function 为：

$$ J(\theta)=-\frac{1}{m}\sum_{i=1}^{m}[y^{(i)}logh_\theta(x^{(i)})+(1-y^{(i)})log(1-h_\theta(x^{(i)}))]+\frac{\lambda}{2m}\sum_{j=1}^{n}\theta_j^2 $$

在梯度下降过程中：

$$
\begin{array}{}
\begin{cases}
  \theta_0:=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_0^{(i)} \\
  \theta_j:=\theta_j-\alpha[\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_j^{(i)}+\frac{\lambda}{m}\theta_j] & j=1,2,...,n \\ 
\end{cases}
\end{array}
$$
