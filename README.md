# nej-app
 <ul>
 <li><a href="#descript">概述</a></li>
 <li><a href="#keyword">核心内容</a></li>
 <li><a href="#show">app展示</a></li>
 </ul>
#<div id="#descript">概述</div>
nej-app是采用网易前端框架<a href="https://github.com/NEYouFan/nej-framework">NEJ</a>的mini blog app，通过模块调度系统实现单页面应用。CSS预处理器采用<a href="https://github.com/leeluolee/mcss">MCSS</a>
本demo为前端代码，需结合<a href="https://github.com/luyanchen/node-blog/">api</a>使用。

本demo仅用于个人学习(持续更新中)。
 <ul>
 <li>前端：<a href="https://github.com/luyanchen/nej-app/">基于NEJ开发的HTML5移动单页应用</a></li>
 <li>后端：<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a></li>
 </ul>
框架： 
app涉及NEJ主要特性包括：

    依赖管理系统
    模板系统
    模块调度
    组件系统
    远程调用 
    缓存cache
    常用模块:element,event,util,chain,ajax,jst,cache,tab,list等

 run:
 1. 启动服务器（<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a>）
 2. 将/nej-app/src/html/app.html和/nej-app/src/html/login.html中的API_PATH改为服务器API路径(如：<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a>中的地址为http://localhost:3000/)
 
 3.注册地址：/nej-app/src/html/login.html/#/m/register/
 
 4.登录地址：/nej-app/src/html/login.html
 
 5.首页地址：/nej-app/src/html/app.html
 
 
 
#<div id="keyword">核心内容</div> 
 <ul>
 <li><a href="#module">模块组成</a></li>
 <li><a href="#util">自定义功能方法pro/util.js</a></li>
 <li><a href="#cache">列表缓存</a></li>
 <li><a href="#login">登录验证</a></li>
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
<h4><div id="login">登录验证</div></h4>
通过继承util/cache/storage，自定义本地存储JSON数据_$setJsonDataInStorage，将用户信息及token存放在localstorage。若未登录，跳转到登录页。
<h4><div id="refresh">上拉刷新下拉加载</div></h4>
自定义_initScroller方法判断上拉刷新和下拉加载，并触发缓存及列表加载（需要在移动端测试上拉刷新下拉加载效果）。
<h4><div id="tab">重写tab</div></h4>
底部菜单和首页顶部菜单用tab组件,由于在底部菜单切换时需要修改图片，因此在/pro/tab.js中重写了TabView的_$match方法，新增onchange事件，当切换新菜单时，对应替换图片。
<h4><div id="bind">事件绑定</div></h4>
由于模块每次初始化化时触发_dobuild方法，后续每次切换到该模块时触发_onrefresh，因此事件绑定只能放到_dobuild中，若放到_onfresh中将出现多次绑定的情况。
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
        this._bindEvent();//绑定事件
        this._commentData = [];
    };
    _pro._bindEvent = function(){
        var _self = this;
        $(this.__body)._$on("click","#sendbutton",function(_event){
            var _content = $("input[name='content']")._$val();  
            if(_content != ''){
                //清空消息
                $("input[name='content']")._$text("");
                _u._$ajaxSend({data:{blogid:_self._blogid,nickname:_nickname,userid:_userid,headimg:_headimg,token:_token,content:_content},url:'blog/comment/add',method:'post',callback:_self._addCommentCallback._$bind(_self)}); 

            }
        });
   }
</code></pre>在事件回调中可能会要调用该控件下的私有方法，若用this绑定作用域，可能会和event回调的this冲突。因此需要将用_self指向当前作用域，避免冲突。

#<div id="show">app展示</div>
<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/1.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/2.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-app/blob/master/res/dispaly/15.png" width = "30%" />

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


 
