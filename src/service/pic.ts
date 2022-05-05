/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:18:19
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-05 22:22:53
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

  async batchDeletePic(data:string[]): Promise<boolean>{
    const keyObjFormData = data.map( item => {return {key: item}})
    qiNiu.batchDelete(keyObjFormData)
    return await PicDao.batchDeletePic(data)
  }
}

export default new PicServer()