<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="selectTime"
        type="daterange"
        range-separator="至"
        :picker-options="pickerDisabled"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-right:1%;"
      ></el-date-picker>
      <!-- <el-select v-model="params.search.orderStatus" placeholder="请选择订单类型" style="margin-right:1%;">
        <el-option label="Sip通话" value="1"></el-option>
      </el-select>-->
      <el-select v-model="orderStatus" placeholder="请选择支付状态" style="margin-right:1%;">
        <el-option label="全部" value></el-option>
        <el-option label="待支付" value="20"></el-option>
        <el-option label="成功" value="30"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" width="60" type="index" :index="tableIndex" />
      <el-table-column label="充值订单号" prop="no"></el-table-column>
      <el-table-column label="支付方式" prop="paymentMethod"></el-table-column>
      <el-table-column label="支付时间" prop="paymentOn"></el-table-column>
      <el-table-column label="充值金额（元）" prop="orderTotal"></el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatus | status }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="{ row }" v-if="row.orderStatus==20">
          <el-button type="text" @click="recharge(row.no)">去充值</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <el-pagination
      background
      :current-page="params.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getOrderList, payRecharge } from "@/api/order/spendingOrder";
// import OrderDetails from "./components/OrderDetails";
import { payState } from "@/api/property";
import { updateTime, changeTimeFormat } from "@/assets/publicScript/public";
export default {
  data() {
    return {
      pickerDisabled: {
        disabledDate: time => {
          return (
            time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      },
      loading: false,
      orderStatus: null,
      params: {
        search: {
          orderStatus: null,
          orderType: 1,
          createdOnStart: null,
          createdOnEnd: null
        },
        page: 1,
        limit: 10
      },
      param: {
        isShow: false
      },
      total: 1,
      selectTime: null,
      list: []
    };
  },
  filters: {
    status(val) {
      switch (val) {
        case 20:
          return "待支付";
          break;
        default:
          return "成功";
      }
    }
  },
  created() {
    if (window.location.search|| window.location.hash.split("=")[1]) {
      let str = window.location.search;
      let data = str.slice(str.indexOf('=')+1) || window.location.hash.split("=")[1];;
  
      data = decodeURIComponent(data);
      if (data.substring(1, 5) === "form") {
        var div = document.createElement("div");
        div.innerHTML = data;
        // div.className = "pay-box";
        var bo = document.body;
        bo.insertBefore(div, bo.lastChild);
        document.forms["submit"].submit();
      }
    }
    this.getList();
  },
  methods: {
    getData(){
      this.params.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    tableIndex(index) {
      return (this.params.page - 1) * this.params.limit + index + 1;
    },
    changePaymentMethod(type) {
      switch (type) {
        case 0:
          return "余额支付";
          break;
        case 1:
          return "银行转账";
          break;
        case 2:
          return "支付宝";
          break;
        default:
          return "微信";
      }
    },
    //关闭新增遮罩层
    closeMask(res) {
      this.param.isShow = res;
      this.getList();
    },
    getList() {
      this.loading = true;
      if (this.selectTime) {
        this.params.search.createdOnStart = changeTimeFormat(
          this.selectTime[0]
        );
        this.params.search.createdOnEnd = changeTimeFormat(this.selectTime[1]);
      } else {
        this.params.search.createdOnStart = null;
        this.params.search.createdOnEnd = null;
      }
      if (this.orderStatus) this.params.search.orderStatus = +this.orderStatus;
      else if (this.orderStatus == "") this.params.search.orderStatus = null;

      getOrderList(this.params).then(res => {
        if (res.data.success) {
          for (let i of res.data.data.items) {
            i.createdOn = updateTime(i.createdOn, 0);
            i.paymentOn = updateTime(i.paymentOn, 0);
            i.paymentMethod = this.changePaymentMethod(i.paymentMethod);
          }
          this.total = res.data.data.totalCount;
          this.list = res.data.data.items;
        } else {
          this.$notify({
            title: "失败",
            message: res.data.message,
            type: "error"
          });
        }
        this.loading = false;
      });
    },
    //充值
    recharge(no) {
      let params = {
        no,
        returnUrl: window.location.href
      };
      payRecharge(params).then(res => {
        if (res.data.success) {
          window.open(
            `${location.protocol}//${location.host}/#/rechargeOrder/index?data=${res.data.data.data}`
          );
          const h = this.$createElement;
          this.$msgbox({
            title: "充值",
            message: h("div", null, [
              h("p", null, "请在新打开的页面进行充值 "),
              h(
                "small",
                { style: "color: #808080" },
                "充值完成后，根据您的情况点击下面按钮"
              )
            ]),
            showCancelButton: true,
            closeOnClickModal: false,
            type: "warning",
            confirmButtonText: "充值成功",
            cancelButtonText: "充值失败",
            beforeClose: (action, instance, done) => {
              if (action === "confirm") {
                payState(params.no).then(res => {
                  if (res.data.data) {
                    done();
                  } else {
                    this.$notify({
                      title: "失败",
                      message: "充值还未成功，请确认是否完成支付!",
                      type: "error"
                    });
                    return;
                  }
                });
              } else {
                done();
              }
            }
          })
            .then(action => {
              this.$message({
                type: "success",
                message: "充值成功 "
              });
            })
            .catch(() => {});
        } else {
          this.$notify({
            title: "失败",
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    orderDetails(params) {
      this.param.isShow = true;
      this.param.data = params;
      this.$refs.getDetails.getList(this.params.no);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-range-separator {
  width: 6%;
  padding: 0 !important;
}
/deep/ .el-table__header {
  width: 100% !important;
}
</style>