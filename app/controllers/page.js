var Application = require('./application');

module.exports = PageController;

function PageController(init) {
    Application.call(this, init);
}

require('util').inherits(PageController, Application);

PageController.prototype.show = function (c) {
    var Page = c.Page;

    this.group.definePage(c.req.url, c, function render(err, page) {
        console.log(arguments);
        if (err || !page) {
            return c.next(err);
        }
        c.req.page = page;
        page.renderHtml(c.req, function (err, html) {
            if (err) {
                return c.next(err);
            }
            c.render({
                page: html,
                title: page.title,
                req: c.req
            });
        });
    });
};

PageController.prototype.render = function (c) {
    c.req.page.renderHtml(c.req, function (err, html) {
        if (err) {
            return c.next(err);
        }
        c.render('show', {
            page: html,
            title: c.req.page.title,
            req: c.req
        });
    });
};
