/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-09 17:47:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 23:01:11
 */

import UserDao from "../dao/user";


class UserServer {

  async queryByUser(user: string): Promise<UserInfo | null> {
    return await UserDao.queryByUser(user)
  }

  async register(data: RegisterParams): Promise<boolean>{
    return await UserDao.register(data)
  }
}

export default new UserServer()