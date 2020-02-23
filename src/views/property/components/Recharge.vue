<template>
  <div style="position: relative">
    <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
    <div class="form-box txt-class">
      <el-form ref="dataForm" :model="rechargeFormData" :rules="rechargeRules">
        <div style="margin-bottom: 3rem;">
          <span style="margin-right: 15%">当前账号：{{ row.account }}</span>
          <span>账户余额：{{ row.balance }}</span>
        </div>
        <el-form-item prop="money">
          <span class="txt-class">充值金额：</span>
          <el-input class="input-class" v-model="rechargeFormData.money" placeholder="请输入充值金额" clearable/>
          <span class="txt-class" style="margin-left: 2%">元</span>
        </el-form-item>
        <el-form-item prop="way">
          <span class="txt-class">支付方式：</span>
          <el-button class="btns" :class="!rechargeFormData.way?'btns-click':''" style="margin-left: 4rem" @click="selectWay(0)"><i></i>支付宝</el-button>
          <el-button class="btns" :class="rechargeFormData.way?'btns-click':''" style="margin-left: 2rem" @click="selectWay(1)"><i></i>微信</el-button>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button class="btn-class" @click="rechargeSure">立即充值</el-button>
      </div>
      <div class="tip-class">
        <p>如需开具发票，请在“发票管理”中申请</p>
        <p>若有其它问题请发送邮件到 support@taichuan.com，我们会及时响应</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Recharge',
    props: {
        row: { type: Object, required: true }
    },
    data() {
        return {
            rechargeFormData: {
                money: undefined,
                way: 0
            },
            rechargeRules: {
                money: [
                    { required: true, message: "请输入充值金额", trigger: "change" },
                    { pattern: /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/, message: "充值金额必须大于0", trigger: "blur" },
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
            this.rechargeFormData.way = index;
        },
        //立即充值
        rechargeSure(){
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    console.log(this.rechargeFormData);
                }
            });
        },
        //重置表单
        resetFormData() {
            this.$refs["dataForm"].resetFields();
            this.rechargeFormData = {
                money: undefined,
                way: 0
            };

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
      text-align: center;

      .btn-class{
        padding: 12px 24px;
        transform: translateX(-80%);
        color: #fff !important;
        background: #11A983 !important;
        border-color: #11A983 !important;
      }

      .btn-class:hover{
        color: #11A983 !important;
        background: #e7f6f3 !important;
        border-color: #a0ddcd !important;
      }
    }

    .tip-class{
      font-size: 14px;
      color: #999;
    }
  }

  .txt-class{
    font-size: 18px;
    color: #666;
  }

  .input-class{
    width: 50%;
  }

  /deep/ .el-form{
    width: 100%;
    margin: 0;
  }

  /deep/ .el-form-item {
    margin-bottom: 3rem;
  }
</style>