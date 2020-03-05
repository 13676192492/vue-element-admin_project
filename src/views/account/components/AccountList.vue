<template>
  <div>
    <div v-show="!plotTable && !rechargeTable">
      <div class="title-box clearfix">
        <span class="title-name">账号详情</span>
        <el-button class="title-button" type="primary" plain @click="goBack"
          >返回</el-button
        >
        <el-button
          class="title-button"
          style="margin-right: 10px;"
          type="primary"
          plain
          @click="goRecharge"
          >充值</el-button
        >
      </div>

      <div class="account-box clearfix">
        <div class="info-box">
          <p>
            <span class="id-class">账号ID：{{ accountData.id }}</span>
            <!--<span class="del-class" @click="">删除账号</span>-->
          </p>
          <span class="other-class">账号：{{ accountData.userName }}</span>
          <span class="other-class"
            >手机号码：{{
              accountData.phoneNumber ? accountData.phoneNumber : "无"
            }}</span
          >
          <span class="other-class"
            >邮箱：{{ accountData.email ? accountData.email : "无" }}</span
          >
          <span class="other-class">创建日期：{{accountData.createTime ? roaccountDataw.createTime : "--"}}</span>
          <span class="other-class">最后上线时间：{{accountData.lastLoginOn ? accountData.lastLoginOn : "--"}}</span>
        </div>
        <div class="balance-box">
          <p class="balance-title">余额</p>
          <span class="balance-content"
            >{{
              accountData.userAccount ? accountData.userAccount.amount : 0
            }}
            元</span
          >
        </div>
      </div>

      <div class="table-box">
        <div class="table-title-box clearfix">
          <span class="title-name">已关联的社区</span>
          <el-button class="title-button" type="primary" @click="goPlot"
            >关联社区</el-button
          >
        </div>

        <el-table
          v-loading="loading"
          :data="plotList"
          ref="plotTable"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column
            label="序号"
            width="60"
            type="index"
          ></el-table-column>
          <el-table-column label="社区名称" min-width="110">
            <template slot-scope="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社区地址" min-width="130">
            <template slot-scope="{ row }">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社区电话" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.tel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="btnGroup">
                <el-tag
                  ><el-button type="text" @click="connectCancel(scope.row)"
                    >取消关联</el-button
                  ></el-tag
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="table-box">
        <div class="table-title-box clearfix">
          <span class="title-name">充值订单</span>
          <!--<span class="title-text">订单成功总金额：{{ accountData.amount }} 元</span>-->
          <!--<el-button class="title-button" type="primary" @click="">导出</el-button>-->
        </div>

        <el-table
          v-loading="rechargeLoading"
          :data="rechargeList"
          ref="rechargTable"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column
            label="序号"
            width="60"
            type="index"
            :index="tableIndex"
          ></el-table-column>
          <el-table-column label="订单号" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.no }}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易金额（元）" min-width="130">
            <template slot-scope="{ row }">
              <span>{{ row.orderTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" min-width="110">
            <template slot-scope="{ row }">
              <span>{{ row.paymentMethod === 2 ? "支付宝" : "其他" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付状态" min-width="100">
            <template slot-scope="{ row }">
              <span>{{
                row.orderStatus === 30
                  ? "支付成功"
                  : row.orderStatus === 20
                  ? "待支付"
                  : row.orderStatus
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="140">
            <template slot-scope="{ row }">
              <span>{{ row.createdOn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付时间" min-width="140">
            <template slot-scope="{ row }">
              <span>{{ row.paymentOn ? row.paymentOn : "--" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope" v-if="scope.row.orderStatus==30">
              <div class="btnGroup">
                <el-tag>
                  <el-button type="text" @click="seeOrder(scope.row)"
                    >查看详情</el-button
                  ></el-tag
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          :current-page="params.page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="params.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-dialog
      title="订单详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="38%"
    >
      <div class="box">
        <ul class="center">
          <li>充值订单号：{{ orderData.orderNo }}</li>
          <!-- <li>类型：{{orderData.orderType}}</li> -->
          <li>金额：{{ orderData.amount }}元</li>
          <li>支付状态：{{ orderData.paymentStatus | status }}</li>
          <li>创建时间：{{ orderData.createdOn | update }}</li>
          <li>支付时间：{{ orderData.paymentOn | update }}</li>
          <li v-if="orderData.outTradeNo">
            支付宝订单号：{{ orderData.outTradeNo }}
          </li>
          <li v-if="orderData.note">银行转账凭证：{{ orderData.note }}</li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">关闭</el-button>
      </div>
    </el-dialog>

    <connect-plot
      ref="plotChild"
      v-show="plotTable"
      :row="currentRow"
      @backPlot="backPlot"
      @newList="newPlotData"
    />

    <recharge
      ref="rechargeChild"
      v-show="rechargeTable"
      :type="1"
      @brushInfo="brushInfo"
      @backRecharge="backRecharge"
      @newList="newAccountData"
    />
  </div>
</template>

<script>
import {
  getAccount,
  getCommunity,
  cancelBindCommunity,
  getOrders
} from "@/api/manage/account";
import { getRechargeDetials } from "@/api/order/spendingOrder";
import { updateTime } from "@/assets/publicScript/public";
import connectPlot from "./ConnectPlot";
import recharge from "./Recharge";

export default {
  name: "AccountList",
  components: { connectPlot, recharge },
  data() {
    return {
      accountData: { id: undefined },
      orderData: {
        no: undefined,
        orderType: undefined,
        orderTotal: undefined,
        orderStatus: undefined,
        createdOn: undefined,
        paymentOn: undefined
      },
      plotList: null,
      rechargeList: null,
      total: 0,
      loading: true,
      rechargeLoading: true,
      params: {
        page: 1,
        limit: 5
      },
      dialog: false,
      plotTable: false,
      rechargeTable: false,
      currentRow: {}
    };
  },
  /**esLint-disable */
  filters:{
    update(val){
      return updateTime(val,0)
    },
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
  methods: {
    //重置表单并返回
    goBack() {
      this.$emit("backAccount", false);
    },
    //返回序号
    tableIndex(index) {
      return (this.params.page - 1) * this.params.limit + index + 1;
    },
    // 查询条数变更
    handleSizeChange: function(val) {
      this.params.limit = val;
      this.getRechargeList();
    },
    // 查询页码变更
    handleCurrentChange: function(val) {
      this.params.page = val;
      this.getRechargeList();
    },
    //获取已关联社区列表
    getList() {
      this.loading = true;
      getCommunity(this.accountData.id)
        .then(response => {
          this.plotList = response.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //获取数据
    getRow(form) {
      this.accountData = form;
    },
    //获取充值订单列表
    getRechargeList() {
      this.rechargeLoading = true;
      this.params.search = { userId: this.accountData.id, orderType: 1 };
      getOrders(this.params)
        .then(response => {
          this.rechargeList = response.data.data.items;
          for (let i of this.rechargeList) {
            i.createdOn = updateTime(i.createdOn, 0);
            if (i.paymentOn) i.paymentOn = updateTime(i.paymentOn, 0);
          }
          this.total = response.data.data.totalCount;
          this.rechargeLoading = false;
        })
        .catch(() => {
          this.rechargeLoading = false;
        });
    },
    //取消关联
    connectCancel(row) {
      this.$confirm(`确定要取消“${row.name}”小区的绑定吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "请求操作中，请稍候",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.4)"
          });
          cancelBindCommunity(row.id)
            .then(() => {
              loading.close();
              this.getList();
              this.$notify({
                title: "成功",
                message: "解绑成功",
                type: "success",
                duration: 2000
              });
            })
            .catch(() => {
              loading.close();
            });
        })
        .catch(() => {});
    },
    //查看订单
    seeOrder(row) {
      getRechargeDetials(row.no).then(res => {
        if (res.data.success) {
          this.dialog = true;
          this.orderData = res.data.data;
        }
      });

      // this.dialog = true;
      // this.orderData = row;
      // this.orderData = {
      //   no: row.no,
      //   orderType: "充值订单",
      //   orderTotal: row.orderTotal + " 元",
      //   orderStatus:
      //     row.orderStatus === 30
      //       ? "支付成功"
      //       : row.orderStatus === 20
      //       ? "待支付"
      //       : row.orderStatus,
      //   createdOn: updateTime(row.createdOn, 0),
      //   paymentOn: row.paymentOn ? updateTime(row.paymentOn, 0) : "暂未支付"
      // };
    },
    //组件切换
    backPlot(a) {
      this.plotTable = a;
    },
    backRecharge(b) {
      this.rechargeTable = b;
    },
    //跳转页面
    goPlot() {
      this.plotTable = true;
      this.currentRow = this.accountData;
      this.$refs.plotChild.getPlotList();
    },
    goRecharge() {
      this.rechargeTable = true;
      this.currentRow = this.accountData;
      this.$refs.rechargeChild.getRow(Object.assign({}, this.currentRow));
      this.$refs.rechargeChild.resetFormData();
    },
    //组件操作后刷新数据
    brushInfo() {
      getAccount(this.accountData.id)
        .then(res => {
          this.accountData = res.data.data;
          this.getRechargeList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    newAccountData() {
      this.rechargeTable = false;
      this.getRechargeList();
    },
    newPlotData() {
      this.plotTable = false;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.title-box {
  margin-bottom: 20px;
  padding: 0 5px;
  height: 2.4rem;
  border-bottom: 2px solid #ddd;
  vertical-align: center;

  .title-name {
    font-size: 20px;
    color: #333;
  }

  .title-button {
    padding: 10px 30px;
    float: right;
    margin-top: -6px;
    color: #11a983 !important;
    background: #e7f6f3 !important;
    border-color: #a0ddcd !important;
  }

  .title-button:hover,
  .title-button:focus {
    color: #fff !important;
    background: #11a983 !important;
    border-color: #11a983 !important;
  }
}

.account-box {
  margin-bottom: 20px;
  padding: 0 5px 20px;
  border-bottom: 2px solid #ddd;

  .info-box {
    float: left;
    width: 88%;

    .id-class {
      margin-right: 12%;
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }

    .del-class {
      font-size: 12px;
      cursor: pointer;
      color: #333;
    }

    .del-class:hover {
      color: #3a71a8;
    }

    .other-class {
      margin-right: 10%;
      font-size: 14px;
    }
  }

  .balance-box {
    margin-right: 1.5%;
    float: right;
    width: 10%;
    text-align: right;

    .balance-title {
      font-size: 14px;
      color: #999;
    }

    .balance-content {
      font-size: 24px;
      color: #333;
    }
  }

  p {
    margin-top: 0;
  }
}

.table-box {
  width: 98%;

  .table-title-box {
    margin: 2rem 0 1rem;
    height: 2.4rem;
    line-height: 2.4rem;
    border-left: 4px solid #ccc;
    vertical-align: center;

    .title-name {
      margin-left: 1.5%;
      font-size: 20px;
      color: #333;
    }

    .title-text {
      margin-left: 10%;
      font-size: 12px;
    }

    .title-button {
      padding: 10px 30px;
      float: right;
      color: #fff !important;
      background: #11a983 !important;
      border-color: #11a983 !important;
    }

    .title-button:hover,
    .title-button:focus {
      color: #11a983 !important;
      background: #e7f6f3 !important;
      border-color: #a0ddcd !important;
    }
  }
}

.box {
  width: 90%;
  height: 90%;
  overflow: auto;
  margin: 2% 5%;
  padding: 2%;

  .center {
      margin: 0;
      padding:0;
      list-style: none;
      width: 100%;
      height: 40%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: #666;

      li {
        margin-bottom: 5%;
        font-size: 15px;
      }
    }
}
</style>
