import {config} from "../config/config";
import {Http} from "../utils/http";

class Theme {
    static getHomeLocationA(callback){
       /* wx.request({
            url: `${config.apiBaseUrl}theme/by/names`,
            method: 'GET',
            data: {
                names: 't-1'
            },
            header: {
                appkey: config.appkey
            },
            success: (res) => {
                callback(res.data)
            }
        })*/

       Http.request({
           url:'theme/by/names',
           data:{
               names: 't-1'
           },
           callback:data=>{
               callback(data)
           }

       })
    }
}
export {
    Theme
}
