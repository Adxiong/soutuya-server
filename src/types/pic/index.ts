/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-11 23:10:54
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-05 22:26:29
 */

export interface InsertPicParams {
  title: string,
  keyWord: string
  name: string,
  addr: string,
  uploader: string,
  key: string
}

export interface PicInstance extends InsertPicParams{
  id: number
}

