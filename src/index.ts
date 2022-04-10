import { cors } from 'cors';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-07 23:23:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 23:22:47
 */

import * as express from "express"
import config from './config'
const cors =  require("cors")
import * as session from "express-session"
import jsonwebtoken from "jsonwebtoken"
import api from "./controll"
import util from './utils/util';
const expressIp = require('express-ip')
const app = express()

app.use(cors())
app.use(expressIp().getIpInfoMiddleware)
app.use(session({
  genid: (req) => {
    return util.uuid()
  },
  secret: 'keyboard cat',
}))
app.use(express.urlencoded())
app.use(express.json())

app.use('/api', api)

app.listen( config.server.port, config.server.host, () => {
  console.log(`http://${config.server.host}:${config.server.port}`);
} )