/*
* 列表缓存管理基类
*/

NEJ.define([
     'base/klass',
     '../pro/util.js',
     'util/cache/abstract'
],function(_k,_u,_t,_p){
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
          var _offset = _options.offset;
          var _limit  = _options.limit;
          var _rkey   = _options.rkey;
          var _onload = _options.onload;
          var _url = 'blog/list';
          //搜索且关键字为空时，不需要请求，直接返回空数组
          if(_key == '/search/'){
               _onload([]);    //搜索keyword为空时render空
               return;
          }
          _u._$ajaxListSend({data:_data,url:_url,method:'get',callback:_onload});
     };
     // 实现取列表的方法
     // 根据id和key取一项数据
     // 数据返回的回调是onload
     _pro.__doLoadItem = function(_options){
          var _id     = _options.id;
          var _key    = _options.key;
          var _rkey   = _options.rkey;
          var _onload = _options.onload;
          _j._$request(
               '../../api/blog/article.json',{
               type:'json',
               method:'get',
               data:{id:_id,key:_key},
               timeout:1000,
               onload:_onload._$bind(this),
               onerror:function(_error){
               // TODO
               }
          });
     };
     //实现往服务器添加数据项
     _pro.__doAddItem = function(_options){
          // 往服务器添加数据项
          var _data = _options.data;
          var _onload = _options.onload;
          _j._$request(
               '../../api/blog/addarticle.json',{
                    data:_data,
                    onload:_onload._$bind(this)
               }
          );
     };
     //实现往服务器删除数据项
     _pro.__doDeleteItem = function(_options){
          // 往服务器添加数据项
          var _data = _options.data;
          var _onload = _options.onload;
          _j._$request(
               '../../api/blog/addarticle.json',{
                    data:_data,
                    onload:_onload._$bind(this)
               }
          );
     };
     //实现往服务器更新数据项
     _pro.__doUpdateItem = function(_options){
          // 往服务器添加数据项
          var _data = _options.data;
          var _onload = _options.onload;
          _j._$request(
               '../../api/blog/addarticle.json',{
                    data:_data,
                    onload:_onload._$bind(this)
               }
          );
     };
      //实现从服务器端前向刷新列表
     _pro.__doPullRefresh = function(_options){
          // 往服务器添加数据项
          var _data = _options.data;
          var _onload = _options.onload;
          _j._$request(
               '../../api/blog/refreshlist.json',{
                    data:_data,
                    onload:_onload._$bind(this)
               }
          );
     };
     return _p;

     
     
});
