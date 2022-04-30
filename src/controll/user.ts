/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:01:54
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-18 22:26:31
 */

import { Router, Request, Response, NextFunction } from "express";
import { ApiResult, ResponseStatus } from "../utils/apiResult";
import UserServer from "../service/user"
import util from "../utils/util";
import formidable = require("formidable");
import * as fs from "fs";
import qiNiu from "../utils/qiNiu";
import Config from "../config";

const router = Router()


router.get("/currentUser", (req: Request, res: Response) => {
  if(req['session'].currentUser) {
    return res.json(new ApiResult(ResponseStatus.success, {...req['session'].currentUser} , "登录成功" ))
  }else {
    return res.json(new ApiResult(ResponseStatus.fail, null, "账户过期"))
  }
})

router.get("/logout", async(req: Request, res: Response) => {
  req["session"].destroy()
  return res.json(new ApiResult(ResponseStatus.success, {result: true}, "success"))
})

/**
 * login 登录
 * @param { user: 账号; pw: 密码; time:时间(ms) }
 */
router.post("/login", async(req: Request, res: Response) => {
  const { user, password } = req.body
  
  console.log(`ip===>`,req['ipInfo'])
  if( !user || !password ) {
    return res.json(new ApiResult(ResponseStatus.fail, null, "账号或者密码为空！"))
  }
  try{
    const userInfo: UserInfo = await UserServer.queryByUser(user)
    if( userInfo ) {
      const pwAndSalt = util.encryption(password, userInfo.salt)
      if ( pwAndSalt === userInfo.password) {
        req['session'].currentUser = {
          id: userInfo.id,
          avatar: userInfo.avatar,
          user: userInfo.user,
          nick: userInfo.nick
        }
        return res.json(new ApiResult(ResponseStatus.success, {
          id: userInfo.id,
          avatar: userInfo.avatar,
          nick: userInfo.nick,
          user: userInfo.user
        }, "登录成功"))
      } else {
        return res.json(new ApiResult(ResponseStatus.fail, null, "密码错误"))
      }
    }else {
      return res.json(new ApiResult(ResponseStatus.fail, null, "该账号不存在"))
    }
  }
  catch(e){
    return res.json(new ApiResult(ResponseStatus.fail, null, e.message))
  }
})

/**
 * register 注册
 * @param { user: 账号; pw: 密码; time: 时间(ms); nick: 用户名}
 */
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  const { user, password, nick } = req.body
  console.log(req.headers);
  if ( !user || !password || !nick ){
    return res.json(new ApiResult(ResponseStatus.fail, null, "数据填写不完整"))
  }
  const data: RegisterParams = {
    user,
    password,
    nick
  }
  try{
    const result = await UserServer.register(data)
    return res.json(new ApiResult(ResponseStatus.success, null, "注册成功"))
  }catch(e){
    return res.json(new ApiResult(ResponseStatus.fail, null, e.message))
  }
})


router.post('/uploadAvatar', (req: Request, res: Response, next: NextFunction) => {
  if(!req['session'].currentUser){
    return res.json(new ApiResult(ResponseStatus.fail, null, "身份验证失败"))
  }
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
      const addr = Config.qiniuConfig.domain + result.key
      UserServer.uploadAvatar({
        id: req['session'].currentUser.id,
        avatar: addr
      })
      return res.json(new ApiResult(ResponseStatus.success, {addr}, "success"))
    }catch(e) {
      console.log(e);
      
    }
    
  })
  
})

export default router 
