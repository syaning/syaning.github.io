import{_ as t,c as r,a3 as e,o as i}from"./chunks/framework.DIwpdX6V.js";const l="/assets/bar-1.f6H8ED1v.png",s="/assets/bar-2.870QZCB9.png",o="/assets/bar-3.CEYnoeOU.png",p="/assets/bar-4.aO9nxc1B.png",n="/assets/bar-5.C3mICp0J.png",h="/assets/bar-6.py_iWcrN.png",c="/assets/line-1.CGkHzcKo.png",d="/assets/line-2.04aMWZjC.png",_="/assets/area-1.DqludVm6.png",m="/assets/area-2.BxH9HcH8.png",u="/assets/pie-1.CBVDJbKS.png",b="/assets/pie-2.DuTdxad8.png",g="/assets/pie-3.2AD5yowi.png",q="/assets/pie-4.CaFfYIq-.png",f="/assets/pie-5.BYpNXBV6.png",k="/assets/scatter.BzMPyojz.png",x="/assets/bubble.DoeAT-Sy.png",P="/assets/punchcard.YJt3-4SR.png",y="/assets/radar.DFureBu-.png",D="/assets/boxplot.Dz-tKJEH.png",C="/assets/funnel.BxSxKFCA.png",B="/assets/sankey.BMUlQTEJ.png",S="/assets/dashboard-1.DsgHRRFJ.png",v="/assets/dashboard-2.DyN6CfFi.png",w="/assets/gantt.D_FNP_Vj.png",z="/assets/tree-1.eSitXRsw.png",G="/assets/tree-2.DJZheLwi.png",J="/assets/calendar.B-CsbSU7.png",j="/assets/heatmap.CzmphvOE.png",E="/assets/graph-1.CoRKBdyD.png",F="/assets/graph-2.CqmX3_zl.png",H="/assets/wordcloud.COs59PCr.png",K="/assets/candlestick.CuUQSm35.png",V="/assets/map.S78GvcFG.png",N="/assets/metro.BGj9kqvg.gif",$=JSON.parse('{"title":"极简数据可视化入门","description":"","frontmatter":{"layout":"post","title":"极简数据可视化入门","date":"2018-06-26 19:30:00 +0800"},"headers":[],"relativePath":"posts/2018-06-26-data-viz.md","filePath":"posts/2018-06-26-data-viz.md"}'),O={name:"posts/2018-06-26-data-viz.md"};function A(R,a,I,M,T,U){return i(),r("div",null,a[0]||(a[0]=[e('<h2 id="一、概述" tabindex="-1">一、概述 <a class="header-anchor" href="#一、概述" aria-label="Permalink to &quot;一、概述&quot;">​</a></h2><h3 id="_1-为什么要进行可视化" tabindex="-1">1. 为什么要进行可视化 <a class="header-anchor" href="#_1-为什么要进行可视化" aria-label="Permalink to &quot;1. 为什么要进行可视化&quot;">​</a></h3><ul><li>人肉眼对图像更敏感</li><li>将数据之间的复杂关系通过更清晰的方式展现出来</li><li>……</li></ul><h3 id="_2-涉及到的领域" tabindex="-1">2. 涉及到的领域 <a class="header-anchor" href="#_2-涉及到的领域" aria-label="Permalink to &quot;2. 涉及到的领域&quot;">​</a></h3><ul><li>数学，统计</li><li>交互设计</li><li>物理（力场图）</li><li>地理（GIS）</li><li>心理学</li><li>编程</li><li>……</li></ul><h3 id="_3-数据特征" tabindex="-1">3. 数据特征 <a class="header-anchor" href="#_3-数据特征" aria-label="Permalink to &quot;3. 数据特征&quot;">​</a></h3><ul><li>维度：二维，三维，四维，更高维度</li><li>类型：文本，数值（离散、连续），百分比，……</li><li>数据规模：小规模，中等规模，大规模</li><li>数据关系：维度比较，变化趋势，分布情况，……</li><li>……</li></ul><p>在选择图表类型的时候，会综合考虑这些数据特征，从而选择最合适的图表。</p><h3 id="_4-图表基本元素" tabindex="-1">4. 图表基本元素 <a class="header-anchor" href="#_4-图表基本元素" aria-label="Permalink to &quot;4. 图表基本元素&quot;">​</a></h3><ul><li>标题，副标题</li><li>坐标：直角坐标，极坐标</li><li>坐标轴：单轴，双轴，多轴</li><li>label，tick</li><li>legend</li><li>过滤器：时间选择器，维度选择器，……</li><li>标注线</li><li>gridline</li><li>维度：2d，3d</li><li>色彩</li><li>动画</li><li>……</li></ul><h2 id="二、常用图表类型" tabindex="-1">二、常用图表类型 <a class="header-anchor" href="#二、常用图表类型" aria-label="Permalink to &quot;二、常用图表类型&quot;">​</a></h2><h3 id="_1-柱状图" tabindex="-1">1. 柱状图 <a class="header-anchor" href="#_1-柱状图" aria-label="Permalink to &quot;1. 柱状图&quot;">​</a></h3><p>常用于表示二维数据，其中有一个维度需要进行比较。柱的高度可以直观地反映数据的差异。柱状图适合数据规模不大的情况，如果数据规模比较大，则会有很多柱子，影响视觉效果。</p><p>####（1）基础柱状图</p><p>表示二维数据。图中的两个维度是“月份”和“降雨量”，其中“降雨量”这个维度需要进行比较。</p><p><img src="'+l+'" alt="chart"></p><h4 id="_2-分组柱状图" tabindex="-1">（2）分组柱状图 <a class="header-anchor" href="#_2-分组柱状图" aria-label="Permalink to &quot;（2）分组柱状图&quot;">​</a></h4><p>可以表示三维数据。图中的三个维度分别是“月份”、“城市”和“降雨量”，当月份或城市固定的时候，可以比较降雨量随另外一个维度的变化。</p><p><img src="'+s+'" alt="分组柱状图"></p><h4 id="_3-堆叠柱状图" tabindex="-1">（3）堆叠柱状图 <a class="header-anchor" href="#_3-堆叠柱状图" aria-label="Permalink to &quot;（3）堆叠柱状图&quot;">​</a></h4><p>可以表示三维数据，与分组柱状图类似，不过额外的一个维度不再是简单的并列关系，而是可以表示整体总量和个体占比。图中的三个维度分别是“水果”、“人”和“水果消费量”。可以比较每种水果的消费总量，在每一种水果内部，可以看到每个人的消费量分布。</p><p><img src="'+o+'" alt="堆叠柱状图"></p><p>百分比堆叠柱状图可以直观反映一个维度内部，另一个维度的占比分布（而非绝对数值）。</p><p><img src="'+p+'" alt="百分比堆叠柱状图"></p><h4 id="_4-分组堆叠柱状图" tabindex="-1">（4）分组堆叠柱状图 <a class="header-anchor" href="#_4-分组堆叠柱状图" aria-label="Permalink to &quot;（4）分组堆叠柱状图&quot;">​</a></h4><p>是分组柱状图和堆叠柱状图的结合，可以表示四维数据。图中的四个维度分别是“水果”、“人”、“性别”和“水果消费量”。</p><p><img src="'+n+'" alt="分组堆叠柱状图"></p><h3 id="_2-条形图" tabindex="-1">2. 条形图 <a class="header-anchor" href="#_2-条形图" aria-label="Permalink to &quot;2. 条形图&quot;">​</a></h3><p>条形图与柱状图类似，只不过柱子的方向是水平的。同样有分组条形图、堆叠条形图、分组堆叠条形图等变体。</p><p><img src="'+h+'" alt="条形图"> 条形图和柱状图还是有着一些细微的差别：</p><ul><li>柱状图除了表示各个分类的差别外，还可以与折线图结合组成复合图表，用来表示趋势；而条形图则主要侧重于数据比较，不太合适展示趋势变化</li><li>如果类别名称较长，使用柱状图的话需要进行文字旋转，而条形图则不必</li></ul><h3 id="_3-折线图" tabindex="-1">3. 折线图 <a class="header-anchor" href="#_3-折线图" aria-label="Permalink to &quot;3. 折线图&quot;">​</a></h3><p>折线图常用来表示趋势，或者整体趋势比单点数据更重要的场合。适用于二维数据，通过多条曲线则可以表示三维数据（或者说是多组二维数据）。对于大规模的数据也可以很好的进行表示。</p><p><img src="'+c+'" alt="折线图"></p><p><img src="'+d+'" alt="大规模数据折线图"></p><h3 id="_4-面积图" tabindex="-1">4. 面积图 <a class="header-anchor" href="#_4-面积图" aria-label="Permalink to &quot;4. 面积图&quot;">​</a></h3><p>面积图与折线图类似，只不过线条下面进行了着色。当一个图中展示多条数据的趋势的时候，用折线图相对好一些，因为面积图会有颜色重叠问题，虽然可以通过半透明来解决，但是显示效果并不是很好。例如：</p><p><img src="'+_+'" alt="面积图"></p><p>不过如果需要反映个体和整体的占比以及趋势，就适合使用堆叠面积图，例如：</p><p><img src="'+m+'" alt="堆叠面积图"></p><h3 id="_5-饼图" tabindex="-1">5. 饼图 <a class="header-anchor" href="#_5-饼图" aria-label="Permalink to &quot;5. 饼图&quot;">​</a></h3><p>饼图主要适用于反映个体占整体的比重，适用于二维数据。由于人肉眼对面积的敏感程度不如高度，因此在比较数值大小的情况下，柱状图比饼图要好一些。</p><h4 id="_1-基础饼图" tabindex="-1">（1）基础饼图 <a class="header-anchor" href="#_1-基础饼图" aria-label="Permalink to &quot;（1）基础饼图&quot;">​</a></h4><p><img src="'+u+'" alt="基础饼图"></p><h4 id="_2-多层饼图" tabindex="-1">（2）多层饼图 <a class="header-anchor" href="#_2-多层饼图" aria-label="Permalink to &quot;（2）多层饼图&quot;">​</a></h4><p>可以用来展示层级数据的分布占比。</p><p><img src="'+b+'" alt="多层饼图"></p><h4 id="_3-donut-环形图" tabindex="-1">（3）Donut / 环形图 <a class="header-anchor" href="#_3-donut-环形图" aria-label="Permalink to &quot;（3）Donut / 环形图&quot;">​</a></h4><p>标题可以放在圆环中间。</p><p><img src="'+g+'" alt="donut"> 结合多层饼图可以构成多层的环形图。例如DaisyDisk分析磁盘使用情况：</p><p><img src="'+q+'" alt="多层donut"></p><h4 id="_4-南丁格尔玫瑰图" tabindex="-1">（4）南丁格尔玫瑰图 <a class="header-anchor" href="#_4-南丁格尔玫瑰图" aria-label="Permalink to &quot;（4）南丁格尔玫瑰图&quot;">​</a></h4><p>是一种极坐标下的柱状图。每个扇形区域半径大小不同表示要比较的数值。</p><p><img src="'+f+'" alt="南丁格尔玫瑰图"></p><h3 id="_6-散点图" tabindex="-1">6. 散点图 <a class="header-anchor" href="#_6-散点图" aria-label="Permalink to &quot;6. 散点图&quot;">​</a></h3><p>散点图可以表示二维到三维的数据，其中有两个维度都需要进行比较。主要用于展示样本点的分布情况。如果所有的点都一样，则反映的是二维数据。如果对不同的点使用不同的颜色或者形状，则可以表示三维数据。</p><p><img src="'+k+'" alt="散点图"></p><h3 id="_7-气泡图" tabindex="-1">7. 气泡图 <a class="header-anchor" href="#_7-气泡图" aria-label="Permalink to &quot;7. 气泡图&quot;">​</a></h3><p>气泡图是散点图的变种，主要用来表示三维或者四维数据，并且可以对三个维度进行比较。如图所示展示的是四维的数据，其中x，y，以及气泡大小是三个可比较的维度，颜色代表了第四个维度。</p><p><img src="'+x+'" alt="气泡图"></p><p>另一种变体是 punchcard 图，可以表示三维数据：</p><p><img src="'+P+'" alt="punchcard"></p><h2 id="三、进阶图表类型" tabindex="-1">三、进阶图表类型 <a class="header-anchor" href="#三、进阶图表类型" aria-label="Permalink to &quot;三、进阶图表类型&quot;">​</a></h2><h3 id="_1-雷达图" tabindex="-1">1. 雷达图 <a class="header-anchor" href="#_1-雷达图" aria-label="Permalink to &quot;1. 雷达图&quot;">​</a></h3><p>雷达图适用于多维数据。</p><p><img src="'+y+'" alt="雷达图"></p><h3 id="_2-箱线图" tabindex="-1">2. 箱线图 <a class="header-anchor" href="#_2-箱线图" aria-label="Permalink to &quot;2. 箱线图&quot;">​</a></h3><p>可以用于反映数据的分散情况，显示出一组数据中的最大值、最小值、中位数、上下四分位数以及异常值。</p><p><img src="'+D+'" alt="箱线图"></p><h3 id="_3-漏斗图" tabindex="-1">3. 漏斗图 <a class="header-anchor" href="#_3-漏斗图" aria-label="Permalink to &quot;3. 漏斗图&quot;">​</a></h3><p>常用于业务流程的分析，用来展示一层层的转化。</p><p><img src="'+C+'" alt="漏斗图"></p><h3 id="_4-桑基图" tabindex="-1">4. 桑基图 <a class="header-anchor" href="#_4-桑基图" aria-label="Permalink to &quot;4. 桑基图&quot;">​</a></h3><p>又叫做桑基能量分流图，或者桑基能量平衡图。是一种特殊的流程图，用于展示数据流量的变化。</p><p><img src="'+B+'" alt="桑基图"></p><h3 id="_5-仪表图" tabindex="-1">5. 仪表图 <a class="header-anchor" href="#_5-仪表图" aria-label="Permalink to &quot;5. 仪表图&quot;">​</a></h3><p>显示当前的进度或者程度。</p><p><img src="'+S+'" alt="仪表图"></p><p><img src="'+v+'" alt="仪表图2"></p><h3 id="_6-甘特图" tabindex="-1">6. 甘特图 <a class="header-anchor" href="#_6-甘特图" aria-label="Permalink to &quot;6. 甘特图&quot;">​</a></h3><p>用来展示随时间变化的进度发展情况。</p><p><img src="'+w+'" alt="甘特图"></p><h3 id="_7-树状图" tabindex="-1">7. 树状图 <a class="header-anchor" href="#_7-树状图" aria-label="Permalink to &quot;7. 树状图&quot;">​</a></h3><p>用来展示层级关系。</p><p><img src="'+z+'" alt="树状图"></p><p><img src="'+G+'" alt="树状图2"></p><h3 id="_8-日历图" tabindex="-1">8. 日历图 <a class="header-anchor" href="#_8-日历图" aria-label="Permalink to &quot;8. 日历图&quot;">​</a></h3><p>展示与时间紧密相关的数据情况（时变数据）。</p><p><img src="'+J+'" alt="日历图"></p><h3 id="_9-热力图" tabindex="-1">9. 热力图 <a class="header-anchor" href="#_9-热力图" aria-label="Permalink to &quot;9. 热力图&quot;">​</a></h3><p>常用于GIS的可视化，展示不同区域的热门程度。也常用于展示网页不同位置对用户注意力的吸引程度。</p><p><img src="'+j+'" alt="热力图"></p><h3 id="_10-graph" tabindex="-1">10. Graph <a class="header-anchor" href="#_10-graph" aria-label="Permalink to &quot;10. Graph&quot;">​</a></h3><p>主要构成就是点和线，用来展示数据点之间的相互关系。</p><p><img src="'+E+'" alt="graph-1"></p><p>常见的是力场图，即假设每个点都是一个带同种电荷的小球，互相排斥，然后点之间的线又牵引着它们，从而达到一种平衡状态。可以用来展示大规模的数据点的分布状况（例如社交网络中用户的群体关系）。</p><p><img src="'+F+'" alt="graph-2"></p><h3 id="_11-词云" tabindex="-1">11. 词云 <a class="header-anchor" href="#_11-词云" aria-label="Permalink to &quot;11. 词云&quot;">​</a></h3><p><img src="'+H+'" alt="wordcloud"></p><h3 id="_12-k线图-candlestick" tabindex="-1">12. K线图 / candlestick <a class="header-anchor" href="#_12-k线图-candlestick" aria-label="Permalink to &quot;12. K线图 / candlestick&quot;">​</a></h3><p><img src="'+K+'" alt="candlestick"></p><h3 id="_13-地图" tabindex="-1">13. 地图 <a class="header-anchor" href="#_13-地图" aria-label="Permalink to &quot;13. 地图&quot;">​</a></h3><p><img src="'+V+'" alt="地图"></p><h3 id="_14-地铁线路图" tabindex="-1">14. 地铁线路图 <a class="header-anchor" href="#_14-地铁线路图" aria-label="Permalink to &quot;14. 地铁线路图&quot;">​</a></h3><p><img src="'+N+'" alt="metro"></p><h3 id="_15-其它" tabindex="-1">15. 其它 <a class="header-anchor" href="#_15-其它" aria-label="Permalink to &quot;15. 其它&quot;">​</a></h3><ul><li>等高线图</li><li>3D图（柱状图，饼图，……）</li><li>复合图表（柱状图+折线图，地图+热力图，……）</li><li>……</li></ul><h2 id="四、工具和代码实现" tabindex="-1">四、工具和代码实现 <a class="header-anchor" href="#四、工具和代码实现" aria-label="Permalink to &quot;四、工具和代码实现&quot;">​</a></h2><h3 id="_1-javascript" tabindex="-1">1. JavaScript <a class="header-anchor" href="#_1-javascript" aria-label="Permalink to &quot;1. JavaScript&quot;">​</a></h3><ul><li><a href="http://echarts.baidu.com/" target="_blank" rel="noreferrer">Echarts</a></li><li><a href="https://www.highcharts.com/" target="_blank" rel="noreferrer">Highcharts</a></li><li><a href="https://d3js.org/" target="_blank" rel="noreferrer">D3</a></li><li><a href="http://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></li><li><a href="http://openlayers.org/" target="_blank" rel="noreferrer">OpenLayers</a></li><li><a href="https://antv.alipay.com/zh-cn/index.html" target="_blank" rel="noreferrer">AntV (G2, G6, F2)</a></li><li>……</li></ul><h3 id="_2-python" tabindex="-1">2. Python <a class="header-anchor" href="#_2-python" aria-label="Permalink to &quot;2. Python&quot;">​</a></h3><ul><li><a href="https://matplotlib.org/" target="_blank" rel="noreferrer">matplotlib</a></li><li><a href="https://seaborn.pydata.org/" target="_blank" rel="noreferrer">seaborn</a></li><li><a href="http://ggplot.yhathq.com/" target="_blank" rel="noreferrer">ggplot</a></li><li><a href="https://plot.ly/python/" target="_blank" rel="noreferrer">plotly</a></li><li>……</li></ul><h3 id="_3-其它工具" tabindex="-1">3. 其它工具 <a class="header-anchor" href="#_3-其它工具" aria-label="Permalink to &quot;3. 其它工具&quot;">​</a></h3><ul><li>Excel</li><li>Matlab</li><li>Tableau</li><li>SAP Lumira</li><li>Gephi</li><li>……</li></ul>',114)]))}const L=t(O,[["render",A]]);export{$ as __pageData,L as default};
