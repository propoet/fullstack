//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        demo: [{
            image: 'https://img.mukewang.com/climg/5e083f43092680e504270696.jpg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://tiebapic.baidu.com/forum/w%3D580%3B/sign=aa463f8f46da81cb4ee683c5625dd116/b64543a98226cffc193f68c9ae014a90f603eab0.jpg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        }, {
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580491599906&di=2343557f7a6f3342abe879572ea1bd9d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F01%2F20161001185821_r4MPC.jpeg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        },{
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580491599906&di=2343557f7a6f3342abe879572ea1bd9d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F01%2F20161001185821_r4MPC.jpeg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        },{
            image: 'https://img.mukewang.com/climg/5e1ac7ce08faefa403720692.jpg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        }]
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        wx.lin.renderWaterFlow(this.data.demo, false, () => {
            console.log('渲染成功')
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
