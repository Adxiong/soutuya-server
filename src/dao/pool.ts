/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:17:35
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 18:06:49
 */

import * as mysql from "mysql"
import util from "../utils/util"
import logger from "../utils/logger"
import Config from "../config"


function formatRes <T>(sql: string, res: any): T[] {
  if (/^(\s*select)/i.test(sql)) {
    const list = []
    res.forEach((item: object) => {
      list.push(util.toCamelObj(item))
    })
    return list
  } else {
    return res
  }
}

const pool: mysql.Pool = mysql.createPool(Config.sqlConfig)

class Pool {

  query<T>(sql: string, params?: any[]): Promise<T> {
    logger.info('sql quert', sql, params)
    return new Promise( (resolve, reject) => {
      pool.query(sql, params, (err, res)=>{
        if(err){
          logger.error("执行query语句错误", err.sql)
          reject(err)
        }else {
          resolve(res)
        }
      })
    })
  }
  write (sql: string, params?: any[]): Promise<mysql.OkPacket> {
    logger.info('sql insert: ', sql, params)
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) {
          logger.error('执行insert语句错误', err.sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  beginTransaction (): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection: mysql.PoolConnection) => {
        if (err) {
          logger.error('获取数据库连接失败', err)
          reject(err)
          return
        }
        connection.beginTransaction(error => {
          if (error) {
            logger.error('开启事务失败', error)
            reject(error)
          } else {
            resolve(connection)
          }
        })
      })
    })
  }

  queryInTransaction<T> (connect: mysql.PoolConnection, sql: string, params?: Array<string|number>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      logger.info('query in transaction', sql, params)
      connect.query(sql, params, (err, results) => {
        if (err) {
          logger.error('事务中执行sql失败', err.sql)
          reject(err)
        } else {
          resolve(formatRes(sql, results))
        }
      })
    })
  }

  writeInTransaction (connect: mysql.PoolConnection, sql: string, params?: any[]): Promise<mysql.OkPacket> {
    return new Promise((resolve, reject) => {
      logger.info('insert in transaction', sql, params)
      connect.query(sql, params, (err, result) => {
        if (err) {
          logger.error('事务中执行sql失败', err.sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  commit (connection: mysql.PoolConnection): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.commit(err => {
        if (err) {
          logger.error('提交事务失败', err)
          reject(err)
        } else {
          connection.release()
          resolve()
        }
      })
    })
  }
  
  rollback (connection: mysql.PoolConnection): void {
    connection.rollback(() => {
      connection.release()
    })
  }
}


export default new Pool()