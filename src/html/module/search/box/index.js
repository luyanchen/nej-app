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
    _p._$$ModuleSearchBox = _k._$klass();
    _pro = _p._$$ModuleSearchBox._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d12')
        );
        this._bindEvent();


    };
    //监听事件
    _pro._bindEvent = function(){
        $(this.__body)._$on("click","#sendbutton",function(){
            var _text = $("#search")._$val();
            if(_text != ''){
                $("#search")._$text('');
                location.href = location.href.split('?')[0]+'?keyword='+_text+'?class=3';  
            }
        });

        $(this.__body)._$on("keyup","#search",function(){
            if($(this)._$val() != ""){
                $("#sendbutton")._$style("background","#67C2C6");      
            }else{
                $("#sendbutton")._$style("background","#cccccc");           
            }
        });
        $(this.__body)._$on("keydown","#search",function(_event){
            if(_event && _event.keyCode==13){
                _event.preventDefault();
            }
        });
    }
        // notify dispatcher
    _t1._$regist('search-box',_p._$$ModuleSearchBox);
});
