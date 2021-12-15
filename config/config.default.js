/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1636093856105_2074';

    // add your middleware config here
    config.middleware = [ 'errorHandler' ];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        listen: {
            port: 7001,
            hostname: '127.0.0.1',
        },
        validate: {
            convert: true,
        },
        sequelize: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'database',
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
            },
            define: {
                timestamps: false, // true by default
                freezeTableName: true,
                dialectOptions: {
                    dateStrings: true,
                    typeCast: true,
                },
            },
            timezone: '+08:00', // 东八时区
        },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',

        },
        origin: {
            whiteList: [ '*' ],
        },
        security: {
            domainWhiteList: [ '*' ],
            csrf: {
                enable: false,
            },
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};
