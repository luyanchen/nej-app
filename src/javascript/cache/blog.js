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
    '../../javascript/pro/util.js',
    './cache.js'
],function(_k,_u0,_u1,_t,_p,_o,_f,_r){
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
        //根据key，判断博客类型及搜索值  blog-列表类型-搜索值；推荐blog-1-;我的blog-2-;搜索blog-3-搜索值
        
        var _keyword = _options.key.split("-")[2]||'',
             _userid = _u._$getJsonDataInStorage("_id"),
             _flag = 

        _options.data= _u0._$merge(_options.data,{userid:_userid,keyword:_keyword,flagid:_flagid});
        
        _u1._$ajaxSend({data:_options.data,url:'blog/list',callback:this.__cbListLoad._$bind(this,_key,_callback)});                        
        
        
      /*  _j._$request('../../api/blog/list.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_callback),
            onerror:this.__cbListLoad._$bind(this,_key,_callback,_o)
        });*/
    };
    return _p;
});
