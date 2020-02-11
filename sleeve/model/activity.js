import {Http} from "../utils/http";

class Activity {
    // 当前可使用的活动name=a-2, a-2标识Home主页里的优惠活动

    static locationD= 'a-2'
    static async getHomeLocationD(){
        return await Http.request({
            url:`activity/name/${Activity.locationD}`
        })
    }
}
export {
    Activity
}
