<template>
  <div>
    <div v-show="!plotTable && !rechargeTable">
      <div class="title-box clearfix">
        <span class="title-name">账号详情</span>
        <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
        <el-button class="title-button" style="margin-right: 10px;" type="primary" plain @click="goRecharge">充值</el-button>
      </div>

      <div class="account-box clearfix">
        <div class="info-box">
          <p>
            <span class="id-class">账号ID：{{ accountData.id }}</span>
            <!--<span class="del-class" @click="">删除账号</span>-->
          </p>
          <span class="other-class">账号：{{ accountData.userName }}</span>
          <span class="other-class">手机号码：{{accountData.phoneNumber ? accountData.phoneNumber : "无"}}</span>
          <span class="other-class">邮箱：{{ accountData.email ? accountData.email : "无" }}</span>
          <span class="other-class">创建日期：{{ accountData.createdOn }}</span>
          <span class="other-class">最后上线时间：{{ accountData.lastLoginOn }}</span>
        </div>
        <div class="balance-box">
          <p class="balance-title">余额</p>
          <span class="balance-content">{{accountData.userAccount ? accountData.userAccount.amount : 0}}元</span>
        </div>
      </div>

      <div class="table-box">
        <div class="table-title-box clearfix">
          <span class="title-name">{{ tabs? '已关联社区':'已关联应用' }}</span>
          <span class="title-tip" @click="tabsChange">切换至{{ tabs? '已关联应用':'已关联社区' }}</span>
          <el-button v-if="tabs" class="title-button" type="primary" @click="goPlot">关联社区</el-button>
          <el-button v-else class="title-button" type="primary" @click="openAddCom">关联应用</el-button>
        </div>

        <el-table
          v-if="tabs"
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
          <el-table-column label="平台地址" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.platformUrl }}</span>
            </template>
          </el-table-column>
          <el-table-column label="门口机" min-width="80">
            <template slot-scope="{ row }">
              <span class="see-show" @click="openDoorCom(row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column label="sip" min-width="80">
            <template slot-scope="{ row }">
              <span>{{ row.sipEnable? '已开启':'已关闭' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="btnGroup">
                <el-tag
                  ><el-button type="text" @click="communityCancel(scope.row)"
                    >取消关联</el-button
                  ></el-tag
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-table
                v-else
                v-loading="loading"
                :data="appList"
                ref="appTable"
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
          <el-table-column label="appId" min-width="140">
            <template slot-scope="{ row }">
              <span>{{ row.appId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="应用名称" min-width="100">
            <template slot-scope="{ row }">
              <span>{{ row.iotName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="应用类型" min-width="100">
            <template slot-scope="{ row }">
              <span>{{ row.appType===1? '云之讯':'' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="sip" min-width="70">
            <template slot-scope="{ row }">
              <span>{{ row.sipEnable? '已开启':'已关闭' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="btnGroup">
                <el-tag><el-button type="text" @click="openUpdateCom(scope.row)">编辑</el-button></el-tag>
                <el-tag><el-button type="text" @click="appCancel(scope.row)">取消关联</el-button></el-tag>
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
            :title="dialogStatus==='create'?'关联应用':'编辑应用'"
            :visible.sync="appDialog"
            :close-on-click-modal="false"
            :append-to-body="true"
    >
      <el-form
              ref="dataForm"
              :rules="appRules"
              :model="appData"
              label-position="right"
              label-width="90px"
              style="width: 80% !important;"
      >
        <el-form-item label="iotId" prop="iotId">
          <el-input v-model="appData.iotId" placeholder="请输入iotId" clearable/>
        </el-form-item>
        <el-form-item label="iotName" prop="iotName">
          <el-input v-model="appData.iotName" placeholder="请输入iotName" clearable/>
        </el-form-item>
        <el-form-item label="appId" prop="appId">
          <el-input v-model="appData.appId"placeholder="请输入appId" clearable/>
        </el-form-item>
        <el-form-item label="应用类型" prop="appType">
          <el-select v-model="appData.appType" placeholder="请选择应用类型">
            <el-option v-for="item in appType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="appDialog = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? addData() : updateData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="门口机信息" :visible.sync="doorDialog" :close-on-click-modal="false" :append-to-body="true" width="50%">
      <el-table
              :data="doorList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border fit
              highlight-current-row
              style="width: 100%;"
      >
        <el-table-column label="序号" width="60" type="index" :index="doorIndex"></el-table-column>
        <el-table-column label="机身码" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备型号" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备地址" min-width="180">
          <template slot-scope="{ row }">
            <span class="text-show" :title="row.address">{{ row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社区名称" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.communityName }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
              background
              :current-page="doorParams.page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="doorParams.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="doorTotal"
              @size-change="handleDoorSizeChange"
              @current-change="handleDoorCurrentChange"
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="doorDialog = false">关闭</el-button>
      </div>
    </el-dialog>

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
import { getAccount, getCommunity, cancelBindCommunity, getAppList, addBindApp, updateBindApp, cancelBindApp, getOrders } from "@/api/manage/account";
import { searchDevice } from '@/api/property'
import { getRechargeDetials } from "@/api/order/spendingOrder";
import { updateTime,changeTimeFormat } from "@/assets/publicScript/public";
import connectPlot from "./ConnectPlot";
import recharge from "./Recharge";

export default {
  name: "AccountList",
  components: { connectPlot, recharge },
  data() {
    return {
      tabs: true,
      accountData: { id: undefined },
      appData: {
          userId: undefined,
          iotId: undefined,
          iotName: undefined,
          appType: 1,
          appId: undefined
      },
      appType: [{ value: 1, label: '云之讯' }],
      orderData: {
        no: undefined,
        orderType: undefined,
        orderTotal: undefined,
        orderStatus: undefined,
        createdOn: undefined,
        paymentOn: undefined
      },
      plotList: null,
      appList: null,
      rechargeList: null,
      doorList: null,
      total: 0,
      doorTotal: 0,
      loading: true,
      rechargeLoading: true,
      params: {
        page: 1,
        limit: 5
      },
      doorParams: {
          page: 1,
          limit: 10,
      },
      dialog:false,
      doorDialog:false,
      appDialog: false,
      plotTable: false,
      rechargeTable: false,
      dialogStatus: 'create',
      currentRow: {},
      appRules: {
          iotId: [{ required: true, message: "请输入iotId", trigger: "change" }],
          iotName: [{ required: true, message: "请输入iotName", trigger: "change" }],
          appType: [{ required: true, message: "请选择应用类型", trigger: "change" }],
          appId: [{ required: true, message: "请输入appId", trigger: "change" }]
      }
    };
  },
  /**esLint-disable */
  filters:{
    changeTime(val){
      return changeTimeFormat(val)
    },
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
      this.tabs = true;
      this.plotList = [];
      this.appList = [];
      this.rechargeList = [];
      this.doorList = [];
      this.$emit("backAccount", false);
    },
    //返回序号
    tableIndex(index) {
      return (this.params.page - 1) * this.params.limit + index + 1;
    },
    doorIndex(index) {
        return (this.doorParams.page - 1) * this.doorParams.limit + index + 1;
    },
    // 查询条数变更
    handleSizeChange: function(val) {
      this.params.limit = val;
      this.getRechargeList();
    },
    handleDoorSizeChange: function(val) {
        this.doorParams.limit = val;
        this.getDoorList();
    },
    // 查询页码变更
    handleCurrentChange: function(val) {
      this.params.page = val;
      this.getRechargeList();
    },
    handleDoorCurrentChange: function(val) {
        this.doorParams.page = val;
        this.getDoorList();
    },
    //社区应用切换
    tabsChange(){
        if(this.tabs){
            this.tabs = false;
            this.getAppList();
        } else {
            this.tabs = true;
            this.getList();
        }
    },
    //获取用户数据
    getRow(form) {
      this.accountData = form;
      this.accountData.createdOn = this.accountData.createdOn? changeTimeFormat(this.accountData.createdOn):'--';
      this.accountData.updatedOn = this.accountData.updatedOn? changeTimeFormat(this.accountData.updatedOn):'--';
      this.accountData.lastLoginOn = this.accountData.lastLoginOn? changeTimeFormat(this.accountData.lastLoginOn):'--';
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
    //获取门口机列表
    getDoorList() {
        this.loading = true;
        searchDevice(this.doorParams).then(response => {
            this.doorList = response.data.data.items;
            this.doorTotal = response.data.data.totalCount;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    },
    //获取已关联应用列表
    getAppList(){
        this.loading = true;
        getAppList(this.accountData.id).then(response => {
            this.appList = response.data.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
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
    //打开查看门口机弹框
    openDoorCom(row){
        this.doorParams.page = 1;
        this.doorParams.search = { mixCommunityId: row.mixCommunityId };
        this.doorDialog = true;
        this.getDoorList();
    },
    //打开绑定应用弹框
    openAddCom() {
        this.resetFormData();
        this.appData.userId = this.accountData.id;
        this.dialogStatus = "create";
        this.appDialog = true;
        this.$nextTick(() => {
            this.$refs["dataForm"].clearValidate();
        });
    },
    //绑定应用
    addData() {
        this.$refs["dataForm"].validate(valid => {
            if (valid) {
                const loading = this.$loading({
                    lock: true,
                    text: "请求操作中，请稍候",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.4)"
                });
                addBindApp(this.appData).then(() => {
                    loading.close();
                    this.getAppList();
                    this.appDialog = false;
                    this.$notify({
                        title: "成功",
                        message: "绑定成功",
                        type: "success",
                        duration: 2000
                    });
                }).catch(() => {
                    loading.close();
                });
            }
        });
    },
    //打开修改应用弹框
    openUpdateCom(row) {
        this.appData = Object.assign({}, row);
        this.dialogStatus = "update";
        this.appDialog = true;
        this.$nextTick(() => {
            this.$refs["dataForm"].clearValidate();
        });
    },
    //修改应用
    updateData() {
        this.$refs["dataForm"].validate(valid => {
            if (valid) {
                let params = {
                    iotId: this.appData.iotId,
                    iotName: this.appData.iotName,
                    appType: this.appData.appType,
                    appId: this.appData.appId
                };
                const loading = this.$loading({
                    lock: true,
                    text: "请求操作中，请稍候",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.4)"
                });
                updateBindApp(this.appData.id, params).then(() => {
                    loading.close();
                    this.getAppList();
                    this.appDialog = false;
                    this.$notify({
                        title: "成功",
                        message: "更新成功",
                        type: "success",
                        duration: 2000
                    });
                }).catch(() => {
                    loading.close();
                });
            }
        });
    },
    //取消关联
    communityCancel(row) {
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
    appCancel(row) {
        this.$confirm(`确定要取消“${row.iotName}”应用的绑定吗？`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            const loading = this.$loading({
                lock: true,
                text: "请求操作中，请稍候",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.4)"
            });
            cancelBindApp(row.id).then(() => {
                loading.close();
                this.getAppList();
                this.$notify({
                    title: "成功",
                    message: "解绑成功",
                    type: "success",
                    duration: 2000
                });
            }).catch(() => {loading.close();});
        }).catch(() => {});
      },
    //查看订单
    seeOrder(row) {
      getRechargeDetials(row.no).then(res => {
        if (res.data.success) {
          this.dialog = true;
          this.orderData = res.data.data;
        }
      });
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
          this.getRow(res.data.data);
          this.getList();
          this.getAppList();
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
    },
    //重置表单数据
    resetFormData() {
      this.appData = {
        userId: undefined,
        iotId: undefined,
        iotName: undefined,
        appType: 1,
        appId: undefined
      }
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
    width: 80%;

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
      margin-right: 5%;
      font-size: 14px;
    }
  }

  .balance-box {
    margin-right: 1.5%;
    float: right;
    width: 18%;
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

    .title-tip{
      margin-left: 2%;
      font-size: 14px;
      color: #11A983;
      cursor: pointer;
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

.see-show{
  cursor: pointer;
}

.see-show:hover{
  color: #11A983;
}
</style>
