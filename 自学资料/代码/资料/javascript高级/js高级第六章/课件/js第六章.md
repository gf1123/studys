# <center><font size='45'>javascript高级 第六章</font></center> #

# 1. 上章内容回顾与预习检查 #

## 1.1 上章内容回顾 #

　　1. 同步和异步请求的区别 
　　2. 原生AJAX的三个步骤
　　3. jquery ajax的实现
　　4. 跨域的实现
　　  

## 1.2 预习检查 #

　　1. 什么是闭包  
　　2. 闭包的作用
　

# 2. 本章任务 #

　　1.tab栏切换（闭包版） 
　　2.轮播图闭包
　　     
  

# 3. 本章内容 #

　　1. 函数的复习  
　　2. 函数闭包     

　　


# 3.1 函数的定义 #

## 3.1.1 函数定义的三种方式 ##

　　1.函数直面量
　　2.函数声明
　　3.Function对象　
## 3.1.2 函数的嵌套##
函数的嵌套：就是函数可以嵌套其他函数里。例如：  

	<script type="text/javascript">
		function outFunction(a,b){
			function innerFunction(x){
				return x*x;
			}
			return innerFunction(a) + innerFunction(b);
		}
		alert(outFunction(2,4));
	</script>

嵌套函数的有趣之处在于它的变量作用域规则：它们可以访问嵌套它们（或多重嵌套）的函数的参数和变量。例如：在上面的代码里，内部函数innerFunction可以读写外部函数outerFunction中定义的参数a和b。
# 3.2 函数的调用 #
　　构成函数主体的javascript代码在定义之时并不会执行，只有调用该函数时，它们才会执行。有4种方式来调用javascript函数：  
　　1.作为函数  
　　2.作为方法  
　　3.作为构造函数  
　　4.通过它们的call()和apply()方法间接调用  
## 3.2.1 函数调用  ##
　　使用调用表达式可以进行普通的函数调用。也就是函数名加参数的方式，这种方式我们在以前的课程中学到过，在这里就不在赘述。但有一点要注意。this关键字的使用，前面的课程中我们把它理解为函数的调用者。以函数形式调用函数通常不使用this，但在严格模式和非严格模式下this是不同的。非严格的ECMAScript5对函数调用的规定，this是全局对象（window）,而在严格模式下，this是undefined。通过this也可以判断当前是否是严格模式。

	<script type="text/javascript">
		//'use strict'//严格模式
		var s = function(){
			alert(!this);
		}
		s();
	</script>



## 3.2.2 方法调用 ##

　　一个方法无非是个保存在一个对象的属性里的JavaScript函数。但是方法调用和函数调用有一个重要的去表，即：调用上下文。函数体中的this引用改对象。  

	<script type="text/javascript">
		var calculator={//对象直面量
			operand1:1,
			operand2:2,
			add: function(){
				//注意this关键字的用法，this指代当前对象
				this.result = this.operand1 + this.operand2;
			}
		};
		calculator.add();
		alert(calculator.result);
	</script>

 大多数方法调用使用点符号访问属性，使用方括号也可以进行属性访问操作。  

    alert(calculator["result"]);

this关键字是面向对象编程的核心。任何函数只要作为方法调用实际上都会传入一个隐式的实参——这个实参是一个对象，方法调用的母体就是这个对象。通常来讲，基于那个对象的方法可以执行多种操作，比如方法链。在JQuery等框架中经常使用。 
 
	<script type="text/javascript">
		var shape = {
			x:0,
			y:0,
			color:"",
			setX : function(vx){
				this.x = vx;
				return this;
			},
			setY : function(vy){
				this.y = vy;
				return this;
			},
			setOutline:function(vcolor){
				this.color = vcolor;
				alert(this.x+" "+this.y+" "+this.color);
				return this;
			}
		}
		shape.setX(20).setY(50).setOutline("yellow");
	</script>

关键字this没有作用域的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象（非严格模式下）就是undefined（严格模式下）。很多人误以为调用嵌套函数时this会指向调用外层的上下文，我们可以通过下面的示例验证。如果你想访问这个外部函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用域。  

	<script type="text/javascript">
		var o = {                   		//对象o
			m:function(){					//对象中的方法
				var self = this;			//将this的值保存至一个变量中		
				console.log(this===o);		//输出true，this就是这个对象o
				f();						//调用辅助函数f();						
				
				function f(){				//定义一个嵌套函数f()
					console.log(this === o);//false，this不是全局对象就是undefined
					console.log(self === o);//true,self指外部函数的this值
				}
			}
		};
	</script>

