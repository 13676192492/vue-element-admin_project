<template>
  <div class="body" v-if="param.isShow">
    <div class="box">
      <div class="top">
        <p>订单详情</p>
        <el-button type="primary" @click="close">返回</el-button>
      </div>
      <ul class="center">
        <li>消费订单号：{{ param.data.no }}</li>
        <li>类型：{{ param.data.orderType | changeOrderType }}</li>
        <li>创建时间：{{ param.data.createdOn }}</li>
        <li>金额：{{ param.data.orderTotal }} 元</li>
        <li>支付状态：{{ param.data.orderStatus }}</li>
        <li>支付时间：{{ param.data.paymentOn }}</li>
      </ul>
      <div class="detailsTable">
        <div class="tips">
          <p v-if="param.data.orderType == 2">订单信息（sip通话）</p>
          <p v-if="param.data.orderType == 4">订单信息（应用订单）</p>
        </div>
        <el-table
          v-if="param.data.orderType == 2"
          v-loading="loading"
          :data="list"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          border
          fit
          highlight-current-row
          style="width: 96%;margin-left:2%"
        >
          <el-table-column
            label="序号"
            width="60"
            type="index"
            :index="tableIndex"
          />
          <el-table-column label="小区" prop="communityName"></el-table-column>
          <el-table-column label="呼叫类别">
            <template slot-scope="{ row }">
              <span>{{ row.sipType | filter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主叫" prop="caller"></el-table-column>
          <el-table-column label="被叫" prop="answer"></el-table-column>
          <el-table-column prop="createdOn" label="创建时间"></el-table-column>
          <el-table-column prop="sayTime" label="通话时间"></el-table-column>
          <el-table-column label="通话时长">
            <template slot-scope="{ row }">
              <span>{{ row.duration | duration }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用（元）" prop="amount"></el-table-column>
        </el-table>

        <el-table
          v-if="param.data.orderType == 4"
          v-loading="loading"
          :data="ucpList"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          border
          fit
          highlight-current-row
          style="width: 96%;margin-left:2%"
        >
          <el-table-column
            label="序号"
            width="60"
            type="index"
            :index="tableIndex"
          />
          <el-table-column label="appid" prop="appId"></el-table-column>
          <el-table-column label="应用名称" prop="iotName"></el-table-column>
          <el-table-column label="统计日期">
            <template slot-scope="{ row }">
              <span>{{ row.totalTime | changeTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用（元）" prop="fee"></el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { updateTime, changeTimeFormat } from "@/assets/publicScript/public";
import {
  getSipOrderDetails,
  getUcpOrderDetails
} from "@/api/order/spendingOrder";
export default {
  props: ["param"],
  data() {
    return {
      list: [],
      ucpList: [],
      loading: null,
      page: 1,
      limit: 10,
      total: 0,
      no: null
    };
  },
  filters: {
    filter(val) {
      if (val == "0") return "sip通话";
      else return "视频通话";
    },
    duration(val) {
      let min = parseInt(val / 60);
      let sec = val % 60;
      if (!!min) {
        return `${min}分${sec}秒`;
      } else {
        return `${sec}秒`;
      }
    },
    changeOrderType(val) {
      if (val == 2) return "Sip通话";
      else if (val == 4) return "应用订单";
    },
    changeTime(val) {
      let time = '-'
      if (val) {
        time = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + val.slice(6);       
      }
      return time;
    }
  },
  methods: {
    tableIndex(index) {
      return (this.page - 1) * this.limit + index + 1;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList() {
      let data = {
        page: this.page,
        limit: this.limit
      };

      if (this.param.orderType == 2) {
        getSipOrderDetails(this.param.data.no, data).then(res => {
          if (res.data.success) {
            for (let i of res.data.data.items) {
              i.createdOn = changeTimeFormat(i.createdOn);
              i.sayTime =
                updateTime(i.beginTime, 1) + " 至 " + updateTime(i.endTime, 1);
            }
            this.total = res.data.data.totalCount;
            this.list = res.data.data.items;
          }
        });
      } else {
        getUcpOrderDetails(this.param.data.no, data).then(res => {
          if (res.data.success) {
            this.total = res.data.data.totalCount;
            this.ucpList = res.data.data.items;
          }
        });
      }
    },
    close() {
      this.$emit("closeMask", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 90%;
  position: absolute;
  top: 90px;
  left: 0;
  z-index: 8;
  background-color: #fff;

  .box {
    width: 90%;
    padding-bottom: 2%;
    margin: 2% 5%;
    border: 1px solid #eee;
    border-radius: 5px;

    .top {
      padding: 0 2%;
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #eee;
      color: #666;
      display: flex;
      // flex-direction: column;
      align-items: center;
      justify-content: space-between;

      p {
        width: 150px;
        padding-left: 1%;
        border-left: 3px solid #11a983;
      }
    }
  }

  .center {
    margin: 0;
    list-style: none;
    width: 100%;
    height: 40%;
    // border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #666;
    //

    li {
      margin: 1.5% 0;
    }
  }

  .detailsTable {
    width: 100%;
    height: calc(60%-60px);

    .tips {
      width: 100%;
      padding: 0 2%;
      height: 60px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 2%;
      color: #666;

      p {
        padding-left: 1%;
        border-left: 3px solid #11a983;
      }
    }
  }
}
</style>
