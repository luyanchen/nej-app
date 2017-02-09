/*
 * ------------------------------------------
 * 首页列表模块实现文件
 * @version  1.0
 * @author   cathy
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/chain/chainable',
    'util/template/tpl',
    'util/dispatcher/module',
    'util/template/jst',
    'pro/module/module',
    '../../../../javascript/pro/util.js',
    '../../../../javascript/cache/customlist.js',
],function(_k,_e,$,_t1,_t2,_t3,_m,_u,_c,_p,_o,_f,_r){
    var _pro;
    var _userid = _u._$getJsonDataInStorage("_id");
    var _token = _u._$getJsonDataInStorage("token");
    /**
     * 首页列表模块对象
     * 
     * @class   {_$$ModuleBlogList}
     * @extends {_$$Module}
     * 
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     * 
     */
    _p._$$ModuleBlogList = _k._$klass();
    _pro = _p._$$ModuleBlogList._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-d4')
        );
        this._list = _e._$getByClassName(this.__body,'j-flag');
        this.__flag = '';//列表标志
        this.__doParseCKey = function(_options){
            //用url当key
            return _options.input.location.href;
        };
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = (function(){
        return function(_options){ 
            console.log(_options);
                       
            //刷新一次，实例化一个列表
            this.__super(_options);
            this._key = this.__doParseCKey(_options);

            if (!this._listcache){
                this._listcache = _c._$$CacheListCustom._$allocate({
                    id:"blog",
                    onlistload:this._listLoadCallback._$bind(this),
                    onitemdelete:this._itemDeleteCallback._$bind(this),  
                    onpullrefresh:this._pullRefreshCallback._$bind(this),
                    onuppullrefresh:this._upPullRefreshCallback._$bind(this),

                });
            }
            this._class = _options.input.location.href.split("class=")[1];
            this._keyword = _options.param.keyword||'';
            this._data = {userid:_userid,class:this._class,keyword:this._keyword,limit:5,flag:this.__flag,direction:''};
            
            this._listcache._$getList({key:this._key,data:this._data,limit:5});
            console.log(this._listcache); 
//this._listcache._$upPullRefresh();


        };
    })();
    _pro._bindEvent = function(){
        //添加事件
setTimeout(function () { loaded(),1000});
        $("body")._$on("click",".delblog",function(_event){
            if(confirm("确定删除？")){
                var _node = $(this)._$parent('.info-list-wrapper')
                var _blogid = $(this)._$attr("data-id");
                console.log(_blogid)
                //移除节点，并删除事件
                _e._$remove(_node[0],false);
                //删除缓存
                console.log(this._key)
                _deleteItem(_blogid);
            }
        });
        //下拉刷新
        $("#more-down")._$on("click",(function(_event){
                console.log(this._listcache);
                this._data.flag = this.__firstItem;
                this._data.direction = 'down';
                this._listcache._$pullRefresh({key:this._key,data:this._data,limit:5});
        })._$bind(this));
        //上拉加载
        $("#more-up")._$on("click",(function(_event){
                console.log(this._listcache);
                this._data.flag = this.__lastItem;
                this._data.direction = 'up';
                console.log(this._data);
                this._listcache._$upPullRefresh({key:this._key,data:this._data,limit:5});
        })._$bind(this));
        var _deleteItem = (function(_blogid){
            this._listcache._$deleteItem({
                    key: this._key,
                    id: 'blog',
                    data:{
                        blogid:_blogid,
                        userid:_userid,
                        token:_token
                    }
            });
        })._$bind(this);
    }
    _pro._listLoadCallback= function(_ropt){
        var _data = this._listcache._$getListInCache(_ropt.key);//从cache列表中取数据
        if(_data.length>0){
            for(var i=0;i<_data.length;i++){
                //作评论者可删除本人的评论
                if(_data[i].authorid == _userid ){
                    _data[i].canDelete = true;
                }else{
                    _data[i].canDelete = false;
                }
            }
        }
        _t3._$render(
            this._list[0],
            'jst-blog-list',
            {data:_data}
        );
        //加载flag 暂时用publishTime，应该用自增字段，后面改
        this.__firstItem = _data[0].publishTime;
        this.__lastItem = _data[_data.length-1].publishTime;
        this._bindEvent._$bind(this)();
    }

    _pro._itemDeleteCallback =  function(_ropt){
        console.log(_ropt)
        var dataJson = JSON.parse(_ropt.data);//返回信息为空？
    }
    _pro._pullRefreshCallback= function(_ropt){
        var _data = this._listcache._$getListInCache(_ropt.key);//从cache列表中取数据
        if(_data.length>0){
            for(var i=0;i<_data.length;i++){
                //作评论者可删除本人的评论
                if(_data[i].authorid == _userid ){
                    _data[i].canDelete = true;
                }else{
                    _data[i].canDelete = false;
                }
            }
            _t3._$render(
                this._list[0],
                'jst-blog-list',
                {data:_data}
            );
            //加载flag 暂时用publishTime，应该用自增字段，后面改
            this.__firstItem = _data[0].publishTime;
            this.__lastItem = _data[_data.length-1].publishTime;
            this._bindEvent._$bind(this)();
        }else{
            $("#topmsg")._$text("已经是最新啦")._$style('display','block');
        }

    }  
    _pro._upPullRefreshCallback= function(_ropt){
        var _data = this._listcache._$getListInCache(_ropt.key);//从cache列表中取数据
        if(_data.length>0){
            for(var i=0;i<_data.length;i++){
                //作评论者可删除本人的评论
                if(_data[i].authorid == _userid ){
                    _data[i].canDelete = true;
                }else{
                    _data[i].canDelete = false;
                }
            }
            _t3._$render(
                this._list[0],
                'jst-blog-list',
                {data:_data}
            );
           // console.log(_data)
            //加载flag 暂时用publishTime，应该用自增字段，后面改
            this.__firstItem = _data[0].publishTime;
            this.__lastItem = _data[_data.length-1].publishTime;
            this._bindEvent._$bind(this)();
        }else{
            $("#bottommsg")._$text("没有更多啦")._$style('display','block');
        }
    } 

    // notify dispatcher
    _t2._$regist('blog-list',_p._$$ModuleBlogList);



