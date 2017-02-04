/*
 * ------------------------------------------
 * 登录模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/event',
    'util/chain/chainable',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module',
    '../../../javascript/pro/util.js'
],function(_k,_e,_v,$,_t0,_t1,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLogin = _k._$klass();
    _pro = _p._$$ModuleLogin._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d0')
        );
    };
    // notify dispatcher
    _t1._$regist('login',_p._$$ModuleLogin);


    /*提交注册*/
    $("#submit")._$on("click",function(){
        var _phone = $('#phone')._$val();
        var _pwd = $('#pwd')._$val();
 
        if(!_u._$checkPhone(_phone)){
            $("#error-container")._$style("display","block");
            $("#errormsg")._$text("请输入正确的手机号");
            return;
        }
        if(_pwd == ''){
            $("#error-container")._$style("display","block");
            $("#errormsg")._$text("请输入密码");
            return;
        }
        var _result = _u._$Login({phone:_phone,pwd:_pwd});

        if(_result.code == 200){
            var _data = _result.data;
            if(_data.success){
            _u._$setJsonDataInStorage(_data); 
            location.href="./app.html";
          }else{
             $("#error-container")._$style("display","block");
             $("#errormsg")._$text(_result.errorinfo);
          }
        }else{
             $("#error-container")._$style("display","block");
             $("#errormsg")._$text("系统繁忙中，请稍候重试");
        }

     
    }); 
    $('input')._$on("focus",function(){
      $("#error-container")._$style("display","none");
    });
});