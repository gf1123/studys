var localDatabase = {};//数据库操作对象
var dbName = "NewsDB";//名称
//indexDB对象
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

function dele(){
	var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);
}
//初始化数据库
function initDatabase(schemas,fn){


	//创建或打开数据库
	var openRequest = localDatabase.indexedDB.open(dbName,1);
	openRequest.onerror = function(e){
		console.log("数据库创建失败！"+e.target.errorCode);
	}
	openRequest.onsuccess = function(event) {
			console.log("数据库创建成功！");
			//数据库对象
			localDatabase.db = openRequest.result;
			fn(true);
	}
	//要更新数据库的 schema，也就是创建或者删除对象存储空间，需要实现 onupgradeneeded 处理程序
	openRequest.onupgradeneeded = function (evt) {   
			console.log('Creating object stores');
			//创建头条object store
			for (var i = 0; i < schemas.length; i++) {
				
					var newsStore = evt.currentTarget.result.createObjectStore(schemas[i],{keyPath: "id",autoIncrement: true});
					
					newsStore.createIndex("urlIndex","url",{unique:true});
					newsStore.createIndex("idIndex","id",{unique:true});
			}
			
			
    }

}
//添加新闻数据
//fn添加完成后回调
function addNews(tablename,data,fn){
		//alert(tablename);
		var count = data.length;
  		for(var i=0 ;i<data.length;i++){


  					addItem(tablename,data[i],function(){
  						count--;//完成一次数据添加，减一
  						if(count==0){
  							//完成所有的了
  							fn();
  						}
  					});
 
  		}
  	

}
//fn 添加一次数据后，回调函数
function addItem(tablename,data,fn){
	var transaction=null;//事务对象
	var store=null;//对象存储
	
	transaction = localDatabase.db.transaction(tablename, "readwrite");
	store = transaction.objectStore(tablename);
	
	transaction.oncomplete = function(evt){
  		// alert(tablename+"添加数据完成!");
  	};
  	transaction.onerror = function(evt){
		//alert(tablename+"添加数据失败!");
  	};
  	if (localDatabase != null && localDatabase.db != null) {
  		var request = store.add(data);
		request.onsuccess = function(){
		  	//alert(tablename+"添加数据完成!");

		  	fn();
		}
		request.onerror = function(e){
		  	//alert(tablename+"添加数据失败!"+e.value);
		  	fn();
		}
  	}
  	
}
/**
*tablename:表名
*begin：起始记录数
*pagecount：条数
*/
function fetchNews(tablename,begin,pagecount,fn){
	try {
			var result=[];//检索结果
			if (localDatabase != null && localDatabase.db != null) {
				
					var store = localDatabase.db.transaction([tablename]).objectStore(tablename);
					//倒序方式获得游标
					//var boundKeyRange = IDBKeyRange.bound(0,5, true, true);
					var request=null;
					//"prev"排序只能用在index索引后
					request = store.index("idIndex").openCursor(null,"prevunique");
					
					
					// if(tablename=="tou"){
					// 	request = store.openCursor(null);
					// }
					// else{
					// 	request = store.index("categoryIndex").openCursor(boundKeyRange,IDBCursor.prev);
					// }
					request.onsuccess = function(evt) {  


					    var cursor = evt.target.result; 
					    if (cursor && cursor!=null) {
						    if(begin==0){ //page为0，要第一行数据
						    	if(pagecount>0){
						    		result.push(cursor.value);
						    		//alert(tablename+cursor.value.title);
						    		cursor.advance(1);
						    		pagecount--;
						    	}
						    	else{
						    		fn(result);
						    	}
						    	
						    }
						    else{
						    	cursor.advance(begin-1);
						    	begin=0;
						    }
					    
					    
					    // if (cursor && cursor!=null) {
					    // 	if(a){
					    // 		cursor.advance(count);
					    // 		a=false;
					    // 	}
					    // 	else
					    // 	{
					    // 		if(pagecount>=1)
					    // 			cursor.advance(1);//下一次，游标向下跳几条数据
					    		
					    // 	}
					    // 	pagecount--;
					    // 	if(pagecount<0 || ){
					    // 		fn(result);
					    // 	}
					    // 	result.push(cursor.value); 
					    	
					        
					    }
					    else{
					    	fn(result);
					    }  
					}

			}
		}
		catch(e){
			console.log(e);
		}
		//return result;

}
