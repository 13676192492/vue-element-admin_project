<template>
  <div class="app-container">
    <div v-show="!accountTable&&!rechargeTable">
      <div class="filter-container">
        <el-input v-model="params.search.name" placeholder="账号" style="width: 250px;margin-right: 5px;" class="filter-item" @keyup.enter.native="queryData" clearable/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
      </div>

      <el-table
              v-loading="loading"
              :data="accountList"
              ref="accountTable"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              fit
              highlight-current-row
              style="width: 100%;"
      >
        <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
        <el-table-column label="账号ID" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" min-width="140">
          <template slot-scope="{ row }">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司" min-width="140">
          <template slot-scope="{ row }">
            <span>{{ row.extensionData? JSON.parse(row.extensionData).Settings.Company:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" min-width="90">
          <template slot-scope="{ row }">
            <span>{{ row.isActive? '已启用':'停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后上线时间" min-width="140">
          <template slot-scope="{ row }">
            <span>{{ row.lastLoginOn? row.lastLoginOn:'--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="btnGroup">
              <el-tag><el-button type="text" @click="goRecharge(scope.row)">充值</el-button></el-tag>
              <el-tag><el-button type="text" @click="goDetails(scope.row)">详情</el-button></el-tag>
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
    </div>

    <recharge ref="rechargeChild" v-show="rechargeTable" :type="0" @backRecharge="backRecharge"/>

    <account-list ref="accountChild" v-show="accountTable" @backAccount="backAccount"/>
  </div>
</template>

<script>
import { searchAccount, getAccount } from '@/api/manage/account'
import { updateTime } from '@/assets/publicScript/public'
import accountList from "./components/AccountList";
import recharge from "./components/Recharge";

export default {
    name: 'Account',
    components: { accountList, recharge },
    data() {
        return {
            accountList: null,
            total: 0,
            loading: true,
            params: {
                page: 1,
                limit: 10,
                search: { name: undefined }
            },
            accountTable: false,
            rechargeTable: false,
            currentRow: {},
        }
    },
    created(){
        this.getList();
    },
    methods: {
        //返回序号
        tableIndex(index) {
            return (this.params.page-1) * this.params.limit + index + 1;
        },
        // 查询条数变更
        handleSizeChange: function(val) {
            this.params.limit = val;
            this.getList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.page = val;
            this.getList();
        },
        //获取列表
        getList() {
            this.loading = true;
            let params = {};
            let name = this.params.search.name;
            if(name === undefined || name === '') params = { page: this.params.page, limit: this.params.limit };
            else params = this.params;
            searchAccount(params).then(response => {
                this.accountList = response.data.data.items;
                for(let i of this.accountList){
                    i.createdOn = updateTime(i.createdOn, 0);
                    if (i.updatedOn) i.updatedOn = updateTime(i.updatedOn, 0);
                    if (i.lastLoginOn) i.lastLoginOn = updateTime(i.lastLoginOn, 0);
                }
                this.total = response.data.data.totalCount;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        //查询列表
        queryData() {
            this.params.page = 1;
            this.getList();
        },
        //组件切换
        backAccount(a) {
            this.accountTable = a;
        },
        backRecharge(b) {
            this.rechargeTable = b;
        },
        //跳转详情页面
        goDetails(row){
            this.accountTable = true;
            getAccount(row.id).then(res => {
                this.currentRow = res.data.data;
                this.$refs.accountChild.getRow(Object.assign({}, this.currentRow));
                this.$refs.accountChild.getList();
                this.$refs.accountChild.getRechargeList();
            }).catch(err => { console.log(err); });
        },
        goRecharge(row){
            this.rechargeTable = true;
            getAccount(row.id).then(res => {
                this.currentRow = res.data.data;
                this.$refs.rechargeChild.getRow(Object.assign({}, this.currentRow));
                this.$refs.rechargeChild.resetFormData();
            }).catch(err => { console.log(err); });
        }
    }
}
</script>
