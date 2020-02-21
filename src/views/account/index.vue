<template>
  <div class="app-container">
    <div v-show="!accountTable">
      <div class="filter-container">
        <el-input v-model="params.account" placeholder="用户账号" style="width: 250px;margin-right: 5px;" class="filter-item" @keyup.enter.native="queryData" clearable/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
      </div>

      <div data-v-0b02e756 class="toolbar-group">
        <button data-v-0b02e756 type="button" class="el-button el-button--text el-button--mini" @click="">
        <span>
          <i data-v-0b02e756 class="ali-icons el-iconxinzeng"></i> 新增账号
        </span>
        </button>
      </div>

      <el-table
              :data="accountList"
              ref="accountTable"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              @sort-change="sortChange"
      >
        <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
        <el-table-column label="账号ID" min-width="100" sortable prop="id">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" min-width="100" sortable prop="account">
          <template slot-scope="{ row }">
            <span>{{ row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值总金额" min-width="120" sortable prop="amount">
          <template slot-scope="{ row }">
            <span>{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值次数" min-width="110" sortable prop="count">
          <template slot-scope="{ row }">
            <span>{{ row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联的社区" min-width="140">
          <template slot-scope="{ row }">
            <span class="text-show" :title="row.connectPlot">{{ row.connectPlot }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" min-width="100" sortable prop="balance">
          <template slot-scope="{ row }">
            <span>{{ row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="btnGroup">
              <el-tag><el-button type="text" @click="">充值</el-button></el-tag>
              <el-tag><el-button type="text" @click="goDetails(scope.row)">详情</el-button></el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
              background
              :current-page="params.pageIndex + 1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="params.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
      />
    </div>

    <account-list ref="accountChild" v-show="accountTable" :row="currentRow" @backAccount="backAccount"/>
  </div>
</template>

<script>
import accountList from "./components/AccountList";

export default {
    name: 'Account',
    components: { accountList },
    data() {
        return {
            data: [
                { id: 43463, account: 15015948432, connectPlot: '太川云社区', amount: 1000, count: 5, balance: 78 },
                { id: 737436, account: 15015948122, connectPlot: '太川社区', amount: 1000, count: 2, balance: 45 },
                { id: 735424, account: 15015788432, connectPlot: '太川云社区', amount: 1000, count: 9, balance: 99 },
                { id: 943253, account: 15015942332, connectPlot: '太川社区', amount: 1000, count: 1, balance: 70 },
                { id: 326534, account: 15015788432, connectPlot: '太川云社区', amount: 1000, count: 3, balance: 30 },
                { id: 333777, account: 10159453432, connectPlot: '太川云社区', amount: 1000, count: 4, balance: 200 },
                { id: 4263434, account: 15015956432, connectPlot: '太川社区', amount: 1000, count: 6, balance: 130 },
                { id: 463643, account: 15995948432, connectPlot: '太川云社区', amount: 1000, count: 7, balance: 144 },
                { id: 463463, account: 15015748432, connectPlot: '太川云社区', amount: 1000, count: 5, balance: 120 },
                { id: 6434, account: 15465484832, connectPlot: '太川云社区', amount: 1000, count: 9, balance: 60 },
                { id: 3245, account: 15013131432, connectPlot: '太川社区', amount: 1000, count: 2, balance: 180 },
                { id: 93939, account: 15015258432, connectPlot: '太川云社区', amount: 1000, count: 0, balance: 10 },
                { id: 43434, account: 15054314302, connectPlot: '太川社区', amount: 1000, count: 6, balance: 97 },
                { id: 25252, account: 15013878312, connectPlot: '太川社区', amount: 1000, count: 4, balance: 80 },
                { id: 88888, account: 15015245842, connectPlot: '太川云社区', amount: 1000, count: 3, balance: 133 }
            ],
            accountList: null,
            total: 0,
            loading: true,
            params: {
                pageIndex: 0,
                pageSize: 10,
                account: undefined,
                orderBy: undefined
            },
            accountTable: false,
            currentRow: {}
        }
    },
    created(){
        this.getList();
    },
    methods: {
        //返回序号
        tableIndex(index) {
            return this.params.pageIndex * this.params.pageSize + index + 1;
        },
        // 查询条数变更
        handleSizeChange: function(val) {
            this.params.pageSize = val;
            this.getList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.pageIndex = val - 1;
            this.getList();
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
            this.queryData();
        },
        //获取列表
        getList() {
            // this.loading = true;
            // housesDevice(this.params, machineId).then(response => {
            //     this.accountList = response.data.dataArray;
            //     this.total = response.data.totalCount;
            //     this.loading = false;
            // }).catch(() => {
            //     this.loading = false;
            // });
            this.accountList = [];
            let index = this.params.pageIndex * this.params.pageSize;
            for(let i = 0; i < this.params.pageSize; i++){
                if(this.data[index+i]) this.accountList.push(this.data[index+i]);
            }
            this.total = this.data.length;
        },
        //查询列表
        queryData() {
            if(this.params.account === ''||this.params.account === undefined){
                this.params.pageIndex = 0;
                this.getList();
            } else {
                this.accountList = [];
                for(let j in this.data){
                    if(this.data[j].account === this.params.account) this.accountList.push(this.data[j]);
                }
                this.total = this.accountList.length;
            }
        },
        //组件切换
        backAccount(a) {
            this.accountTable = a;
        },
        //跳转详情页面
        goDetails(row){
            this.accountTable = true;
            this.currentRow = row;
            this.$refs.accountChild.getRechargeList();
        }
    }
}
</script>

<style lang="scss" scoped>
  .text-show {
    display: block;
    max-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
  }
</style>