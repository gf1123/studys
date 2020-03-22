# <center><font size='45'>BootStrap 教程</font></center> #

# 1.上章回顾与预习检查

## 1.1 上章回顾

1. BootStrap的安装引用

## 1.2 预习检查
 
无

# 2. 本章任务

完成课上案例

# 3. 本章内容

1. 栅格系统
2. 排版
3. 表格
4. 表单
5. 按钮
6. 图片
7. 辅助类
8. 响应工具
	
## 3.1 栅格系统

### 3.1.1 栅格介绍

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。工作原理：

* “行（row）”必须包含在 .container （固定宽度）或 .container-fluid （100% 宽度）中，以便为其赋予合适的排列（aligment）和内补（padding）。

* 通过“行（row）”在水平方向创建一组“列（column）”。

* 内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（row）”的直接子元素。

* 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。

### 3.1.2 栅格参数

通过下表可以详细查看 Bootstrap 的栅格系统是如何在多种屏幕设备上工作的：

<img src="./res/bt_1.png" />

### 3.1.3 水平排列 
参见案例01  

### 3.1.4 流式布局
参见案例02  

### 3.1.5 移动设备和桌面屏幕 
参见案例03  

### 3.1.6 手机平板和桌面屏幕
参见案例04 
 
###3.1.7 多余列处理
如果在一个 .row 内包含的列（column）大于12个，包含多余列（column）的元素将作为一个整体单元被另起一行排列。但这也有一个问题，在手机屏幕上会显示的并不理想，主要问题在于BootStrap的浮动导致，所以还需要在适当的位置清除浮动并加以响应式工具处理（可以决定显示、隐藏的区间）：

参见案例05

### 3.1.8 列偏移

使用 .col-md-offset-* 类可以将列向右侧偏移。这些类实际是通过使用 * 选择器为当前元素增加了左侧的边距（margin）。

偏移量的范围从0~12，小于0和大于12都属于无效值，设置后并不会发生偏移；但是当同一行的几个元素总宽度与offset偏移量相加大于12后会换行，由于offset的有效值为0~12之间，所以换行不会无限制，仅仅能换一行。换行后的位置不会依据上一行的所在位置做增量计算，换行后从0开始。

参见案例 06

### 3.1.9 嵌套列

嵌套需要注意的问题是，当某一嵌套列的高度高于其他列的时候会显示不好，可以考虑清除浮动。

参见案例 07

### 3.1.9 列排序

列排列使用到了push和pull，push是推pull是拉，推向右边，拉向左边；

这里需要注意两个问题：

1. 和多余列处理的形势相同，push和pull大于12的时候会无效。

参见案例 08

## 3.2 排版

### 3.2.1 标题

HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。另外，还提供了 .h1 到 .h6 类，为的是给内联（inline）属性的文本赋予标题的样式。如：

	<span class='h1'>一级标题</span>

参见案例 09

### 3.2.2 段落突出

Bootstrap 将全局 font-size 设置为 14px，line-height 设置为 1.428。这些属性直接赋予 <body> 元素和所有段落元素。另外，<p> （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）。

通过添加 .lead 类可以让段落突出显示。（注意这里的段落并非程序里面的p标签，而是广义上所指的文章段落，lead可以应用于span或div上）

参见案例 10

### 3.2.3 对齐

参见案例 11

### 3.2.4 列表

参见案例 12

## 3.3 表格

### 3.3.1 基本样式
为任意 <table> 标签添加 .table 类可以为其赋予基本的样式 — 少量的内补（padding）和水平方向的分隔线。

### 3.3.2 条纹表格
通过 .table-striped 类可以给 `<tbody>` 之内的每一行增加斑马条纹样式。（依赖CSS3的:nth-child）

### 3.3.3 边框表格

添加 .table-bordered 类为表格和其中的每个单元格增加边框。

### 3.3.4 表格鼠标悬浮

通过添加 .table-hover 类可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。

### 3.3.5 紧缩表格

通过添加 .table-condensed 类可以让表格更加紧凑，单元格中的内补（padding）均会减半。

