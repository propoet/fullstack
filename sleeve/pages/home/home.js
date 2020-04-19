import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE:null,
        themeESpu: [],
        bannerB: null,
        grid: [],
        activityD: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initAllData()
        this.initBottomSpuList()
    },
    async initBottomSpuList(){
        const paging=await SpuPaging.getLatestPaging()
        const data=paging.getMoreData()
        if (!data){
            return
        }
    },
    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()
        const themeA = await theme.getHomeLocationA()
        const themeE = await theme.getHomeLocationE()
        const themeF = await theme.getHomeLocationF()
        const themeH = await theme.getHomeLocationH()
        let themeESpu=[]
        if(themeE.online){
            const data   = await Theme.getHomeLocationESpu()
            if(data){
                themeESpu= data.spu_list.slice(0,8)
            }
        }


        const bannerB = await Banner.getHomeLocationB()
        const bannerG = await Banner.getHomeLocationG()

        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        this.setData({
            themeA,
            themeE,
            themeF,
            themeH,
            themeESpu,
            bannerB,
            bannerG,
            grid,
            activityD
        })

    },
    onPullDownRefresh: function () {

    },


    onReachBottom: function () {

    },


    onShareAppMessage: function () {

    }
})
