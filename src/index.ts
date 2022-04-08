import { cors } from 'cors';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-07 23:23:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-07 23:34:20
 */

import * as express from "express"
import config from './config'
const cors =  require("cors")
import jsonwebtoken from "jsonwebtoken"
const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())


app.listen( config.server.port, config.server.host, () => {
  console.log(`http://${config.server.host}:${config.server.port}`);
} )