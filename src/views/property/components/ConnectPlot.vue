<template>
  <div class="app-container">
    <div class="title-box clearfix">
      <span class="title-name">关联社区</span>
      <span class="title-text">（用户需要为关联小区sip通话缴费，请只关联自己的小区，如有异议，请联系售后）</span>
      <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
    </div>

    <div class="filter-container">
      <el-input v-model="params.search.name" placeholder="小区名称" style="width: 250px;margin-right: 10px;" class="filter-item" @keyup.enter.native="queryData" clearable/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
    </div>

    <el-table
            :data="list"
            ref="table"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            border fit
            highlight-current-row
            style="width: 100%;"
    >
      <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
      <el-table-column label="社区名称" min-width="120">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社区地址" min-width="180">
        <template slot-scope="{ row }">
          <span class="text-show" :title="row.address">{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" min-width="100">
        <template slot-scope="{ row }">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门口机" min-width="80">
        <template slot-scope="{ row }">
          <span class="see-show" @click="openDoorCom(row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <div class="btnGroup">
            <el-tag><el-button type="text" @click="connectSure(scope.row)">关联</el-button></el-tag>
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

    <el-dialog title="太川云社区门口机信息" :visible.sync="dialog" :close-on-click-modal="false" :append-to-body="true" width="50%">
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
        <el-button @click="dialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchUnrelated, bindPlot, searchDevice } from '@/api/property'

export default {
    name: 'ConnectPlot',
    data() {
        return {
            list: null,
            total: 0,
            doorList: null,
            doorTotal: 0,
            loading: true,
            params: {
                page: 1,
                limit: 10,
                search: { name: undefined }
            },
            doorParams: {
                page: 1,
                limit: 10,
            },
            dialog:false
        }
    },
    methods: {
        //返回
        goBack() {
            this.$emit("backPlot", false);
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
            this.getPlotList();
        },
        handleDoorSizeChange: function(val) {
            this.doorParams.limit = val;
            this.getDoorList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.page = val;
            this.getPlotList();
        },
        handleDoorCurrentChange: function(val) {
            this.doorParams.page = val;
            this.getDoorList();
        },
        //获取关联社区列表
        getPlotList() {
            this.loading = true;
            let params = {};
            let name = this.params.search.name;
            if(name === undefined || name === '') params = { page: this.params.page, limit: this.params.limit };
            else params = this.params;
            searchUnrelated(params).then(response => {
                this.list = response.data.data.items;
                this.total = response.data.data.totalCount;
                this.loading = false;
            }).catch(() => {
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
        //查询列表
        queryData() {
            this.params.page = 1;
            this.getPlotList();
        },
        //打开查看门口机弹框
        openDoorCom(row){
            this.doorParams.page = 1;
            this.doorParams.search = { communityId: row.id };
            this.dialog = true;
            this.getDoorList();
        },
        //确定关联
        connectSure(row){
            this.$confirm(`确定要关联“${ row.name }”小区吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: "请求操作中，请稍候",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.4)"
                });
                bindPlot(row.id).then(()=>{
                    loading.close();
                    this.getPlotList();
                    this.$emit("newList");
                    this.$notify({
                        title: '成功',
                        message: '关联成功',
                        type: 'success',
                        duration: 2000
                    });
                }).catch(() => { loading.close(); });
            }).catch(() => {});
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

    .title-text{
      font-size: 14px;
      color: #CC6600;
    }

    .title-button{
      float: right;
      margin: -6px 0 0 1%;
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

  .see-show{
    cursor: pointer;
  }

  .see-show:hover{
    color: #11A983;
  }
</style>