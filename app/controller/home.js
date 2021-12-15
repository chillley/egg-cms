'use strict';

const Controller = require('../core/base_controller');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = ' /** -----------视频列表 ------------ */\n' +
            '    router.post(\'/api/getVodList\', controller.vod.getVodList);\n' +
            '    router.get(\'/api/getVodList\', controller.vod.getVodList);\n' +
            '\n' +
            '    /** -----------视频详情 ------------ */\n' +
            '    router.post(\'/api/getVodDetails\', controller.vod.getVodDetails);\n' +
            '    router.get(\'/api/getVodDetails\', controller.vod.getVodDetails);\n' +
            '\n' +
            '    /** -----------所有分类 ------------ */\n' +
            '    router.post(\'/api/getAllTypeList\', controller.type.getAllTypeList);\n' +
            '    router.get(\'/api/getAllTypeList\', controller.type.getAllTypeList);\n' +
            '\n' +
            '    /** -----------获取一级分类 ------------ */\n' +
            '    router.post(\'/api/getLevel1TypeList\', controller.type.getLevel1TypeList);\n' +
            '    router.get(\'/api/getLevel1TypeList\', controller.type.getLevel1TypeList);\n' +
            '\n' +
            '    /** -----------分类筛选视频 ------------ */\n' +
            '    router.post(\'/api/getTypeData\', controller.vod.getTypeData);\n' +
            '    router.get(\'/api/getTypeData\', controller.vod.getTypeData);\n' +
            '\n' +
            '    /** -----------根据分类获取视频(limit 6) ------------ */\n' +
            '    router.post(\'/api/getVodListByType\', controller.vod.getVodListByType);\n' +
            '    router.get(\'/api/getVodListByType\', controller.vod.getVodListByType);\n' +
            '\n' +
            '    /** -----------获取推荐视频 ------------ */\n' +
            '    router.post(\'/api/getRecommendedVideos\', controller.vod.getRecommendedVideos);\n' +
            '    router.get(\'/api/getRecommendedVideos\', controller.vod.getRecommendedVideos);';
    }
}

module.exports = HomeController;
