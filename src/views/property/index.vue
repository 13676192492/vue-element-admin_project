<template>
  <div class="app-container">
    <div v-show="!plotTable&&!rechargeTable">
      <div class="title-box clearfix">
        <span class="title-name">余额：</span>
        <span class="title-text" v-if="accountData.amount"> {{ accountData.amount }}</span>
        <el-button class="title-button" type="primary" plain @click="goRecharge">充值</el-button>
        <el-button class="title-button" style="margin-right: 30px;" type="primary" plain @click="goPlot">新增关联社区</el-button>
      </div>
      <!--<div>
        <div class="tip-name">已关联社区</div>
        <div v-if="communityData.length">
          <div class="plot-content" v-for="(item, index) in communityData" :key="index">
            <div class="plot-img"><img :src="item.logo"></div>
            <div class="plot-info" style="margin-top: .5%">
              <p class="plot-name">{{item.name}}</p>
              <p><span style="margin-right: 8%;">地址：{{item.address?item.address:'无'}}</span><span>电话：{{item.tel?item.tel:'无'}}</span></p>
            </div>
            <div class="plot-operate">
              &lt;!&ndash;<el-button class="btn-box">取消关联</el-button>&ndash;&gt;
              <p class="btn-txt">{{ item.sipEnable? 'sip通话已开启':'sip通话已关闭' }}</p>
            </div>
          </div>
        </div>
        <div v-else class="none-tip">
          <img class="none-img" :src="noneImgShow">
          <span>暂无关联社区</span>
        </div>
      </div>-->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="已关联社区" name="first">
          <div v-if="communityData.length">
            <div class="plot-content" v-for="(item, index) in communityData" :key="index">
              <div class="plot-img"><img :src="item.logo"></div>
              <div class="plot-info" style="margin-top: .5%">
                <p class="plot-name">{{item.name}}</p>
                <p><span style="margin-right: 8%;">地址：{{item.address?item.address:'无'}}</span><span>电话：{{item.tel?item.tel:'无'}}</span></p>
              </div>
              <div class="plot-operate">
                <!--<el-button class="btn-box">取消关联</el-button>-->
                <p class="btn-txt">{{ item.sipEnable? 'sip通话已开启':'sip通话已关闭' }}</p>
              </div>
            </div>
          </div>
          <div v-else class="none-tip">
            <img class="none-img" :src="noneImgShow">
            <span>暂无关联社区</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已关联应用" name="second">
          <div v-if="appData.length">
            <div class="plot-content" v-for="(item, index) in appData" :key="index">
              <div class="plot-img"><img :src="item.logo"></div>
              <div class="plot-info" style="margin-top: .5%">
                <p class="plot-name">{{item.iotName}}</p>
                <p>
                  <span style="margin-right: 8%;">Appid：{{item.appId}}</span>
                  <span style="margin-right: 8%;">Iot_ID：{{item.iotId}}</span>
                  <span v-show="item.appType">应用类型：{{item.appType===1?'云之讯':''}}</span>
                </p>
              </div>
              <div class="plot-operate">
                <!--<el-button class="btn-box">取消关联</el-button>-->
                <p class="btn-txt">{{ item.sipEnable? 'sip通话已开启':'sip通话已关闭' }}</p>
              </div>
            </div>
            <el-pagination
                    background
                    :current-page="params.page"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="params.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
          </div>
          <div v-else class="none-tip">
            <img class="none-img" :src="noneImgShow">
            <span>暂无关联应用</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <connect-plot ref="plotChild" v-show="plotTable" @backPlot="backPlot" @newList="newPlotData"/>

    <recharge ref="rechargeChild" v-show="rechargeTable" :row="currentRow" @backRecharge="backRecharge" @newList="newAccountData"/>
  </div>
</template>

<script>
import { getHomeId, getHomeData, searchApp } from '@/api/property'
import connectPlot from "./components/ConnectPlot";
import recharge from "./components/Recharge";
import communityImg from './icon/community.png'
import appImg from './icon/app.png'
import noneImg from './icon/none.png'

