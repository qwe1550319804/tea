"use strict";
const axios = require("axios");
const wxpush = require("./utils/wxpush");
const dayjs = require('dayjs');
const formattedDate = dayjs().format('YYYYMMDD');
var count;
const cron = require('node-cron');
var time;
// cron.schedule('0 * * * *', () => {
//   count= '来金雨轩茶社',
//    time = [
//   { "timeStart": `${Number(formattedDate) + 1}000000`, "timeEnd": `${Number(formattedDate) + 1}235959` },
//   { "timeStart": `${Number(formattedDate) + 2}000000`, "timeEnd": `${Number(formattedDate) + 2}235959` },
//   init()
// ]
// });
  count= '来金雨轩茶社',
   time = [
  { "timeStart": `${Number(formattedDate) + 1}000000`, "timeEnd": `${Number(formattedDate) + 1}235959` },
  { "timeStart": `${Number(formattedDate) + 2}000000`, "timeEnd": `${Number(formattedDate) + 2}235959` },]
  init()
async function init() {
  for (let i = 0; i < 2; i++) {
       await getcount(time[i]);
  }
   await wxPusher();
}
async function getcount(i) {
  const { data } = await axios({
      url: 'https://book.isv.youzan.com/api/v2/order/getListByStartedTime',
      method: "post",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
      data:{"kdtid":111097322,"serviceId":9375184,"mode":1,...i}
      // data: {"kdtid":111097322,"serviceId":9375184,"timeStart":"20231116000000","timeEnd":"20231116235959","mode":1}
  })
  let num = 8 - data.count
  let times=i.timeStart.substring(0, 8);
  count = count + times + '还有' + num + '桌,'
  

    //  await wxPusher();
}
async function wxPusher() {
  await wxpush({
    e: count,
    contentType: 1, // 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
    uids: ["UID_HuUC4LWfVPfHlP5QlkUEpOvku5Gm",
    // "UID_OzYvGIbY4lAHqrpys1kqNkXuOsAc" //大萌
  ]
  });
}
