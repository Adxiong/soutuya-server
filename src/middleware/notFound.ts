/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-04 20:57:42
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-04 20:57:42
 */

import logger from "../utils/logger"
import { Request, Response } from "express"

export default function (req: Request, res: Response): void {
  logger.error(`404请求: ${req.path}`)
  res.status(404).send('request not found')
}
