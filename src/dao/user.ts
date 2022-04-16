/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:52:06
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-16 04:05:46
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
    try {
      const result: UserInfo[] = await pool.query<UserInfo[]>(sql, [user])
      return result.length ? result[0] : null
    }catch( err ){
      throw err
    }
    
  }

  /**
   * 账号注册
   * @param params RegisterParams
   * @returns resolve is boolean, reject is Error
   */
  async register(params: RegisterParams): Promise<boolean> {
    const sql =`
      INSERT INTO USER(
        id, user,password,nick,avatar,create_time,salt,last_time,last_ip,last_platform
      )
      VALUES(?,?,?,?,?,?,?,?,?,?)`
      const id = util.uuid()
      const salt = util.randomSalt()
      const time = new Date()
      try {
        await pool.write(sql, [
          id,
          params.user,
          util.encryption(params.password, salt),
          params.nick,
          "",
          time,
          salt,
          time,
          params.lastIp ?? "",
          params.lastPlatform ?? ""
        ])
        return true
      }
      catch( err ){
        throw(err)
      }
  }

  async updateUserInfoById(data: UpdateUserInfoParams):Promise<boolean> {
    const props = []
    const params = []
    for (const key in data) {
      if (key !== 'id' && data[key]) {
        props.push(`${key}=?`)
        params.push(data[key])
      }
    }
    params.push(data.id)
    const sql = `update user set ${props.join(',')} where id=?`
    try{
      await pool.write(sql, params)
      return true
    } catch(e){
      throw(e)
    }
  }

}


export default new UserDao()
