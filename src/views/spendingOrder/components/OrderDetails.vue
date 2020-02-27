<template>
  <div class="body" v-show="param.isShow">
    <div class="box">
      <div class="top">
        <p>订单详情</p>
        <el-button  type="primary" @click="close">返回</el-button>
      </div>
      <ul class="center">
        <li>消费订单号：{{param.data.no}}</li>
        <li>类型：{{param.data.orderType}}</li>
        <li>创建时间：{{param.data.createdOn}}</li>
        <li>金额：{{param.data.orderTotal}}</li>
        <li>支付状态：{{param.data.orderStatus}}</li>
        <li>支付时间：{{param.data.paymentOn}}</li>
      </ul>
      <div class="detailsTable">
        <el-table
          v-loading="loading"
          :data="list"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          fit
          highlight-current-row
          style="width: 96%;margin-left:2%"
        >
          <el-table-column label="序号" width="60" type="index" :index="tableIndex" />
          <el-table-column label="小区"  prop="communityName" >
          </el-table-column>
          <el-table-column label="呼叫类别" prop="sipType">
          </el-table-column>
          <el-table-column label="起始时间"  prop="beginTime">
          </el-table-column>
          <el-table-column label="结束时间" prop="endTime" >
          </el-table-column>
          <el-table-column label="主叫"  prop="caller" >
          </el-table-column>
          <el-table-column label="被叫" prop="answer" >
          </el-table-column>
          <el-table-column label="通话时长"  prop="duration" >
          </el-table-column>
          <el-table-column label="费用（元）" prop="amount">
          </el-table-column>
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
import { updateTime } from '@/assets/publicScript/public'
import { getOrderDetails } from "@/api/order/spendingOrder";
export default {
  props: ["param"],
  data() {
    return {
      list: [],
      loading: null,
      page: 1,
      limit: 10,
      total:0    
    };
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
    getList(no){
      let data = {
        page:this.page,
        limit:this.limit
      }
      getOrderDetails(no,data).then(res=>{
        if(res.data.success){
          for(let i of res.data.data.items){
            i.beginTime = updateTime(i.beginTime);
            i.endTime = updateTime(i.endTime);
          }
        this.total = res.data.data.totalCount;
        this.list = res.data.data.items
        }
        
      })
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
    height: 90%;
    overflow: auto;
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
    }
  }

  .center {
    list-style: none;
    width: 100%;
    height: 40%;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #666;
    //

    li {
      margin-bottom: 2%;
    }
  }

  .detailsTable {
    width: 100%;
    height: calc(60%-60px);
  }
}
</style>
