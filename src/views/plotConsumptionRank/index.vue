<template>
  <div class="app-container">
    <div class="title-box clearfix">
      <span class="title-name">小区消费</span>
      <span class="title-text">（近30日）</span>
      <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
    </div>

    <div class="filter-container">
      <el-input v-model="params.coName" placeholder="小区名称" style="width: 250px;margin-right: 10px;" class="filter-item" @keyup.enter.native="queryData" clearable/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryData">查询</el-button>
    </div>

    <el-table
      :data="list"
      ref="table"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="排名" width="100" sortable prop="ranking">
        <template slot-scope="{ row }">
          <span>{{ row.ranking }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属账号" min-width="120" sortable prop="account">
        <template slot-scope="{ row }">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小区" min-width="120" sortable prop="coName">
        <template slot-scope="{ row }">
          <span>{{ row.coName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门口机数量" min-width="120" sortable prop="emCount">
        <template slot-scope="{ row }">
          <span>{{ row.emCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费" min-width="100" sortable prop="consume">
        <template slot-scope="{ row }">
          <span>{{ row.consume }}</span>
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
</template>

<script>
export default {
    name: 'PlotConsumptionRank',
    data() {
        return {
            data: [
                { ranking: 1, account: 15015948432, coName: '太川云社区', emCount: 5, consume: 78 },
                { ranking: 2, account: 15015948122, coName: '太川社区', emCount: 2, consume: 45 },
                { ranking: 3, account: 15015788432, coName: '太川云社区', emCount: 9, consume: 99 },
                { ranking: 4, account: 15015942332, coName: '太川社区', emCount: 1, consume: 70 },
                { ranking: 5, account: 15015788432, coName: '太川云社区', emCount: 3, consume: 30 },
                { ranking: 6, account: 10159453432, coName: '太川云社区', emCount: 4, consume: 200 },
                { ranking: 7, account: 15015956432, coName: '太川社区', emCount: 6, consume: 130 },
                { ranking: 8, account: 15995948432, coName: '太川云社区', emCount: 7, consume: 144 },
                { ranking: 9, account: 15015748432, coName: '太川云社区', emCount: 5, consume: 120 },
                { ranking: 10, account: 15465484832, coName: '太川云社区', emCount: 9, consume: 60 },
                { ranking: 11, account: 15013131432, coName: '太川社区', emCount: 2, consume: 180 },
                { ranking: 12, account: 15015258432, coName: '太川云社区', emCount: 0, consume: 10 },
                { ranking: 13, account: 15054314302, coName: '太川社区', emCount: 6, consume: 97 },
                { ranking: 14, account: 15013878312, coName: '太川社区', emCount: 4, consume: 80 },
                { ranking: 15, account: 15015245842, coName: '太川云社区', emCount: 3, consume: 133 }
            ],
            list: null,
            total: 0,
            loading: true,
            params: {
              pageIndex: 0,
              pageSize: 10,
              coName: undefined,
              orderBy: undefined
            }
        }
    },
    created(){
        this.getList();
    },
    methods: {
        //返回
        goBack(){},
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
            //     this.list = response.data.dataArray;
            //     this.total = response.data.totalCount;
            //     this.loading = false;
            // }).catch(() => {
            //     this.loading = false;
            // });
            this.list = [];
            let index = this.params.pageIndex * this.params.pageSize;
            for(let i = 0; i < this.params.pageSize; i++){
                if(this.data[index+i]) this.list.push(this.data[index+i]);
            }
            this.total = this.data.length;
        },
        //查询列表
        queryData() {
            if(this.params.coName === ''||this.params.coName === undefined){
                this.params.pageIndex = 0;
                this.getList();
            } else {
                this.list = [];
                for(let j in this.data){
                    if(this.data[j].coName === this.params.coName) this.list.push(this.data[j]);
                }
                this.total = this.list.length;
            }
        }
    }
}
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
      color: #333;
    }

    .title-button{
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
</style>
