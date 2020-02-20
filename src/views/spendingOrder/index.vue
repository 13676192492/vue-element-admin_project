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
      <el-select v-model="params.search.orderStatus" placeholder="请选择订单状态" style="margin-right:1%;">
        <!-- <el-option label="新订单" value="0"></el-option>
        <el-option label="挂起" value="10"></el-option> -->
        <el-option label="待付款" value="20"></el-option>
        <!-- <el-option label="付款失败" value="25"></el-option> -->
        <el-option label="已付款" value="30"></el-option>
        <!-- <el-option label="发货中" value="40"></el-option>
        <el-option label="已发货" value="50"></el-option>
        <el-option label="交易成功" value="60"></el-option>
        <el-option label="交易取消" value="70"></el-option> -->
      </el-select>
      <el-select v-model="params.search.orderType" placeholder="请选择支付状态" style="margin-right:1%;">
        <el-option label="待支付" value="20"></el-option>
        <el-option label="成功" value="30"></el-option>
      </el-select>
      <el-button  type="primary" icon="el-icon-search" @click="getList">查询</el-button>
    </div>
<!-- 
    <div data-v-0b02e756 class="toolbar-group">
      <button
        data-v-0b02e756
        type="button"
        class="el-button el-button--text el-button--mini"
        @click="openAddCom"
      >
        <span>
          <i data-v-0b02e756 class="ali-icons el-iconxinzeng" /> 新增住户
        </span>
      </button>
    </div> -->

    <el-table
      ref="singleTable"
      v-loading="loading"
      :data="list"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" width="60" type="index" :index="tableIndex" />
      <el-table-column label="消费订单号" min-width="120" sortable >
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="110" sortable >
        <template slot-scope="{row}">
          <span>{{ changeOrderType(row.orderType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="80" sortable>
        <template slot-scope="{row}">
          <span>{{ row.createdOn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" min-width="110" sortable>
        <template slot-scope="{row}">
          <span>{{ row.paymentOn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额（元）" min-width="110" sortable >
        <template slot-scope="{row}">
          <span>{{ row.orderTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="120" sortable >
        <template slot-scope="{row}">
          <span>{{ row.orderStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <div class="btnGroup">
            <el-tag>
              <el-button type="text" @click="orderDetails(scope.row)">详情</el-button>
            </el-tag>
          </div>
        </template>
      </el-table-column>
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
    <OrderDetails></OrderDetails>
  </div>
</template>
<script>
import {getOrderList} from '@/api/order/spendingOrder'
import OrderDetails from "./components/OrderDetails";
export default {
  components: {
    OrderDetails
  },
  data() {
    return {
      pickerDisabled: {
        disabledDate: (time) => {
            return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
          }
      },
      loading:false,
      params:{
        search:{
          orderStatus:null,
          orderType:null,
          createdOnStart:null,
          createdOnEnd:null
        },
        page:1,
        limit:10
      },
      total:1,
      selectTime:null,
      list: {}
    };
  },
  mounted(){
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.params.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    tableIndex(index) {
      return (this.params.page-1) * this.params.limit + index + 1;
    },
    changeOrderType(type){
      switch(type){
        case 20:return '待支付';break;
        default:return '已支付';
      }
    },
    getList() {
      this.loading = true;
      // console.log(this.changeTimeFormat(this.selectTime[0]))
      if(this.selectTime){
        this.params.search.createdOnStart = this.changeTimeFormat(this.selectTime[0])
        this.params.search.createdOnEnd = this.changeTimeFormat(this.selectTime[1])
      }
      console.log(this.params)

      getOrderList(this.params).then(res=>{
        if(res.data.success){
          this.total = res.data.data.totalCount;
          this.list = res.data.data.items
        }
       this.loading = false;
      })
    },
    orderDetails() {},
    //修改时间格式
    changeTimeFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-range-separator {
  width: 6%;
  padding: 0 !important;
}
</style>