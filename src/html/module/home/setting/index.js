/*
 * ------------------------------------------
 * 设置模块基类实现文件
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
    '../../../../javascript/pro/util.js'
],function(_k,_e,$,_t0,_t1,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleHomeSetting= _k._$klass();
    _pro = _p._$$ModuleHomeSetting._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d10')
        );
        this._bindEvent();
    };

    //监听事件
    _pro._bindEvent = function(){
        var _self = this;
        $(this.__body)._$on("click","#loginout",function(){
            var _yesCallback = function(){
              //清空缓存
              _u._$clearJsonDataInStorage();
              location.href="./login.html";
            };
            var _noCallback = function(){
              $(".m-popup-wrap")._$style("display","none"); 
            }
            $(".m-popup-wrap")._$style("display","block");
            $(".m-popup-wrap")._$on("click","#yes",_yesCallback._$bind(_self),false);
            $(".m-popup-wrap")._$on("click","#no",_noCallback._$bind(_self),false);               
        });
    }
        // notify dispatcher
    _t1._$regist('home-setting',_p._$$ModuleHomeSetting);

});
