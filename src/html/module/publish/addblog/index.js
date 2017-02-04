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
        var _tpl = _t0._$addTextTemplate('module-id-d6',
            '<div class="main-container admin ">\
                <div class="div-20  gray-shallow" ></div>\
                <div class="div-5 gray-shallow" ></div>\
                <form id="myform" method="post" class=" gray-shallow">\
                    <div class="textarea-container  gray-shallow">\
                        <textarea id="content" type="text" name="txt" class="textarea" name="content" placeholder="分享新鲜事" /></textarea>\
                    </div>\
                    <div class="div-10  gray-shallow"></div>\
                    <div class="div-50  gray-shallow"></div>\
                    <div class="sighup-big-container  gray-shallow" id="sendbutton">\
                        <div class="signup default big " >发表</div>\
                    </div>\
                </form>\
            </div>');
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d6')
        );

    };
    // notify dispatcher
    _t1._$regist('publish-addblog',_p._$$ModulePublishAddblog);
    //添加事件
    $("#sendbutton")._$on("click",function(_event){
            var _content = $("#content")._$val();
            var _token = _u._$getJsonDataInStorage("token");
            var _userid = _u._$getJsonDataInStorage("userid");
            if(_content != ''){
                var _data = {userid:_userid,token:_token,content:_content};
                // console.log(_data)
                var _result =  _u._$submitBlog(_data); 

                if(_result){
                    //不要刷新，重新加载该模块
                    //location.reload(); 
                    alert("发表成功");
                    location.href = './app.html';
                }
            }
                    
    });
    $("#content")._$on("keyup",function(){
        if($(this)._$val() != ""){
            $(".signup")._$style("background","#67C2C6");      
        }else{
            $(".signup")._$style("background","#cccccc");           
        }
    });
});
