/*
 * ------------------------------------------
 * 博客列表缓存对象实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/util',
    'util/ajax/xdr',
    './cache.js'
],function(_k,_u,_j,_t,_p,_o,_f,_r){
    var _pro;
    /**
     * 标签缓存对象
     * @class   {_$$CacheTag}
     * @extends {_$$Cache}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$CacheBlog = _k._$klass();
    _pro = _p._$$CacheBlog._$extend(_t._$$Cache);
    /**
     * 从服务器载入标签列表
     */
    _pro.__doLoadList = function(_options){
        var _key = _options.key,
            _callback = _options.onload;
        //根据key，判断博客类型及搜索值  blog-列表类型-搜索值；推荐:blog-0-;关注blog-1-;我的blog-2-;搜索blog-3-搜索值
        
        var _class = _options.key.split("-")[1]||0,
            _search = _options.key.split("-")[2]||'';
        _options.data= _u._$merge(_options.data,{class:_class,search:_search});
        //console.log(_options)
        /*// for test
        if (DEBUG){
            var _list = window['tag-list'],
                _limit = _options.limit,
                _offset = _options.offset;
            var _json = {
                code:1,
                result:{
                    total:_list.length,
                    list:_list.slice(_offset,_offset+_limit)
                }
            };
            console.log(_json)
            window.setTimeout(
                this.__cbListLoad._$bind(
                    this,_key,_callback,_json),1000
            );
            return;
        }*/
        // end for test
        
        _j._$request('../../api/blog/list.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_callback),
            onerror:this.__cbListLoad._$bind(this,_key,_callback,_o)
        });
    };
     //实现往服务器删除数据项
     _pro.__doDeleteItem = function(_options){
          console.log(_options);
          
     };
    return _p;
});
