---
layout: post
title:  Stanford机器学习笔记——机器学习建议
date:   2017-09-20 00:25:00 +0800
---

* TOC
{:toc}

### 1. 模型选择

对于一组数据集，可能会选择不同的模型。例如：

$$
\begin{array}{}
h_\theta(x)=\theta_0+\theta_1x \\
h_\theta(x)=\theta_0+\theta_1x+\theta_2x^2 \\
h_\theta(x)=\theta_0+\theta_1x+...+\theta_3x^3 \\
h_\theta(x)=\theta_0+\theta_1x+...+\theta_{10}x^{10} \\
\end{array}
$$

将数据随机分为三部分：

- 训练集（training set）60%：用于训练模型
- 交叉验证集（cross validation set）20%：用于选择模型
- 测试集（test set）20%：用于估计模型的泛化误差

即将数据分成三部分后，用训练集来训练出 $$ \theta^{(d)} $$（$$ d=1,2,...,10 $$ 表示多项式次数）；然后选择 $$ \theta^{(d)} $$ 使得 $$ J_{cv}(\theta^{(d)}) $$ 最小。

### 2. bias & variance

bias 为偏差，variance 为方差。下图：

![]({{site.baseurl}}/images/stanford-ml/advice-1.svg)

- 左图为欠拟合，会导致偏差很大
- 中间图为刚好拟合
- 右图为过拟合，会导致偏差很小，但是方差很大

（1）多项式次数

下面是随着多项式次数的变化，$$ J(\theta) $$ 的变化情况：

![]({{site.baseurl}}/images/stanford-ml/advice-2.png)

最左边是欠拟合状态，因此训练集和验证集的误差都很大；右边是过拟合状态，训练集的误差很小，而验证集的误差很大。

（2）正则化

在正则化的情况下：

- 如果 $$ \lambda $$ 很大，则 $$ \theta_j\approx0 $$，欠拟合，偏差很大
- 如果 $$ \lambda $$ 很小，则容易过拟合，方差很大

图像如下：

![]({{site.baseurl}}/images/stanford-ml/advice-3.png)

（3）样本数

在样本数很小的情况下，模型很容易就拟合的很好，因此训练集误差很小，但是由于这样很难泛化，因此交叉验证集误差很大。随着样本数逐渐增多，训练集误差逐渐增大，交叉验证误差也逐渐减小。如图所示：

![]({{site.baseurl}}/images/stanford-ml/advice-4.png)

在欠拟合的情况下，随着样本数的增加，训练集和交叉验证集的误差都会相对较大，并且训练集误差会趋近于交叉验证集误差。在这种情况下，随着样本数增加，交叉验证集的误差会逐渐平缓。因此在欠拟合情况下，增加样本数并不能解决问题。如图所示：

![]({{site.baseurl}}/images/stanford-ml/advice-5.png)

在过拟合的情况下，随着样本数增加，训练集误差虽然会增加，但是一直处于相对较小的状态，交叉验证集误差会逐渐下降，但是误差会相对较大。在这种情况下，如果继续增加样本数，交叉验证集误差会继续减小。因此在过拟合情况下，增加样本数是可以在一定程度上解决问题的。如图所示：

![]({{site.baseurl}}/images/stanford-ml/advice-6.png)

### 3. 偏斜类

假设通过逻辑回归来预测病人是否有癌症。$$ y=0 $$ 表示没有癌症，$$ y=1 $$ 表示有癌症。如果我们在测试集进行测试，得到最终只有 1% 的错误率，可能会认为是一个不错的结果。但是考虑到如下情况：癌症的样本数只有 0.5%。那么即使我们忽略样本的特征，直接返回 $$ y=0 $$，也才只有 0.5% 的错误率。因此在正负样本比例悬殊的情况下，就会产生偏斜类的问题。

在有偏斜类的情况下，使用 $$ Precision $$ 和 $$ Recall $$ 来计算模型的准确率。

|           | Actual 1       | Actual 0       |
|-----------|----------------|----------------|
| Predict 1 | True Positive  | False Positive |
| Predict 0 | False Negative | True Negative  |

则 $$ Precision $$ 可以表示在预测的有癌症患者中，有多少人是真的有癌症的。即：

$$ Precision=\frac{True{\space}Positive}{True{\space}Positive+False{\space}Positive} $$

$$ Recall $$ 表示的是在所有患有癌症的病人中，预测出患有癌症的比例是多少。即：

$$ Recall=\frac{True{\space}Positive}{True{\space}Positive+False{\space}Negative} $$

在具体的案例中，会选择不同的 $$ threshold $$，当 $$ h_\theta(x)\geq{threshold} $$ 的时候，才会预测 $$ y=1 $$。

针对不同的模型，为了比较它们的准确度，使用 $$ F Score $$：

$$ F{\space}Score=2\frac{PR}{P+R} $$

其中 $$ P $$ 表示 $$ Precision $$，$$ R $$ 表示 $$ Recall $$。