/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:18:19
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-11 23:21:08
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
}

export default new PicServer()