## 3.2.3 构造函数调用  ##
　　　下一章详细讲解。
　　　
## 3.2.4 间接调用 ##
　　　JavaScript中的函数也是对象，和其他JavaScript对象没有什么两样，函数对象也可以包含方法。其中的两个方法call()和apply()可以用来间接调用函数。两个方法都允许显示指定调用所需的this值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。call()方法使用它自由的实参列表作为函数的实参，apply()方法则要求以数组的形式传入参数。  
　　　在这里就需要先聊一聊作用域链的问题，作用域链是javascript语言里非常红的概念，很多学习和使用javascript语言的程序员都知道作用域链是理解javascript里很重要的一些概念的关键，这些概念包括this指针，闭包等等，它非常红的另一个重要原因就是作用域链理解起来太难，就算有人真的感觉理解了它，但是碰到很多实际问题时候任然会是丈二和尚摸不到头脑。现在就来讲一讲，希望各位骚年能有所收获。  
　　　讲作用域链首先要从作用域讲起，下面是百度百科里对作用域的定义：
  
	作用域在许多程序设计语言中非常重要。
	
	通常来说，一段程序代码中所用到的名字并不总是有效/可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。
	
	作用域的使用提高了程序逻辑的局部性，增强程序的可靠性，减少名字冲突。

　　　我们知道作用域的作用是保证变量的名字不发生冲突，javascript里通过{}来设置作用域，在{}里面的变量会得到保护，这种保护就是不让{}里的变量被外部变量混淆和污染。  

    var s1 = "sharpxiajun";

    function ftn(){

        var s2 = "xtq";

        console.log(this);// 运行结果： window

        console.log("s1:" + this.s1 + ";s2:" + this.s2);//运行结果：s1:sharpxiajun;s2:undefined

        console.log("s1:" + this.s1 + ";s2:" + s2);// 运行结果：s1:sharpxiajun;s2:xtq

    }

    ftn();
　　　在javascript世界里有一个大的作用域环境，这个环境就是window，window环境不需要我们自己使用什么方式构建，页面加载时候页面会自动构造的，上面代码里有一个大括号,这个大括号是对函数的定义，运行之，我们发现函数作用域内部定义的s2变量是不能被window对象访问的，因此s2变量是被{}保护起来了，它的生命周期和这个函数的生命周期有关。

　　　广大程序员对作用域链的理解有两块一块是作用域，而作用域在javascript语言里指的是执行环境execution context，执行环境在javascript引擎里是通过上下文变量体现的variable object，javascript引擎里还有一个概念就是执行环境栈execution context stack，当某一个函数的执行环境压入到了执行环境栈里，这个时候就会在上下文变量里构造一个对象，这个对象就是作用域链scope chain，而这个作用域链就是广大程序员理解的第二块知识，作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到window对象即被终止，作用域链向下访问变量是不被允许的。  

	var b1 = "b1";

    function ftn1(){

        console.log(this);// 运行结果： window

        var b2 = "b2";

        var b1 = "bbb";

        function ftn2(){

            console.log(this);// 运行结果： window

            var b3 = "b3";

            b2 = b1;

            b1 = b3;

            console.log("b1:" + b1 + ";b2:" + b2 + ";b3:" + b3);// 运行结果：b1:b3;b2:bbb;b3:b3

        }

        ftn2();

    }

    ftn1();

　　　说了那么多有关作用域的知识，现在聊一聊this，javascript里的this指针逻辑上的概念也是实例化对象，这一点和java语言里的this指针是一致的，但是javascript里的this指针却比java里的this难以理解的多，原因有三：  
原因一：javascript是一个函数编程语言，怪就怪在它也有this指针，说明这个函数编程语言也是面向对象的语言，说的具体点，javascript里的函数是一个高阶函数，编程语言里的高阶函数是可以作为对象传递的，同时javascript里的函数还有可以作为构造函数，这个构造函数可以创建实例化对象，结果导致方法执行时候this指针的指向会不断发生变化，很难控制。  
  
　　原因二：javascript里的全局作用域对this指针有很大的影响，由上面java的例子我们看到，this指针只有在使用new操作符后才会生效，但是javascript里的this在没有进行new操作也会生效，这时候this往往会指向全局对象window。

　　原因三：javascript里call和apply操作符可以随意改变this指向，这看起来很灵活，但是这种不合常理的做法破坏了我们理解this指针的本意，同时也让写代码时候很难理解this的真正指向

