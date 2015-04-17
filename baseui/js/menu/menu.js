/**
 * Created with JetBrains WebStorm.
 * User: yangyu3
 * Date: 14-12-1
 * Time: 上午9:47
 * To change this template use File | Settings | File Templates.
 */

// 菜单模块
_model.define('menu', function (model) {
    var options = {
        layout: 'transverse',
        tmplurl: '',
		cssactive: 'active',
		csshover: 'hover',
        // 模板的属性映射 ,
        ajaxResponseReader: {data: 'data'},
        tmpl: '[tmpl-menu],[tmpl-menu-sub]',
        tmplcontent: '[data-menu],[data-menu-sub]',
        parentTag : 'li',
        params: ['menuId', 'href', 'target', 'active','parentId', 'name'] ,
        data : []
    },
    menuId, subMenuId;

    return {
		options: options,
		inilize: false,
		activedata: [],  //当前激活菜单
        cachedata: {},  //菜单解析缓存
        domInit: function () {
            this.elem = $(options.tmplcontent);
            this.template = $(options.tmpl);
            this.getdata();
        },
        getdata: function () {
            var that = this,
                 content,length = that.elem.length;
                if(options.data.length > 0 ){
                    that.parseData(options.data);
                    that.resetActive(that.activeId);
                    for(var i=0; i<length;i++){
                        content = that.template.eq(i).tmpl(options.data);
                        that.elem.eq(i).html(content);
                    }
                    that.changeActiveClass();
                    // 批量执行绑定事件
                    that.batch(/^onEvent/);
                    that.inilize = true;
                    that.trigger('inilize');
                }else if(options.tmplurl) {
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: options.tmplurl,
                        success: function (obj) {
                            that.menudata = obj; //原始菜单
                            that.parseData(obj);
                            that.resetActive(that.activeId);
                            for(var i=0; i<length;i++){
                                content = that.template.eq(i).tmpl(obj);
                                that.elem.eq(i).html(content);
                            }
                            that.changeActiveClass();
                            // 批量执行绑定事件
                            that.batch(/^onEvent/);
                            that.inilize = true;
                            that.trigger('inilize');
                        }
                    })
                }

        },
		getactive: function () {
			return this.activedata;	
		},
        isInit: function () {
            return this.inilize
        },
        getparam: function (params, obj) {
            var ret = {},
                i = 0, len = params.length, param;
            for (; i < len; i++) {
                param = params[i];
                ret[param] = obj[param];
            }
            return ret;
        },
        parseData: function (pobj) {
           var cdata = this.cachedata,
               kData = this.options.ajaxResponseReader['data'],
               datas = pobj[kData],
               i=0, len=datas.length,
               chldata,obj;

           for (;i < len;i++) {
              chldata = datas[i];
              obj = this.getparam(options.params, chldata);

              if (typeof obj.parentId!=null && pobj.menuId != null ) {
                  obj.parentId = pobj.menuId;
              }

              if (obj.active == 1) {
                  this.activeId = obj.menuId;
              }
              cdata[obj.menuId] = obj;

              if (chldata.data && chldata.data.length) {
                  this.parseData(chldata);
              }
           }
        },
		resetActive: function (menuId) {
			var cdata = this.cachedata,
				data = cdata[menuId], pId;
            if(data){
                this.activedata = [data];
                while (pId=data.parentId) {
                    data = cdata[pId];
                    this.activedata.unshift(data);
                }
            }
            this.changeActiveClass();
            return this.getactive();
		},
        changeActiveClass: function () {
            var that = this,
                css = this.options.cssactive,
                adata = this.activedata,
                pTag = this.options.parentTag;
             if(css)
                this.elem.find('.' + css).removeClass(css);
            $.each(adata, function (n, i) {
                $('[menuId='+i.menuId+']', that.elem).closest(pTag).addClass(css);
            });
        },
        onEventMenuClick: function () {
            var that = this;

            this.bind('click', function (event, menuId) {
                var target = that.elem.find('[menuId='+menuId+']').eq(0),
                    data;

                that.resetActive(menuId);
                data = that.cachedata[menuId];
                that.clickval = that.menuClick.call(target, event, that, data, menuId);
            });
            this.elem
                .on('click', 'a', function (event) {
                    var menuId = $(this).attr('menuId');
                    that.trigger('click', [menuId]);
                    return that.clickval;
                })
        }
    }
})
// 菜单模块
_model.define('menu', function (model) {
    return {
		// 页面操作逻辑
		// 容许覆盖
		menuClick: function (event, that, data, menuId) {
			var target = data.target;

			if (data.target && data.target !== '_blank') {
				$('#'+target).attr("src", data.href);
				return false;
			}
			return true;
		},
		menuEnter: function (event, that) {
			var target = $(this),
				csshover = that.options.csshover,
				child;
						
			target.addClass(csshover);
			if ((child=target.children('div')).length) {
				child.show()	
			}	
		},
		menuLeave: function (event, that) {
			var target = $(this),
				csshover = that.options.csshover,
				child;
						
			target.removeClass(csshover);
			if ((child=target.children('div')).length) {
				child.hide();	
			}	
		},
		onEventMenuHover: function () {
			var that = this;
				
			this.elem
				.on('mouseenter', 'li', function (event) {
					return that.menuEnter.call(this, event, that);
				})
				.on('mouseleave', 'li', function (event) {
					return that.menuLeave.call(this, event, that);
				})
		}
    }
})




















