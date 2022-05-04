/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:09:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-04 22:21:37
 */

enum ResponseStatus {
  success = 200,
  fail = 500,
  notLogin
}

class ApiResult {
  status: ResponseStatus
  data: string | object | null
  message: string
  
  constructor(
    status: ResponseStatus, 
    data?: string | object | null,
    message?: string 
  ){
    this.status = status
    this.data = data,
    this.message = message
  }
}

export {
  ApiResult,
  ResponseStatus
}