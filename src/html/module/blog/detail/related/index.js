/*
 * ------------------------------------------
 * 博客评论模块基类实现文件
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
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogDetailRelated = _k._$klass();
    _pro = _p._$$ModuleBlogDetailRelated._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d9')
        );
    };
    // notify dispatcher
    _t1._$regist('blog-detail-related',_p._$$ModuleBlogDetailRelated);
});
