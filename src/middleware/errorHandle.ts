/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-04 20:53:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-04 20:56:42
 */

import { NextFunction, Request, Response } from 'express';
import { ApiResult, ResponseStatus } from '../utils/apiResult';
import logger from '../utils/logger';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(`接口错误-${req.path}}`, err.message)
  res.json(new ApiResult(ResponseStatus.fail, null, err.message))
}