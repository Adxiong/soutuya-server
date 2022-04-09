/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-07 23:25:45
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 18:15:55
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
    database: string,
    port: number
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
   
  }
}

export default Config