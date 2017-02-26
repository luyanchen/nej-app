/*
 * ------------------------------------------
 * 菜单列表模块实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/util',
    '../../../javascript/pro/util.js',
    'util/chain/chainable',
    '../../../javascript/pro/tab.js',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module'
],function(_k,_e,_u,_u1,$,_t0,_t1,_t2,_m,_p,_o,_f,_r){
    //验证登录状态
    _u1._$checkLogin();
    // variable declaration
    var _pro;
    /**
     * 菜单列表模块
     * @class   {_$$ModuleSystemTab}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleSystemTab = _k._$klass();
    _pro = _p._$$ModuleSystemTab._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-d2')
        );

        var _list = _e._$getByClassName('bottom-tb-box','tab');
        this.__tbview = _t0._$$TabViewCustom._$allocate({
            list:_list,
            dataset:'id',
            selected:'active',
            oncheck:this.__doCheckMatchEQ._$bind(this),
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
     * tab匹配后操作
     *
     * @param  {String} arg0 - 待匹配值
     * @return {Node}          匹配的节点
     */
    _pro.__doAction = function(_node,_list){
          //首页底部tab，替换图片
        _u._$forEach(_list,function(_element,_index,_list){
            var img = _e._$getByClassName(_element,"image"),
                src;
            if(img&&_e._$attr(img[0],'src').indexOf("select")>-1){
               src = _e._$attr(img[0],'src').replace("select","default");
               _e._$attr(img[0],'src',src); 
            }
        });
        var img = _e._$getByClassName(_node,"image");
        if(img){
            var src = _e._$attr(img[0],'src').replace("default","select");
            _e._$attr(img[0],'src',src);
        }
    }
    // notify dispatcher
    _t2._$regist('system-tab',_p._$$ModuleSystemTab);
});