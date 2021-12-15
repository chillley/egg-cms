'use strict';

const {Controller} = require('egg');

class BaseController extends Controller {

    success(data = {}, other = {}) {
        this.ctx.body = {
            success: 1,
            data,
            code: 200,
            ...other,
        };
        this.ctx.status = 200;
    }

    fail(message, code = 403) {
        if (this.app._.isObject(message)) {
            this.ctx.body = {success: 0, message, data: {}, code, ...message};
        } else {
            this.ctx.body = {success: 0, message, data: {}, code};
        }
        this.ctx.status = 200;
    }

    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}

module.exports = BaseController;
