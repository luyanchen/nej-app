/*
 * ------------------------------------------
 * 博客正文模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    '../../../../../javascript/pro/util.js',
    'util/chain/chainable',
    'util/ajax/xdr',
    'util/template/tpl',
    'util/dispatcher/module',
    'util/template/jst',
    'pro/module/module'
],function(_k,_e,_u,$,_j,_t0,_t1,_t2,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogDetailContent = _k._$klass();
    _pro = _p._$$ModuleBlogDetailContent._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d7')
        );   

    };
   /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = (function(){
        return function(_options){
        this.__super(_options);
        var _blogid = _options.param.blogid;
        var _list = _e._$getByClassName(this.__body,'j-flag');
        var blogDetailCallback = function(_result){  
            if(_result.code == 200){
                _t2._$render(
                    _list[0],
                    'jst-detail-content',
                    {data:_result.data}
                );
            }else{
                alert(_result.error);
            }
        } 
        _u._$ajaxSend({data:{blogid:_blogid},url:'blog/detail',method:'get',callback:blogDetailCallback});                               
        };
    })();

    // notify dispatcher
    _t1._$regist('blog-detail-content',_p._$$ModuleBlogDetailContent);


});
