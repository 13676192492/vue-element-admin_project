<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="params.search.appId"
        style="width:200px;margin-right:1%"
        placeholder="请输入appid"
        clearable
      ></el-input>
      <el-date-picker
        v-model="selectTime"
        type="daterange"
        range-separator="至"
        :picker-options="pickerDisabled"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-right:1%;"
      ></el-date-picker>

      <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" width="60" type="index" :index="tableIndex" />
      <el-table-column label="appid" prop="appId"></el-table-column>
      <el-table-column label="应用名称" prop="iotName"></el-table-column>
      <el-table-column label="统计日期">
        <template slot-scope="{ row }">
            <span>{{row.totalTime|changeTime}}</span>
          </template>
      </el-table-column>
      <el-table-column label="费用（元）" prop="fee"></el-table-column>
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
</template>
<script>
import { getAdminApplicationBillList } from "@/api/applicationBill/index";
import { updateTime, changeTimeFormat } from "@/assets/publicScript/public";
export default {
  data() {
    return {
      pickerDisabled: {
        disabledDate: time => {
          return (
            time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      },
      loading: false,
      params: {
        search: {
          appId: null,
          createdOnStart: null,
          createdOnEnd: null
        },
        page: 1,
        limit: 10
      },
      param: {
        isShow: false
      },
      total: 1,
      selectTime: null,
      list: []
    };
  },
  filters: {
    changeTime(val) {
      let time = '-'
      if (val) {
        time = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + val.slice(6);       
      }
      return time;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getData(){
      this.params.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    tableIndex(index) {
      return (this.params.page - 1) * this.params.limit + index + 1;
    },
    //关闭新增遮罩层
    closeMask(res) {
      this.param.isShow = res;
      this.getList();
    },
    getList() {
      this.loading = true;
      if (this.selectTime) {
        this.params.search.createdOnStart = changeTimeFormat(
          this.selectTime[0]
        );
        this.params.search.createdOnEnd = changeTimeFormat(this.selectTime[1]);
      } else {
        this.params.search.createdOnStart = null;
        this.params.search.createdOnEnd = null;
      }

      getAdminApplicationBillList(this.params).then(res => {
        if (res.data.success) {
          this.total = res.data.data.totalCount;
          this.list = res.data.data.items;
        } else {
          this.$notify({
            title: "失败",
            message: res.data.message,
            type: "error"
          });
        }
        this.loading = false;
      });
    },
    orderDetails(params) {
      this.param.isShow = true;
      this.param.data = params;
      this.$refs.getDetails.getList(this.params.no);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-range-separator {
  width: 6%;
  padding: 0 !important;
}
/deep/ .el-table__header {
  width: 100% !important;
}
</style>