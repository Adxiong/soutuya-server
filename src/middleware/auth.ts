/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-04 22:17:35
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-04 22:21:52
 */
import { NextFunction, Request, Response } from "express"
import { ApiResult, ResponseStatus } from "../utils/apiResult"
import logger from "../utils/logger"


export default function (req: Request, res: Response, next: NextFunction): void {
  const whiteList = ['/api/user/login', '/api/user/regist',]
  if (req["session"].currentUser || whiteList.includes(req.path)) {
    logger.info('登录状态检查正常', req.path)
    next()
  } else {
    res.json(new ApiResult(ResponseStatus.notLogin, null, '系统未登录'))
  }
}