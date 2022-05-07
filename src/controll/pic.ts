/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:01:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-07 23:23:44
 */

import { Router, Request, Response, NextFunction } from "express"
import formidable = require("formidable")
import { ApiResult, ResponseStatus } from "../utils/apiResult";
import qiNiu from "../utils/qiNiu";
import * as fs from "fs"
import PicServer from '../service/pic'
import Config from "../config";
import path = require("path");

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
    const file = fs.createReadStream(files["files"]['filepath'])    
    console.log(file);
    
    try{
      const result = await qiNiu.upload( file)
      const addr = Config.qiniuConfig.domain + result.key
      PicServer.insertPic({
        title: fields['title'] as string,
        keyWord: fields["keyWord"] as string,
        name: files["files"]["originalFilename"],
        addr,
        uploader: req['session'].currentUser.id,
        key: result.key
      })
      return res.json(new ApiResult(ResponseStatus.success, {result: true ,addr:Config.qiniuConfig.domain + result.key}, "success"))
    }catch(e) {
      console.log(e);
      return res.json(new ApiResult(ResponseStatus.fail, null, e.message.toString()))
    }
    
  })
  
})

router.get("/myUploadPics", async(req: Request, res: Response, next: NextFunction) => {
  if(req['session']) {
    const page : number = +req.query['page'] || 0
    const num: number = +req.query['num'] || 0
    const data = await PicServer.myUploadPics(page*num, num)
    return res.json(new ApiResult(ResponseStatus.success, data, "success"))
  } else {
    return res.json(new ApiResult( ResponseStatus.fail, null, "没有权限"))
  }
})

router.post("/batchDeletePic", async(req: Request, res: Response, next: NextFunction) => {
  if(req['session']) {
    const data: string[] = req.body.data
   try {
    const result = await PicServer.batchDeletePic(data)
    if( result) {
      res.json(new ApiResult(ResponseStatus.success, null, "删除成功"))
    } 
   }catch(err){
     console.log(err);
     res.json(new ApiResult(ResponseStatus.fail, null, err.message))
   }
  }
})

export default router