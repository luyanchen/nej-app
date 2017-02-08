/*
 * ------------------------------------------
 * 项目缓存基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'util/cache/abstract',
    '../../javascript/pro/util.js',
],function(_k,_t,_u,_p,_o,_f,_r){
    var _pro;
    /**
     * 项目缓存基类
     * @class   {_$$Cache}
     * @extends {_$$CacheListAbstract}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$Cache = _k._$klass();
    _pro = _p._$$Cache._$extend(_t._$$CacheListAbstract);
    /**
     * 
     * @param {Object} _callback
     * @param {Object} _json
     */
    _pro.__cbListLoad = function(_key,_callback,_result){
        console.log(_key)
        console.log(_result)
        var _list = null;
         //debug/* start*/
        /* var _class = _key.split("-")[1]||0,
            _search = _key.split("-")[2]||'';
        if(_class == 2){
            _result.data[0] =  _result.data[4];
        }else if(_class == 1){
            _result.data =  {};
        }else if(_class == 3 && _search != ''){
            _result.data[0] =  _result.data[2];
        }else if(_class == 3 && _search == ''){
            _result.data=  {};
        }*/
        var _data = _result.data;
        var _userid = _u._$getJsonDataInStorage("_id");
        if(_data.length>0){
            for(var i=0;i<_data.length;i++){
                //作评论者可删除本人的评论
                if(_data[i].authorid == _userid ){
                    _data[i].canDelete = true;
                }else{
                    _data[i].canDelete = false;

                }
            }
        }
                //end
        if (_result.code==200){
            var _data = _result.data;
            if (_result.total>_data.length)
                this._$setTotal(_key,_result.total);
            _list = _data;
        }
        _callback(_list);
    };
    _pro.__cbItemDelete = function(_key,_callback,_json){
        console.log(_key); 

    }
    
    return _p;
});
