/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:58:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-16 03:58:30
 */

interface UserInfo {
  id: number
  user: string
  password: string
  nick: string
  avatar: string
  createTime: string
  salt: string
  lastTime: string
  lastIp: string
  lastPlatform: string
}

interface RegisterParams {
  user: string
  password: string,
  nick: string,
  lastIp?: string,
  lastPlatform?: string,
}

interface UpdateUserInfoParams {
  id: string,
  nick?: string,
  password?: string,
  avatar?: string
}