/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-07 23:25:45
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-11 21:33:50
 */
import * as qiniu from "qiniu"
interface ConfigStruct {
  server: {
    port: number,
    host: string
  },
  sqlConfig: {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
  },
  qiniuConfig: {
    accessKey: string,
    secretKey: string,
    scope: string,
    zone: qiniu.conf.Zone,
    domain: string
  }
}

const Config: ConfigStruct = {
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  sqlConfig: {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "soutuya",
    port: 3306,
  },
  qiniuConfig: {
    accessKey: "3A7cP4Y8RnJnsvkpbihcHkPx229dkCksouZjuSCI",
    secretKey: "3ebSGPX_opXt9ZNBXx5Df2zQY61pIqZ_0r2zBttY",
    scope: "adxiong-images",
    zone: qiniu.zone.Zone_z2,
    domain: "http://ra6ar9f90.hn-bkt.clouddn.com/"
  }
}

export default Config