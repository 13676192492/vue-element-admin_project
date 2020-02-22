<template>
  <div class="app-container">    
    <div class="filter-container">
      <el-input v-model="params.communityName" style="width:200px;margin-right:1%" placeholder="请输入小区名称"></el-input>
      <el-date-picker
        v-model="selectTime"
        type="daterange"
        range-separator="至"
        :picker-options="pickerDisabled"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-right:1%;"
      ></el-date-picker>
      <el-select v-model="params.sipType" placeholder="请选择呼叫类型" style="margin-right:1%;">
        <el-option label="Sip通话" value="0"></el-option>
        <el-option label="视频通话" value="1"></el-option>
      </el-select>
      <el-button  type="primary" icon="el-icon-search" @click="orderDetails">查询</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column label="序号" width="60" type="index" />
      <el-table-column
        prop="communityName"
        label="小区">
      </el-table-column>
      <el-table-column
        prop="sipType"
        label="呼叫类别">
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="起始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="caller"
        label="主叫">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="被叫">
      </el-table-column>
      <el-table-column
        prop="duration"
        label="通话时长">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="费用（元）">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        label="消费订单号">
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import {getPhoneBillList} from '@/api/phoneBill/index'
export default {
  data() {
    return {
      pickerDisabled: {
        disabledDate: (time) => {
            return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
          }
      },
      selectTime:null,
      params: {
          communityName:null,
          beginTime:null,
          endTime:null,
          sipType:null,
          pageSize:1,
          lastId:null
      },
      tableData: []
      
    };
  },
  mounted(){
    this.orderDetails();
  },
  methods:{
      orderDetails(){
        console.log(123)
        if(this.selectTime){
        this.params.createdOnStart = this.changeTimeFormat(this.selectTime[0])
        this.params.createdOnEnd = this.changeTimeFormat(this.selectTime[1])
      }
        getPhoneBillList(this.params).then(res=>{        
          if(res.data.success){
            this.tableData = res.data.data.items
          }
        })
      }
  }
  
};
</script>