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
      <!-- <el-select v-model="params.search.orderStatus" placeholder="请选择订单类型" style="margin-right:1%;">
        <el-option label="Sip通话" value="1"></el-option>
      </el-select> -->
      <el-select v-model="orderStatus" placeholder="请选择支付状态" style="margin-right:1%;">
        <el-option label="全部" value=""></el-option>
        <el-option label="待支付" value="20"></el-option>
        <el-option label="成功" value="30"></el-option>
      </el-select>
      <el-button  type="primary" icon="el-icon-search" @click="getList">查询</el-button>
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
      <el-table-column label="消费订单号"   prop="no"   >
      </el-table-column>
      <el-table-column label="类型"  prop="orderType"   >
      </el-table-column>
      <el-table-column label="创建时间"  prop="createdOn" >
      </el-table-column>
      <el-table-column label="支付时间" prop="paymentOn"  >
      </el-table-column>
      <el-table-column label="金额（元）"  prop="orderTotal" >
      </el-table-column>
      <el-table-column label="支付状态" prop="orderStatus" >
      </el-table-column>
      <el-table-column label="操作" >
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
    <OrderDetails ref="getDetails" v-bind:param="param" v-on:closeMask="closeMask"></OrderDetails>
    
  </div>
</template>
<script>
import {getOrderList} from '@/api/order/spendingOrder'
import OrderDetails from "./components/OrderDetails";
import { updateTime,changeTimeFormat } from '@/assets/publicScript/public'
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
      orderStatus:null,
      params:{
        search:{
          orderStatus:null,
          orderType:2,
          createdOnStart:null,
          createdOnEnd:null
        },
        page:1,
        limit:10
      },
      param: {
        isShow: false
      },
      total:1,
      selectTime:null,
      list: []
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
      if(type==2)
        return 'Sip通话'
      // switch(type){
      //   case 1:return 'Sip通话';break;
      //   default:return '';
      // }
    },
    changePayStatus(type){
      switch(type){
        case 20:return '待支付';break;
        default:return '成功';
      }
    },
    //关闭新增遮罩层
    closeMask(res) {
      this.param.isShow = res;
      this.getList();
    },
    //获取数据
    getList() {
      this.loading = true;
      // console.log(this.changeTimeFormat(this.selectTime[0]))
      if(this.selectTime){
        this.params.search.createdOnStart = changeTimeFormat(this.selectTime[0])
        this.params.search.createdOnEnd = changeTimeFormat(this.selectTime[1])
      }else{
        this.params.search.createdOnStart = null
        this.params.search.createdOnEnd = null
      }
      if(this.orderStatus)
        this.params.search.orderStatus = +this.orderStatus
      else if(this.orderStatus == '')
        this.params.search.orderStatus = null


      getOrderList(this.params).then(res=>{
        if(res.data.success){
          for(let i of res.data.data.items){
            i.createdOn = updateTime(i.createdOn);
            i.paymentOn = updateTime(i.paymentOn);
            i.orderType = this.changeOrderType(i.orderType)
            i.orderStatus = this.changePayStatus(i.orderStatus)
            if(i.orderType ==1){
              i.orderType = 'Sip通话'
            }
          }
          this.total = res.data.data.totalCount;
          this.list = res.data.data.items
        }
       this.loading = false;
      })
    },
    orderDetails(params) {
      this.param.isShow = true;
      this.param.data = params;
      this.$refs.getDetails.getList()
    },
   
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-range-separator {
  width: 6%;
  padding: 0 !important;
}
/deep/ .el-table__header{
  width: 100% !important;
}
</style>