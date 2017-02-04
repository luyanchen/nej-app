/*
 * ------------------------------------------
 * 博客评论模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/util',
    'util/chain/chainable',
    'util/ajax/xdr',
    'util/template/tpl',
    'util/dispatcher/module',
    'util/template/jst',
    '../../../../../javascript/pro/util.js',
    'pro/module/module'
],function(_k,_e,_u,$,_j,_t0,_t1,_t2,_u1,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogDetailComment = _k._$klass();
    _pro = _p._$$ModuleBlogDetailComment._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        console.log("build")
        this.__super();
        _pro.__getInfo();

    };
    _pro.__getInfo = function(){
        //获取评论
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d8')
        );
        var _list = _e._$getByClassName(this.__body,'j-flag');
        //获取id
        var _id = location.href.split("?id=")[1];
        var _data = { id:_id}
        _j._$request('../../api/blog/commentlist.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_data),
            onload:function(_result){
               _t2._$render(
                    _list[0],
                    'jst-detail-comment',
                    {_list:_result.result}
                );
               //添加事件，必须在render之后
                $("#sendbutton")._$on("click",function(_event){
                    var _content = $("input[name='content']")._$val();
                    var _token = _u1._$getJsonDataInStorage("token");
                    var _userid = _u1._$getJsonDataInStorage("userid");
                    if(_content != ''){
                        //清空消息
                        $("input[name='content']")._$text("");
                        //console.log($("input[name='content']")._$val())
                        var _data = {userid:_userid,token:_token,content:_content};
                       // console.log(_data)
                        var _result =  _u1._$submitComment(_data); 

                        if(_result){
                            //不要刷新，重新加载该模块
                            //location.reload(); 
                            alert("评论成功")  
                             _pro.__getInfo();
                        }
                    }
                    
                });
                $("input[name='content']")._$on("keyup",function(){
                    if($(this)._$val() != ""){
                      $(".comment-button")._$style("background","#67C2C6");      
                    }else{
                      $(".comment-button")._$style("background","#cccccc");           
                    }
                });
                $("input[name='content']")._$on("keydown",function(_event){
                    if(_event && _event.keyCode==13){
                        console.log(_event)
                        _event.preventDefault();
                    }
                });
            },
            onerror:function(){

            }
        });  
    }
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        /*this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d8')
        );
        var _list = _e._$getByClassName(this.__body,'j-flag');

        //获取id
        var _id = _options.href.split("?id=")[1];
        _options.data= _u._$merge(_options.data,{id:_id});
        _j._$request('../../api/blog/commentlist.json',{
            method:'get',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:function(_result){
               console.log(_result)
               _t2._$render(
                    _list[0],
                    'jst-detail-comment',
                    {list:_result.result}
                );
                console.log(_list[0])
                //手动append
                //$('article')[0].appendChild(_list[0]);
            },
            onerror:function(){

            }
        });*/
    };

 
    // notify dispatcher
    _t1._$regist('blog-detail-comment',_p._$$ModuleBlogDetailComment);
});



