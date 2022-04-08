/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:36:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 16:36:11
 */


import * as log4js from 'log4js';
import * as path from 'path';

log4js.configure( {
  appenders: {
    console: {
      type: "console"
    },
    file: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../logs/sqlQueryPlatform.log'),
      alwaysIncludePattern: true,
      daysToKeep: 5
    }
  },
  categories: {
    default: {
      appenders: ['console','file'],
      level: 'info'
    }
  },
  pm2: true
})

const logger = log4js.getLogger()
export default logger