/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:01:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 11:26:20
 */

import { Router, Request, Response, NextFunction } from "express"
import formidable = require("formidable")

const router = Router()

/**
 * recommend 图片推荐
 * @param { num:数量; time:时间(ms) }
 */
router.get('/recommend', (req: Request, res: Response, next: NextFunction) => {
  const {
    num,
    time,
  } = req.params
})


/**
 * upload 图片上传
 * @param { files:文件; time:时间(ms); id: 上传者id }
 */
router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err,fields,files)=> {
    if(err){
      console.log(err);
    }
    console.log(`fields====>${fields}`);
    console.log(`files=====>${files}`);
  })
})

export default router