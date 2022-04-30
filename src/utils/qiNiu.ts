/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 15:32:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-27 00:39:55
 */

import * as qiniu from "qiniu"
import Config from "../config"

class QiNiu {
  private formUploader: qiniu.form_up.FormUploader
  private putExtra: qiniu.form_up.PutExtra
  private config: qiniu.conf.Config
  private uploadToken: string
  private options= {
    scope: Config.qiniuConfig.scope
  }
  private mac: qiniu.auth.digest.Mac
  private bucketManager: qiniu.rs.BucketManager
  private publicBucketDomain: string = Config.qiniuConfig.domain
  constructor(){
    this.config = new qiniu.conf.Config({
      zone: Config.qiniuConfig.zone
    })
    this.mac = new qiniu.auth.digest.Mac(Config.qiniuConfig.accessKey, Config.qiniuConfig.secretKey)
    this.formUploader = new qiniu.form_up.FormUploader()
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
    this.putExtra = new qiniu.form_up.PutExtra()
  }

  key() {
    return +new Date() + Math.random().toString(16).slice(2);
  }
  async upload(readableStream, ): Promise<Record<string, any>>{
    const key = this.key()
    this.uploadToken = new qiniu.rs.PutPolicy(this.options).uploadToken(this.mac)
    return new Promise(( resolve, reject) => {
      this.formUploader.putStream(this.uploadToken, key, readableStream, this.putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr)
        } else {
          resolve(respBody)
        }
      })
    })
  }

  download(key: string): string{
      return this.bucketManager.publicDownloadUrl(this.publicBucketDomain, key)  
  }

  async batchDelete(data: {key: string}[]): Promise<any>{
    const deleteOperations = data.map(item => qiniu.rs.deleteOp(Config.qiniuConfig.scope , item.key))
    return new Promise((resolve, reject) => {
      console.log(deleteOperations);
      
      this.bucketManager.batch(deleteOperations, (e: Error, respBody: any, respInfo: any) => {
        if(e){
          reject(e)
        }
        if (parseInt(respInfo.statusCode) / 100 == 2) {
          resolve(respBody)
        } else {
          reject({deleteusCode: respInfo.deleteusCode, data: JSON.stringify(respBody)})
        }
      })
    })
  }
  
}

export default new QiNiu()