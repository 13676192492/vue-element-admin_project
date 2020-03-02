<template>
  <div style="position: relative">
    <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
    <div class="form-box txt-class">
      <el-form ref="dataForm" :model="rechargeFormData" :rules="rechargeRules">
        <div style="margin-bottom: 3rem;">
          <span style="margin-right: 15%">当前账号：{{ row.account }}</span>
          <span>账户余额：{{ row.amount }}</span>
        </div>
        <el-form-item prop="total_amount">
          <span class="txt-class">充值金额：</span>
          <el-input class="input-class" v-if="rechargeState===3" v-model="rechargeFormData.total_amount" placeholder="请输入充值金额" clearable/>
          <span class="txt-class" v-if="rechargeState===3" style="margin-left: 2%">元</span>
          <span class="txt-class" v-else>{{ rechargeFormData.total_amount }} 元</span>
        </el-form-item>
        <el-form-item prop="method">
          <span class="txt-class">支付方式：</span>
          <el-button class="btns" :class="rechargeFormData.method===2?'btns-click':''" @click="selectWay(2)"><i></i>支付宝</el-button>
          <!--<el-button class="btns" :class="rechargeFormData.method?'btns-click':''" style="margin-left: 2rem" @click="selectWay(1)"><i></i>微信</el-button>-->
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button class="btn-class" @click="rechargeData">立即充值</el-button>
        <span v-if="rechargeState!==3">已生成充值订单，目前订单处于未支付状态，请再次点击充值完成支付</span>
        <span v-if="rechargeState!==3">如放弃充值，可点击返回</span>
      </div>
      <div class="tip-class">
        <p>如需开具发票，请在“发票管理”中申请</p>
      </div>
    </div>

    <el-dialog
            title="充值中"
            :visible.sync="rechargeDialog"
            :close-on-click-modal="false"
            :append-to-body="true"
            :before-close="rechargecCancel"
    >
      <div class="show-tip-box"><span>{{ rechargeText }}</span></div>
    </el-dialog>
  </div>
</template>

<script>
import { payRecharge, payRechargeAgain, payState } from '@/api/property'

