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
        '<div class="m-publish-wrap">\
                <div class="u-div-30" ></div>\
                <form id="myform" method="post">\
                    <div class="u-div-10"></div>\
                    <input id="title" class="u-input" type="text" name="title" autocomplete="off" placeholder="标题" />\
                    <div class="u-div-10"></div>\
                    <div class="u-textarea-wrap">\
                        <textarea id="content" type="text" name="txt" class="textarea" name="content" placeholder="分享新鲜事" /></textarea>\
                    </div>\
                    <div class="u-div-10"></div>\
                    <div class="u-div-50"></div>\
                    <div class="u-btn-wrap">\
                        <div class="u-btn default " id="sendbutton">发表</div>\
                    </div>\
                </form>\
                <div class="u-div-20"></div>\
                <div class="u-tips" id="error" ><div class="negative" id="errormsg" ></div></div>\
                <div class="u-tips" id="success"><div class="active" id="successmsg" ></div></div>\
        </div>';
        var _tpl = _t0._$addTextTemplate('module-id-d6',tpl);
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d6')
        );
        this._bindEvent();

    };

  //监听事件
    _pro._bindEvent = function(){
        var _self = this;
        $(this.__body)._$on("click","#sendbutton",function(_event){
                var _title = $("#title")._$val();
                var _content = $("#content")._$val();
                if(_content != '' && _title != ''){
                    _u._$ajaxSend({data:{userid:_userid,nickname:_nickname,token:_token,headimg:_headimg,content:_content,title:_title},url:'blog/add',method:'post',callback:_self._addBlogCallback._$bind(_self)});                             
                }
                        
        });
        $(this.__body)._$on("keyup","#content,#title",function(){
            if($("#content")._$val() != "" && $("#title")._$val() != ""){
                $("#sendbutton")._$style("background","#67C2C6");      
            }else{
                $("#sendbutton")._$style("background","#cccccc");           
            }
        });
    };
    
    _pro._addBlogCallback = function(_result){ 
        //console.log(_result)
        if(_result.code == 200){  
            //停留3S
            $("#error")._$style("display","none");
            $("#success")._$style("display","block");
            $("#successmsg")._$text("发布成功"); 
            window.setTimeout(function(){
                $("#success")._$style("display","none");
                location.href="#/m/index/detail/?blogid="+_result.data.blogid;
            },1000);      
        }else{
            $("#error")._$style("display","block");
            $("#errormsg")._$text(_result.error);
        }
    }

        // notify dispatcher
    _t1._$regist('publish-addblog',_p._$$ModulePublishAddblog);
});
