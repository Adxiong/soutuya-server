/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-08 16:34:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-09 17:19:51
 */
import * as _ from "lodash"
import { v4 as uuidv4 } from 'uuid'
import { createHmac } from "crypto"
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

  randomSalt (): string {
    const data = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k",'l',"m",'n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',"Q",'R','S',"T",'U',"V",'W','X','Y','Z']
    let code = ""
    let count = 6
    for( let i = 0 ; i < count; i++){
      code += data[Math.floor(Math.random()*data.length)]
    }
    return code
  }

  encryption (value: string, salt: string): string {
    return createHmac('sha256', salt).update(value).digest('hex')
  }
}


export default new Util()