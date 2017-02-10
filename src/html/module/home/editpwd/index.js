/*
 * ------------------------------------------
 * 修改密码模块基类实现文件
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
    '../../../../javascript/pro/util.js'
],function(_k,_e,_v,$,_t0,_t1,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    //初始化用户信息
    var _userid = _u._$getJsonDataInStorage("_id");
    var _token = _u._$getJsonDataInStorage("token");
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleHomeEditpwd= _k._$klass();
    _pro = _p._$$ModuleHomeEditpwd._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d11')
        );
        this._bindEvent._$bind(this)();
    };

    //监听事件
    _pro._bindEvent = function(){
        $(this.__body)._$on("click","#submit",(function(){
            var _oldpwd = $('#oldpwd')._$val();
            var _pwd = $('#pwd')._$val();
            var _repwd = $('#repwd')._$val();
            if(_pwd == "" || _repwd == "" || _oldpwd == ""){
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("密码不能为空");
                return;
            }else if(_pwd !== _repwd) {
                $("#error-container")._$style("display","block");
                $("#errormsg")._$text("两次密码不一致");
                return;
            }

            var _data = {
                userid : _userid,
                pwd : _pwd,
                oldpwd : _oldpwd,
                token :_token,
            }
            _u._$ajaxSend({data:_data,url:'login/editpwd',method:'post',callback:this._editPwdCallback._$bind(this)});                        

        })._$bind(this));
        //提示词隐藏
        $(this.__body)._$on("focus",'input',function(){
          $("#error-container")._$style("display","none");
          $("#success-container")._$style("display","none");
        });
    };

    _pro._editPwdCallback = function(_result){  
        if(_result.code == 200){ 
            //停留3S
            $("#error-container")._$style("display","none");
            $("#success-container")._$style("display","block");
            $("#successmsg")._$text("修改成功"); 
            window.setTimeout(function(){
                location.href="./login.html";
            },3000);      
        }else{
            $("#error-container")._$style("display","block");
            $("#errormsg")._$text(_result.error);
        }
    }
        // notify dispatcher
    _t1._$regist('home-editpwd',_p._$$ModuleHomeEditpwd);
    
});
