import {Http} from "./http";

class Paging{
    count
    start
    locker=false
    req
    url
    moreData =true
    accumulator=[]

    constructor(req,count=10,start=0){
        this.count=count
        this.start= start
        this.req = req
        this.url= req.url
    }

    async getMoreData(){
        if(!this.moreData){
            return
        }
        if(!this._getLocker()){
            return
        }
        const data = await this._actualGetData()
        this._relaseLocker()
        return data
    }
    async _actualGetData(){
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if(!paging){
            return null
        }
        if(paging.tatal===0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        this.moreData=this._moreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start+=this.count
        }
        this._accumulate(paging.items)
        return {
            empty: false,
            items:paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }


     /*   return {
            empty:true,
            items:[],
            moreData:true,
            accumulator:[]
        }*/
    }
    _accumulate(items){
        this.accumulator= this.accumulator.concat(items)
    }
    _moreData(totalPage,pageNum){
        return pageNum<totalPage-1
    }
    _getCurrentReq(){
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.indexOf('?')!==-1){
            url+='&'+params
        }else {
            url+='?'+params
        }
        this.req.url = url
        return this.req
    }
    //获取锁的状态 如果有锁，表示不可以继续请求数据，返回false，如果没锁，表示可以继续请求数据，返回true
    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker=true
        return true
    }
    //释放锁
    _relaseLocker(){
        this.locker = false
    }
}
export {
    Paging
}
