/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:18:19
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-27 00:24:32
 */


import PicDao from "../dao/pic";
import { InsertPicParams, PicInstance } from "../types/pic";
import qiNiu from "../utils/qiNiu";


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

  async batchDeletePic(data:string[]): Promise<any>{
    const keyObjFormData = data.map( item => {return {key: item}})
    return qiNiu.batchDelete(keyObjFormData)
  }
}

export default new PicServer()