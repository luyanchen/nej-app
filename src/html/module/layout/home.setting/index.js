/*
 * ------------------------------------------
 * 个人中心布局模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module'
],function(_k,_e,_t0,_t1,_m,_p,_o,_f,_r){
    // 声明变量
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLayoutSystemLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLayoutHomeSetting = _k._$klass();
    _pro = _p._$$ModuleLayoutHomeSetting._$extend(_m._$$Module);

    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-l8')
        );

        // 0 - 登录模块所在容器
        var _list = _e._$getByClassName(this.__body,'j-flag');
        this.__export = {
            setting:_list[0]
        };
    };
    // notify dispatcher
    _t1._$regist('layout-home-setting',_p._$$ModuleLayoutHomeSetting);
});
