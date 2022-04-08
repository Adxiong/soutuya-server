/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:34:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-08 16:34:33
 */
import * as _ from "lodash"
import { v4 as uuidv4 } from 'uuid'
class Util {
  toCamelObj (obj: object): object {
    const result = {}
    for (const key in obj) {
      if (_.isFunction(obj[key])) continue
      result[_.camelCase(key)] = obj[key]
    }
    return result
  }
  uuid (): string {
    return uuidv4()
  }
}


export default new Util()