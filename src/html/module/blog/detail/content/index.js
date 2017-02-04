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
    'base/util',
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
        //获取id
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d7')
        );
        var _list = _e._$getByClassName(this.__body,'j-flag');
        var _id = location.href.split("?id=")[1];
        var _data = { id:_id}        
        _j._$request('../../api/blog/detail.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_data),
            onload:function(_result){
                _t2._$render(
                    _list[0],
                    'jst-detail-content',
                    {data:_result.result}
                );
                //console.log(_list[0])
            },
            onerror:function(){

            }
        }); 
    };
   /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        /*//获取id
        var _id = _options.href.split("?id=")[1];
        _options.data= _u._$merge(_options.data,{id:_id});
        _j._$request('../../api/blog/detail.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:function(_result){
                this.__body = _e._$html2node(
                    _t0._$getTextTemplate('module-id-d7')
                );
                var _list = _e._$getByClassName(this.__body,'j-flag');
                _t2._$render(
                    _list[0],
                    'jst-detail-content',
                    {data:_result.result}
                );
                //console.log(_list[0])
                //手动append
                //$('article')[0].appendChild(_list[0]);
            },
            onerror:function(){

            }
        });*/
    };

    // notify dispatcher
    _t1._$regist('blog-detail-content',_p._$$ModuleBlogDetailContent);
});
