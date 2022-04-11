/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:01:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-11 23:47:38
 */

import { Router, Request, Response, NextFunction } from "express"
import formidable = require("formidable")
import { ApiResult, ResponseStatus } from "../utils/apiResult";
import qiNiu from "../utils/qiNiu";
import * as fs from "fs"
import PicServer from '../service/pic'

const router = Router()

/**
 * recommend 图片推荐
 * @param { num:数量; time:时间(ms) }
 */
router.get('/recommend', async(req: Request, res: Response, next: NextFunction) => {

  // return res.json(new ApiResult(ResponseStatus.success, {view:  req["session"].uv} , "ok"))
  const {
    num,
    start,
    time,
  } = req.query
  
  try{
    const result = await PicServer.pageQueryPics(+num, +start || 0) 
    return res.json(new ApiResult(ResponseStatus.success, {data: result}, "success"))
  }catch(e){
    console.log(e);
  }

})

/**
 * upload 图片上传
 * @param { files:文件; time:时间(ms); id: 上传者id }
 */
router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async(err,fields,files)=> {
    if(err){
      console.log(err);
    }
    console.log(`fields====>`, fields);
    // console.log(`files=====>`, files);
    const file = fs.createReadStream(files["file"]['filepath'])

    try{
      const result = await qiNiu.upload( file)
      PicServer.insertPic({
        name: files["file"]["originalFilename"],
        addr: result.key,
        uploader: "",
      })
      console.log(result);
      return res.json(new ApiResult(ResponseStatus.success, {result: true}, "success"))
    }catch(e) {
      console.log(e);
      
    }
    
  })
  
})

export default router