export default {
    name: 'Property',
    components: { connectPlot, recharge },
    data() {
        return {
            activeName: 'first',
            accountId: undefined,
            accountData: { account: undefined, amount: undefined },
            communityId: undefined,
            communityData: [],
            appData: [],
            params: {
                page: 1,
                limit: 5
            },
            total: 0,
            plotTable: false,
            rechargeTable: false,
            currentRow: {},
            noneImgShow: undefined
        }
    },
    created(){
        if(window.location.search) {
            let str = window.location.search;
            let data = str.slice(str.indexOf('=')+1);
            data = decodeURIComponent(data);
            if(data.substring(1,5) === 'form'){
                var div = document.createElement('div');
                div.innerHTML = data;
                // div.className = "pay-box";
                var bo = document.body;
                bo.insertBefore(div, bo.lastChild);
                document.forms['submit'].submit();
            }
        }
        this.getId();
    },
    methods: {
        //模块切换
        handleClick(tab, event) {
            if(tab.name === 'first') this.getData(this.communityId);
            else this.getAppList();
        },
        // 查询条数变更
        handleSizeChange: function(val) {
            this.params.limit = val;
            this.getAppList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.page = val;
            this.getAppList();
        },
        //获取首页模块分类
        getId(){
            getHomeId().then(response => {
                let arr = response.data.data.widgetInstances;
                for(let i in arr){
                    if(arr[i].viewComponentName === 'MyUserAccountWidget') this.accountId = arr[i].id;
                    if(arr[i].viewComponentName === 'MyCommunityWidget') this.communityId = arr[i].id;
                    this.getData(arr[i].id);
                }
            }).catch(err => {console.log(err);});
        },
        //获取首页各模块数据
        getData(id){
            if(id === this.accountId){
                getHomeData(id).then(res => {
                    this.accountData = res.data.data;
                }).catch(err => {console.log(err);});
            } else {
                getHomeData(id).then(res => {
                    this.communityData = res.data.data;
                    if(this.communityData.length > 0){
                        for(let i in this.communityData){
                            if(!this.communityData[i].logo) this.communityData[i].logo = communityImg;
                        }
                    } else {
                        this.noneImgShow = noneImg;
                    }
                }).catch(err => {console.log(err);});
            }
        },
        //获取应用数据
        getAppList(){
            searchApp(this.params).then(res => {
                console.log(res.data);
                this.appData = res.data.data.items;
                this.total = res.data.data.totalCount;
                if(this.appData.length > 0){
                    for(let i in this.appData){
                        if(!this.appData[i].logo) this.appData[i].logo = appImg;
                    }
                } else {
                    this.noneImgShow = noneImg;
                }
            }).catch(err => {console.log(err);});
        },
        //组件切换
        backPlot(a) {
            this.plotTable = a;
        },
        backRecharge(b) {
            this.rechargeTable = b;
        },
        //组件操作后刷新数据
        newAccountData(){
            this.rechargeTable = false;
            this.getData(this.accountId);
        },
        newPlotData(){
            this.plotTable = false;
            this.getData(this.communityId);
        },
        //跳转页面
        goPlot(){
            this.plotTable = true;
            this.$refs.plotChild.getPlotList();
        },
        goRecharge(){
            this.rechargeTable = true;
            this.currentRow = this.accountData;
            this.$refs.rechargeChild.resetFormData();
        }
    }
}
</script>

<style lang="scss" scoped>
  .title-box{
    margin-bottom: 2rem;
    padding: 1rem 20px;
    border-bottom: 2px solid #ddd;
    vertical-align: center;

    .title-name{
      font-size: 16px;
      color: #333;
    }

    .title-text{
      font-size: 32px;
      color: #CC9900;
    }

    .title-button{
      float: right;
      color: #11A983 !important;
      background: #e7f6f3 !important;
      border-color: #a0ddcd !important;
    }

    .title-button:hover, .title-button:focus {
      color: #fff !important;
      background: #11A983 !important;
      border-color: #11A983 !important;
    }
  }

  .tip-name{
    margin-bottom: 2rem;
    padding: 0 20px;
    font-size: 16px;
    color: #333;
  }

  .plot-content{
    display: flex;
    padding: 1rem 20px;
    border-bottom: 1px solid #ccc;
    vertical-align: center;

    .plot-img{
      margin: 0 3% 0 1%;
      display: inline-block;
      width: 5rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;

      img{
        width: 100%;
        height: 100%;
      }
    }

    .plot-info{
      display: inline-block;
      /*width: 50%;*/
      flex: 1;
      color: #333;
      font-size: 14px;

      .plot-name{
        margin: 0;
        font-size: 20px;
      }
    }

    .plot-consume{
      display: inline-block;
      width: 18%;

      p{
        font-size: 16px;
        color: #999;
      }

      span{
        font-size: 26px;
        color: #333;
      }
    }

    .plot-operate{
      position: relative;
      display: inline-block;
      width: 10%;

      .btn-box{
        margin-top: .8rem;
        border: 0;
        background: #fff;
        color: #11A983;
        visibility: hidden;
      }

      .btn-txt{
        position: absolute;
        bottom: .6rem;
        margin: 0;
      }
    }
  }

  .plot-content:hover{
    border-bottom: 1px solid #11A983;

    .plot-name{
      color: #11A983;
    }

    .btn-box{
      visibility: visible;
    }
  }

  .none-tip{
    padding: 1% 0;
    text-align: center;
    font-size: 24px;
    color: #999;

    .none-img{
      display: block;
      margin: 0 auto;
    }
  }

  /deep/ .el-tabs__item.is-active,
  .el-tabs__item.is-active:hover{
    color: #11A983;
  }

  /deep/ .el-tabs__item:hover{
    color: #11A983;
  }
</style>
