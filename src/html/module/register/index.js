/*
 * ------------------------------------------
 * 注册模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/event',
    'util/chain/chainable',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module',
    '../../../javascript/pro/util.js'
],function(_k,_e,_v,$,_t0,_t1,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleRegister = _k._$klass();
    _pro = _p._$$ModuleRegister._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d1')
        );  
        this._timeFlag = false;//60s内发一次

        this._bindEvent();
    };


    //监听事件
    _pro._bindEvent = function(){
        var _self = this;
        $(this.__body)._$on('click','#verifycode',function(_event){
            if(!_self._timeFlag){
                /*检查手机号*/
                var _phone= $('input[name="phone"]')._$val();
                if(!_u._$checkPhone({phone:_phone})){
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("请输入正确的手机号");
                    return;
                }
                _u._$ajaxSend({data:{phone:_phone},url:'login/code',method:'get',callback:_self._getCodeCallback._$bind(_self)});                        
            }
        }); 
        /*下一步*/
        $(this.__body)._$on('click','.next',function(){
            var _next= $(this)._$attr("next");
            var _current = $(this)._$attr("current");
            //注册第一页
            if(_current == "first-page"){
                /*检查手机号*/
                var _phone= $('input[name="phone"]')._$val();
                var _code = $('input[name="code"]')._$val();
                if(!_u._$checkPhone({phone:_phone})){
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("请输入正确的手机号");
                    return;
                }
                if(!_code){
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("请输入验证码");
                    return;
                }
                _u._$ajaxSend({data:{phone:_phone,code:_code},url:'login/verifyCode',method:'post',callback:_self._verifyCodeCallback._$bind(_self)});                               
                
            }
            if(_current == "second-page"){  
                var _pwd = $('#pwd')._$val();
                var _repwd = $('#repwd')._$val();
                var _nickname = $('#nickname')._$val();
                if(_pwd == ""|| _repwd == ""){
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("密码不能为空");
                    return;
                }else if(_pwd !== _repwd) {
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("两次密码不一致");
                    return;
                }else if(_nickname == ''){
                    $("#error")._$style("display","block");
                    $("#errormsg")._$text("昵称不能为空");
                    return;
                }else{
                    $("#error")._$style("display","none");
                }
                $(".page")._$style("display","none");
                $("#"+_next)._$style("display","block");
            }

        });
        //提示词隐藏
        $(this.__body)._$on('click','input',function(){
          $("#error")._$style("display","none");
          $("#success")._$style("display","none");
        });
        /*选择身份*/
        $(this.__body)._$on('click','.select-item',function(_event){
            //选中节点
            if(_e._$getChildren($(this)[0],'s-fc-g').length<1){
                $(".select-item .active")._$addClassName("default");
                $(".select-item .active")._$delClassName("active");
                _e._$delClassName(_e._$getChildren($(this)[0],'sex')[0],'default');           
                _e._$addClassName(_e._$getChildren($(this)[0],'sex')[0],'active');           
            }
        });
        /*提交注册*/
        $(this.__body)._$on("click",'#submitregister',function(){
            var _phone = $('#phone')._$val();
            //var _code = $('#code')._$val();//已验证，不需要传
            var _pwd = $('#pwd')._$val();
            var _sex = $(".select-item .active")[0].innerText == '女'?0:1;
            var _nickname = $('#nickname')._$val();
            _u._$ajaxSend({data:{phone:_phone,pwd:_pwd,sex:_sex,nickname:_nickname},url:'login/register',method:'post',callback:_self._submitRegisterCallback._$bind(_self)});                       
        
        });
       
    };

    //api回调
    _pro._getCodeCallback = function(_result){
        /*获取验证码*/
        if(_result.code == 200){        
            $("#success")._$style("display","block");
            $("#successmsg")._$text("验证码发送成功"+" debug:验证码："+_result.data.code);
            /*60s后才可点击*/
            $("#verifycode")._$delClassName("active");
            $("#verifycode")._$addClassName("default");
            this._timeFlag = true; 
            window.setTimeout(function(){
                this._timeFlag = false; 
                $("#verifycode")._$delClassName("default");
                $("#verifycode")._$addClassName("active");
            },60000);
        }else{
            $("#error")._$style("display","block");
            $("#errormsg")._$text(_result.error);                   
        }
    }
    _pro._verifyCodeCallback = function(_result){
        /*验证验证码*/
        if(_result.code == 200){        
            $("#success")._$style("display","none");
            $("#error")._$style("display","none");
            $(".page")._$style("display","none");
            $("#second-page")._$style("display","block");
        }else{
            $("#error")._$style("display","block");
            $("#errormsg")._$text(_result.error);                
        }
    }
    _pro._submitRegisterCallback = function(_result){
        //提交注册    
        if(_result.code == 200){  
            //停留3S
            $("#error")._$style("display","none");
            $("#success")._$style("display","block");
            $("#successmsg")._$text("注册成功"); 
            window.setTimeout(function(){
                location.href="./login.html";
            },1000);      
        }else{
            $("#error")._$style("display","block");
            $("#errormsg")._$text(_result.error);
        }
    }
    // notify dispatcher
    _t1._$regist('register',_p._$$ModuleRegister);

});
