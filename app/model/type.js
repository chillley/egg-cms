'use strict';
module.exports = app => {
    const { SMALLINT, TEXT, TINYINT, STRING } = app.Sequelize;
    return app.model.define('mac_type', {
        type_id: {type: SMALLINT, primaryKey: true, autoIncrement: true},
        type_name: STRING,
        type_en: STRING,
        type_sort: SMALLINT,
        type_mid: SMALLINT,
        type_pid: SMALLINT,
        type_status: TINYINT,
        type_tpl: STRING,
        type_tpl_list: STRING,
        type_tpl_detail: STRING,
        type_tpl_play: STRING,
        type_tpl_down: STRING,
        type_key: STRING,
        type_des: STRING,
        type_title: STRING,
        type_union: STRING,
        type_extend: TEXT,
        type_logo: STRING,
        type_pic: STRING,
        type_jumpurl: STRING,
    }, {
        tableName: 'mac_type',
    });
};

