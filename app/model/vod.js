'use strict';

module.exports = app => {
    const { INTEGER, SMALLINT, TEXT, TINYINT, STRING, MEDIUMINT, DECIMAL, NUMBER } = app.Sequelize;
    return app.model.define('mac_vod', {
        vod_id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        type_id: SMALLINT,
        type_id_1: SMALLINT,
        group_id: SMALLINT,
        vod_name: STRING,
        vod_sub: STRING,
        vod_en: STRING,
        vod_status: TINYINT,
        vod_letter: STRING,
        vod_color: STRING,
        vod_tag: STRING,
        vod_class: STRING,
        vod_pic: STRING,
        vod_pic_thumb: STRING,
        vod_pic_slide: STRING,
        vod_pic_screenshot: TEXT,
        vod_actor: STRING,
        vod_director: STRING,
        vod_writer: STRING,
        vod_behind: STRING,
        vod_blurb: STRING,
        vod_remarks: STRING,
        vod_pubdate: STRING,
        vod_total: MEDIUMINT,
        vod_serial: STRING,
        vod_tv: STRING,
        vod_weekday: STRING,
        vod_area: STRING,
        vod_lang: STRING,
        vod_year: STRING,
        vod_version: STRING,
        vod_state: STRING,
        vod_author: STRING,
        vod_jumpurl: STRING,
        vod_tpl: STRING,
        vod_tpl_play: STRING,
        vod_tpl_down: STRING,
        vod_isend: TINYINT,
        vod_lock: TINYINT,
        vod_level: TINYINT,
        vod_copyright: TINYINT,
        vod_points: SMALLINT,
        vod_points_play: SMALLINT,
        vod_points_down: SMALLINT,
        vod_hits: MEDIUMINT,
        vod_hits_day: MEDIUMINT,
        vod_hits_week: MEDIUMINT,
        vod_hits_month: MEDIUMINT,
        vod_duration: STRING,
        vod_up: MEDIUMINT,
        vod_down: MEDIUMINT,
        vod_score: DECIMAL,
        vod_score_all: MEDIUMINT,
        vod_score_num: MEDIUMINT,
        vod_time: NUMBER,
        vod_time_add: NUMBER,
        vod_time_hits: NUMBER,
        vod_time_make: NUMBER,
        vod_trysee: SMALLINT,
        vod_douban_id: NUMBER,
        vod_douban_score: DECIMAL,
        vod_reurl: STRING,
        vod_rel_vod: STRING,
        vod_rel_art: STRING,
        vod_pwd: STRING,
        vod_pwd_url: STRING,
        vod_pwd_play: STRING,
        vod_pwd_play_url: STRING,
        vod_pwd_down: STRING,
        vod_pwd_down_url: STRING,
        vod_content: TEXT,
        vod_play_from: STRING,
        vod_play_server: STRING,
        vod_play_note: STRING,
        vod_play_url: TEXT,
        vod_down_from: STRING,
        vod_down_server: STRING,
        vod_down_note: STRING,
        vod_down_url: TEXT,
        vod_plot: TINYINT,
        vod_plot_name: TEXT,
        vod_plot_detail: TEXT,
    }, {
        tableName: 'mac_vod',
    });
};

