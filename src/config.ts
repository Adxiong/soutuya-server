/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-07 23:25:45
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 16:20:35
 */

interface ConfigStruct {
  server: {
    port: number,
    host: string
  },
  sqlConfig: {
    host: string,
    user: string,
    password: string,
    database: string
  }
}

const Config: ConfigStruct = {
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  sqlConfig: {
    host: "127.0.0.1",
    user: "adxiong",
    password: "0417.xyl",
    database: "tuya"
  }
}

export default Config