　　　上面的三个原因都违反了传统this指针使用的方法，它们都拥有有别于传统this原理的理解思路，而在实际开发里三个原因又往往会交织在一起，这就更加让人迷惑不解了，今天我要为大家理清这个思路，其实javascript里的this指针有一套固有的逻辑，我们理解好这套逻辑就能准确的掌握好this指针的使用。

　　我们先看看下面的代码：  
	<script type="text/javascript">
	    this.a = "aaa";
	    console.log(a);//aaa
	    console.log(this.a);//aaa
	    console.log(window.a);//aaa
	    console.log(this);// window
	    console.log(window);// window
	    console.log(this == window);// true
	    console.log(this === window);// true
	</script>

　　在script标签里我们可以直接使用this指针，this指针就是window对象，我们看到即使使用三等号它们也是相等的。全局作用域常常会干扰我们很好的理解javascript语言的特性，这种干扰的本质就是：

　　在javascript语言里全局作用域可以理解为window对象，记住window是对象而不是类，也就是说window是被实例化的对象，这个实例化的过程是在页面加载时候由javascript引擎完成的，整个页面里的要素都被浓缩到这个window对象，因为程序员无法通过编程语言来控制和操作这个实例化过程，所以开发时候我们就没有构建这个this指针的感觉，常常会忽视它，这就是干扰我们在代码里理解this指针指向window的情形。  
干扰的本质还和function的使用有关，我们看看下面的代码：  

	<script type="text/javascript">
	    console.log(ftn01);//ftn01()  注意：在firebug下这个打印结果是可以点击，点击后会显示函数的定义
	    console.log(ftn02);// undefined
	    function ftn01(){
	       console.log("I am ftn01!");
	    }
	    var ftn02 = function(){
	        console.log("I am ftn02!");
	    }
	</script>    
 
这又是一段没有按顺序执行的代码，先看看ftn02，打印结果是undefined，undefined我在前文里讲到了，在内存的栈区已经有了变量的名称，但是没有栈区的变量值，同时堆区是没有具体的对象，这是javascript引擎在预处理扫描变量定义所致，但是ftn01的打印结果很令人意外，既然打印出完成的函数定义了，而且代码并没有按顺序执行，这只能说明一个问题：

　　在javascript语言通过声明函数方式定义函数，javascript引擎在预处理过程里就把函数定义和赋值操作都完成了，在这里我补充下javascript里预处理的特性，其实预处理是和执行环境相关，在上篇文章里我讲到执行环境有两大类：全局执行环境和局部执行环境，执行环境是通过上下文变量体现的，其实这个过程都是在函数执行前完成，预处理就是构造执行环境的另一个说法，总而言之预处理和构造执行环境的主要目的就是明确变量定义，分清变量的边界，但是在全局作用域构造或者说全局变量预处理时候对于声明函数有些不同，声明函数会将变量定义和赋值操作同时完成，因此我们看到上面代码的运行结果。由于声明函数都会在全局作用域构造时候完成，因此声明函数都是window对象的属性，这就说明为什么我们不管在哪里声明函数，声明函数最终都是属于window对象的原因了。  

关于函数表达式的写法还有秘密可以探寻，我们看下面的代码：  
  
	<script type="text/javascript">
	    function ftn03(){
	        var ftn04 = function(){
	            console.log(this);// window
	        };
	        ftn04();
	    }
	    ftn03();
	</script>
运行结果我们发现ftn04虽然在ftn03作用域下，但是执行它里面的this指针也是指向window，其实函数表达式的写法我们大多数更喜欢在函数内部写，因为声明函数里的this指向window这已经不是秘密，但是函数表达式的this指针指向window却是常常被我们所忽视，特别是当它被写在另一个函数内部时候更加如此。其实在javascript语言里任何匿名函数都是属于window对象，它们也都是在全局作用域构造时候完成定义和赋值，但是匿名函数是没有名字的函数变量，但是在定义匿名函数时候它会返回自己的内存地址，如果此时有个变量接收了这个内存地址，那么匿名函数就能在程序里被使用了，因为匿名函数也是在全局执行环境构造时候定义和赋值，所以匿名函数的this指向也是window对象，所以上面代码执行时候ftn04的this也是指向window，因为javascript变量名称不管在那个作用域有效，堆区的存储的函数都是在全局执行环境时候就被固定下来了，变量的名字只是一个指代而已。

