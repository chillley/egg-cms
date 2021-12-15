'use strict';

const Controller = require('../core/base_controller');


const listRule = {
    page: 'number',
    limit: 'number',
};

const detailRule = {
    id: 'number',
};

const listByTypeRule = {
    type: {
        type: 'number',
    },
    random: {
        required: false,
        type: 'boolean',
    },
    limit: {
        required: false,
        type: 'number',
    },
};


const getPlayList = str => {
    const bluesList = str.split('#');
    return bluesList.map(blues => {
        const bluesArray = blues.split('$');
        return {
            name: bluesArray[0],
            url: bluesArray[1],
        };
    });
};

class VodController extends Controller {

    async getVodList() {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        let {page = 1, limit = 10, search = ''} = params;
        limit = limit > 100 ? 100 : limit;
        ctx.validate(listRule, params);
        page = Number(page);
        limit = Number(limit);
        search = search.trim();
        const vodDataRes = await ctx.service.vod.getVodList({page, limit, search});
        this.success(vodDataRes);
    }

    async getVodDetails() {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        ctx.validate(detailRule, params);
        let {id} = params;
        id = Number(id);
        const vodDataRes = await ctx.service.vod.getVodDetails({id});
        this.success(vodDataRes);
    }

    async getTypeData() {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        let {page = 1, limit = 10, area, classTag, type, lang, letter, year, type1} = params;
        limit = limit > 100 ? 100 : limit;
        page = Number(page);
        limit = Number(limit);
        const vodDataRes = await ctx.service.vod.getTypeData({area, classTag, type, lang, letter, year, limit, page, type1});
        this.success(vodDataRes);
    }

    async getVodListByType() {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        ctx.validate(listByTypeRule, params);
        let {type, random, limit = 10, page = 1} = params;
        type = Number(type);
        limit = Number(limit);
        page = Number(page);
        const vodDataRes = await ctx.service.vod.getVodListByType({type, random, limit, page});
        this.success(vodDataRes);
    }

    async getRecommendedVideos() {
        const {ctx} = this;
        const vodDataRes = await ctx.service.vod.getRecommendedVideos();
        this.success(vodDataRes);
    }


    async getVodPlayVideoSourceFormat() {
        const {ctx, app} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        const {id} = params;
        const vod = await ctx.service.vod.getVodDetails({id});
        const vodPlayFrom = vod.vod_play_from;
        const vodPlayFromList = vodPlayFrom.split('$$$');
        const vodPlayUrl = vod.vod_play_url;
        const vodPlayUrlList = vodPlayUrl.split('$$$');
        let fanQieList = [];
        const fanQieIndex = app._.findIndex(vodPlayFromList, function(key) {
            return key == 'fanqie';
        });
        if (fanQieIndex !== -1) {
            const fanQieVodList = vodPlayUrlList[fanQieIndex];
            const bluesList = fanQieVodList.split('#');
            const bluesListTask = bluesList.map(async blues => {
                const bluesFQ = blues.split('$')[1];
                return await this.getFqVideosPlayerList(bluesFQ);
            });
            let bluesListUrl = [];
            if (bluesListTask.length > 5) {
                const subsectionTask = app._.chunk(bluesListTask, 1);
                for (let i = 0; i < subsectionTask.length; i++) {
                    bluesListUrl.push(...await Promise.allSettled(subsectionTask[i]));
                }
            } else {
                bluesListUrl = await Promise.allSettled(bluesListTask);
            }

            fanQieList = bluesList.map((blues, index) => {
                const bluesArray = blues.split('$');
                return {
                    name: bluesArray[0],
                    url: (bluesListUrl[index].value === 'var url=\'') ? 'fq' : bluesListUrl[index].value,
                    fq: bluesArray[1],
                };
            });
        }

        // eslint-disable-next-line array-callback-return
        const newVodPlayFromList = app._.compact(vodPlayFromList.map((play, index) => {
            switch (play) {
            case 'fanqie':
                return {
                    name: '番茄资源',
                    list: fanQieList,
                };

            case 'tkm3u8':
                return {
                    name: '天空云',
                    list: getPlayList(vodPlayUrlList[index]),
                };

            case '605m3u8':
                return {
                    name: '605云',
                    list: getPlayList(vodPlayUrlList[index]),
                };

            case 'dbm3u8':
                return {
                    name: '百度云',
                    list: getPlayList(vodPlayUrlList[index]),
                };

            case '88zym3u8':
                return {
                    name: '88云',
                    list: getPlayList(vodPlayUrlList[index]),
                };
            case 'fsm3u8':
                return {
                    name: 'fsm3u8',
                    list: getPlayList(vodPlayUrlList[index]),
                };
            }
        }));

        this.success(newVodPlayFromList);
    }

    async getFqVideosPlayerList(url) {
        const {ctx, app} = this;
        const vodDataRes = await ctx.curl(`https://dp.8b5q.cn/dplayer/?url=${url}`);
        const data = new Buffer(vodDataRes.data);
        const datString = data.toString();
        let sourceUrl = datString.substring(datString.indexOf('var url='), datString.indexOf('var type='));
        sourceUrl = sourceUrl.substring(sourceUrl.indexOf('http'), sourceUrl.indexOf(';') - 1);
        return sourceUrl;
    }

    async getFqVideosPlayerListByFq(url) {
        const {ctx} = this;
        const {method} = ctx.req;
        const params = method === 'GET' ? ctx.request.query : ctx.request.body;
        const {fq} = params;
        const vodDataRes = await ctx.curl(`https://dp.8b5q.cn/dplayer/?url=${fq}`);
        const data = new Buffer(vodDataRes.data);
        const datString = data.toString();
        let sourceUrl = datString.substring(datString.indexOf('var url='), datString.indexOf('var type='));
        sourceUrl = sourceUrl.substring(sourceUrl.indexOf('http'), sourceUrl.indexOf(';') - 1);
        this.success(sourceUrl);
    }

}

module.exports = VodController;
