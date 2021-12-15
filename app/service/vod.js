'use strict';
/*
* 获取数据并且对数据进行处理后返回
* */

const {Service} = require('egg');
const {Op, Sequelize} = require('sequelize');

class VodService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * @description  获取视频列表接口
     * @param  {string | number} page
     * @param  {string | number} limit,
     * @param  {string} search
     * @return any
     */
    async getVodList({page, limit, search}) {
        const {ctx} = this;
        const where = {};
        if (search) {
            where[Op.or] = [
                {vod_name: {[Op.like]: `%${search || ''}%`}},
                {vod_en: {[Op.like]: `%${search || ''}%`}},
                {vod_tag: {[Op.like]: `%${search || ''}%`}},
                {vod_blurb: {[Op.like]: `%${search || ''}%`}},
                {vod_actor: {[Op.like]: `%${search || ''}%`}},
                {vod_content: {[Op.like]: `%${search || ''}%`}},
                {vod_class: {[Op.like]: `%${search || ''}%`}},
            ];
        }
        return await ctx.model.Vod.findAndCountAll({
            order: [ [ 'vod_time_add', 'DESC' ] ],
            where,
            offset: (page - 1) * limit,
            limit,
        });
    }

    /**
     * @description  获取视频详情
     * @param  {number} id
     * @return any
     */
    async getVodDetails({id}) {
        const {ctx} = this;
        return await ctx.model.Vod.findByPk(id);
    }

    /**
     * @description  筛选视频接口
     * @param  {string | number} page
     * @param  {string | number} limit,
     * @param  {string} area
     * @param  {string} classTag
     * @param  {string} type
     * @param  {string} type1
     * @param  {string} lang
     * @param  {string} letter
     * @param  {string} year
     * @return any
     */
    async getTypeData({type1, area, classTag, type, lang, letter, year, limit, page}) {
        const {ctx} = this;
        const where = {};
        where[Op.and] = [];
        if (area) {
            where[Op.and].push({vod_area: area});
        }
        if (classTag) {
            where[Op.and].push({vod_class: {[Op.like]: `%${classTag || ''}%`}});
        }

        if (type1) {
            where[Op.and].push({type_id_1: type1});
        }

        if (type) {
            where[Op.and].push({type_id: type});
        }

        if (lang) {
            where[Op.and].push({vod_lang: {[Op.like]: `%${lang || ''}%`}});
        }

        if (letter) {
            where[Op.and].push({vod_letter: {[Op.like]: `%${letter || ''}%`}});
        }

        if (year) {
            where[Op.and].push({vod_year: year});
        }

        return await ctx.model.Vod.findAndCountAll({
            order: [ [ 'vod_time_add', 'DESC' ] ],
            where,
            offset: (page - 1) * limit,
            limit,
        });
    }

    /**
     * @description  分类查询视频接口
     * @param  {string | number} page
     * @param  {string | number} limit  条数
     * @param  {string} random 是否随机
     * @param  {string} type typeId
     * @return any
     */
    async getVodListByType({type, random, limit, page}) {
        const {ctx} = this;
        const where = {vod_status: 1};
        where[Op.or] = [ {type_id: type}, {type_id_1: type} ];
        let order = [ [ 'vod_time_add', 'DESC' ] ];
        if (random) {
            order = [ Sequelize.literal('rand()'), [ 'vod_time_add', 'DESC' ] ];
        }
        return await ctx.model.Vod.findAndCountAll({
            order,
            where,
            offset: (page - 1) * limit,
            limit,
        });
    }

    /**
     * @description  查询推荐视频
     * @return any
     */
    async getRecommendedVideos() {
        const {ctx} = this;
        const where = {};
        where[Op.gt] = {vod_level: 0};
        const order = [ [ 'vod_level', 'ASC' ] ];
        await ctx.model.Vod.findAll({
            order,
            where,
        });
    }


}

module.exports = VodService;
