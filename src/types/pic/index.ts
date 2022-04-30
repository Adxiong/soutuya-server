/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:10:54
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-30 13:03:31
 */

export interface InsertPicParams {
  title: string,
  keyWord: string
  name: string,
  addr: string,
  uploader: string,
}

export interface PicInstance extends InsertPicParams{
  id: number
}

