/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 11:00:50
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 10:55:15
 */

import { Router } from "express"
import user from "./user"
import pic from "./pic"

const router = Router()

router.use("/user", user)
router.use("/pic", pic)

export default router