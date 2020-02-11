---
layout: post
title:  Stanford机器学习笔记——Linear Regression
date:   2017-09-06 23:30:00 +0800
---

* TOC
{:toc}

### 1. 单一变量线性回归

假设：

$$ h_\theta(x)=\theta_0+\theta_1x $$

则 cost function 为：

$$ J(\theta_0,\theta_1)=\frac{1}{2m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})^2 $$

目标是：

$$ min_\left(\theta_0,\theta_1\right)J(\theta_0,\theta_1) $$

同时更新 $$\theta_0$$ 和 $$\theta_1$$：

$$ \theta_j:=\theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta_0,\theta_1) $$

即：

$$
\begin{array}{}
\theta_0:=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)}) \\
\theta_1:=\theta_1-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x^{(i)}
\end{array}
$$

其中 $$\alpha$$ 为学习速率：

- $$\alpha$$ 过小，梯度下降缓慢
- $$\alpha$$ 过大，则可能跳过最小值，导致收敛失败，甚至发散

### 2. 多变量线性回归

假设：

$$ h_\theta(x)=\theta^Tx=\theta_0x_0+\theta_1x_1+\theta_2x_2+...+\theta_nx_n $$

则 cost function 为：

$$ J(\theta)=\frac{1}{2m}\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right))^2 $$

目标是：

$$ min_\left(\theta\right)J(\theta) $$

更新 $$ \theta $$：

$$ \theta_j:=\theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta) $$

即对于 $$ j=0,1,2,...,n $$：

$$ \theta_j:=\theta_j-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})x_j^{(i)} $$

假设有 m 个样本，每个样本有 n 个特征，即：

$$
X=\left[\begin{array}{}
1 & x_1^{(1)} & ... & x_n^{(1)} \\
1 & x_1^{(2)}  & ... & x_n^{(2)} \\
... & ... & ... & ... \\
1 & x_1^{(m)}  & ... & x_n^{(m)}
\end{array}\right],
\theta=\left[\begin{array}{}\theta_0\\\theta_1\\...\\\theta_n\end{array}\right],
y=\left[\begin{array}{}y^{(1)}\\y^{(2)}\\...\\y^{(m)}\end{array}\right]
$$

则每次梯度下降运行后：

$$ \theta:=\theta-\alpha\frac{1}{m}X^T(X\theta-y) $$

### 3. 特征标准化

$$ x'=\frac{x-\overline{x}}{\sigma} $$

其中 $$ \sigma $$ 为标准差：

$$ \sigma=\sqrt{\frac{1}{m-1}\sum_{i=1}^{m}{(x^{(i)}-\overline{x})}^2} $$

### 4. Normal Equation

$$ \theta=(X^TX)^{-1}X^Ty $$

可以简单理解为，理想情况下：

$$ X\theta=y $$

因此：

$$
\begin{array}{}
X\theta=y \\
X^TX\theta=X^Ty \\
(X^TX)^{-1}X^TX\theta=(X^TX)^{-1}X^Ty \\
\theta=(X^TX)^{-1}X^Ty
\end{array}
$$

对比梯度下降和 Normal Equation：

| | 梯度下降 | Normal Equation |
|-|---------|-----------------|
| 选择 $$ \alpha $$ | 需要 | 不需要 |
| 多次迭代 | 需要 | 不需要 |
| n 比较大 | 良好运行 | 复杂度高，效率低 |