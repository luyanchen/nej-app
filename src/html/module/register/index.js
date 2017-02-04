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
    };
    // notify dispatcher
    _t1._$regist('register',_p._$$ModuleRegister);


    // 添加事件  
    var _timeFlag = false;//60s内发一次
    $("#verifycode")._$on('click',function(_event){
        if(!_timeFlag){
            /*检查手机号*/
            var _phone= $('input[name="phone"]')._$val();
            if(!_u._$checkPhone({phone:_phone})){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("请输入正确的手机号");
                return;
            }
            //发送验证码
            var _result = _u._$getCode({phone:_phone}); 
          //  console.log(_result)
            /*获取验证码成功*/
            if(_result != null){
                $("#success-container")._$style("display","block");
                $("#successmsg")._$text("验证码发送成功"+" debug:验证码："+_result);
                /*60s后才可点击*/
                $("#verifycode")._$delClassName("green");
                $("#verifycode")._$addClassName("text-gray");
                _timeFlag = true; 
                window.setTimeout(function(){
                    _timeFlag = false; 
                    $("#verifycode")._$delClassName("text-gray");
                    $("#verifycode")._$addClassName("green");
                },60000);
            }else{
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("系统繁忙中，请稍候重试");                   
            }
        }
    },false); 
    /*下一步*/
    $(".next")._$on("click",function(){
        var _next= $(this)._$attr("next");
        var _current = $(this)._$attr("current");
        //注册第一页
        if(_current == "first-page"){
            /*检查手机号*/
            var _phone= $('input[name="phone"]')._$val();
            var _code = $('input[name="code"]')._$val();
            if(!_u._$checkPhone(_phone)){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("请输入正确的手机号");
                return;
            }
            if(!_code){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("请输入验证码");
                return;
            }
            //console.log(_code)
            /*验证码认证*/
            var _result = _u._$verifyCode({phone:_phone,code:_code}); 

            if(_result){
                /*验证码认证成功*/
                $("#success-container")._$style("display","none");
                $("#error-container")._$style("display","none");
                $(".page")._$style("display","none");
                $("#"+_next)._$style("display","block");
            }else{
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("验证码错误");
            }
        }
        if(_current == "second-page"){  
            var _pwd = $('#pwd')._$val();
            var _repwd = $('#repwd')._$val();
            var _nickname = $('#nickname')._$val();
            if(_pwd == ""|| _repwd == ""){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("密码不能为空");
                return;
            }else if(_pwd !== _repwd) {
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("两次密码不一致");
                return;
            }else if(_nickname == ''){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("昵称不能为空");
                return;
            }else{
                $("#error-container")._$style("display","none");
            }
        }
        $(".page")._$style("display","none");
        $("#"+_next)._$style("display","block");
    });
    //提示词隐藏
    $('input')._$on("focus",function(){
      $("#error-container")._$style("display","none");
      $("#success-container")._$style("display","none");
    });

    /*选择身份*/
    $(".select-item")._$on("click",function(_event){
        //选中节点
        if(_e._$getChildren($(this)[0],'green').length<1){
            $(".select-item .green")._$addClassName("black");
            $(".select-item .green")._$delClassName("green");
            _e._$addClassName(_e._$getChildren($(this)[0],'p-left')[0],'green');
            _e._$delClassName(_e._$getChildren($(this)[0],'p-left')[0],'black')            
        }
    });
    /*提交注册*/
    $("#submit")._$on("click",function(){
      var _phone = $('#phone')._$val();
      //var _code = $('#code')._$val();//已验证，不需要传
      var _pwd = $('#pwd')._$val();
      var _sex = $(".select-item .green")[0].innerText == '女'?0:1;
      var _nickname = $('#nickname')._$val();
      var _result = _u._$submitRegister({phone:_phone,pwd:_pwd,sex:_sex,nickname:_nickname});
      if(_result){
            //停留3S
            $("#success-container")._$style("display","block");
            $("#successmsg")._$text("注册成功"); 
            window.setTimeout(function(){
                location.href="./login.html";
            },3000);      
      }else{
         $("#error-container").css("display","block");
         $("#errormsg").text("系统繁忙中，请稍候重试");
      }
     
    }); 
});
