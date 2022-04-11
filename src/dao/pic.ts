/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 21:41:17
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-11 23:42:43
 */
import pool from "./pool"
import { InsertPicParams, PicInstance } from "../types/pic"

class PicDao {

  async pageQueryPics(num:number, start: number): Promise<PicInstance[]> {
    const sql = "SELECT * from PIC WHERE ID > ? ORDER BY ID ASC LIMIT ?;"
    try{
      const res: PicInstance[] = await pool.query<PicInstance[]>(sql, [start, num])
      return res.length ? res : []
    }catch(e){
      throw(e)
    }
  }

  async insertPic(params: InsertPicParams): Promise<boolean>{
    const sql = "INSERT INTO PIC(name, addr, uploader) VALUES(?, ?, ?)"
    try {
      await pool.write(sql, [params.name, params.addr, params.uploader])
      return true
    }catch(e) {
      throw(e)
    }

  }
}

export default new PicDao()