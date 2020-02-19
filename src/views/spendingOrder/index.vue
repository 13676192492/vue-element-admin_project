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
      <el-select v-model="orderStatus" placeholder="订单状态" style="margin-right:1%;">
        <el-option label="新订单" value="0"></el-option>
        <el-option label="挂起" value="10"></el-option>
        <el-option label="待付款" value="20"></el-option>
        <el-option label="付款失败" value="25"></el-option>
        <el-option label="已付款" value="30"></el-option>
        <el-option label="发货中" value="40"></el-option>
        <el-option label="已发货" value="50"></el-option>
        <el-option label="交易成功" value="60"></el-option>
        <el-option label="交易取消" value="70"></el-option>
      </el-select>
      <el-select v-model="orderType" placeholder="类型" style="margin-right:1%;">
        <el-option label="待支付" value="1"></el-option>
        <el-option label="成功" value="2"></el-option>
      </el-select>
      <el-button  type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
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
      @sort-change="sortChange"
    >
      <el-table-column label="序号" width="60" type="index" :index="tableIndex" />
      <el-table-column label="消费订单号" min-width="120" sortable prop="account">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="110" sortable prop="username">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="80" sortable prop="gender">
        <template slot-scope="{row}">
          <span>{{ setFormData('gender', row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" min-width="110" sortable prop="phone">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额（元）" min-width="110" sortable prop="identity_type">
        <template slot-scope="{row}">
          <span>{{ setFormData('identity_type', row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="120" sortable prop="identity_no">
        <template slot-scope="{row}">
          <span>{{ row.identity_no }}</span>
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
      :current-page="params.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <OrderDetails></OrderDetails>
  </div>
</template>
<script>
import OrderDetails from "./components/OrderDetails";
export default {
  components: {
    OrderDetails
  },
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 10,
        account: undefined,
        name: undefined,
        phone: null,
        identity_no: undefined,
        orderBy: undefined
      },
      selectTime:null,
      orderStatus:null,
      orderType:null,
      list: {}
    };
  },
  methods: {
    getList() {},
    orderDetails() {}
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-range-separator {
  width: 6%;
  padding: 0 !important;
}
</style>