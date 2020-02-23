<template>
  <div class="app-container">
    <div class="title-box clearfix">
      <span class="title-name">关联社区</span>
      <span class="title-text">（用户需要为关联小区sip通话缴费，请只关联自己的小区，如有异议，请联系售后）</span>
      <el-button class="title-button" type="primary" plain @click="goBack">返回</el-button>
      <el-button class="title-button" type="primary" plain @click="">确定关联</el-button>
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
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="序号" width="60" type="index" :index="tableIndex"></el-table-column>
      <el-table-column label="社区名称" min-width="120">
        <template slot-scope="{ row }">
          <span>{{ row.coName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社区地址" min-width="180">
        <template slot-scope="{ row }">
          <span class="text-show" :title="row.address">{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" min-width="100">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门口机" min-width="80">
        <template slot-scope="{ row }">
          <span class="see-show" @click="openDoorCom">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="能否关联" min-width="80">
        <template slot-scope="{ row }">
          <span>{{ row.disabled===undefined? null:row.disabled? '能':'否' }}</span>
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

    <el-dialog title="太川云社区门口机信息" :visible.sync="dialog" :close-on-click-modal="false" :append-to-body="true" width="50%">
      <el-table
        :data="doorList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号" width="60" type="index" :index="doorIndex"></el-table-column>
        <el-table-column label="门口机名称" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门口机地址" min-width="180">
          <template slot-scope="{ row }">
            <span class="text-show" :title="row.address">{{ row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门口机机身号" min-width="120">
          <template slot-scope="{ row }">
            <span>{{ row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门口机类型" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :current-page="doorParams.pageIndex + 1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="doorParams.pageSize"
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
export default {
    name: 'ConnectPlot',
    props: {
        row: { type: Object, required: true }
    },
    data() {
        return {
            data: [
                { id: 6846, phone: 15015948432, coName: '太川云社区', address: '十大歌手', doorId: 245245, disabled: 0 },
                { id: 6846, phone: 15015948122, coName: '太川社区', address: '俺的沙发', doorId: 452542, disabled: 1 },
                { id: 6846, phone: 15015788432, coName: '太川云社区', address: '功夫', doorId: 93453, disabled: 1 },
                { id: 6846, phone: 15015942332, coName: '太川社区', address: '个梵蒂冈不能', doorId: 45371, disabled: 0 },
                { id: 6846, phone: 15015788432, coName: '太川云社区', address: '公司认购', doorId: 33643, disabled: 1 },
                { id: 6846, phone: 10159453432, coName: '太川云社区', address: '白癜风搞不懂', doorId: 44444, disabled: 0 },
                { id: 6846, phone: 15015956432, coName: '太川社区', address: '敢怒敢言', doorId: 664537, disabled: 0 },
                { id: 6846, phone: 15995948432, coName: '太川云社区', address: '部分好听好听好听', doorId: 87877, disabled: 0 },
                { id: 6846, phone: 15015748432, coName: '太川云社区', address: '有人让它', doorId: 523054, disabled: 1 },
                { id: 6846, phone: 15465484832, coName: '太川云社区', address: '你你你', doorId: 94545, disabled: 0 },
                { id: 6846, phone: 15013131432, coName: '太川社区', address: '如果同意', doorId: 2777, disabled: 1 },
                { id: 6846, phone: 15015258432, coName: '太川云社区', address: 'uatifg1sd1', doorId: 6607, disabled: 1 },
                { id: 6846, phone: 15054314302, coName: '太川社区', address: '脏', doorId: 46466, disabled: 0 },
                { id: 6846, phone: 15013878312, coName: '太川社区', address: '是根深蒂固', doorId: 478787, disabled: 1 },
                { id: 6846, phone: 15015245842, coName: '太川云社区', address: '十暖暖的法国人手', doorId: 3456545, disabled: 0 }
            ],
            doorData: [
                { id: 6846, phone: 15015948432, name: '太川云社区', address: '十大歌手', num: 245245, type: 0 },
                { id: 6846, phone: 15015948122, name: '太川社区', address: '俺的沙发', num: 452542, type: 1 },
                { id: 6846, phone: 15015788432, name: '太川云社区', address: '功夫', num: 93453, type: 1 },
                { id: 6846, phone: 15015942332, name: '太川社区', address: '个梵蒂冈不能', num: 45371, type: 0 },
                { id: 6846, phone: 15015788432, name: '太川云社区', address: '公司认购', num: 33643, type: 1 },
                { id: 6846, phone: 10159453432, name: '太川云社区', address: '白癜风搞不懂', num: 44444, type: 0 },
                { id: 6846, phone: 15015956432, name: '太川社区', address: '敢怒敢言', num: 664537, type: 0 },
                { id: 6846, phone: 15995948432, name: '太川云社区', address: '部分好听好听好听', num: 87877, type: 0 },
                { id: 6846, phone: 15015748432, name: '太川云社区', address: '有人让它', num: 523054, type: 1 },
                { id: 6846, phone: 15465484832, name: '太川云社区', address: '你你你', num: 94545, type: 0 },
                { id: 6846, phone: 15013131432, name: '太川社区', address: '如果同意', num: 2777, type: 1 },
                { id: 6846, phone: 15015258432, name: '太川云社区', address: 'uatifg1sd1', num: 6607, type: 1 },
                { id: 6846, phone: 15054314302, name: '太川社区', address: '脏', num: 46466, type: 0 },
                { id: 6846, phone: 15013878312, name: '太川社区', address: '是根深蒂固', num: 478787, type: 1 },
                { id: 6846, phone: 15015245842, name: '太川云社区', address: '十暖暖的法国人手', num: 3456545, type: 0 }
            ],
            list: null,
            total: 0,
            doorList: null,
            doorTotal: 0,
            loading: true,
            params: {
                pageIndex: 0,
                pageSize: 10,
                coName: undefined,
            },
            doorParams: {
                pageIndex: 0,
                pageSize: 10,
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
            return this.params.pageIndex * this.params.pageSize + index + 1;
        },
        doorIndex(index) {
            return this.doorParams.pageIndex * this.doorParams.pageSize + index + 1;
        },
        // 查询条数变更
        handleSizeChange: function(val) {
            this.params.pageSize = val;
            this.getPlotList();
        },
        handleDoorSizeChange: function(val) {
            this.doorParams.pageSize = val;
            this.getDoorList();
        },
        // 查询页码变更
        handleCurrentChange: function(val) {
            this.params.pageIndex = val - 1;
            this.getPlotList();
        },
        handleDoorCurrentChange: function(val) {
            this.doorParams.pageIndex = val - 1;
            this.getDoorList();
        },
        //获取关联社区列表
        getPlotList() {
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
        //获取门口机列表
        getDoorList() {
            this.doorList = [];
            let index = this.doorParams.pageIndex * this.doorParams.pageSize;
            for(let i = 0; i < this.doorParams.pageSize; i++){
                if(this.doorData[index+i]) this.doorList.push(this.doorData[index+i]);
            }
            this.doorTotal = this.doorData.length;
        },
        //查询列表
        queryData() {
            if(this.params.coName === ''||this.params.coName === undefined){
                this.params.pageIndex = 0;
                this.getPlotList();
            } else {
                this.list = [];
                for(let j in this.data){
                    if(this.data[j].coName.indexOf(this.params.coName) !== -1) this.list.push(this.data[j]);
                }
                this.total = this.list.length;
            }
        },
        //打开查看门口机弹框
        openDoorCom(){
            this.doorParams.pageIndex = 0;
            this.dialog = true;
            this.getDoorList();
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