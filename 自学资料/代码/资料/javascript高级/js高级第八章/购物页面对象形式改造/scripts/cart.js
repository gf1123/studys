//¶¨Òå²úÆ·¶ÔÏó
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].name == val) 
            return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
function Cart (){
   
        this.products=[];
        this.sum=0;
        this.allPrice=0;
    
    this.bindBasic=function(){
        //°ó¶¨
        $('.cartsum').html(this.getSum())
        $('#cartprice').html(this.getAllPrice())
    };
    //°ó¶¨²úÆ·ÁÐ±í,Ã¿´Îµã»÷µ½¹ºÎï³µÖ´ÐÐµÄ·½·¨
    this.bindList=function(){
        var str=''
        for(var i= 0,len=this.products.length;i<len;i++){
            str+='<div class="cart_box">'
            str+='<div class="message">'
            str+=' <div class="alert-close"><span  style="visibility:hidden">'+this.products[i].name+'</span> </div>'
            str+=' <div class="list_img"> <img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/> </div>'
            str+=' <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].groupbuyPrice+'</span></div>'
            str+=' <div class="clearfix"></div>'
            str+='  <div class="clearfix"></div>'
            str+='  </div>'
            str+='   </div>'
        }
        var that = this;
        $('.shopping_cart').html(str);

        $('.alert-close').click(function(){
            
            $(this).parent().fadeOut('slow', function(c){
                //获得span
                // alert($(this).children()[0].children[0].innerText);
                that.products.remove($(this).children()[0].children[0].innerText);
                that.bindBasic();
                that.bindList();
             });
            
        });

    };
    /*½áËã*/
    this.calcalate=function(){};
    /*»ñÈ¡²úÆ·¸öÊý*/
    this.getSum=function(){
        this.sum=this.products.length;
        return this.sum;
    };
    /*»ñÈ¡²úÆ·×Ü¼Û*/
    this.getAllPrice=function(){
        this.allPrice = 0;
        for(var i= 0,len=this.products.length;i<len;i++){
            this.allPrice+=this.products[i].groupbuyPrice;
        }
        return this.allPrice;
    };
};
