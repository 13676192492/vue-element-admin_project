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
        <div class="plot-content">
          <div class="plot-img"><img src=""></div>
          <div class="plot-info">
            <p class="plot-name">小区名称</p>
            <p><span style="margin-right: 10%;">累计消费：255.0</span><span>昨日消费：255.0</span></p>
            <p style="margin: 0;"><span style="margin-right: 8%;">地址：广东省珠海市香洲区梅华东路188号</span><span>电话：15015946368</span></p>
          </div>
          <div class="plot-consume">
            <p>本月消费</p>
            <span>55.0</span>
          </div>
          <div class="plot-operate">
            <el-button class="btn-box">取消关联</el-button>
            <p class="btn-txt">sip通话已关闭</p>
          </div>
        </div>
        <div class="plot-content">
          <div class="plot-img"><img src=""></div>
          <div class="plot-info">
            <p class="plot-name">小区名称</p>
            <p><span style="margin-right: 10%;">累计消费：255.0</span><span>昨日消费：255.0</span></p>
            <p style="margin: 0;"><span style="margin-right: 8%;">地址：广东省珠海市香洲区梅华东路188号</span><span>电话：15015946368</span></p>
          </div>
          <div class="plot-consume">
            <p>本月消费</p>
            <span>55.0</span>
          </div>
          <div class="plot-operate">
            <el-button class="btn-box">取消关联</el-button>
            <p class="btn-txt">sip通话已关闭</p>
          </div>
        </div>
        <div class="plot-content">
          <div class="plot-img"><img src=""></div>
          <div class="plot-info">
            <p class="plot-name">小区名称</p>
            <p><span style="margin-right: 10%;">累计消费：255.0</span><span>昨日消费：255.0</span></p>
            <p style="margin: 0;"><span style="margin-right: 8%;">地址：广东省珠海市香洲区梅华东路188号</span><span>电话：15015946368</span></p>
          </div>
          <div class="plot-consume">
            <p>本月消费</p>
            <span>55.0</span>
          </div>
          <div class="plot-operate">
            <el-button class="btn-box">取消关联</el-button>
            <p class="btn-txt">sip通话已关闭</p>
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
