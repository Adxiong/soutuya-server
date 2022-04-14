/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:18:19
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-14 19:01:15
 */


import PicDao from "../dao/pic";
import { InsertPicParams, PicInstance } from "../types/pic";


class PicServer{
  async pageQueryPics(num: number, start: number): Promise<PicInstance[]>{
    return await PicDao.pageQueryPics(num, start)
  }

  async insertPic(params: InsertPicParams): Promise<boolean>{
    return await PicDao.insertPic(params)
  }

  async myUploadPics(start: number, num: number): Promise<PicInstance[]>{
    return await PicDao.myUploadPics(start, num)
  }
}

export default new PicServer()