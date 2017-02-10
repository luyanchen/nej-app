/*
* 列表缓存管理基类
*/

NEJ.define([
     'base/klass',
     '../pro/util.js',
     'base/util',
     './abstract.js'
],function(_k,_u,_u1,_t,_p){
     // 创建自己的listCache管理类
     _p._$$CacheListCustom = _k._$klass();
     _pro = _p._$$CacheListCustom._$extend(_t._$$CacheListAbstract);

     // 实现取列表的方法
     // 根据offset+limit取列表
     // data表示取列表可能需要的额外数据信息
     // 数据返回的回调是onload
     _pro.__doLoadList = function(_options){
          var _key    = _options.key;
          var _data   = _options.data;
          var _onload = _options.onload;
          var _url = 'blog/list';
          //console.log(_data)
          //搜索且关键字为空时，不需要请求，直接返回空数组
          if(_key == '/search/'){
               _onload([]);    //搜索keyword为空时render空
               return;
          }
          _u._$ajaxListSend({data:_data,url:_url,method:'get',callback:_onload});
     };
     //实现往服务器删除数据项
     _pro.__doDeleteItem = function(_options){
          var _key    = _options.key;
          var _data   = _options.data;
          var _onload = _options.onload;
          //console.log(_data)
          var _url = 'blog/delete';
          _u._$ajaxListSend({data:_data,url:_url,method:'post',callback:_onload});

     };
     //实现从服务器端前向刷新列表
     _pro.__doPullRefresh = function(_options){
          var _key    = _options.key;
          var _data   = _options.data;
          var _onload = _options.onload;
         // console.log(_data)

          var _url = 'blog/list';
          //搜索且关键字为空时，不需要请求，直接返回空数组
          if(_key == '/search/'){
               _onload([]);    //搜索keyword为空时render空
               return;
          }
          _u._$ajaxListSend({data:_data,url:_url,method:'get',callback:_onload});
     };
     //实现从服务器端后向刷新列表
     _pro.__doUpPullRefresh = function(_options){
          var _key    = _options.key;
          var _data   = _options.data;
          var _onload = _options.onload;
         // console.log(_data)

          var _url = 'blog/list';
          //搜索且关键字为空时，不需要请求，直接返回空数组
          if(_key == '/search/'){
               _onload([]);    //搜索keyword为空时render空
               return;
          }
          _u._$ajaxListSend({data:_data,url:_url,method:'get',callback:_onload});
     };

    
     return _p;

     
     
});
