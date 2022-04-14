/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:10:54
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-14 18:56:50
 */

export interface InsertPicParams {
  name: string,
  addr: string,
  uploader: string,
}

export interface PicInstance extends InsertPicParams{
  id: number
}

