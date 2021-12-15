'use strict';
/*
* 获取数据并且对数据进行处理后返回
* */

const Service = require('egg').Service;


class TypeService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * @description  所有分类tag
     * @return any
     */
    async getAllTypeList() {
        const {ctx} = this;
        return await ctx.model.Type.findAll({
            order: [ [ 'type_sort', 'ASC' ] ],
            where: {
                type_status: 1,
            },
        });
    }

    /**
     * 一级分类list
     */
    async getLevel1TypeList() {
        const {ctx} = this;
        return await ctx.model.Type.findAll({
            order: [ [ 'type_sort', 'ASC' ] ],
            where: {
                type_pid: 0,
                type_status: 1,
            },
        });
    }

    async getLevel2TypeList({id}) {
        const {ctx} = this;
        return await ctx.model.Type.findAll({
            order: [ [ 'type_sort', 'ASC' ] ],
            where: {
                type_pid: id,
                type_status: 1,
            },
        });
    }

}

module.exports = TypeService;
