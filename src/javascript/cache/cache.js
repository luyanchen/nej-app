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
    'base/util'
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
    _pro.__cbListLoad = function(_key,_callback,_json){
       // console.log(_key)
        var _list = null;
         //debug/* start*/
         var _class = _key.split("-")[1]||0,
            _search = _key.split("-")[2]||'';
        if(_class == 2){
            _json.result[0] =  _json.result[4];
        }else if(_class == 1){
            _json.result =  {};
        }else if(_class == 3 && _search != ''){
            _json.result[0] =  _json.result[2];
        }else if(_class == 3 && _search == ''){
            _json.result =  {};
        }

                //end
        if (_json.code==200){
            var _result = _json.result;
            if (_json.total>_result.length)
                this._$setTotal(_key,_json.total);
            _list = _result;
        }
        _callback(_list);
    };
    _pro.__cbItemDelete = function(_key,_callback,_json){
        console.log(_key); 

    }
    
    return _p;
});
