<template>
  <div class="app-container">
    <div v-show="!accountTable&&!rechargeTable">
      <div class="filter-container">
        <el-input v-model="params.account" placeholder="用户账号" style="width: 250px;margin-right: 5px;" class="filter-item" @keyup.enter.native="queryData" clearable/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
      </div>

      <div data-v-0b02e756 class="toolbar-group">
        <button data-v-0b02e756 type="button" class="el-button el-button--text el-button--mini" @click="openAddCom">
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
      >
        <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
        <el-table-column label="账号ID" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.connectPlot }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额（元）" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
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
              :current-page="params.pageIndex + 1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="params.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
            title="新增账号"
            :visible.sync="addDialog"
            :close-on-click-modal="false"
            :append-to-body="true"
    >
      <el-form
              ref="dataForm"
              :rules="accountRules"
              :model="accountFormData"
              label-position="right"
              label-width="100px"
              style="width: 80% !important;"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="accountFormData.account" placeholder="请输入账号" clearable/>
        </el-form-item>
        <el-form-item label="关联社区" prop="connectPlot">
          <el-input v-model="accountFormData.connectPlot" placeholder="请输入关联的社区" clearable/>
        </el-form-item>
        <el-form-item label="充值总金额" prop="amount">
          <el-input v-model="accountFormData.amount" placeholder="请输入充值总金额" clearable/>
        </el-form-item>
        <el-form-item label="充值次数" prop="count">
          <el-input v-model="accountFormData.count" placeholder="请输入充值次数" clearable/>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="accountFormData.balance" placeholder="请输入余额" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="addData">确定</el-button>
      </div>
    </el-dialog>

    <recharge ref="rechargeChild" v-show="rechargeTable" :row="currentRow" @backRecharge="backRecharge"/>

    <account-list ref="accountChild" v-show="accountTable" :row="currentRow" @backAccount="backAccount"/>
  </div>
</template>

<script>
import accountList from "./components/AccountList";
import recharge from "./components/Recharge";

export default {
    name: 'Account',
    components: { accountList, recharge },
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
            accountFormData: {
                account: undefined,
                connectPlot: undefined,
                amount: undefined,
                count: undefined,
                balance: undefined
            },
            addDialog: false,
            accountTable: false,
            rechargeTable: false,
            currentRow: {},
            accountRules: {
                title: [
                    { required: true, message: "请输入公告标题", trigger: "change" },
                    { max: 20, message: "标题不能超过20个单位", trigger: "blur" }
                ],
                textContent: [
                    { required: true, message: "请输入公告内容", trigger: "change" }
                ]
            },
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
                    if(this.data[j].account.indexOf(this.params.account) !== -1) this.accountList.push(this.data[j]);
                }
                this.total = this.accountList.length;
            }
        },
        //打开新增账号弹框
        openAddCom(){
            this.resetFormData();
            this.addDialog = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        //新增账户
        addData(){
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.addDialog = false;
                    console.log(this.accountFormData);
                }
            });
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
            this.currentRow = row;
            this.$refs.accountChild.getList();
            this.$refs.accountChild.getRechargeList();
        },
        goRecharge(row){
            this.rechargeTable = true;
            this.currentRow = row;
            this.$refs.rechargeChild.resetFormData();
        },
        //重置表单数据
        resetFormData() {
            this.accountFormData = {
                account: undefined,
                connectPlot: undefined,
                amount: undefined,
                count: undefined,
                balance: undefined
            };
        }
    }
}
</script>