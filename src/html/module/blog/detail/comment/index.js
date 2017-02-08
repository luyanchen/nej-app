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
    'util/chain/chainable',
    'util/ajax/xdr',
    'util/template/tpl',
    'util/dispatcher/module',
    'util/template/jst',
    'pro/module/module',
    '../../../../../javascript/pro/util.js',
],function(_k,_e,$,_j,_t0,_t1,_t2,_m,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    var _blogid = location.href.split("?blogid=")[1];
    var _userid = _u._$getJsonDataInStorage("_id");
    var _token = _u._$getJsonDataInStorage("token");
    var _nickname = _u._$getJsonDataInStorage("nickname");
    var _headimg = _u._$getJsonDataInStorage("headimg");
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
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d8')
        );
        var _list = _e._$getByClassName(this.__body,'j-flag');
        var commentListCallback = function(_result){
            //获取列表   
            if(_result.code == 200){
                var _data = _result.data;
                if(_data.length>0){
                    for(var i=0;i<_data.length;i++){
                        //作评论者可删除本人的评论
                        if(_data[i].userid == _userid ){
                            _data[i].canDelete = true;
                        }else{
                            _data[i].canDelete = false;

                        }
                    }
                    //console.log(_data)
                    _t2._$render(
                        _list[0],
                        'jst-detail-comment',
                        {_list:_data}
                    );

                }    
            }else{
                alert(_result.error);
            }
        }  
        _u._$ajaxSend({data:{blogid:_blogid},url:'blog/comment/list',callback:commentListCallback}); 

    };

    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
    };

 
    // notify dispatcher
    _t1._$regist('blog-detail-comment',_p._$$ModuleBlogDetailComment);

    //添加事件
    (function(){
        $("#sendbutton")._$on("click",function(_event){
            var _content = $("input[name='content']")._$val();
            if(_content != ''){
                //清空消息
                $("input[name='content']")._$text("");
                _u._$ajaxSend({data:{blogid:_blogid,nickname:_nickname,userid:_userid,headimg:_headimg,token:_token,content:_content},url:'blog/comment/add',callback:addCommentCallback}); 

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
                _event.preventDefault();
            }
        });
        $("body")._$on("click",".delcomment",function(_event){
            if(confirm("确定删除？")){
                var _commentId = $(this)._$attr("data-id");
                _u._$ajaxSend({data:{blogid:_blogid,commentid:_commentId,userid:_userid,token:_token},url:'blog/comment/delete',callback:deleteCommentCallback});                 
            }  
                        
        });
    })();
    var addCommentCallback = function(_result){
        console.log(_result)
        if(_result.code == 200){
            //不要刷新，重新加载该模块          
            alert("评论成功");
            location.reload();  
        }

    }
    var deleteCommentCallback = function(_result){
        console.log(_result)
        if(_result.code != 200){        
            alert(_result.error)
        }else{
            location.reload(); 
        }

    }
});



