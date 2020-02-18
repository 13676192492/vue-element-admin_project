<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="params.account"
        placeholder="用户账号"
        style="width: 250px;margin-right: 5px;"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="params.name"
        placeholder="用户姓名"
        style="width: 250px;margin-right: 5px;"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="params.phone"
        placeholder="手机号码"
        style="width: 250px;margin-right: 5px;"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="params.identity_no"
        placeholder="证件号码"
        style="width: 250px;margin-right: 5px;"
        class="filter-item"
        clearable
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
    </div>

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
    </div>

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
import OrderDetails from "./components/OrderDetails"
export default {
  components:{
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
        list:{}
    };
  },
  methods:{
      orderDetails(){

      }
  }
  
};
</script>