　　这下子坏了，this都指向window，那我们到底怎么才能改变它了？在本文开头我说出了this的秘密，this都是指向实例化对象，前面讲到那么多情况this都指向window，就是因为这些时候只做了一次实例化操作，而这个实例化都是在实例化window对象，所以this都是指向window。我们要把this从window变成别的对象，那就是通过创建对象的方式。
	<script type="text/javascript">
		var person = {
			name:"张三",
			age:22,
			sayHello:function(){
				alert("大家好,我叫"+this.name);
			}
		}
		person.sayHello();
	</script>

在看看下面的代码执行结果。  

	<script type="text/javascript">
		var name = "李四";
		var age = 44;
		function sayHello(){
			alert("大家好,我叫"+this.name+",今年"+this.age+"岁了");
		}
		var person = {
			name:"张三",
			age:22,
			sayHello:sayHello
		}
		person.sayHello(); //张三 22
		sayHello(); // 李四 44
	</script>

哪我们现在这样设计程序，person想使用sayHello()打招呼的方法，哪怎么完成？哈哈，终于我们的主角要登场。   

	<script type="text/javascript">
		var name = "李四";
		var age = 44;
		function sayHello(){
			alert("大家好,我叫"+this.name+",今年"+this.age+"岁了");
		}
		var person = {
			name:"张三",
			age:22,
		}
	</script>
修改代码如下：  

	<script type="text/javascript">
		var name = "李四";
		var age = 44;
		function sayHello(name,age){
			alert("大家好,我叫"+this.name+",今年"+this.age+"岁了");
		}
		var person = {
			name:"张三",
			age:22,
		}
		sayHello.call(person);
		sayHello.apply(person);
		sayHello();
	</script>  

在看下面的代码，输出什么？  

	<script type="text/javascript">
		var name = "I am window";
		var obj = {
		    name:"李四",
		    job:"Software",
		    ftn01:function(obj){
		        obj.show();
		    },
		    ftn02:function(ftn){
		        ftn();
		    },
		    ftn03:function(ftn){
		        ftn.call(this);
		    }
		};
		var person={
		    name:"张三",
		    show:function(){
		        console.log("姓名:" + this.name);
		        console.log(this);
		    }
		};
	
	
		obj.ftn01(person);
		obj.ftn02(function(){
		   console.log(this.name);
		   console.log(this);
		});
		obj.ftn03(function(){
		    console.log(this.name);
		    console.log(this);
		});
	</script>  

# 3.3 闭包 #

　　　函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性在计算科学文献中成为“闭包”。从技术的角度讲，所有的JavaScript函数都是闭包：它们都是对象，它们都关联到作用域链。定义大多数函数时的作用域链在调用函数时依然有效，但这不影响闭包。当调用函数时闭包所指向的作用域链和定义函数时的作用域链不是同一个作用链时，事情就变得非常微妙。当一个函数嵌套了另一个函数，外部函数将嵌套的函数对象作为返回值返回的时候往往会发生这种事情。有很多强大的编程技术都利用到了这类嵌套的函数闭包，以至于这种编程模式在javaScript中非常常见。
　　　理解闭包首先要了解嵌套函数的作用域规则。看一下这段代码。
	
	<script type="text/javascript">
		var scope = "全局变量";
		function checkScope(){
			var scope = "局部变量";
			function innerFun(){return scope;}//在作用域中返回这个值
			return innerFun();
		}
		console.log(checkScope());
	</script>  

