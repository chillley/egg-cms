'use strict';

const Controller = require('../core/base_controller');

class TypeController extends Controller {

    async getAllTypeList() {
        const {ctx} = this;
        const typeListRes = await ctx.service.type.getAllTypeList();
        this.success(typeListRes);
    }

    async getLevel1TypeList() {
        const {ctx} = this;
        const typeListRes = await ctx.service.type.getLevel1TypeList();
        this.success(typeListRes);
    }

    async getLevel2TypeList() {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        const {id} = params;
        const typeListRes = await ctx.service.type.getLevel2TypeList({id});
        this.success(typeListRes);
    }


}

module.exports = TypeController;

