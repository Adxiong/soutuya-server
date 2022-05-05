/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 21:41:17
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-05 22:39:48
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
    const sql = "INSERT INTO PIC(name, title, keyWord, addr, uploader, `key`) VALUES(?, ?, ?, ?, ?,?)"
    try {
      await pool.write(sql, [params.name, params.title, params.keyWord, params.addr, params.uploader, params.key])
      return true
    }catch(e) {
      throw(e)
    }
  }

  async myUploadPics(start: number, num: number): Promise<PicInstance[]>{
    const sql = "SELECT * FROM pic WHERE id > ? LIMIT ?"
    try {
      const data = await pool.query<PicInstance[]>(sql, [start, num])
      return data.length ? data : []
    }catch (e) {
      throw(e)
    }
  }


  async batchDeletePic(data: string[]): Promise<boolean> {
    const sql = "DELETE FROM pic WHERE `key` in ( ? )"
    try{
      await pool.query(sql, [data])
      return true
    }catch (e) {
      throw(e)
    }
  }

}

export default new PicDao()