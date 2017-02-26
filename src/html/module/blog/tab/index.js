/*
 * ------------------------------------------
 * 首页菜单模块实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/chain/chainable',
    '../../../../javascript/pro/tab.js',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module'
],function(_k,_e,$,_t0,_t1,_t2,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 首页菜单列表模块
     * @class   {_$$ModuleSystemTab}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogTab = _k._$klass();
    _pro = _p._$$ModuleBlogTab._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-d3')
        );
        var _list = _e._$getByClassName('tb-top-box','tab');
        this.__tbview = _t0._$$TabViewCustom._$allocate({
            list:_list,
            dataset:'id',
            oncheck:this.__doCheckMatchEQ._$bind(this),
            selected:'active',
            onchange:this.__doAction._$bind(this)
        });
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        //默认tab
        this.__tbview._$match(
            this.__doParseUMIFromOpt(_options)
        );
    };
    /**
     * 验证选中项
     * @param  {Object} 事件信息
     * @return {Void}
     */
    _pro.__doCheckMatchEQ = function(_event){
        _event.matched = _event.target.indexOf(_event.source)==0;
    };
     /**
     * tab变化后匹配后操作
     *
     * @param  {String} arg0 - 待匹配值
     * @return {Node}          匹配的节点
     */
    _pro.__doAction = function(_node){
         //加载列表
         
        // console.log(_node);
         var _class = $(_node)._$attr('href').split(/\?class=/)[1];

    }


    // notify dispatcher
    _t2._$regist('blog-tab',_p._$$ModuleBlogTab);
});