### 3.3.6 表格状态

<img src="./res/bt_2.png">


### 3.3.7 响应式表格

将任何 .table 元素包裹在 .table-responsive 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

参见案例 13

## 3.4 表单

### 3.4.1 基本实例

单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。

参见案例 14

### 3.4.2 内联表单

为 `<form>` 元素添加 .form-inline 类可使其内容左对齐并且表现为 inline-block 级别的控件。只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。

参见案例 15

### 3.4.3 水平排列表单

通过为表单添加 .form-horizontal 类，并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。这样做将改变 .form-group 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了。

参见案例 16

### 3.4.4 被支持的控件

**输入框**
包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： text、password、datetime、datetime-local、date、month、time、week、number、email、url、search、tel 和 color。

**文本域**

支持多行文本的表单控件。可根据需要改变 rows 属性。

	<textarea class="form-control" rows="3"></textarea>

**多选和单选框**

设置了 disabled 属性的单选或多选框都能被赋予合适的样式。对于和多选或单选框联合使用的 `<label>` 标签，如果也希望将悬停于上方的鼠标设置为“禁止点击”的样式，请将 .disabled 类赋予 .radio、.radio-inline、.checkbox、.checkbox-inline 或 `<fieldset>`。

**内联单选和多选框**

通过将 .checkbox-inline 或 .radio-inline 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行。

**下拉列表**

使用默认选项或添加 multiple 属性可以同时显示多个选项。

	<select class="form-control">
	  <option>1</option>
	  <option>2</option>
	  <option>3</option>
	  <option>4</option>
	  <option>5</option>
	</select>
	
	<select multiple class="form-control">
	  <option>1</option>
	  <option>2</option>
	  <option>3</option>
	  <option>4</option>
	  <option>5</option>
	</select>

### 3.4.5 静态控件

如果需要在表单中将一行纯文本和 label 元素放置于同一行，为 `<p>` 元素添加 .form-control-static 类即可。


参见案例 17

### 3.4.6 表单状态

**焦点状态**

我们将某些表单控件的默认 outline 样式移除，然后对 :focus 状态赋予 box-shadow 属性。

**禁用状态**

为输入框设置 disabled 属性可以防止用户输入，并能对外观做一些修改，使其更直观。

**只读状态**

为输入框设置 readonly 属性可以禁止用户输入，并且输入框的样式也是禁用状态。

**校验状态**

Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。使用时，添加 .has-warning、.has-error 或 .has-success 类到这些控件的父元素即可。任何包含在此元素之内的 .control-label、.form-control 和 .help-block 元素都将接受这些校验状态的样式。

参见案例 18

### 3.4.7 控件大小

1. 通过 .input-lg 类似的类可以为控件设置高度，通过 .col-lg-* 类似的类可以为控件设置宽度。
2. 通过添加 .form-group-lg 或 .form-group-sm 类，为 .form-horizontal 包裹的 label 元素和表单控件快速设置尺寸。
3. 用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。

参见案例 19

### 3.4.8 辅助文本

针对表单控件的“块（block）”级辅助文本。

参见案例 20

## 3.5 按钮

### 3.5.1 按钮样式

<img src="./res/bt_3.png">

1. default:btn btn-default
2. primary:btn btn-primary
3. success:btn btn-success
4. info:btn btn-info
5. warning:btn btn-warning
6. danger:btn btn-danger
7. link:btn btn-link

### 3.5.2 按钮大小

使用 .btn-lg、.btn-sm 或 .btn-xs 可以获得不同尺寸的按钮

<img src="./res/bt_4.png">

	<p>
	  <button type="button" class="btn btn-primary btn-lg">Large button</button>
	</p>
	<p>
	  <button type="button" class="btn btn-primary">Default button</button>
	</p>
	<p>
	  <button type="button" class="btn btn-primary btn-sm">Small button</button>
	</p>
	<p>
	  <button type="button" class="btn btn-primary btn-xs">Extra small button</button>
	</p>

通过给按钮添加 .btn-block 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。

### 3.5.3 按钮状态
	
