


/*配置项*/
var configFace = {
    //"containerid":"#container",//最外层标签的id名称
    //"wrap_div":'<div class="wrap_div"></div>',//包裹图片的div模板，类名不要改，可以自己再添加
    "img_tpl":'<div class="imgDiv" style="width:100%; position:relative;"><img id="img_goodsFace" src=""  style="position:absolute; max-width:100%;"/><div onclick="remove_imgFace(this)" style=" background-color:#000; width:40px; height:40px; position:absolute; top:5px; right:5px; border-radius:50%; text-align:center; opacity:0.7;"><img src="ico/ico_del_yellow.png" style="max-height:26px; margin-top:7px;" /></div></div>',//页面上显示的图片标签模板。可以自己添加属性，不要删除已有的
    "input_tpl":'<input accept="image/*" class="uploadimgFace" type="file" style="display:none;"/>',//表单模板，同上。 multiple="multiple"
    "img_width":null,//压缩后图片最大宽，默认null，即自适应宽度。
    'img_height':null,//同上
    'quality': 0.7,//压缩质量，可选0-1.默认0.7
    'server_urlFace':"http://www.lvdoya.com/app/imgUploadPHP/upImg_mallGoodsFace.php",//提交数据远程服务器地址
    "post_btn_class":".submit_data",//你页面上表单按钮的class, 可以修改成你自己的
    "progress":'#fb_load',
    "uploadid":"#tb_upMallGoodsFace"//上传控件的元素id


};

/*
准备上传的图片数据
 */
var imgdataFace = {};
var faildata = [];
var flag = true;
var doneflag = false;
function init_elementFace(){
    if(configFace){
         $("body").append($(configFace.input_tpl));
         //$(configFace.containerid).append($(configFace.wrap_div));

    }
}
$(function(){
    init_elementFace();
    $(configFace.uploadid).on('click', function(){
        console.log("123");
        $(".uploadimgFace").change(function(event) {  
            console.log("asasas");             
            compressFace(this);
             $('.uploadimgFace').unbind('change');
             $('.uploadimgFace').val("");
        });
        $(".uploadimgFace").click();
    });
    

   /* $(configFace.post_btn_class).on('click', function(){
        post_data();     
        user_callback_afterpost();   
     
    });*/
    
});

function compressFace(obj){
    var that = obj;
    var options = {};
    if(configFace.img_width){
        options.width = configFace.img_width;
    }
    if(configFace.img_height){
        options.width = configFace.img_width;
    }
	configFace.img_height=$(window).width(); 
	var top=0;
	var right=$(window).width();
	var bottom=right;
	var left=0;
    options.quality = configFace.quality;
    console.log(that.files);
    for ( var i in that.files){
        if(!isNaN(i)){
            _compressFace(that.files[i],options);
        }
       
    }  
}


function _compressFace(file, options){
    lrz(file, options).then(function(rst){
        var imgdiv = $(configFace['img_tpl']),
        sourceSize = toFixed2(file.size / 1024),
        resultSize = toFixed2(rst.fileLen / 1024);
        var img = imgdiv.children('img');
        img.attr("src", rst.base64);
        //$("body").append(img);
        //alert("处理成功");
        var filename = get_randfile();
        imgdataFace[filename] = {
            'filename':filename,
            'content':rst.base64,
            'filelen':rst.fileLen
        }
        img.attr('key', filename)
        $(".div_imgMallGoodsFace").append(imgdiv);
		$("#div_imgMallGoodsFace").css("display","block");
		$("#tb_upMallGoodsFace").css("display","none");
		timerCut=setTimeout(function(){imgCut()},1);
    }).catch(function (err) {
            //alert("处理失败");
            // 处理失败会执行
    }).always(function () {
            //alert("处理完成");
            // 不管是成功失败，都会执行
    });
}

function toFixed2(num) {
    return parseFloat(+num.toFixed(2));
}

function imgCut()
{
	//==封面图正方剪切，适应屏宽（注意只是显示剪切，上传仍为原图）==
	var clipRight=$(window).width();
	if ($("#img_goodsFace").height()>=clipRight){
		$("#img_goodsFace").css("clip","rect(0px, "+clipRight+"px, "+clipRight+"px, 0px)");
		$("#div_imgMallGoodsFace").css("margin-bottom",clipRight+"px");
		
	}else{
		$("#div_imgMallGoodsFace").css("margin-bottom",$("#img_goodsFace").height()+"px");
	}
	//==END 封面图正方剪切，适应屏宽（注意只是显示剪切，上传仍为原图）==	
}

function ajax_submitFace(option,count){

    $.ajax({
        url: configFace.server_urlFace, // 这个地址做了跨域处理，可以用于实际调试
        data: option,    
        type: 'POST',
        dataType:'json',
        async:false,
        success: function (data) {
            console.log(data);
            if(data.status==1){
                //alert("上传成功,文件名称"+data.filename);
				var filename=data.filename.replace("../imgGoods/",""); 
				$("#hid_goodsFace").val("<img class='img_goodsFace' src='http://www.lvdoya.com/app/imgGoods/"+filename+"'/>");
            }else{
                faildata.push(option);              
            }
        },
       beforeSend:function(){
            $(configFace.progress).css("display","block");
        },
        complete :function(){
            console.log(doneflag);
            if(doneflag){
				
                $(configFace.progress).css("display","none");
            }
            
        }
    });
}


function get_randfile(){
    return new Date().getTime();
}

