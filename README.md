# nej-app
 <ul>
 <li><a href="#descript">概述</a></li>
 <li><a href="#keyword">核心内容</a></li>
 <li><a href="#show">app展示</a></li>
 </ul>
#<div id="#descript">概述</div>
nej-app是采用网易前端框架<a href="https://github.com/NEYouFan/nej-framework">NEJ</a>的mini blog app，通过模块调度系统实现单页面应用。本demo为前端代码，需结合<a href="https://github.com/luyanchen/node-blog/">api</a>使用。

本demo仅用于个人学习(持续更新中)。
 <ul>
 <li>前端：<a href="https://github.com/luyanchen/nej-blog/">基于NEJ开发的HTML5移动单页应用</a></li>
 <li>后端：<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a></li>
 </ul>
 
app涉及NEJ主要特性包括：

    依赖管理系统
    模板系统
    模块调度
    组件系统
    远程调用 
    缓存cache
    常用模块:element,event,util,chain,ajax,jst,cache,tab,list等
   
 首页地址：/nej-app/src/html/app.html
 登录地址：/nej-app/src/html/login.html
#<div id="keyword">核心内容</div> 
 <ul>
 <li><a href="#module">模块组成</a></li>
 <li><a href="#util">自定义功能方法pro/util.js</a></li>
 <li><a href="#cache">列表缓存</a></li>
 <li><a href="#refresh">上拉刷新下拉加载</a></li>
 <li><a href="#tab">重写tab</a></li>
 <li><a href="#bind">事件绑定</a></li>
 </ul>
<h4><div id="module">模块组成</div></h4>
目录
<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/14.png" width = "30%" />
两个入口文件：app.html和login.html,分别对应两个单页面。

每个页面对应一个布局模块+子功能模块，如：博客正文：
<pre><code>                  
//博客正文
'/m/index/detail/':{
   module:'module/layout/index.detail/index.html',//布局
   composite:{
     content:'/?/blog/detail/content/',//博客正文
     comment:'/?/blog/detail/comment/',//博客评论
   }
}
</code></pre>
<h4><div id="util">自定义功能方法pro/util.js</div></h4>
javascript/pro/util.js文件用于存放自定义功能，其中_$ajaxSend用于请求api，返回格式为
{
code:请求代码,
data:请求数据,
error:错误信息
}
_$ajaxListSend为配合list.js返回，直接将data传给回调函数。

<h4><div id="cache">列表缓存</div></h4>
博客列表通过改写/nej/src/util/cache/下的list.js和absctract.js两个文件，实现列表缓存，并自定义列表缓存管理基类customlist.js,实现上拉刷新下拉加载时对应缓存项增删功能。代码对应javascript/cache/

其中首页的“推荐”“我的“和搜索中的list模块是同一个，通过class参数分别实例化CacheListCustom控件。
<h4><div id="refresh">上拉刷新下拉加载</div></h4>
自定义_initScroller方法判断上拉刷新和下拉加载，并触发缓存及列表加载
<h4><div id="tab">重写tab</div></h4>
底部菜单和首页顶部菜单用tab组件,由于在底部菜单切换时需要修改图片，因此在/pro/tab.js中重写了TabView的_$match方法，新增onchange事件，当切换新菜单时，对应替换图片。
<h4><div id="bind">事件绑定</div></h4>
由于模块每次初始化化时触发_dobuild方法，后续每次切换到该模块时触发_onrefresh，因此时间绑定只能放到_dobuild中，并通过_$bind绑定作用域，若放到_onfresh中将出现多次绑定的情况。
<pre><code>
    
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
        this._bindEvent._$bind(this)();//绑定事件
        this._commentData = [];
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
   }
</code></pre>在事件回调中可能会要调用该控件下的私有方法，若用this绑定作用域，可能会和event回调的this冲突。如
<pre>
<code>
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
                console.log($(this));
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
</code>
</pre>

在上面第一个事件绑定回调中需要用到要调用该控件下的私有方法_addCommentCallback，因此将this绑定到事件回调函数中。第二个事件绑定也需要用到该控件下的私有方法_deleteCommentCallback，但因为要获得当前点击的节点$(this)，两个this会冲突，因此将_deleteCommentCallback单独放到外面用_deleteItem调用。
#<div id="show">app展示</div>
<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/1.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/2.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/3.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/4.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/5.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/6.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/7.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/8.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/9.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/10.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/11.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/12.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/13.png" width = "30%" />


 