**激活状态**

当按钮处于激活状态时，其表现为被按压下去（底色更深、边框夜色更深、向内投射阴影）。对于 `<button>` 元素，是通过 :active 状态实现的。对于 `<a>` 元素，是通过 .active 类实现的。然而，你还可以将 .active 应用到 `<button>` 上，并通过编程的方式使其处于激活状态。
由于 :active 是伪状态，因此无需额外添加，但是在需要让其表现出同样外观的时候可以添加 .active 类。

	<button type="button" class="btn btn-primary btn-lg active">Primary button</button>
	<button type="button" class="btn btn-default btn-lg active">Button</button>

**禁用状态**

为 `<button>` 元素添加 disabled 属性，使其表现出禁用状态。

	<button type="button" class="btn btn-lg btn-primary" disabled="disabled">Primary button</button>
	<button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>

## 3.6 图片

在 Bootstrap 版本 3 中，通过为图片添加 .img-responsive 类可以让图片支持响应式布局。其实质是为图片设置了 max-width: 100%; 和 height: auto; 属性，从而让图片在其父元素中更好的缩放。

通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。

<img src="./res/bt_5.png">

	<img src="..." alt="..." class="img-rounded">
	<img src="..." alt="..." class="img-circle">
	<img src="..." alt="..." class="img-thumbnail">

## 3.7 辅助类

### 3.7.1 文本颜色和背景色

	<p class="text-muted">星期一</p>
	<p class="text-primary">星期二</p>
	<p class="text-success">星期三</p>
	<p class="text-info">星期四</p>
	<p class="text-warning">星期五</p>
	<p class="text-danger">星期六</p>

	<p class="bg-primary">星期二</p>
	<p class="bg-success">星期三</p>
	<p class="bg-info">星期四</p>
	<p class="bg-warning">星期五</p>
	<p class="bg-danger">星期六</p>

### 3.7.2 关闭按钮

	<button type="button" class="close">
		<span aria-hidden="true">&times;</span>
		<span class="sr-only">Close</span>
	</button>


### 3.7.3 上下拉三角

	<span class="caret"></span>

### 3.7.4 快速浮动

	<div class="pull-left">左浮动</div>
	<div class="pull-right">右浮动</div>

### 3.7.5 清除浮动

	<div class="clearfix"></div>

### 3.7.6 元素居中

	<div class="center-block">居中</div>

### 3.7.7 显示隐藏

	<div class="show">显示</div>
	<div class="hidden">隐藏</div>

注意：官网中提示使用show和hidden来显示和隐藏元素，但实际show和hidden并不是一对，查看源码显示如下：

	.hide {
	  display: none !important;
	}
	.show {
	  display: block !important;
	}
	.invisible {
	  visibility: hidden;
	}
	.hidden {
	  display: none !important;
	  visibility: hidden !important;
	}

所以通过hidden隐藏的元素是无法使用show出现的。还有一个问题是hidden支持屏幕大小的选择，派生有：hidden-xs,hidden-sm,hidden-md-hidden-lg。

### 3.7.8 隐藏文本

	#hd{
		background-image: url(1.jpg);
		background-size: 100px 100px;
	}
	<div id="hd" class="text-hide">尘归尘，土归土；该去的不能留</div>

参见案例 21

## 3.8 响应工具

通过单独或联合使用以下列出的类，可以针对不同屏幕尺寸隐藏或显示页面内容。

<img src="./res/bt_6.png">

从 v3.2.0 版本起，形如 .visible-*-* 的类针对每种屏幕大小都有了三种变体，每个针对 CSS 中不同的 display 属性，列表如下：

<img src="./res/bt_7.png">

## 总结

本章重点讲解了关于BootStrap中css全局样式的一些点，为下面的css组件应用做铺垫，学习过程还是和之前html和css一样，没有什么逻辑性，但是记忆性的东西很多，零散的知识很多；需要多练习巩固加深。


## 预习

预习bootstrap CSS组件。

# 参考资料

[BootStrap中文网](http://www.bootcss.com/)  


