import {config} from "../config/config";

class Theme {
    static getHomeLocationA(callback){
        wx.request({
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
        })
    }
}
export {
    Theme
}