你应该清楚checkScope(）会返回“局部变量”。现在我们这段代码做一点修改，你知道这段代码返回什么？  

	<script type="text/javascript">
		var scope = "全局变量";
		function checkScope(){
			var scope = "局部变量";
			function innerFun(){return scope;}//在作用域中返回这个值
			return innerFun;
		}
		console.log(checkScope()());
	</script>   
回想一下作用域的基本规则：JavaScript函数的执行用到了作用域链，这个作用域链是函数定义的时候创建的。嵌套函数innerFun()定义在这个作用域链里，其中的变量scope一定是局部变量，不管在何时何地执行innerFun，这种绑定在执行innerFun（）时依然有效。因此最后一行代码返回“局部变量”，而不是“全局变量”。简言之，闭包的这个特性强大到让人吃惊：它们可以捕捉到局部变量（和参数），并一直保存下来，看起来像这些变量绑定到了再其中定义它们的外部函数。看下面两段代码：  

代码一：  
  
	<script type="text/javascript">
		
		function outerFun(){
			var n=1000;
			function innerFun(){
				n++;
				return n;
			}
			return innerFun();
		}
		console.log(outerFun());//1001
		console.log(outerFun());//1001
		console.log(outerFun());//1001
	</script>  

代码二：  
  
	<script type="text/javascript">
		
		function outerFun(){
			var n=1000;
			function innerFun(){
				n++;
				return n;
			}
			return innerFun;
		}
		var f = outerFun();
		var fn = outerFun();
		console.log(f()); //1001
		console.log(f()); //1002
		console.log(f()); //1003
		console.log(fn()); //1001
		console.log(fn()); //1002
	</script>    

闭包除了上面的一些常用写法，还可以闭包传递参数：  

	<script type="text/javascript">
		
	    function Fun(x) {
	        return function(y) {
	            console.log(x+y);
	        }
	    }
	
	    var obj = Fun(4);
	    
	    // 相当于  obj = function(y) {console.log(4+y)}
	    obj(2);
	</script>

再看一个例子，复杂一点的计数器函数  

	<script type="text/javascript">
		function counter(n){ //函数参数n是一个私由变量
			return {
				//属性getter方法返回并给私有计数器n递增1
				get count(){
					return n++;
				},
				set count(m){
					if(m>=n) n = m;
					else throw Error("只能设置一个更大的值");
				}
			};
		}
		var c = counter(1000);
		console.log(c.count);
		console.log(c.count);
		c.count = 2000;
		console.log(c.count);
		c.count = 2000;
	</script>

已经给出了很多例子，多个闭包共享同样的私有变量，但还要特别小心那些不希望共享的变量往往不经意间给共享给了其他的闭包，我们看一个例子

	<script type="text/javascript">
		function constFuncs(){
			var funcs=[];
			for (var i = 0; i < 10; i++) {
				funcs[i] = function(){return i};
			}
			return funcs;
		}
		var funcs = constFuncs();
		for (var i = 0; i < 10; i++) {
			console.log(funcs[i]());
		}
	</script>  

上面这段代码创建了10个闭包，并将它们存储到了一个数组中。这些闭包都是在同一个函数调用中定义的，因此它们可以共享变量i。当函数结束时，变量i的值是10，所有的闭包都共享这一个值，因此返回10个10。这个不是我们想要的结果。关联到闭包的作用域都是“活动的”，记住这一点非常重要。嵌套的函数不会将作用域内的私有成员复制一份，也不会对所有绑定的变量生成静态快照。我们将代码进行一下修改，在看结果  

	<script type="text/javascript">
		function constFuncs(v){
			return function(){return v};
		}
		function conFun(){
			var funcs=[];
			for (var i = 0; i < 10; i++) {
				funcs[i] = constFuncs(i);
			}
			return funcs;
		}
		var funcs = conFun();
		for (var i = 0; i < 10; i++) {
			console.log(funcs[i]());
		}
	</script>

我们在看一个在事件中闭包的使用。  


	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title></title>
	    <style>
	        div {
	            position: absolute;
	            left: 0;
	            background-color: pink;
	            width: 100px;
	            height: 100px;
	        }
	    </style>
	</head>
	<body>
	<button id="btn1">右走</button>
	<button id="btn2">左走</button>
	<div id="box"></div>
	</body>
	</html>
	<script>
	    var btn1 = document.getElementById("btn1");
	    var btn2 = document.getElementById("btn2");
	    var box = document.getElementById("box");
	   /* var speed = 5;
	    btn1.onclick = function() {
	        box.style.left = box.offsetLeft + speed+ "px";
	    }
	    btn2.onclick = function() {
	        box.style.left = box.offsetLeft + speed+ "px";
	    }*/
	   /* btn1.onclick = function() {
	        move(5);
	    }
	    btn2.onclick = function() {
	        move(-5);
	    }
	    function move(speed) {
	        box.style.left = box.offsetLeft + speed + "px";
	    }*/
	    function move(speed) {
	        return function() {
	            box.style.left = box.offsetLeft + speed + "px";
	        }
	    }
	    btn1.onclick = move(5);
	    btn2.onclick = move(-5);
	
	</script>  

总结：闭包的作用  
它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。  
使用闭包的注意点  
1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
# 3.3 案例 #
案例 选项卡（闭包版）.html  
案例 轮播图闭包.html
# 总结 #
  复习函数，函数的作用域链，函数闭包
# 预习 #
　　面向对象

