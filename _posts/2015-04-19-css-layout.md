---
layout:      post
title:       CSS布局
date:        2015-04-19 23:26:00 +0800
---

* TOC
{:toc}

### 1. box-model

盒模型基本结构如图所示：

![]({{site.baseurl}}/images/2015-04-19-box-model.png)

> 图片来源于[http://www.w3.org/TR/2011/REC-CSS2-20110607/box.html](http://www.w3.org/TR/2011/REC-CSS2-20110607/box.html)

- 盒子的content size由许多因素决定，例如：是否设置盒子的width和height值，盒子内是否包含文本或其它盒子，盒子是否是table，等等。
- background属性的作用范围是border box，margin区域始终是透明的。

在有些情况下，两个或多个box（可能是兄弟关系，也可能不是）的相邻的margin会合并成一个margin，即margin折叠。竖直方向的margin在某些条件下会发生折叠，水平方向的margin永远不会折叠。

相邻的margin指的是：

- 这些margin没有被非空内容、padding、border或clear分隔开。
- 这些margin处于普通文档流中，即非浮动元素，非定位（absolute、fixed）元素。
- 处于竖直相邻的盒子边缘，即属于以下情况之一：
    - 一个元素的top margin和它的第一个字元素（处于普通文档流中）的top margin相邻。
    - 一个元素的bottom margin和它下一个兄弟元素（处于普通文档流中）的top margin相邻。
    - 如果一个元素的height值为auto且min-height值为0，那么它的bottom margin和它的最后一个子元素（处于普通文档流中）的bottom margin相邻。
    - 如果一个元素的计算后高度为0，那么它的top margin和bottom margin相邻。

以上规则也就是说：

- 浮动元素不会和其它任何元素发生margin折叠。
- 创建了新的BFC的元素（例如浮动元素和overflow不为visible的元素）不会和它们的子元素发生margin折叠。
- 绝对定位元素(absolute、fixed)不会和其它元素发生margin折叠。
- display为inline-block的元素不会和其它元素发生margin折叠。
- 处于普通文档流中的一个元素的bottom margin总会和它的下一个处于普通文档流中的兄弟元素（只要该兄弟元素没有clear）的top margin发生折叠。
- 处于普通文档流中的一个元素（没有top border和top padding）的top margin总会和它的第一个处于普通文档流中的块级子元素（只要该子元素没有clear）的top margin发生折叠。

在margin发生折叠的情况下，计算规则如下：

- 如果参与折叠的margin都是正值，则取其中最大的作为折叠后的margin值。
- 如果参与折叠的margin都是负值，则取其中绝对值最大的作为折叠后的margin值。
- 如果参与折叠的margin有正有负，则取其负值中绝对值最大的和其正值中最大的相加，作为折叠后的margin值。
- 在计算的时候，要将所有参与折叠的margin在一起计算，不能够分步计算。

### 2. position

- static：在普通文档流中，此时设置top，right，bottom和left不起作用。
- relative：元素相对于其在普通文档流中的位置发生偏移，但是该元素仍然保持它在普通文档流中的位置。
- absolute：元素脱离普通文档流，相对于其最近的非static祖先元素进行定位。top，right，bottom和left可影响其位置和大小(当未设置width和height的时候)。另外该情况下margin不会发生折叠。
- fixed：与absolute类似，不过是相对于可视窗口进行定位。当页面滚动的时候，元素相对于窗口位置保持不变。

### 3. float

TBD

### 4. display、position和float的关系

> 本部分内容参考 [http://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#dis-pos-flo](http://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#dis-pos-flo)

这三个属性会相互作用，从而影响最重盒子的生成。规则如下：

![]({{site.baseurl}}/images/2015-04-19-display-position-float.png)

<table>
    <thead>
        <tr>
            <th>Specified value</th>
            <th>Computed value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>inline-table</td>
            <td>table</td>
        </tr>
        <tr>
            <td>inline, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, table-caption, inline-block</td>
            <td>block</td>
        </tr>
        <tr>
            <td>others</td>
            <td>same as specified</td>
        </tr>
    </tbody>
</table>


### 5. Visual formatting model

Visual formatting model（可视化格式模型，以下简称VFM）是CSS中非常重要的一个概念。可以理解为，box model确定了一个元素的自身结构，而VFM用来确定这些box如何排列。

在VFM中，每一个元素都会根据box model产生零个或多个box，这些box的布局受到以下因素的影响：

- box的size和type
- 定位体系：普通文档流、浮动、绝对定位
- 在文档树中，元素之间的关系
- 其它外部信息，例如viewport、图片的固有尺寸等

**(1)包含块(Containing block)**

许多box的定位和尺寸，取决于一个矩形的边界，该矩形被称作为包含块（containing block）。一般来说，一个元素的所生成的box会作为该元素的后代元素的包含块。同时需要注意的是，一个元素的包含块指的是包含该元素的块，而非由该元素所产生的块。

每个box相对于它的包含块都会有一个定位，但是box不会被它的包含块所限制，其内容有可能溢出，通过设置overflow的值可以处理溢出。

一个元素的包含块的确定遵循如下规则：

- 根元素的包含块被称为初始包含块（initial containing block），一般来说在HTML中就是html元素。
- position为static或relative的元素的包含块由离它最近的block container box（block、table-cell、inline-block）的content box所创建。
- position为fixed的元素的包含块为当前的viewport。
- position为absolute的元素的包含块由离它最近的position为relative、absolute或fixed的祖先元素创建：
    - 如果祖先元素为inline，包含块为祖先元素所产生的padding box，同时与祖先元素的direction有关。
    - 否则由祖先元素的padding box所创建。
    - 如果不存在这样的祖先元素，那么其包含块就是初始包含块。

**(2)控制框(Controlling box)**

块级元素和块框（Block-level elements and block boxes）

- 当一个元素的display值为block、list-item、table的时候，该元素为块级元素。
- 每个块级元素会生成一个主块框（principal block-level box），主块框会为子孙元素建立包含块，生成内容，并且也是涉及所有定位体系统的框。有些块级元素除了主块框之外还会产生额外的框，例如display为list-item的元素。
- 除table外，其它块级元素产生的主块框仅包含块框或仅包含行内框。

行内元素和行内框（Inline-level elements and inline boxes）

- 当一个元素的display值为inline、inline-table、inline-block的时候，该元素为行内元素。

**(3)计算width和margin**

非替换的行内元素（inline）：

- width和height设置无效，由内容撑开。默认的margin-left和margin-right为0。

普通文档流中的非替换的块级元素（block）：

- 首先各个属性满足如下等式：`margin-left`+`border-left-width`+`padding-left`+`width`+`padding-right`+`border-right-width`+`margin-right`=`width of containing block`
- 如果width不为auto且`border-left-width`+`padding-left`+`width`+`padding-right`+`border-right-width`超过了包含块的宽度，margin-left和margin-right的auto值为0。
- 如果width、margin-left、margin-right都不为auto，此时margin-left和margin-right将不完全等于设定值。如果包含块的direction是ltr，则margin-right会自动改变以满足等式；如果包含块的direction是rtl，则margin-left会自动改变以满足等式。
- 如果width、margin-left、margin-right中只有一个是auto，那么该值会自动改变以满足等式。
- 如果width为auto，name设置为auto的margin-left或margin-right为0，此时width会自动改变以满足等式。
- 如果margin-left和margin-right都为auto，则这两者会相等，此方法可以用来使内容在包含块中水平居中。

### 6. 参考

- [http://www.w3.org/TR/2011/REC-CSS2-20110607/box.html](http://www.w3.org/TR/2011/REC-CSS2-20110607/box.html)
- [http://www.w3help.org/zh-cn/kb/006/](http://www.w3help.org/zh-cn/kb/006/)
- [http://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html](http://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html)
- [http://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html](http://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html)
