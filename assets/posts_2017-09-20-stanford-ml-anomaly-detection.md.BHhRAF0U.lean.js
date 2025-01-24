import{_ as s,c as t,j as Q,a as e,ag as l,o as a}from"./chunks/framework.9GNIKSP0.js";const m="/assets/anomaly-detection-1.BO7Yv-UK.png",d="/assets/anomaly-detection-2.Bk4quHtU.svg",n="/assets/anomaly-detection-3.kqQ9rvLI.svg",$=JSON.parse('{"title":"Stanford机器学习笔记——异常检测","description":"","frontmatter":{"layout":"post","title":"Stanford机器学习笔记——异常检测","date":"2017-09-20 14:55:00 +0800","tags":"MachineLearning"},"headers":[],"relativePath":"posts/2017-09-20-stanford-ml-anomaly-detection.md","filePath":"posts/2017-09-20-stanford-ml-anomaly-detection.md"}'),o={name:"posts/2017-09-20-stanford-ml-anomaly-detection.md"},r={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},i={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.09ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.52ex",height:"1.636ex",role:"img",focusable:"false",viewBox:"0 -683 1998 723","aria-hidden":"true"},h={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},p={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.489ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.364ex",height:"1.489ex",role:"img",focusable:"false",viewBox:"0 -442 603 658","aria-hidden":"true"},g={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},H={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.28ex",height:"1.912ex",role:"img",focusable:"false",viewBox:"0 -833.9 1007.6 844.9","aria-hidden":"true"},c={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},u={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"12.73ex",height:"2.565ex",role:"img",focusable:"false",viewBox:"0 -883.9 5626.8 1133.9","aria-hidden":"true"},w={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},L={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.308ex"},xmlns:"http://www.w3.org/2000/svg",width:"26.443ex",height:"5.385ex",role:"img",focusable:"false",viewBox:"0 -1360.3 11687.7 2380.3","aria-hidden":"true"},x={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},f={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.489ex"},xmlns:"http://www.w3.org/2000/svg",width:"11.959ex",height:"1.995ex",role:"img",focusable:"false",viewBox:"0 -666 5285.8 882","aria-hidden":"true"},y={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},M={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.986ex",height:"1.025ex",role:"img",focusable:"false",viewBox:"0 -442 878 453","aria-hidden":"true"},k={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},V={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.357ex",height:"1.025ex",role:"img",focusable:"false",viewBox:"0 -442 600 453","aria-hidden":"true"},Z={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},D={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-3.278ex"},xmlns:"http://www.w3.org/2000/svg",width:"24.25ex",height:"7.687ex",role:"img",focusable:"false",viewBox:"0 -1948.8 10718.7 3397.5","aria-hidden":"true"},b={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},v={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-3.014ex"},xmlns:"http://www.w3.org/2000/svg",width:"43.85ex",height:"7.23ex",role:"img",focusable:"false",viewBox:"0 -1863.5 19381.6 3195.7","aria-hidden":"true"},j={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},_={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"8.264ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 3652.6 1000","aria-hidden":"true"},A={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},R={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.054ex",height:"1.072ex",role:"img",focusable:"false",viewBox:"0 -452 466 474","aria-hidden":"true"},O={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},C={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-3.994ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.901ex",height:"9.119ex",role:"img",focusable:"false",viewBox:"0 -2265.3 6586.1 4030.7","aria-hidden":"true"},S={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},P={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.706ex"},xmlns:"http://www.w3.org/2000/svg",width:"32.252ex",height:"6.543ex",role:"img",focusable:"false",viewBox:"0 -1696.1 14255.6 2892.2","aria-hidden":"true"},B={tabindex:"0",class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},X={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.661ex"},xmlns:"http://www.w3.org/2000/svg",width:"34.462ex",height:"5.697ex",role:"img",focusable:"false",viewBox:"0 -1342 15232.2 2518.1","aria-hidden":"true"};function E(I,T,J,N,z,G){return a(),t("div",null,[T[42]||(T[42]=Q("h2",{id:"_1-正态分布-高斯分布",tabindex:"-1"},[e("1. 正态分布（高斯分布） "),Q("a",{class:"header-anchor",href:"#_1-正态分布-高斯分布","aria-label":'Permalink to "1. 正态分布（高斯分布）"'},"​")],-1)),Q("p",null,[T[6]||(T[6]=e("假设对于一组数据 ")),Q("mjx-container",r,[(a(),t("svg",i,T[0]||(T[0]=[l("",1)]))),T[1]||(T[1]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",null,"∈")]),Q("mi",null,"R")])],-1))]),T[7]||(T[7]=e("，如果它们满足正态分布，且平均数为 ")),Q("mjx-container",h,[(a(),t("svg",p,T[2]||(T[2]=[Q("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[Q("g",{"data-mml-node":"math"},[Q("g",{"data-mml-node":"mi"},[Q("path",{"data-c":"1D707",d:"M58 -216Q44 -216 34 -208T23 -186Q23 -176 96 116T173 414Q186 442 219 442Q231 441 239 435T249 423T251 413Q251 401 220 279T187 142Q185 131 185 107V99Q185 26 252 26Q261 26 270 27T287 31T302 38T315 45T327 55T338 65T348 77T356 88T365 100L372 110L408 253Q444 395 448 404Q461 431 491 431Q504 431 512 424T523 412T525 402L449 84Q448 79 448 68Q448 43 455 35T476 26Q485 27 496 35Q517 55 537 131Q543 151 547 152Q549 153 557 153H561Q580 153 580 144Q580 138 575 117T555 63T523 13Q510 0 491 -8Q483 -10 467 -10Q446 -10 429 -4T402 11T385 29T376 44T374 51L368 45Q362 39 350 30T324 12T288 -4T246 -11Q199 -11 153 12L129 -85Q108 -167 104 -180T92 -202Q76 -216 58 -216Z",style:{"stroke-width":"3"}})])])],-1)]))),T[3]||(T[3]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"μ")])],-1))]),T[8]||(T[8]=e("，方差为 ")),Q("mjx-container",g,[(a(),t("svg",H,T[4]||(T[4]=[l("",1)]))),T[5]||(T[5]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("msup",null,[Q("mi",null,"σ"),Q("mn",null,"2")])])],-1))]),T[9]||(T[9]=e("，则记作："))]),Q("mjx-container",c,[(a(),t("svg",u,T[10]||(T[10]=[l("",1)]))),T[11]||(T[11]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mi",null,"x"),Q("mo",null,"∼"),Q("mi",null,"N"),Q("mo",{stretchy:"false"},"("),Q("mi",null,"μ"),Q("mo",null,","),Q("msup",null,[Q("mi",null,"σ"),Q("mn",null,"2")]),Q("mo",{stretchy:"false"},")")])],-1))]),T[43]||(T[43]=Q("p",null,"概率密度函数为：",-1)),Q("mjx-container",w,[(a(),t("svg",L,T[12]||(T[12]=[l("",1)]))),T[13]||(T[13]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mi",null,"p"),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",null,";"),Q("mi",null,"μ"),Q("mo",null,","),Q("msup",null,[Q("mi",null,"σ"),Q("mn",null,"2")]),Q("mo",{stretchy:"false"},")"),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mrow",null,[Q("msqrt",null,[Q("mn",null,"2"),Q("mi",null,"π")]),Q("mi",null,"σ")])]),Q("msup",null,[Q("mi",null,"e"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",null,"−"),Q("mfrac",null,[Q("mrow",null,[Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",null,"−"),Q("mi",null,"μ"),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mn",null,"2")])]),Q("mrow",null,[Q("mn",null,"2"),Q("msup",null,[Q("mi",null,"σ"),Q("mn",null,"2")])])])])])])],-1))]),T[44]||(T[44]=Q("p",null,"图像如下：",-1)),T[45]||(T[45]=Q("p",null,[Q("img",{src:m,alt:""})],-1)),Q("p",null,[T[16]||(T[16]=e("如果 ")),Q("mjx-container",x,[(a(),t("svg",f,T[14]||(T[14]=[l("",1)]))),T[15]||(T[15]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"μ"),Q("mo",null,"="),Q("mn",null,"0"),Q("mo",null,","),Q("mi",null,"σ"),Q("mo",null,"="),Q("mn",null,"1")])],-1))]),T[17]||(T[17]=e("，则为标准正态分布。"))]),T[46]||(T[46]=Q("h2",{id:"_2-异常检测",tabindex:"-1"},[e("2. 异常检测 "),Q("a",{class:"header-anchor",href:"#_2-异常检测","aria-label":'Permalink to "2. 异常检测"'},"​")],-1)),Q("p",null,[T[22]||(T[22]=e("假设有 ")),Q("mjx-container",y,[(a(),t("svg",M,T[18]||(T[18]=[Q("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[Q("g",{"data-mml-node":"math"},[Q("g",{"data-mml-node":"mi"},[Q("path",{"data-c":"1D45A",d:"M21 287Q22 293 24 303T36 341T56 388T88 425T132 442T175 435T205 417T221 395T229 376L231 369Q231 367 232 367L243 378Q303 442 384 442Q401 442 415 440T441 433T460 423T475 411T485 398T493 385T497 373T500 364T502 357L510 367Q573 442 659 442Q713 442 746 415T780 336Q780 285 742 178T704 50Q705 36 709 31T724 26Q752 26 776 56T815 138Q818 149 821 151T837 153Q857 153 857 145Q857 144 853 130Q845 101 831 73T785 17T716 -10Q669 -10 648 17T627 73Q627 92 663 193T700 345Q700 404 656 404H651Q565 404 506 303L499 291L466 157Q433 26 428 16Q415 -11 385 -11Q372 -11 364 -4T353 8T350 18Q350 29 384 161L420 307Q423 322 423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 181Q151 335 151 342Q154 357 154 369Q154 405 129 405Q107 405 92 377T69 316T57 280Q55 278 41 278H27Q21 284 21 287Z",style:{"stroke-width":"3"}})])])],-1)]))),T[19]||(T[19]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"m")])],-1))]),T[23]||(T[23]=e(" 个样本，每个样本有 ")),Q("mjx-container",k,[(a(),t("svg",V,T[20]||(T[20]=[Q("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[Q("g",{"data-mml-node":"math"},[Q("g",{"data-mml-node":"mi"},[Q("path",{"data-c":"1D45B",d:"M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z",style:{"stroke-width":"3"}})])])],-1)]))),T[21]||(T[21]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"n")])],-1))]),T[24]||(T[24]=e(" 个特征。在每个特征符合独立的正态分布的情况下，首先计算："))]),Q("mjx-container",Z,[(a(),t("svg",D,T[25]||(T[25]=[l("",1)]))),T[26]||(T[26]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mtable",{columnalign:"",columnspacing:"1em",rowspacing:"4pt"},[Q("mtr",null,[Q("mtd",null,[Q("msub",null,[Q("mi",null,"μ"),Q("mi",null,"j")]),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"m")]),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"i"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"m")])]),Q("msubsup",null,[Q("mi",null,"x"),Q("mi",null,"j"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])])])]),Q("mtr",null,[Q("mtd",null,[Q("msubsup",null,[Q("mi",null,"σ"),Q("mi",null,"j"),Q("mn",null,"2")]),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"m")]),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"i"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"m")])]),Q("mo",{stretchy:"false"},"("),Q("msubsup",null,[Q("mi",null,"x"),Q("mi",null,"j"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",null,"−"),Q("msub",null,[Q("mi",null,"μ"),Q("mi",null,"j")]),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mn",null,"2")])])])])])],-1))]),T[47]||(T[47]=Q("p",null,"则：",-1)),Q("mjx-container",b,[(a(),t("svg",v,T[27]||(T[27]=[l("",1)]))),T[28]||(T[28]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mi",null,"p"),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",{stretchy:"false"},")"),Q("mo",null,"="),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∏"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"j"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"n")])]),Q("mi",null,"p"),Q("mo",{stretchy:"false"},"("),Q("msub",null,[Q("mi",null,"x"),Q("mi",null,"j")]),Q("mo",null,";"),Q("msub",null,[Q("mi",null,"μ"),Q("mi",null,"j")]),Q("mo",null,","),Q("msubsup",null,[Q("mi",null,"σ"),Q("mi",null,"j"),Q("mn",null,"2")]),Q("mo",{stretchy:"false"},")"),Q("mo",null,"="),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∏"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"j"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"n")])]),Q("mfrac",null,[Q("mn",null,"1"),Q("mrow",null,[Q("msqrt",null,[Q("mn",null,"2"),Q("mi",null,"π")]),Q("msub",null,[Q("mi",null,"σ"),Q("mi",null,"j")])])]),Q("msup",null,[Q("mi",null,"e"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",null,"−"),Q("mfrac",null,[Q("mrow",null,[Q("mo",{stretchy:"false"},"("),Q("msub",null,[Q("mi",null,"x"),Q("mi",null,"j")]),Q("mo",null,"−"),Q("msub",null,[Q("mi",null,"μ"),Q("mi",null,"j")]),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mn",null,"2")])]),Q("mrow",null,[Q("mn",null,"2"),Q("msubsup",null,[Q("mi",null,"σ"),Q("mi",null,"j"),Q("mn",null,"2")])])])])])])],-1))]),Q("p",null,[T[33]||(T[33]=e("若 ")),Q("mjx-container",j,[(a(),t("svg",_,T[29]||(T[29]=[l("",1)]))),T[30]||(T[30]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"p"),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",{stretchy:"false"},")"),Q("mo",null,"<"),Q("mi",null,"ε")])],-1))]),T[34]||(T[34]=e("（其中 ")),Q("mjx-container",A,[(a(),t("svg",R,T[31]||(T[31]=[Q("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[Q("g",{"data-mml-node":"math"},[Q("g",{"data-mml-node":"mi"},[Q("path",{"data-c":"1D700",d:"M190 -22Q124 -22 76 11T27 107Q27 174 97 232L107 239L99 248Q76 273 76 304Q76 364 144 408T290 452H302Q360 452 405 421Q428 405 428 392Q428 381 417 369T391 356Q382 356 371 365T338 383T283 392Q217 392 167 368T116 308Q116 289 133 272Q142 263 145 262T157 264Q188 278 238 278H243Q308 278 308 247Q308 206 223 206Q177 206 142 219L132 212Q68 169 68 112Q68 39 201 39Q253 39 286 49T328 72T345 94T362 105Q376 103 376 88Q376 79 365 62T334 26T275 -8T190 -22Z",style:{"stroke-width":"3"}})])])],-1)]))),T[32]||(T[32]=Q("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[Q("mi",null,"ε")])],-1))]),T[35]||(T[35]=e(" 是一个给定的较小的值），则认为该样本属于异常点。"))]),T[48]||(T[48]=Q("p",null,"如果一个特征不符合正态分布的话，需要做一些处理，使其基本符合正态分布。比如：",-1)),Q("mjx-container",O,[(a(),t("svg",C,T[36]||(T[36]=[l("",1)]))),T[37]||(T[37]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mtable",{columnalign:"",columnspacing:"1em",rowspacing:"4pt"},[Q("mtr",null,[Q("mtd",null,[Q("msub",null,[Q("mi",null,"x"),Q("mi",null,"j")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"←")]),Q("mi",null,"l"),Q("mi",null,"o"),Q("mi",null,"g"),Q("mo",{stretchy:"false"},"("),Q("msub",null,[Q("mi",null,"x"),Q("mi",null,"j")]),Q("mo",null,"+"),Q("mi",null,"c"),Q("mo",{stretchy:"false"},")")])]),Q("mtr",null,[Q("mtd",null,[Q("msub",null,[Q("mi",null,"x"),Q("mi",null,"j")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"←")]),Q("msubsup",null,[Q("mi",null,"x"),Q("mi",null,"j"),Q("mi",null,"c")])])]),Q("mtr",null,[Q("mtd",null,[Q("mo",null,"."),Q("mo",null,"."),Q("mo",null,".")])])])])],-1))]),T[49]||(T[49]=Q("h2",{id:"_3-多元高斯分布",tabindex:"-1"},[e("3. 多元高斯分布 "),Q("a",{class:"header-anchor",href:"#_3-多元高斯分布","aria-label":'Permalink to "3. 多元高斯分布"'},"​")],-1)),T[50]||(T[50]=Q("p",null,"上面的方法是假设所有的特征都符合相对独立的正态分布。如图所示：",-1)),T[51]||(T[51]=Q("p",null,[Q("img",{src:d,alt:""})],-1)),T[52]||(T[52]=Q("p",null,"然而事实上，许多情况下，不同特征之间是有着一定的关系的，并不是完全独立，因此上面的方法不再适用。如下图所示：",-1)),T[53]||(T[53]=Q("p",null,[Q("img",{src:n,alt:""})],-1)),T[54]||(T[54]=Q("p",null,"如果按照特征相对独立的方式来检测异常，将会是红色的圈，那么检测不到红色的点为异常。然而实际上应该是绿色的圈，这样才能检测到红色的点为异常。",-1)),T[55]||(T[55]=Q("p",null,"此时需要计算协方差。即：",-1)),Q("mjx-container",S,[(a(),t("svg",P,T[38]||(T[38]=[l("",1)]))),T[39]||(T[39]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mtable",{columnalign:"",columnspacing:"1em",rowspacing:"4pt"},[Q("mtr",null,[Q("mtd",null,[Q("mi",null,"μ"),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"m")]),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"i"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"m")])]),Q("msup",null,[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])])])]),Q("mtr",null,[Q("mtd",null,[Q("mi",{mathvariant:"normal"},"Σ"),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mi",null,"m")]),Q("munderover",null,[Q("mo",{"data-mjx-texclass":"OP"},"∑"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"i"),Q("mo",null,"="),Q("mn",null,"1")]),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mi",null,"m")])]),Q("mo",{stretchy:"false"},"("),Q("msup",null,[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",null,"−"),Q("mi",null,"μ"),Q("mo",{stretchy:"false"},")"),Q("mo",{stretchy:"false"},"("),Q("msup",null,[Q("mi",null,"x"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",{stretchy:"false"},"("),Q("mi",null,"i"),Q("mo",{stretchy:"false"},")")])]),Q("mo",null,"−"),Q("mi",null,"μ"),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mi",null,"T")])])])])])],-1))]),T[56]||(T[56]=Q("p",null,"然后：",-1)),Q("mjx-container",B,[(a(),t("svg",X,T[40]||(T[40]=[l("",1)]))),T[41]||(T[41]=Q("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[Q("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[Q("mi",null,"p"),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",{stretchy:"false"},")"),Q("mo",null,"="),Q("mfrac",null,[Q("mn",null,"1"),Q("mrow",null,[Q("mo",{stretchy:"false"},"("),Q("mn",null,"2"),Q("mi",null,"π"),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mfrac",null,[Q("mi",null,"n"),Q("mn",null,"2")])])]),Q("mo",{"data-mjx-texclass":"ORD",fence:"false",stretchy:"false"},"|"),Q("mi",{mathvariant:"normal"},"Σ"),Q("msup",null,[Q("mo",{"data-mjx-texclass":"ORD",fence:"false",stretchy:"false"},"|"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mfrac",null,[Q("mn",null,"1"),Q("mn",null,"2")])])])])]),Q("msup",null,[Q("mi",null,"e"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",null,"−"),Q("mfrac",null,[Q("mn",null,"1"),Q("mn",null,"2")]),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",null,"−"),Q("mi",null,"μ"),Q("msup",null,[Q("mo",{stretchy:"false"},")"),Q("mi",null,"T")]),Q("msup",null,[Q("mi",{mathvariant:"normal"},"Σ"),Q("mrow",{"data-mjx-texclass":"ORD"},[Q("mo",null,"−"),Q("mn",null,"1")])]),Q("mo",{stretchy:"false"},"("),Q("mi",null,"x"),Q("mo",null,"−"),Q("mi",null,"μ"),Q("mo",{stretchy:"false"},")")])])])],-1))])])}const F=s(o,[["render",E]]);export{$ as __pageData,F as default};
