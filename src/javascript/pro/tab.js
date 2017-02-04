/*
* 自定义tab基类
*/

NEJ.define([
     'base/klass',
     'util/tab/view',
    'base/util',
    'base/element',
    'util/chain/chainable',
],function(_k,_t,_u,_e,$,_p,_f){
     // 创建自己的tab管理类
     _p._$$TabViewCustom = _k._$klass();
     _pro = _p._$$TabViewCustom._$extend(_t._$$TabView);


     /**
     * 验证匹配情况(重写父类方法)
     *
     * @method module:util/tab/view._$$TabView#_$match
     * @param  {String} arg0 - 待匹配值
     * @return {Node}          匹配的节点
     */
    _pro._$match = function(_value){
        var _element,
            _event = {target:_value};
        _u._$forEach(
            this.__list,
            function(_node){
                delete _event.matched;
                _event.source = _e._$dataset(_node,this.__name);
                this._$dispatchEvent('oncheck',_event);
                if (!_event.matched){                   
                    _e._$delClassName(_node,this.__selected);
                }else{
                    _element = _node;
                    _e._$addClassName(_node,this.__selected);
                    //tab变化，触发onchange事件
                    this._$dispatchEvent('onchange',_node,this.__list);
                }
            },this
        );
        return _element;
    };

     return _p;

     
     
});
