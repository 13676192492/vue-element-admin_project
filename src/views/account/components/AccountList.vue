<template>
  <div>
    <div v-show="!plotTable&&!rechargeTable">
      <div class="title-box clearfix">
        <span class="title-name">账号详情</span>
        <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
        <el-button class="title-button" style="margin-right: 10px;" type="primary" plain @click="goRecharge">充值</el-button>
      </div>

      <div class="account-box clearfix">
        <div class="info-box">
          <p>
            <span class="id-class">账号ID：{{ row.id }}</span>
            <!--<span class="del-class" @click="">删除账号</span>-->
          </p>
          <span class="other-class">账号：{{ row.account }}</span>
          <span class="other-class">手机号码：{{ row.phone? row.phone:'无' }}</span>
          <span class="other-class">公司：{{ row.company? row.company:'太川云科技有限公司' }}</span>
          <span class="other-class">创建日期：{{ row.createTime? row.createTime:'2020-2-21' }}</span>
        </div>
        <div class="balance-box">
          <p class="balance-title">余额</p>
          <span class="balance-content">{{ row.balance }} 元</span>
        </div>
      </div>

      <div class="table-box">
        <div class="table-title-box clearfix">
          <span class="title-name">已关联的社区</span>
          <el-button class="title-button" type="primary" @click="goPlot">关联社区</el-button>
        </div>

        <el-table
                :data="plotList"
                ref="plotTable"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                border fit
                highlight-current-row
                style="width: 100%;"
        >
          <el-table-column label="序号" width="60" type="index"></el-table-column>
          <el-table-column label="社区名称" min-width="110">
            <template slot-scope="{ row }">
              <span>{{ row.coName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社区地址" min-width="130">
            <template slot-scope="{ row }">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社区电话" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联日期" min-width="110">
            <template slot-scope="{ row }">
              <span>{{ row.associatedDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社区累计消耗（元）" min-width="160">
            <template slot-scope="{ row }">
              <span>{{ row.consume }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="btnGroup">
                <el-tag><el-button type="text" @click="">取消关联</el-button></el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="table-box">
        <div class="table-title-box clearfix">
          <span class="title-name">充值订单</span>
          <span class="title-text">订单成功总金额：{{ row.amount }} 元</span>
          <!--<el-button class="title-button" type="primary" @click="">导出</el-button>-->
        </div>

        <el-table
                :data="rechargeList"
                ref="rechargTable"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                border
                fit
                highlight-current-row
                style="width: 100%;"
        >
          <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
          <el-table-column label="订单号" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号" min-width="120">
            <template slot-scope="{ row }">
              <span>{{ row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易金额（元）" min-width="130">
            <template slot-scope="{ row }">
              <span>{{ row.payAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" min-width="110">
            <template slot-scope="{ row }">
              <span>{{ row.payWay }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付状态" min-width="100">
            <template slot-scope="{ row }">
              <span>{{ row.payStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="140">
            <template slot-scope="{ row }">
              <span>{{ row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="btnGroup">
                <el-tag><el-button type="text" @click="">查看单号</el-button></el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          :current-page="params.pageIndex + 1"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <connect-plot ref="plotChild" v-show="plotTable" :row="currentRow" @backPlot="backPlot"/>

    <recharge ref="rechargeChild" v-show="rechargeTable" :row="currentRow" @backRecharge="backRecharge"/>
  </div>
</template>

<script>
import connectPlot from "@/views/property/components/ConnectPlot";
import recharge from "@/views/property/components/Recharge";

export default {
    name: 'AccountList',
    components: { connectPlot, recharge },
    props: {
        row: { type: Object, required: true }
    },
    data() {
        return {
            plotList: [
                { id: 123456, coName: '太川云社区', address: '广东省珠海市香洲区', phone: '0756-1253698', associatedDate: '2020-2-21', consume: 125 },
                { id: 123456, coName: '太川云社区', address: '广东省珠海市香洲区', phone: '0756-1253698', associatedDate: '2020-2-21', consume: 125 },
                { id: 123456, coName: '太川云社区', address: '广东省珠海市香洲区', phone: '0756-1253698', associatedDate: '2020-2-21', consume: 125 }
            ],
            dataList: [
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '微信', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '支付宝', payStatus: '失败', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '公司转账', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '银行卡转账', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '微信', payStatus: '待支付', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '支付宝', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '公司转账', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '微信', payStatus: '待支付', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '微信', payStatus: '成功', createTime: '2020-2-20 14:14:14' },
                { id: 123456, num: '201911275369875', account: '15015948432', payAmount: 1000, payWay: '支付宝', payStatus: '成功', createTime: '2020-2-20 14:14:14' }
            ],
            rechargeList: null,
            total: 0,
            loading: true,
            params: {
                pageIndex: 0,
                pageSize: 5,
                orderBy: undefined
            },
            plotTable: false,
            rechargeTable: false,
            currentRow: {}
        }
    },
    methods: {
        //重置表单并返回
        goBack() {
            this.$emit("backAccount", false);
        },
        //返回序号
        tableIndex(index) {
            return this.params.pageIndex * this.params.pageSize + index + 1;
        },
        // 查询条数变更
        handleSizeChange: function(val) {
            this.params.pageSize = val;
            this.getRechargeList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.pageIndex = val - 1;
            this.getRechargeList();
        },
        //排序查询
        sortChange(data) {
            if (data.order === "ascending") {
                this.params.orderBy = data.prop + " asc";
            } else if (data.order === "descending") {
                this.params.orderBy = data.prop + " desc";
            } else {
                this.params.orderBy = undefined;
            }
            this.getRechargeList();
        },
        //获取已关联社区列表
        getList() {

        },
        //获取充值订单列表
        getRechargeList() {
            this.rechargeList = [];
            let index = this.params.pageIndex * this.params.pageSize;
            for(let i = 0; i < this.params.pageSize; i++){
                if(this.dataList[index+i]) this.rechargeList.push(this.dataList[index+i]);
            }
            this.total = this.dataList.length;
        },
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
            this.currentRow = this.row;
            this.$refs.plotChild.getPlotList();
        },
        goRecharge(){
            this.rechargeTable = true;
            this.currentRow = this.row;
            this.$refs.rechargeChild.resetFormData();
        }
    }
};
</script>

<style lang="scss" scoped>
  .title-box{
    margin-bottom: 20px;
    padding: 0 5px;
    height: 2.4rem;
    border-bottom: 2px solid #ddd;
    vertical-align: center;

    .title-name{
      font-size: 20px;
      color: #333;
    }

    .title-button{
      padding: 10px 30px;
      float: right;
      margin-top: -6px;
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

  .account-box{
    margin-bottom: 20px;
    padding: 0 5px 20px;
    border-bottom: 2px solid #ddd;

    .info-box{
      float: left;
      width: 88%;

      .id-class{
        margin-right: 12%;
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }

      .del-class{
        font-size: 12px;
        cursor: pointer;
        color: #333;
      }

      .del-class:hover{
        color: #3A71A8;
      }

      .other-class{
        margin-right: 10%;
        font-size: 14px;
      }
    }

    .balance-box{
      margin-right: 1.5%;
      float: right;
      width: 10%;
      text-align: right;

      .balance-title{
        font-size: 14px;
        color: #999;
      }

      .balance-content{
        font-size: 24px;
        color: #333;
      }
    }

    p{
      margin-top: 0;
    }
  }

  .table-box{
    width: 98%;

    .table-title-box{
      margin: 2rem 0 1rem;
      height: 2.4rem;
      line-height: 2.4rem;
      border-left: 4px solid #ccc;
      vertical-align: center;

      .title-name{
        margin-left: 1.5%;
        font-size: 20px;
        color: #333;
      }

      .title-text{
        margin-left: 10%;
        font-size: 12px;
      }

      .title-button{
        padding: 10px 30px;
        float: right;
        color: #fff !important;
        background: #11A983 !important;
        border-color: #11A983 !important;
      }

      .title-button:hover, .title-button:focus {
        color: #11A983 !important;
        background: #e7f6f3 !important;
        border-color: #a0ddcd !important;
      }
    }
  }
</style>