function post_mallGoodsFace(){
    if(faildata.length >0){
        for (var i in faildata){
            imgdataFace[faildata[i].filename] = faildata[i];
        }
    }
    faildata = [];
    if(!jQuery.isEmptyObject(imgdataFace)){
        //show_progress();
        var co = 0;
        doneflag = false;
        for (var i in imgdataFace){              
            /*  alert("123");*/
               co+=1;
               if(co==count_obj(imgdataFace)){

                doneflag = true;
              }
              ajax_submitFace(imgdataFace[i],count_obj(imgdataFace));             
         }
        //清空
        //$(".div_imgMallShopFace").empty();
		$("#loadingToast").css("display","none");
        imgdataFace = {};
        if(faildata.length > 0 ){
            for( var i in faildata){              
                var img = $(configFace['img_tpl']);
                img.attr('src',faildata[i].content); 
                $(".div_imgMallGoodsFace").append(img);
            }        
        
            //$(configFace.progress).css("display","none");
            alert("您有图片上传失败,请尝试重新上传"); 
			flag = false;                 
            return 2;
        }
        //$(configFace.progress).css("display","none");
    	return 1;
       
    }else{
     // flag = false;
     // alert("没有选择图片");
      return 0;
    }
  
}

//删除已选择图片
function remove_imgFace(obj){
    delete imgdataFace[$(obj).prev('img').attr('key')];
    $(obj).parent('div').remove();
    $("#tb_upMallGoodsFace").css("display","block");
	$("#div_imgMallGoodsFace").css("display","none");
	$("#hid_shopFace").val("");
	clearTimeout(timerCut);
}




//显示进度条
/*var flag = false;
var count = 0;
function show_progress(){
    flag = false;
    count = 0;
    //alert(configFace.progress);
    $("body").append($(configFace.progress));
}

function loading(sum){
    if(!flag){             
            var a = parseInt(Math.random()*(100/sum),10);
            count+=a;
          
            var percent = count+"%";
            if(count<=100){
              
                console.log($('.progress span').html());
                $('.progress span').animate({width:percent},400,function(){
                     $(this).children().html(percent);        
                })
            }
         
    }else{
       $('.progress span').animate({width:'100%'},1000,function(){
                     $(this).children().html('100%');        
                })
        setTimeout(function(){
                    $('.progress').fadeOut();                    
                },2000);
        count = 0;
    }  
}*/

function count_obj(obj){
        var objType = typeof obj;
        if(objType == "string"){
            return obj.length;
        }else if(objType == "object"){
            var objLen = 0;
            for(var i in obj){
                objLen++;
            }
            return objLen;
        }
        return false;
}

//扩展:上传完成后回调函数,可以写一些提示性代码等
function user_callback_afterpost(){
    if(faildata.length == 0 && flag){
		//alert(document.getElementById("input_tp").value);
         return true;
    }
   
}


/*document.querySelector('input').addEventListener('change', function () {
    var that = this;

    lrz(that.files[0], {
        width: 800
    })
        .then(function (rst) {
            var img = new Image(),
                div = document.createElement('div'),
                p = document.createElement('p'),
                sourceSize = toFixed2(that.files[0].size / 1024),
                resultSize = toFixed2(rst.fileLen / 1024),
                scale = parseInt(100 - (resultSize / sourceSize * 100));

            p.style.fontSize = 13 + 'px';
            p.innerHTML      = '源文件：<span class="text-danger">' +
                sourceSize + 'KB' +
                '</span> <br />' +
                '压缩后传输大小：<span class="text-success">' +
                resultSize + 'KB (省' + scale + '%)' +
                '</span> ';

            div.className = 'col-sm-6';
            div.appendChild(img);
            div.appendChild(p);

            img.onload = function () {
                document.querySelector('#upload-container').appendChild(div);
            };

            img.src = rst.base64;

                        /!* ==================================================== *!/
             // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
             // 其他框架，例如ajax处理formData略有不同，请自行google，baidu。
             var xhr = new XMLHttpRequest();
             xhr.open('POST', '/upload');

             xhr.onload = function () {
             if (xhr.status === 200) {
             // 上传成功
             } else {
             // 处理其他情况
             }
             };

             xhr.onerror = function () {
             // 处理错误
             };

             // issues #45 提到似乎有兼容function性问题,关于progress
             xhr.upload.onprogress =  (e) {
             // 上传进度
             var percentComplete = ((e.loaded / e.total) || 0) * 100;
             };

             // 添加参数和触发上传
             rst.formData.append('a', '我是参数');
             xhr.send(rst.formData);
             /!* ==================================================== *!/

            return rst;
        });
});

document.querySelector('#version').innerHTML = lrz.version;
document.querySelector('.UA').innerHTML      = 'UA: ' + navigator.userAgent;



/**
 * 替换字符串 !{}
 * @param obj
 * @returns {String}
 * @example
 * '我是!{str}'.render({str: '测试'});
 */
/*String.prototype.render = function (obj) {
    var str = this, reg;

    Object.keys(obj).forEach(function (v) {
        reg = new RegExp('\\!\\{' + v + '\\}', 'g');
        str = str.replace(reg, obj[v]);
    });

    return str;
};*/

/**
 * 触发事件 - 只是为了兼容演示demo而已
 * @param element
 * @param event
 * @returns {boolean}
 */
/*function fireEvent (element, event) {
    var evt;

    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    }
    else {
        // 其他标准浏览器使用dispatchEvent方法
        evt = document.createEvent('HTMLEvents');
        // initEvent接受3个参数：
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
}
*/
/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */