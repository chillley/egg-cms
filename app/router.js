'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);

    /** -----------视频列表 ------------ */
    router.post('/api/getVodList', controller.vod.getVodList);
    router.get('/api/getVodList', controller.vod.getVodList);

    /** -----------视频详情 ------------ */
    router.post('/api/getVodDetails', controller.vod.getVodDetails);
    router.get('/api/getVodDetails', controller.vod.getVodDetails);

    /** -----------所有分类 ------------ */
    router.post('/api/getAllTypeList', controller.type.getAllTypeList);
    router.get('/api/getAllTypeList', controller.type.getAllTypeList);

    /** -----------获取一级分类 ------------ */
    router.post('/api/getLevel1TypeList', controller.type.getLevel1TypeList);
    router.get('/api/getLevel1TypeList', controller.type.getLevel1TypeList);


    router.post('/api/getLevel2TypeList', controller.type.getLevel2TypeList);
    router.get('/api/getLevel2TypeList', controller.type.getLevel2TypeList);

    /** -----------分类筛选视频 ------------ */
    router.post('/api/getTypeData', controller.vod.getTypeData);
    router.get('/api/getTypeData', controller.vod.getTypeData);

    /** -----------根据分类获取视频(limit 6) ------------ */
    router.post('/api/getVodListByType', controller.vod.getVodListByType);
    router.get('/api/getVodListByType', controller.vod.getVodListByType);

    /** -----------获取推荐视频 ------------ */
    router.post('/api/getRecommendedVideos', controller.vod.getRecommendedVideos);
    router.get('/api/getRecommendedVideos', controller.vod.getRecommendedVideos);

    router.post('/api/getVideosPlayerList', controller.vod.getFqVideosPlayerList);
    router.get('/api/getVideosPlayerList', controller.vod.getFqVideosPlayerList);

    router.post('/api/getVodPlayVideoSourceFormat', controller.vod.getVodPlayVideoSourceFormat);
    router.get('/api/getVodPlayVideoSourceFormat', controller.vod.getVodPlayVideoSourceFormat);

    router.post('/api/getFqVideosPlayerList', controller.vod.getFqVideosPlayerList);
    router.get('/api/getFqVideosPlayerList', controller.vod.getFqVideosPlayerList);

    router.post('/api/getFqVideosPlayerListByFq', controller.vod.getFqVideosPlayerListByFq);
    router.get('/api/getFqVideosPlayerListByFq', controller.vod.getFqVideosPlayerListByFq);


};
