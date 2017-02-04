/*
 * ------------------------------------------
 * 个人中心模块基类实现文件
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
    'util/template/jst',
    'pro/module/module',
    '../../../../javascript/pro/util.js'
],function(_k,_e,_v,$,_t0,_t1,_t2,_m,_u,_p,_o,_f,_r){
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleHomeList = _k._$klass();
    _pro = _p._$$ModuleHomeList._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d5')
        );

        var _list = _e._$getByClassName(this.__body,'j-flag');
        var _data = {
            headimg  : _u._$getJsonDataInStorage("headimg"),
            nickname : _u._$getJsonDataInStorage("nickname")
        }

       _t2._$render(
            _list[0],
            'jst-home-userinfo',
            {data:_data}
        );
    };
    // notify dispatcher
    _t1._$regist('home-list',_p._$$ModuleHomeList);


    

});