export default {
    name: 'Recharge',
    props: {
        row: { type: Object, required: true }
    },
    data() {
        return {
            timer: null,
            orderNo: undefined,
            rechargeState: 3,           //起始（支付成功）3,支付中0，放弃支付1，支付超时2
            rechargeDialog: false,
            rechargeText: '',
            rechargeFormData: {
                total_amount: undefined,
                returnUrl: undefined,
                method: 2
            },
            rechargeRules: {
                total_amount: [
                    { required: true, message: "请输入充值金额", trigger: "change" },
                    { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: "输入的充值金额格式错误", trigger: "blur" },
                ]
            }
        }
    },
    methods: {
        //重置表单并返回
        goBack() {
            this.resetFormData();
            this.$emit("backRecharge", false);
        },
        //选择支付方式
        selectWay(index){
            this.rechargeFormData.method = index;
        },
        //立即充值
        rechargeData(){
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.rechargeFormData.returnUrl = `${location.protocol}//${location.host}`;
                    var that = this;
                    this.rechargeDialog = true;
                    if(this.rechargeState === 3){
                        payRecharge(this.rechargeFormData).then(res => {
                            this.orderNo = res.data.data.orderNo;
                            let i = 0;
                            this.rechargeSure();
                            var timer = setInterval(() => {
                                this.timer = timer;
                                if(this.rechargeState === 3) {
                                    that.resetFormData();
                                    that.rechargeDialog = false;
                                    window.clearInterval(timer);
                                    timer = null;
                                    that.$notify({
                                        title: '成功',
                                        message: '支付成功',
                                        type: 'success',
                                        duration: 2000
                                    });
                                    this.$nextTick(() => {
                                        that.$emit("newList");
                                    });
                                }
                                i++;
                                that.rechargeText = that.rechargeText + '.';
                                if(i%3 === 0) that.rechargeSure();
                                if(i === 61) {
                                    this.rechargeState = 2;
                                    that.rechargeText = '支付超时，请重新支付';
                                    window.clearInterval(timer);
                                    timer = null;
                                }
                            }, 1000);
                            window.open(`${location.protocol}//${location.host}?data=${res.data.data.data}`);
                            // var div = document.createElement('div');
                            // div.innerHTML = res.data.data.data;
                            // // div.className = "pay-box";
                            // var bo = document.body;
                            // bo.insertBefore(div, bo.lastChild);
                            // document.forms['submit'].submit();
                        });
                    } else {
                        payRechargeAgain(this.orderNo, { "returnUrl": this.rechargeFormData.returnUrl }).then(res => {
                            let i = 0;
                            this.rechargeSure();
                            var timer1 = setInterval(() => {
                                this.timer = timer1;
                                if(this.rechargeState === 3) {
                                    that.resetFormData();
                                    that.rechargeDialog = false;
                                    window.clearInterval(timer1);
                                    timer1 = null;
                                    that.$notify({
                                        title: '成功',
                                        message: '支付成功',
                                        type: 'success',
                                        duration: 2000
                                    });
                                    this.$nextTick(() => {
                                        that.$emit("newList");
                                    });
                                }
                                i++;
                                that.rechargeText = that.rechargeText + '.';
                                if(i%3 === 0) that.rechargeSure();
                                if(i === 61) {
                                    this.rechargeState = 2;
                                    that.rechargeText = '支付超时，请重新支付';
                                    window.clearInterval(timer1);
                                    timer1 = null;
                                }
                            }, 1000);
                            window.open(`${location.protocol}//${location.host}?data=${res.data.data.data}`);
                            // var div = document.createElement('div');
                            // div.innerHTML = res.data.data.data;
                            // // div.className = "pay-box";
                            // var bo = document.body;
                            // bo.insertBefore(div, bo.lastChild);
                            // document.forms['submit'].submit();
                        });
                    }
                }
            });
        },
        //确认支付
        rechargeSure(){
            payState(this.orderNo).then(res => {
                if(res.data.data) {
                    this.rechargeText = '支付成功';
                    this.rechargeState = 3;
                } else {
                    this.rechargeText = '支付中 .';
                    this.rechargeState = 0;
                }
            }).catch(err => {
                console.log(err);
                window.clearInterval(this.timer);
                this.timer = null;
            });
        },
        //放弃支付
        rechargecCancel(){
            if(this.rechargeState === 0){
                this.$confirm("确定放弃支付吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.rechargeDialog = false;
                    this.rechargeText = '';
                    this.rechargeState = 1;
                    window.clearInterval(this.timer);
                    this.timer = null;
                }).catch(() => {});
            } else {
                this.rechargeDialog = false;
                this.rechargeText = '';
                this.rechargeState = 1;
                window.clearInterval(this.timer);
                this.timer = null;
            }
        },
        //重置表单
        resetFormData() {
            this.$refs["dataForm"].clearValidate();
            this.rechargeFormData = {
                total_amount: undefined,
                returnUrl: undefined,
                method: 2
            };
            this.rechargeState = 3;
            this.rechargeText = ''
        },
    }
};
</script>

<style lang="scss" scoped>
  .title-button{
    position: absolute;
    top: 1rem;
    right: 2rem;
    color: #11A983 !important;
    background: #e7f6f3 !important;
    border-color: #a0ddcd !important;
  }

  .title-button:hover, .title-button:focus {
    color: #fff !important;
    background: #11A983 !important;
    border-color: #11A983 !important;
  }

  .form-box{
    width: 40%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 20%);

    .btns:hover, .btns:active{
      color: #11A983 !important;
      background: #e7f6f3 !important;
      border-color: #a0ddcd !important;
    }

    .btns-click{
      color: #11A983 !important;
      background: #e7f6f3 !important;
      border-color: #a0ddcd !important;
    }

    .btn-box{
      margin-bottom: 3rem;

      .btn-class{
        display: block;
        text-align: center;
        margin: 0 auto 4%;
        transform: translateX(-90%);
        color: #fff !important;
        background: #11A983 !important;
        border-color: #11A983 !important;
      }

      .btn-class:hover{
        color: #11A983 !important;
        background: #e7f6f3 !important;
        border-color: #a0ddcd !important;
      }

      span{
        text-align: left;
        display: block;
        padding: 1%;
        color: #3A71A8;
        font-size: 14px;
      }
    }

    .tip-class{
      font-size: 14px;
      color: #999;
    }
  }

  .show-tip-box{
    padding: 14% 0;
    text-align: center;
    font-size: 18px;
    color: #333;
  }

  .txt-class{
    font-size: 18px;
    color: #666;
  }

  .input-class{
    width: 50%;
  }

  /deep/ .el-dialog{
    margin-top: 26vh !important;
  }

  /deep/ .el-form{
    width: 100%;
    margin: 0;
  }

  /deep/ .el-form-item {
    margin-bottom: 3rem;
  }
</style>