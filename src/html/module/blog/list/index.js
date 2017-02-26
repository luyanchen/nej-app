/*
 * ------------------------------------------
 * 首页列表模块实现文件
 * @version  1.0
 * @author   chenluyan_bupt@163.com
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
    //初始化用户信息
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
        //list缓存key规则
        this.__doParseCKey = function(_options){
            //用url当key
            return _options.input.location.href;
        };
        //事件监听必须在dobuild绑定，且应通过this.__body代理，若放在onfresh中会重复绑定。
        this._bindEvent();
        //class:1推荐，2我的，3搜索
        this._flag = [{},{},{}];//各页面加载flag 暂时用publishTime，应该用自增字段
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){ 
            this.__super(_options);
            this._key = this.__doParseCKey(_options);
            //刷新一次，实例化一个列表
            if (!this._listcache){
                this._listcache = _c._$$CacheListCustom._$allocate({
                    id:this._key,
                    key:"_id",
                    onlistload:this._listLoadCallback._$bind(this),
                    onitemdelete:this._itemDeleteCallback._$bind(this),  
                    onpullrefresh:this._listLoadCallback._$bind(this),
                    onuppullrefresh:this._listLoadCallback._$bind(this),

                });
            }
            this._class = _options.param.class||1;
            this._keyword = _options.param.keyword||'';
            this._data = {userid:_userid,class:this._class,keyword:this._keyword,limit:10,direction:''};          
            this._listcache._$getList({key:this._key,data:this._data,limit:10});
    };
    _pro._bindEvent = function(){
        var _self = this;
        $(this.__body)._$on("click",".delblog",function(_event){
            var _node = $(this)._$parent('.list')
            var _blogid = $(this)._$attr("data-id");
            var _yesCallback = function(){
                //移除节点，并删除事件
                _e._$remove(_node[0],false);
                //删除缓存
                _self._listcache._$deleteItem({
                    key:_self._key,
                    id:_blogid ,
                    data:{
                        blogid:_blogid,
                        userid:_userid,
                        token:_token
                    }
              });
              $(".m-popup-wrap")._$style("display","none"); 
            };
            var _noCallback = function(){
              $(".m-popup-wrap")._$style("display","none"); 
            }
            $(".m-popup-wrap")._$style("display","block");
            $(".m-popup-wrap")._$on("click","#yes",_yesCallback._$bind(_self),false);
            $(".m-popup-wrap")._$on("click","#no",_noCallback._$bind(_self),false); 
        }, false);
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
            //修改当前页面加载flag [{first:"1",last:"5"},{first:"1",last:"5"},{first:"1",last:"5"}]
            this._flag[this._class-1].first =  _data[0].publishTime;
            this._flag[this._class-1].last =  _data[_data.length-1].publishTime;

        }
        _t3._$render(
            this._list[0],
            'jst-blog-list',
            {data:_data}
        );
        this._initScroller();
    }

    _pro._itemDeleteCallback =  function(_ropt){
        console.log(_ropt);
    }

    _pro._initScroller = function () {
      var scroller = $('#scroller');
      var wrapper = $('#wrapper');
      var touchStart = 0;
      var touchDis = 0;
      var offset = 0;
      /*设置wrapper最小高度为设备高度*/
      wrapper._$style("min-height",window.screen.height+"px");
      console.log(wrapper._$style("min-height"));
      wrapper._$on('touchstart', function(event) {
          if(event.targetTouches){
            var touch = event.targetTouches[0];         
            touchStart = touch.pageY;
          }    
      }, false);
      wrapper._$on('touchmove', function(event) {
        if(event.targetTouches){
         var touch = event.targetTouches[0];
          offset = _e._$offset('scroller','wrapper').y;
          touchDis = touch.pageY-touchStart;
          if(offset<20 && touchStart<_u._$getWindowHeight() && touchDis>0){
            scroller._$style('margin-top',offset + touch.pageY-touchStart + 'px');
            $("#pullDown")._$style("display","block");
          }
        }
      }, false);
      wrapper._$on('touchend', (function(event) { 
        if(event.targetTouches){ 
        offset = _e._$offset('scroller','wrapper').y;
          //下拉
          if(touchStart<_u._$getWindowHeight() && touchDis>20){
            this._upRefresh();
          }
          //上拉
          if(touchDis<0 && _u._$getScrollTop() + _u._$getWindowHeight() +100 > _u._$getScrollHeight()){
              window.setTimeout((function(){
                this._downRefresh();
              })._$bind(this),100);
          }
        }

      })._$bind(this),false);
    }
    _pro._upRefresh = function(){
        this._data.flag = this._flag[this._class-1].first||''; //上拉加载下拉刷新时传递的item标识
        this._data.direction = 'down';
        this._listcache._$pullRefresh({key:this._key,data:this._data,limit:10});
    }
    _pro._downRefresh = function(){
        this._data.flag = this._flag[this._class-1].last||''; //上拉加载下拉刷新时传递的item标识
        this._data.direction = 'up';
        this._listcache._$upPullRefresh({key:this._key,data:this._data,limit:10});
    }

      // notify dispatcher
      _t2._$regist('blog-list',_p._$$ModuleBlogList);
});


