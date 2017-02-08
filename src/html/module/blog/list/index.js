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
    '../../../../javascript/cache/list.js',
],function(_k,_e,$,_t1,_t2,_t3,_m,_u,_c,_p,_o,_f,_r){
    var _pro;
  
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
        // 0 - list box
        _list = _e._$getByClassName(this.__body,'j-flag');
        this._cacheArr = [];//缓存数组，每个tab只需实例化一次
        this._flag = '';//列表标志
        var cache = '';
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = (function(){
        
        var _doParseCKey = function(_options){
            //缓存id，blog-列表类型-搜索值；关注blog-1-;我的blog-2-;搜索blog-3-搜索值
            var _href = _options.input.location.href;
            return _href;
        };
        return function(_options){           
            //console.log(_options);
            //刷新一次，实例化一个列表
            this.__super(_options);
            var _key = _doParseCKey(_options);
            if(this._cacheArr.indexOf(_key) == -1){
                this._cacheArr.push(_key);
                //实例化list
                _cache = _c._$$CacheListCustom._$allocate({
                    // id作为cache的标识
                    key:_key,
                    // 根据key，也就是上面的id，到缓存中取数据，然后处理数据
                    onlistload:function(_ropt){
                        var _data = _cache._$getListInCache(_ropt.key);//从cache列表中取数据
                        _t3._$render(
                            _list[0],
                            'jst-blog-list',
                            {_data:_data}
                        );

                    },
                    // 根据key，也就是上面的id，到缓存中取数据，然后处理数据
                    onitemload:function(_ropt){
                        console.log(_ropt);
                        var _item = _cache._$getItemInCache(_ropt.key);
                        console.log(_item);

                    },
                    onitemadd:function(_ropt){
                        var dataJson = JSON.parse(_ropt.data);//返回信息
                        if(dataJson.code == 200){
                            console.log(_ropt.action,"success!")
                        }
                    },
                    onitemdelete:function(_ropt){
                        console.log(_ropt)
                        var dataJson = JSON.parse(_ropt.data);//返回信息为空？
                        /*if(dataJson.code == 200){
                            console.log(_ropt.action)
                        }*/
                    },
                    onitemupdate:function(_ropt){
                        var dataJson = JSON.parse(_ropt.data);//返回信息
                        if(dataJson.code == 200){
                            console.log(_ropt.action,"success!")                
                        }
                    },
                    onpullrefresh:function(_ropt){
                    //    console.log(_ropt);
                        var _list = _cache._$getListInCache(_ropt.key);//从cache列表中取数据
                        console.log(_list);
                    }      
                });
            }
            //发起请求
            var _class = _options.param.class,
                 _userid = '',
                 _keyword = _options.param.keyword||'';
            if(_class == 2){
                //我的博客，需要传userid
                _userid = _u._$getJsonDataInStorage("_id");
            }
            var _data = {userid:_userid,keyword:_keyword,limit:5,flag:this._flag,direction:''};
            _cache._$getList({key:_key,data:_data});
        };
    })();

    //添加事件
    $("body")._$on("click",".delblog",function(_event){
        var _node = $(this)._$parent('.info-list-wrapper')
        console.log($(this))
        console.log(_node)
        var _blogId = $(this)._$attr("data-id");
        var _key = 'blog-'+location.href.split("?class=")[1]+'-'
        //移除节点，并删除事件
        _e._$remove(_node[0],false);
        //删除缓存
        
        //this.__lmdl._$deleteItem({key:_key,data:{id:_blogId}});
 
                    
    });
    // notify dispatcher
    _t2._$regist('blog-list',_p._$$ModuleBlogList);
});


