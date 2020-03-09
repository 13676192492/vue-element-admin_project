<template>
  <div style="position: relative">
    <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
    <div class="form-box txt-class">
      <el-form ref="dataForm" :model="rechargeFormData" :rules="rechargeRules">
        <div style="margin-bottom: 3rem;">
          <span style="margin-right: 15%">当前账号：{{ accountData.userName }}</span>
          <span>账户余额：{{ accountData.userAccount? accountData.userAccount.amount:0 }} 元</span>
        </div>
        <el-form-item prop="note">
          <span class="txt-class">转账凭据：</span>
          <el-input class="input-class" v-model="rechargeFormData.note" placeholder="请输入转账凭据" clearable/>
        </el-form-item>
        <el-form-item prop="total_amount">
          <span class="txt-class">充值金额：</span>
          <el-input class="input-class" v-model="rechargeFormData.total_amount" placeholder="请输入充值金额" clearable/>
          <span class="txt-class" style="margin-left: 2%">元</span>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button class="btn-class" @click="rechargeSure">充值</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { accountRecharge } from '@/api/manage/account'

export default {
    name: 'Recharge',
    props: {
        type: { type: Number, required: true }
    },
    data() {
        return {
            accountData: { userName: undefined },
            rechargeFormData: {
                total_amount: undefined,
                UserId: undefined,
                note: undefined
            },
            rechargeRules: {
                total_amount: [
                    { required: true, message: "请输入充值金额", trigger: "change" },
                    { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: "输入的充值金额格式错误", trigger: "blur" },
                    { validator: this.checkAmount, trigger: "blur" }
                ],
                note: [{ required: true, message: "请输入转账凭据", trigger: "change" }]
            }
        }
    },
    methods: {
        //重置表单并返回
        goBack() {
            this.resetFormData();
            this.$emit("backRecharge", false);
        },
        //获取数据
        getRow(form){
            this.accountData = form;
        },
        //立即充值
        rechargeSure(){
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.rechargeFormData.UserId = this.accountData.id;
                    accountRecharge(this.rechargeFormData).then(res => {
                        if(res.data.data.code==10000) {
                            if (this.type) this.$emit("brushInfo");
                            this.$notify({
                                title: "成功",
                                message: "充值成功",
                                type: "success",
                                duration: 2000
                            });
                            this.resetFormData();
                            this.$emit("backRecharge", false);
                        } else {
                            this.$notify({
                                title: "成功",
                                message: "充值失败",
                                type: "error",
                                duration: 2000
                            });
                        }
                    })
                }
            });
        },
        //充值金额验证
        checkAmount(rule, value, callback) {
            if (value > 50000) callback(new Error("单次充值不能超过50000，请重新输入！"));
            else callback();
        },
        //重置表单
        resetFormData() {
            this.$refs["dataForm"].clearValidate();
            this.rechargeFormData = {
                total_amount: undefined,
                UserId: undefined,
                note: undefined
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
        transform: translateX(-120%);
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
