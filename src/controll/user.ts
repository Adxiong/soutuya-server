/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:01:54
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 16:16:34
 */

import { Router, Request, Response } from "express";
import { ApiResult, ResponseStatus } from "../utils/apiResult";

const router = Router()

/**
 * login 登录
 * @param { user: 账号; pw: 密码; time:时间(ms) }
 */
router.post("/login", (req: Request, res: Response) => {
  const { user, pw } = req.body
  if( !user || !pw ) {
    return res.json(new ApiResult(ResponseStatus.fail, null, "账号或者密码为空！"))
  }
  
})

/**
 * register 注册
 * @param { user: 账号; pw: 密码; time: 时间(ms); nick: 用户名}
 */
router.post("/register", (req: Request, res: Response) => {

})

export default router 