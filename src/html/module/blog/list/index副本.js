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
    'util/list/waterfall',
    'pro/module/module',
    '../../../../javascript/cache/blog.js',
],function(_k,_e,$,_t1,_t2,_t3,_m,_d,_p,_o,_f,_r){
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
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__mopt = {
            limit:20,
            parent:_list[0],
            item:'jst-4-blog-list',
            cache:{klass:_d._$$CacheBlog},
            onbeforelistload:this.__onLoadingShow._$bind(this),
            onemptylist:this.__onMessageShow._$bind(this,'没有博客列表')
        };
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = (function(){
        var _doParseCKey = function(_param){

            //缓存id，blog-列表类型-搜索值；关注blog-1-;我的blog-2-;搜索blog-3-搜索值
            return 'blog-'+(_param.class||1)+'-';
        };
        return function(_options){
            //刷新一次，实例化一个列表
            this.__super(_options);
                        //console.log(_options)
            if (this.__lmdl) this.__lmdl._$recycle();
            this.__mopt.cache.lkey = _doParseCKey(_options.param||_o);
            this.__lmdl = _t3._$$ListModuleWF._$allocate(this.__mopt);
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


