<template>
  <div class="app-container">
    <div v-show="!plotTable&&!rechargeTable">
      <div class="title-box clearfix">
        <span class="title-name">余额：</span>
        <span class="title-text"> {{ info.balance }}</span>
        <el-button class="title-button" type="primary" plain @click="goRecharge">充值</el-button>
        <el-button class="title-button" style="margin-right: 30px;" type="primary" plain @click="goPlot">新增关联社区</el-button>
      </div>
      <div>
        <div class="tip-name">已关联社区</div>
        <div class="plot-content" v-for="(item, index) in data" :key="index">
          <div class="plot-img"><img :src="item.icon"></div>
          <div class="plot-info">
            <p class="plot-name">{{item.coName}}</p>
            <p><span style="margin-right: 10%;">累计消费：{{item.amount}}</span><span>昨日消费：{{item.lastDayAmount}}</span></p>
            <p style="margin: 0;"><span style="margin-right: 8%;">地址：{{item.address}}</span><span>电话：{{item.phone}}</span></p>
          </div>
          <div class="plot-consume">
            <p>本月消费</p>
            <span>{{item.nowMonthAmount}}</span>
          </div>
          <div class="plot-operate">
            <el-button class="btn-box">取消关联</el-button>
            <p class="btn-txt">{{ item.sipType? 'sip通话已开启':'sip通话已关闭' }}</p>
          </div>
        </div>  
      </div>
    </div>

    <connect-plot ref="plotChild" v-show="plotTable" :row="currentRow" @backPlot="backPlot"/>

    <recharge ref="rechargeChild" v-show="rechargeTable" :row="currentRow" @backRecharge="backRecharge"/>
  </div>
</template>

<script>
import connectPlot from "./components/ConnectPlot";
import recharge from "./components/Recharge";

export default {
    name: 'Property',
    components: { connectPlot, recharge },
    data() {
        return {
            info: { id: 43463, account: 15015948432, connectPlot: '太川云社区', amount: 1000, count: 5, balance: 78 },
            data: [
                { id: 354168541, account: 15015948432, icon: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', coName:'发斯蒂芬', amount: 1000, sipType: 0, lastDayAmount: 79, nowMonthAmount: 11, address: '广东省珠海市香洲区梅华东路188号', phone: 15015946368 },
                { id: 354168541, account: 15015948432, icon: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', coName:'手工费回电话', amount: 1200, sipType: 1, lastDayAmount: 133, nowMonthAmount: 50, address: '广东省珠海市香洲区梅华东路188号', phone: 15015946368 },
                { id: 354168541, account: 15015948432, icon: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', coName:'哦幸福', amount: 1500, sipType: 0, lastDayAmount: 88, nowMonthAmount: 90, address: '广东省珠海市香洲区梅华东路188号', phone: 15015946368 },
                { id: 354168541, account: 15015948432, icon: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', coName:'百色分公司', amount: 900, sipType: 1, lastDayAmount: 34, nowMonthAmount: 68, address: '广东省珠海市香洲区梅华东路188号', phone: 15015946368 },
            ],
            plotTable: false,
            rechargeTable: false,
            currentRow: {}
        }
    },
    methods: {
        //组件切换
        backPlot(a) {
            this.plotTable = a;
        },
        backRecharge(b) {
            this.rechargeTable = b;
        },
        //跳转页面
        goPlot(){
            this.plotTable = true;
            this.currentRow = this.info;
            this.$refs.plotChild.getPlotList();
        },
        goRecharge(){
            this.rechargeTable = true;
            this.currentRow = this.info;
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
</style>
