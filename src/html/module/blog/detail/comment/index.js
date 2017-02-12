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
        this._list = _e._$getByClassName(this.__body,'j-flag');
        this._bindEvent._$bind(this)();
        this._commentData = [];
    };

    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        this._blogid = _options.param.blogid;  
        _u._$ajaxSend({data:{blogid:this._blogid},url:'blog/comment/list',method:'get',callback:this._commentListCallback._$bind(this)}); 

    };


    _pro._bindEvent = function(){
        //添加事件
        $(this.__body)._$on("click","#sendbutton",(function(_event){
            var _content = $("input[name='content']")._$val();  
            if(_content != ''){
                //清空消息
                $("input[name='content']")._$text("");
                _u._$ajaxSend({data:{blogid:this._blogid,nickname:_nickname,userid:_userid,headimg:_headimg,token:_token,content:_content},url:'blog/comment/add',method:'post',callback:this._addCommentCallback._$bind(this)}); 

            }
        })._$bind(this));  
        $(this.__body)._$on("click",".delcomment",function(_event){
            if(confirm("确定删除？")){
               // console.log($(this));
                var _commentId = $(this)._$attr("data-id");
                var _node = $(this)._$parent('.info-list-wrapper')
                //移除节点，并删除事件
                _e._$remove(_node[0],false);
                _deleteItem(_commentId);
            }
        });
        var _deleteItem = (function(_commentId){
            _u._$ajaxSend({data:{blogid:this._blogid,commentid:_commentId,userid:_userid,token:_token},url:'blog/comment/delete',method:'post',callback:this._deleteCommentCallback._$bind(this)});                 
        })._$bind(this);

        $(this.__body)._$on("keyup","input[name='content']",function(){
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
    };
 
    _pro._commentListCallback = function(_result){
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
                }
                this._commentData = _data;
                _t2._$render(
                    this._list[0],
                    'jst-detail-comment',
                    {_list:this._commentData}
                );         
            }else{
                alert(_result.error);
            }
    };
    _pro._addCommentCallback = function(_result){
        if(_result.code == 200){
            var _data = _result.data;
            if(_data.userid == _userid ){
                _data.canDelete = true;
            }else{
                _data.canDelete = false;

            }
            //重新渲染
            this._commentData.push(_data);
            _t2._$render(
                this._list[0],
                'jst-detail-comment',
                {_list:this._commentData}
            ); 
           // console.log(this._commentData)
        }else{
            alert(result.error);
        }

    };
    _pro._deleteCommentCallback = function(_result){
        if(_result.code != 200){
            alert(result.error);
        }

    };
    // notify dispatcher
    _t1._$regist('blog-detail-comment',_p._$$ModuleBlogDetailComment);
});



