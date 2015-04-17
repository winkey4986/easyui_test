/**
 * Created with JetBrains WebStorm.
 * User: yangyu3
 * Date: 14-12-11
 * Time: 下午2:19
 * To change this template use File | Settings | File Templates.
 */

// 面包屑模块
_model.define('position', ['menu'], function (model, menu) {
    var options = {
            positionDiv: '#breadcrumbs',
            templatecontent: '<ul>',
            isBindMenuClick: true,
            template: '<li><a href="{href}"><span>{name}</span></a></li>'
        },
        reg = /\{([^}]*)\}/g;
    return {
        options: options,
        init: function () {
            eventsManage.bind('positions', this.viewpos, this);
        },
        viewpos: function (event, phtml) {
            var that = this;
            if (!menu.isInit()) {
                menu.bind('inilize.positions', function () {
                    that.viewpos(event, phtml);
                    menu.unbind('inilize.positions');
                });
                return false;
            }
            var actives = menu.getactive(),
                html = $(options.templatecontent),
                list,
                active, i, len;
            for (i=0, len=actives.length; i < len; i ++) {
                active = actives[i]
                list = $(options.template.replace(reg, function (a, b) {
                    if (active[b]) {
                        return active[b];
                    }
                }));

                if (options.isBindMenuClick) {
                    list.bind('click', function (menuId) {
                        return function () {
                            menu.trigger('click', menuId);
                            return false;
                        }
                    }(active['menuId']))
                }
                html.append(list);
            }
            $(options.positionDiv).html(html.append(phtml))
        }
    }
});





























