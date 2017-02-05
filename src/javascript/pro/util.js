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
     * @return {Object}  参数
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
     * @return {Object}  参数
     */  
    _p._$checkPhone = function(_phone){
        var _reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if(_reg.test(_phone)){               
            return true;
        }else{
            return false;
        }
    }
    /*
     * 获取验证码
     * @return {Object}  参数
     */  
    _p._$getCode = function(_data){
        _j._$request(
            '../../api/login/code.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
            console.log(_result.data.code)

                    return _result.data.code;
                },
                onerror:function(_error){
                    return null;
                }
        });
        return "121212";
    }
    /*
     * 验证验证码
     * @return {Object}  参数
     */  
    _p._$verifyCode = function(_data){
       /* _j._$request(
            '../../api/login/verificode.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                     console.log(_result.data.success)

                    return _result.data.success;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        return true;
    }
    /*
     * 注册账号
     * @return {Object}  参数
     */  
    _p._$submitRegister = function(_data){
       /* _j._$request(
            '../../api/login/register.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                     console.log(_result.data.success)

                    return _result.data.success;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        return true;
    }
    /*
     * 登录
     * @return {Object}  参数
     */  
    _p._$Login = function(_data){
        /*_j._$request(
            '../../api/login/login.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                    return _result;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        //debug
        var result = {
          "data" : {
            "success" : true,
            "token" : "123456789",
            "userid" : "1",
            "nickname" : "cathy",
            "phone" : "13123456789",
            "headimg" : "../../res/images/jf.png",
            "sex" : 0,
            "errorinfo" : ""
          },
          "code" : "200"
        }
        return result;
    }
    /*
     * 验证登录
     * @return {Object}  参数
     */  
    _p._$checkLogin = function(){
        var token = _p._$getJsonDataInStorage("token");
        if(!token){
            location.href="./login.html";
        } 
        return;
    }
    /*
     * 修改密码
     * @return {Object}  参数
     */  
    _p._$editPwd = function(_data){
       /*_j._$request(
            '../../api/login/editpwd.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                    console.log(_result.data)
                    return _result.data;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        return true;
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
    /*
     * 发送评论
     * @return {Object}  参数
     */  
    _p._$submitComment = function(_data){
        /*_j._$request(
            '../../api/blog/addcomment.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                    return _result.data;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        return true;
    }
    /*
     * 发表博客
     * @return {Object}  参数
     */  
    _p._$submitBlog = function(_data){
        /*_j._$request(
            '../../api/blog/addblog.json',{
                type:'json',
                method:'GET',
                async:false,
                data:_data,
                timeout:1000,
                onload:function(_result){
                    return _result.data;
                },
                onerror:function(_error){
                    return null;
                }
        });*/
        return true;
    }
    
    return _p;  
});