<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="params.communityName"
        style="width:200px;margin-right:1%"
        placeholder="请输入小区名称"
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
      <el-select v-model="sipType" placeholder="请选择呼叫类型" style="margin-right:1%;">
        <el-option label="全部" value=""></el-option>
        <el-option label="Sip通话" value="0"></el-option>
        <el-option label="视频通话" value="1"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="init">查询</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column label="序号" width="60" type="index" />
      <el-table-column prop="orderNo" label="消费订单号"></el-table-column>
      <el-table-column prop="communityName" label="小区"></el-table-column>
      <el-table-column prop="sipType" label="呼叫类别"></el-table-column>
      <el-table-column prop="caller" label="主叫"></el-table-column>
      <el-table-column prop="answer" label="被叫"></el-table-column>
      <el-table-column prop="createdOn" label="创建时间"></el-table-column>
      <el-table-column prop="sayTime" label="通话时间"></el-table-column>      
      <el-table-column label="通话时长">
        <template slot-scope="{ row }">
          <span>{{ row.duration | filter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop ='amount' label="费用（元）"></el-table-column>

    </el-table>
    <p class="loading" v-show="onFetching">加载中。。</p>
  </div>
</template>
<script>
import { getPhoneBillList } from "@/api/phoneBill/index";
import { updateTime,changeTimeFormat } from '@/assets/publicScript/public'
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
      selectTime: null,
      onFetching: false,
      sipType:null,
      params: {
        communityName: null,
        beginTime: null,
        endTime: null,
        sipType: null,
        pageSize: 20,
        lastId: null
      },
      tableData: []
    };
  },
  filters:{
    filter(val){
      let min = parseInt(val/60);
      let sec = val%60;
      if(!!min){
        return `${min}分${sec}秒`
      }else{
        return `${sec}秒`
      }
    }
  },
  mounted() {
    this.init();
    document
      .getElementsByClassName("main-container")[0]
      .addEventListener("scroll", this.scrollLoad, true);
  },
  methods: {
    init() {
      this.params.lastId = null;
      this.tableData = [];
      this.orderDetails(0);
    },
    orderDetails(num) {
      if (!this.onFetching) {
           
      this.onFetching = true;
      if (this.selectTime) {
        this.params.beginTime = changeTimeFormat(this.selectTime[0]);
        this.params.endTime = changeTimeFormat(this.selectTime[1]);
      }else{
        this.params.beginTime = null
        this.params.endTime = null
      }

      if(this.sipType)
        this.params.sipType = +this.sipType;
      else if(this.sipType == '')
        this.params.sipType = null;

      getPhoneBillList(this.params).then(res => {
        if (res.data.success) {
          if(res.data.data.items.length>0){
            for(let i of res.data.data.items){
              i.createdOn = updateTime(i.createdOn,0);
              // i.beginTime = updateTime(i.beginTime,1);
              // i.endTime = updateTime(i.endTime,1);
              i.sayTime = updateTime(i.beginTime,1)+' 至 '+ updateTime(i.endTime,1)
              if(i.sipType==0){
                i.sipType = 'Sip通话'
              }else{
                i.sipType = '视频通话'
              }
            }
            this.tableData.push(...res.data.data.items);
            this.params.lastId = res.data.data.items[res.data.data.items.length-1].id;
            
             
          }

        }
        // console.log(num)
        this.setscroll(num)
        this.onFetching = false;
      });
       }
     
      
    },
    setscroll(num){
        document.getElementsByClassName("app-main")[0].scrollTop = num-30
    },
    scrollLoad() { 
      let dom = document.getElementsByClassName("app-main")[0];  
        if (dom.scrollHeight - dom.clientHeight - dom.scrollTop <= 0) {         
            this.orderDetails(dom.scrollTop); //加载列表的请求方法    
        }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #bebebe;
  font-size: 18px;
}
</style>