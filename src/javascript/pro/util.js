/*
 * ------------------------------------------
 * 自定义通用接口实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
/** @module pro/util */
NEJ.define([
    'base/util',
    'util/chain/chainable',
     'util/ajax/xdr',   
    'util/cache/storage'
],function(_u,$,_j,_c,_p){
    /*
     * url解析成json
     */
    _p._$parseQueryString =  function(){
        var obj = {};
        var keyvalue = [];
        var key = "",value = ""; 
        var url = window.location.hash;
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
        for(var i in paraString){
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value; 
        } 
        return obj;
    };
    /*
     * 验证手机号
     */  
    _p._$checkPhone = function(_options){
        var _reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        var _phone = _options.phone;
        if(_reg.test(_phone)){               
            return true;
        }else{
            return false;
        }
    }
    /*
     * 验证登录
     */  
    _p._$checkLogin = function(){
        var token = _p._$getJsonDataInStorage("token");
        if(!token){
            location.href="./login.html";
        } 
        return;
    }
    /*
     * ajax请求
     */  
    _p._$ajaxSend = function(_options){
      var _data = _options.data,
          _url = _options.url;
          _callback = _options.callback;
          _method = _options.method;
         // console.log(_data);
        _j._$request(
            API_PATH+_url,{
                type:'json',
                method:_method,
                data:_u._$object2query(_data),
                onload:_callback._$bind(this),
                onerror:this.__ajaxError._$bind(this),
        });
    }
    /*
     * ajax请求(列表请求，要求回调参数为数组)
     */  
    _p._$ajaxListSend = function(_options){
      var _data = _options.data,
          _url = _options.url;
          _callback = _options.callback;
          _method = _options.method

        _j._$request(
            API_PATH+_url,{
                type:'json',
                method:_method,
                data:_u._$object2query(_data),
                onload:function(_result){
                  if(_result.code == 200){
                      _callback(_result.data);
                  }else{
                    alert(_result.error);
                  }
                },
                onerror:this.__ajaxError._$bind(this),
        });
    }
    /*
     * ajax 异常
     * @return {Object}  参数
     */  
    _p.__ajaxError = function(_error){
        console.log(_error);
        alert("网络异常，请稍后重试")
    }
    /*
     * 本地存储JSON数据
     * @return {Object}  参数
     */  
    _p._$setJsonDataInStorage = function(_data){  
        // 如果需要支持ie7-浏览器先执行一下初始行为          
        _c._$init();
        _u._$loop(_data,function(_item,_key){
            _c._$setDataInStorage(_key,_item);
        });
    }
    /*
     * 获取本地存储数据
     * @return {Object}  参数
     */  
    _p._$getJsonDataInStorage = function(_key){  
        // 如果需要支持ie7-浏览器先执行一下初始行为          
        _c._$init();
        var _value = _c._$getDataInStorage(_key);
        if(_value){
            return  _value;
        }else{
            return null;
        }
    }
    /*
     * 清空本地存储数据
     * @return {Object}  参数
     */  
    _p._$clearJsonDataInStorage = function(_key){  
        _c._$clearDataInStorage();
        return;
    }

    //滚动条在Y轴上的滚动距离
    _p._$getScrollTop = function(){
    　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    　　if(document.body){
    　　　　bodyScrollTop = document.body.scrollTop;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop;
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    　　return scrollTop;
    }

    //文档的总高度
    _p._$getScrollHeight = function(){
    　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    }

    //浏览器视口的高度
    _p._$getWindowHeight = function(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    }
    
    return _p;  
});