/**
 * 初始化iScroll控件
 */
function loaded() {
 pullDownEl = $('#pullDown');
 pullDownOffset = pullDownEl.offsetHeight;
 pullUpEl = $('#pullUp'); 
 pullUpOffset = pullUpEl.offsetHeight;
 myScroll = new iScroll('wrapper', {
  scrollbarClass: 'myScrollbar', /* 重要样式 */
  useTransition: false, /* 此属性不知用意，本人从true改为false */
  topOffset: pullDownOffset,
  onRefresh: function () {
   if (_e._$hasClassName(pullDownEl,'loading')) {
    _e._$delClassName(pullDownEl,'loadig');
    $('#pullDownLabel')._$text('下拉刷新...');
   } else if (_e._$hasClassName(pullUpEl,'loading')) {
    _e._$delClassName(pullUpEl,'loadig flip');
    $('#pullUpLabel')._$text('上拉加载更多');
   }
  },
  onScrollMove: function () {
    console.log(this)
   if (this.y > 5 && !_e._$hasClassName(pullDownEl,'flip')) {
    _e._$addClassName(pullDownEl,'flip');
    $('#pullDownLabel')._$text('松手开始更新...');
    this.minScrollY = 0;
   } else if (this.y < 5 && _e._$hasClassName(pullDownEl,'flip')) {
    _e._$delClassName(pullDownEl,'loadig flip');
    $('#pullDownLabel')._$text('下拉刷新...');
    this.minScrollY = -pullDownOffset;
   } else if (this.y < (this.maxScrollY - 5) && !_e._$hasClassName(pullUpEl,'flip')) {
    _e._$addClassName(pullUpEl,'flip');
    $('#pullUpLabel')._$text('松手开始更新...');
    this.maxScrollY = this.maxScrollY;
   } else if (this.y > (this.maxScrollY + 5) && _e._$hasClassName(pullUpEl,'flip')) {
    _e._$delClassName(pullUpEl,'loadig flip');
    $('#pullUpLabel')._$text('下拉刷新...');
    this.maxScrollY = pullUpOffset;
   }
  },
  onScrollEnd: function () {
   if (_e._$hasClassName(pullDownEl,'flip')) {   
    _e._$addClassName(pullDownEl,'loading');
    $('#pullDownLabel')._$text('加载中...');
    console.log("上拉加载");
    myScroll.refresh();
   } else if (_e._$hasClassName(pullUpEl,'flip')) { 
    _e._$addClassName(pullUpEl,'loading');
    $('#pullUpLabel')._$text('加载中...');  
    console.log("下拉刷新");
    myScroll.refresh();
   }
  }
 });
 myScroll.refresh();
 //setTimeout(function () { $('#wrapper')._$style('left' , '0px'); }, 800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
    
});


