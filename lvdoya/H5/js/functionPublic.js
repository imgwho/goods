// JavaScript Document

function GetUrlParam(name)	//获取url参数
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function tokenIsNull()
{
	if (token==null || token.length==0 || token=="" || token=="null"){
		window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.lvdy.im#opened";
		return;
	}
}

function go_back(index)	
{
	url=window.location.href;
	
	backurl=getFootprint(url,index);
	if(backurl.indexOf("mall.html")>0){
		aif.javaCloseActivity();
	}else{
		window.location=backurl;
	}
	
}

function checkStoreId(id){
	fp=localStorage.getItem("ldy_storeid");
	if(fp=="" || fp==null){
		localStorage.setItem("ldy_storeid",id+";");
		return 1;
	}else{
		
		tt=fp.lastIndexOf(id+";");
		if(tt==-1){
			temp=fp+id+";";
			localStorage.setItem("ldy_storeid",temp);
			return 1;
		}else{
			return 0;
		}
	}
}

function saveFootprint(url){
	//localStorage.removeItem("ldy_footprint");
	fp=localStorage.getItem("ldy_footprint");
	if(fp=="" || fp==null){
		localStorage.setItem("ldy_footprint",url+";");
	}else{
		var temp="";
		tt=fp.lastIndexOf(url+";");
		if(tt==-1){
			temp=fp+url+";";
		}else{
			var strs= new Array(); //定义一数组 
			strs=fp.split(";"); //字符分割
			
			for (i=0;i<strs.length-1;i++ ){ 
				temp+=strs[i]+";";
				if(url==strs[i]){
					break;
				}
			}  
		}
		
		localStorage.setItem("ldy_footprint",temp);
		
	}	
	
}

function getFootprint(currUrl,backIndex){
	fp=localStorage.getItem("ldy_footprint");
	
	if(fp!="" || fp!=null){
		tt=fp.lastIndexOf(currUrl+";");
		if(tt>=0){
			var strs= new Array(); //定义一数组 
			strs=fp.split(";"); //字符分割
			var temp="";
			var size=strs.length-1-backIndex;
			for (i=0;i<size;i++ ){ 
				temp+=strs[i]+";";	
			}  
			localStorage.setItem("ldy_footprint",temp);
			return strs[size-1];
		}else{
			return currUrl;
		}
	}
}

function cleanFootprint(){
	localStorage.removeItem("ldy_footprint");
}

function jectNotice(str)
{
	$("#noticeContent").html(str);
	$("#notice").css("display","block");
}

/* 
* url 目标url 
* arg 需要替换的参数名称 
* arg_val 替换后的参数的值 
* return url 参数替换后的url 
*/ 
function changeURLArg(url,arg,arg_val){ 
	var pattern=arg+'=([^&]*)'; 
	var replaceText=arg+'='+arg_val; 
	if(url.match(pattern)){ 
		var tmp='/('+ arg+'=)([^&]*)/gi'; 
		tmp=url.replace(eval(tmp),replaceText); 
		return tmp; 
	}else{ 
		if(url.match('[\?]')){ 
			return url+'&'+replaceText; 
		}else{ 
			return url+'?'+replaceText; 
		} 
	} 
	return url+'\n'+arg+'\n'+arg_val; 
} 

/*function floatLayoutWarn(notice)	//浮层提标（警告） 须配合frozen.js使用
{
  var e13;
  el3=tips({
	  content:notice,
	  stayTime:2000,
	  type:"warn"
  })
  el3.on("tips:hide",function(){
	  console.log("tips hide");
  })
}

function floatLayoutSuccess(notice)	//浮层提标（成功） 须配合frozen.js使用
{
  var e11;
  el1=$.tips({
	  content:notice,
	  stayTime:2000,
	  type:"success"
  })
  el1.on("tips:hide",function(){
	  console.log("tips hide");
  })
}
*/