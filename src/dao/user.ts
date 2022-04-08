/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:52:06
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 18:07:31
 */
import util from "../utils/util";
import pool from "./pool";

class UserDao {
  
  /**
   * 根据user查找用户信息
   * @param user string
   * @returns result include UserInfo or NULL
   */
  async queryByUser(user: string): Promise<UserInfo | null>{
    const sql = 'SELECT * FROM user WHERE user = ? LIMIT 1'
    const result: UserInfo = await pool.query<UserInfo>(sql, [user]) || null
    return result
  }

  /**
   * 账号注册
   * @param params RegisterParams
   * @returns resolve is boolean, reject is Error
   */
  async register(params: RegisterParams): Promise<boolean> {
    const sql =`
      INSERT INTO USER
      VALUES(
        id: ?,
        user: ?,
        password: ?,
        nick: ?,
        avatar: ?,
        createTime: ?,
        salt: ?,
        lastTime: ?,
        lastIp: ?,
        lastPlatform: ?
      )`
      const id = util.uuid()
      const salt = ""
      const password = ""
      const time = new Date().toString()
      try {
        await pool.write(sql, [
          id,
          params.user,
          password,
          params.nick,
          time,
          salt,
          time,
          params.lastIp,
          params.lastPlatform
        ])
        return true
      }
      catch( err ){
        throw(err)
      }
  }

}


export default UserDao
