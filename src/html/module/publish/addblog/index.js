/*
 * ------------------------------------------
 * 发表博客模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/chain/chainable',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module',
    '../../../../javascript/pro/util.js',
],function(_k,_e,$,_t0,_t1,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    var _token = _u._$getJsonDataInStorage("token");
    var _nickname = _u._$getJsonDataInStorage("nickname");
    var _userid = _u._$getJsonDataInStorage("_id");
    var _headimg = _u._$getJsonDataInStorage("headimg");
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModulePublishAddblog = _k._$klass();
    _pro = _p._$$ModulePublishAddblog._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        //textarea 封装模板会和<teaxarea>标签冲突。

        var tpl = 
        '<div class="main-container admin ">\
                <div class="div-20  gray-shallow" ></div>\
                <div class="div-5 gray-shallow" ></div>\
                <form id="myform" method="post" class=" gray-shallow">\
                    <div class="div-10 gray-shallow"></div>\
                    <input id="title" class="inputline" type="text" name="title" autocomplete="off" placeholder="标题" />\
                    <div class="div-10 gray-shallow"></div>\
                    <div class="textarea-container  gray-shallow">\
                        <textarea id="content" type="text" name="txt" class="textarea" name="content" placeholder="分享新鲜事" /></textarea>\
                    </div>\
                    <div class="div-10  gray-shallow"></div>\
                    <div class="div-50  gray-shallow"></div>\
                    <div class="sighup-big-container  gray-shallow" id="sendbutton">\
                        <div class="signup default big " >发表</div>\
                    </div>\
                </form>\
                <div class="row sighup-big-container " id="error-container" style="display:none"><div class="signup red big gray-shallow" id="errormsg" ></div></div></div><div class="gray-shallow" ><div class="row sighup-big-container " id="success-container" style="display:none"><div class="signup green big gray-shallow" id="successmsg" ></div></div></div>\
        </div>';
        var _tpl = _t0._$addTextTemplate('module-id-d6',tpl);
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d6')
        );

    };
    // notify dispatcher
    _t1._$regist('publish-addblog',_p._$$ModulePublishAddblog);
    //添加事件
    (function(){
        $("#sendbutton")._$on("click",function(_event){
                var _title = $("#title")._$val();
                var _content = $("#content")._$val();
                if(_content != '' && _title != ''){
                    _u._$ajaxSend({data:{userid:_userid,nickname:_nickname,token:_token,headimg:_headimg,content:_content,title:_title},url:'blog/add',method:'post',callback:addBlogCallback});                             
                }
                        
        });
        $("#content,#title")._$on("keyup",function(){
            if($("#content")._$val() != "" && $("#title")._$val() != ""){
                $("#sendbutton .signup")._$style("background","#67C2C6");      
            }else{
                $("#sendbutton .signup")._$style("background","#cccccc");           
            }
        });
    })();
    
    var addBlogCallback = function(_result){ 
        //console.log(_result)
        if(_result.code == 200){  
            //停留3S
            $("#error-container")._$style("display","none");
            $("#success-container")._$style("display","block");
            $("#successmsg")._$text("发布成功"); 
            window.setTimeout(function(){
                //清除输入
                //$("#content")._$attr('value','');
                //$("#title")._$attr('value','');
                location.href="#/m/index/detail/?blogid="+_result.data.blogid;
            },1000);      
        }else{
            $("#error-container")._$style("display","block");
            $("#errormsg")._$text(_result.error);
        }
    }
});
