import{_ as l,c as a,ag as t,j as Q,a as s,o as e}from"./chunks/framework.9GNIKSP0.js";const r="/assets/18-1.CrNpvtr3.png",d="/assets/18-2.HKhkh0lC.png",b=JSON.parse('{"title":"DeepLearning笔记(18)——机器学习策略1","description":"","frontmatter":{"layout":"post","title":"DeepLearning笔记(18)——机器学习策略1","date":"2018-05-29 15:40:00 +0800","tags":"MachineLearning"},"headers":[],"relativePath":"posts/2018-05-29-dl-strategy-1.md","filePath":"posts/2018-05-29-dl-strategy-1.md"}'),n={name:"posts/2018-05-29-dl-strategy-1.md"},m={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},o={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.882ex"},xmlns:"http://www.w3.org/2000/svg",width:"34.072ex",height:"6.895ex",role:"img",focusable:"false",viewBox:"0 -1773.8 15059.9 3047.6","aria-hidden":"true"},H={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},h={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-4.393ex"},xmlns:"http://www.w3.org/2000/svg",width:"18.488ex",height:"9.916ex",role:"img",focusable:"false",viewBox:"0 -2441.5 8171.9 4383","aria-hidden":"true"},i={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},V={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"2.009ex",height:"1.545ex",role:"img",focusable:"false",viewBox:"0 -683 888 683","aria-hidden":"true"},p={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},g={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.186ex"},xmlns:"http://www.w3.org/2000/svg",width:"5.906ex",height:"1.731ex",role:"img",focusable:"false",viewBox:"0 -683 2610.4 765","aria-hidden":"true"},c={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},L={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.819ex"},xmlns:"http://www.w3.org/2000/svg",width:"36.922ex",height:"6.405ex",role:"img",focusable:"false",viewBox:"0 -1585.1 16319.4 2831","aria-hidden":"true"},w={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},M={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.247ex"},xmlns:"http://www.w3.org/2000/svg",width:"38.024ex",height:"5.626ex",role:"img",focusable:"false",viewBox:"0 -1493.3 16806.7 2486.7","aria-hidden":"true"};function f(Z,T,y,u,k,x){return e(),a("div",null,[T[15]||(T[15]=t("",16)),Q("mjx-container",m,[(e(),a("svg",o,T[0]||(T[0]=[t("",1)]))),T[1]||(T[1]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mtable",{columnalign:"",columnspacing:"1em",rowspacing:"4pt"},[Q("mtr",null,[Q("mtd",null,[Q("mi",null,"P"),Q("mi",null,"r"),Q("mi",null,"e"),Q("mi",null,"c"),Q("mi",null,"i"),Q("mi",null,"s"),Q("mi",null,"i"),Q("mi",null,"o"),Q("mi",null,"n"),Q("mo",null,"="),Q("mfrac",null,[Q("mtext",null,"True Positive"),Q("mrow",null,[Q("mtext",null,"True Positive"),Q("mo",null,"+"),Q("mtext",null,"False Positive")])])])]),Q("mtr",null,[Q("mtd",null,[Q("mi",null,"R"),Q("mi",null,"e"),Q("mi",null,"c"),Q("mi",null,"a"),Q("mi",null,"l"),Q("mi",null,"l"),Q("mo",null,"="),Q("mfrac",null,[Q("mtext",null,"True Positive"),Q("mrow",null,[Q("mtext",null,"True Positive"),Q("mo",null,"+"),Q("mtext",null,"False Negative")])])])])])])],-1))]),T[16]||(T[16]=Q("p",null,"但是两个或者多个指标往往很难比较模型的好坏，因为很容易出现一个指标高另一个指标低的情况。因此最好是有一个单一的指标来对模型进行评估。例如 F1 score，通过对 Precision 和 Recall 求调和平均值：",-1)),Q("mjx-container",H,[(e(),a("svg",h,T[2]||(T[2]=[t("",1)]))),T[3]||(T[3]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mtable",{columnalign:"",columnspacing:"1em",rowspacing:"4pt"},[Q("mtr",null,[Q("mtd",null,[Q("mi",null,"P"),Q("mo",null,"="),Q("mi",null,"P"),Q("mi",null,"r"),Q("mi",null,"e"),Q("mi",null,"c"),Q("mi",null,"i"),Q("mi",null,"s"),Q("mi",null,"i"),Q("mi",null,"o"),Q("mi",null,"n")])]),Q("mtr",null,[Q("mtd",null,[Q("mi",null,"R"),Q("mo",null,"="),Q("mi",null,"R"),Q("mi",null,"e"),Q("mi",null,"c"),Q("mi",null,"a"),Q("mi",null,"l"),Q("mi",null,"l")])]),Q("mtr",null,[Q("mtd",null,[Q("msub",null,[Q("mi",null,"F"),Q("mn",null,"1")]),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"2"),Q("mrow",null,[Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"P")]),Q("mo",null,"+"),Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"R")])])]),Q("mo",null,"="),Q("mfrac",null,[Q("mrow",null,[Q("mn",null,"2"),Q("mi",null,"P"),Q("mi",null,"R")]),Q("mrow",null,[Q("mi",null,"P"),Q("mo",null,"+"),Q("mi",null,"R")])])])])])])],-1))]),T[17]||(T[17]=t("",13)),Q("p",null,[T[8]||(T[8]=s("在有 ")),Q("mjx-container",i,[(e(),a("svg",V,T[4]||(T[4]=[Q("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[Q("g",{"data-mml-node":"math"},[Q("g",{"data-mml-node":"mi"},[Q("path",{"data-c":"1D441",d:"M234 637Q231 637 226 637Q201 637 196 638T191 649Q191 676 202 682Q204 683 299 683Q376 683 387 683T401 677Q612 181 616 168L670 381Q723 592 723 606Q723 633 659 637Q635 637 635 648Q635 650 637 660Q641 676 643 679T653 683Q656 683 684 682T767 680Q817 680 843 681T873 682Q888 682 888 672Q888 650 880 642Q878 637 858 637Q787 633 769 597L620 7Q618 0 599 0Q585 0 582 2Q579 5 453 305L326 604L261 344Q196 88 196 79Q201 46 268 46H278Q284 41 284 38T282 19Q278 6 272 0H259Q228 2 151 2Q123 2 100 2T63 2T46 1Q31 1 31 10Q31 14 34 26T39 40Q41 46 62 46Q130 49 150 85Q154 91 221 362L289 634Q287 635 234 637Z",style:{"stroke-width":"3"}})])])],-1)]))),T[5]||(T[5]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"N")])],-1))]),T[9]||(T[9]=s(" 个指标的情况下，可以选择一个作为优化指标，其它 ")),Q("mjx-container",p,[(e(),a("svg",g,T[6]||(T[6]=[t("",1)]))),T[7]||(T[7]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"N"),Q("mo",null,"−"),Q("mn",null,"1")])],-1))]),T[10]||(T[10]=s(" 个作为满足指标。"))]),T[18]||(T[18]=Q("h2",{id:"_5-训练-开发-测试集",tabindex:"-1"},[s("5. 训练/开发/测试集 "),Q("a",{class:"header-anchor",href:"#_5-训练-开发-测试集","aria-label":'Permalink to "5. 训练/开发/测试集"'},"​")],-1)),T[19]||(T[19]=Q("p",null,"训练集用于训练模型，在同一个时间可能会尝试不同的思路，训练不同的模型。然后针对这多个模型，通过开发集（验证集）来选择一个表现好的模型。然后不断迭代去改善模型在开发集上的性能，最后再测试集上进行评估。",-1)),T[20]||(T[20]=Q("p",null,"假设要开发一个猫图片的分类器，现在样本是来自世界各地的。那么在划分开发集和测试集的过程中，就需要确保每个集合都有来自世界各地的样本数据。简言之，需要开发集和测试集遵循同样的数据分布。",-1)),T[21]||(T[21]=Q("p",null,"那么不同的样本集的大小如何确定呢？在机器学习早期的时候，样本数据量普遍偏小（例如几百个，几千个），因此可以按照训练集和测试集7:3，或者训练集、开发集、测试集比例6:2:2来进行划分。随着深度学习的发展，样本量也大大提高，往往是百万级别甚至更多的数据，在这种情况下，可以使用98%的数据作为训练集，1%的数据作为开发集，1%的数据作为测试集。",-1)),T[22]||(T[22]=Q("h2",{id:"_6-指标调整",tabindex:"-1"},[s("6. 指标调整 "),Q("a",{class:"header-anchor",href:"#_6-指标调整","aria-label":'Permalink to "6. 指标调整"'},"​")],-1)),T[23]||(T[23]=Q("p",null,"在某些情况下，需要对指标进行调整。例如一个猫图片分类器，A分类器的误差为3%，B分类器的误差为5%。看起来似乎是A分类器更好，但是A分类器可能会错误地把一些色情图片认为是猫的图片推送给用户，这是不可接受的。因此在这种情况下，需要调整误差的定义，例如：",-1)),Q("mjx-container",c,[(e(),a("svg",L,T[11]||(T[11]=[t("",1)]))),T[12]||(T[12]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mi",null,"E"),Q("mi",null,"r"),Q("mi",null,"r"),Q("mi",null,"o"),Q("mi",null,"r"),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mrow",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("msup",null,[Q("mi",null,"w"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])])])])]),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"i"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("msub",null,[Q("mi",null,"m"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"d"),Q("mi",null,"e"),Q("mi",null,"v")])])])]),Q("msup",null,[Q("mi",null,"w"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",{"data-mjx-variant":"-tex-calligraphic",mathvariant:"script"},"L")]),Q("mo",{fence:"false",stretchy:"false"},"{"),Q("msup",null,[Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mover",null,[Q("mi",null,"y"),Q("mo",{stretchy:"false"},"^")])]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",null,"≠"),Q("msup",null,[Q("mi",null,"y"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",{fence:"false",stretchy:"false"},"}")])],-1))]),T[24]||(T[24]=Q("p",null,"其中：",-1)),Q("mjx-container",w,[(e(),a("svg",M,T[13]||(T[13]=[t("",1)]))),T[14]||(T[14]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("msup",null,[Q("mi",null,"w"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",null,"="),Q("mrow",{"data-mjx-texclass":"INNER"},[Q("mo",{"data-mjx-texclass":"OPEN"},"{"),Q("mtable",{columnalign:"left left",columnspacing:"1em",rowspacing:".2em"},[Q("mtr",null,[Q("mtd",null,[Q("mn",null,"1")]),Q("mtd",null,[Q("mtext",null,"if "),Q("msup",null,[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mtext",null," is non-pornographic")])]),Q("mtr",null,[Q("mtd",null,[Q("mn",null,"10")]),Q("mtd",null,[Q("mtext",null,"if "),Q("msup",null,[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mtext",null," is pornographic")])])]),Q("mo",{"data-mjx-texclass":"CLOSE",fence:"true",stretchy:"true",symmetric:"true"})])])],-1))]),T[25]||(T[25]=t("",7))])}const _=l(n,[["render",f]]);export{b as __pageData,_ as default};
