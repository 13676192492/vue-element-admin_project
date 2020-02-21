<template>
    <div class="app-container" style="padding: 25px 40px;">
        <div v-show="flag">
            <div style="position: relative">
                <el-button type="primary" @click="goToInfo">批量开票</el-button>
                <el-tooltip placement="left" effect="light" style="position: absolute;right: 0;top: 0;color: #FF4B4B">
                    <div slot="content" style="padding: 5px;font-size: 14px">
                        <span style="color: #FF4B4B">开票须知</span>
                        <br/>
                        <span style="display:inline-block;padding-top: 10px;">开票时间：每月月底开具发票</span>
                    </div>
                    <span>开票须知</span>
                </el-tooltip>
            </div>
            <el-table
                    ref="singleTable"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;margin-top: 30px"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="序号" width="60" type="index"/>
                <el-table-column label="充值订单号" min-width="160"  prop="code">
                    <template slot-scope="{ row }">{{ row.code }}</template>
                </el-table-column>
                <el-table-column label="支付方式" min-width="210" prop="stdAddress">
                    <template slot-scope="{ row }">{{ row.stdAddress }}</template>
                </el-table-column>
                <el-table-column label="支付时间" min-width="180" prop="community">
                    <template slot-scope="{ row }">{{ row.community }}</template>
                </el-table-column>
                <el-table-column label="充值金额" min-width="200" prop="houseAddress">
                    <template slot-scope="{ row }">{{ row.houseAddress }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" plain @click="info(scope.row)">申请开票</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--  分页  -->
            <!--        <el-pagination-->
            <!--                background-->
            <!--                :current-page="listQuery.pageIndex+1"-->
            <!--                :page-sizes="[10, 20, 30, 40]"-->
            <!--                :page-size="listQuery.pageSize"-->
            <!--                layout="total, sizes, prev, pager, next, jumper"-->
            <!--                :total="total"-->
            <!--                @size-change="handleSizeChange"-->
            <!--                @current-change="handleCurrentChange"-->
            <!--        />-->
        </div>

        <Info v-show="!flag"/>

    </div>
</template>

<script>
    import Info from './component/info'
    export default {
        name: "index",
        components:{ Info },
        data(){
            return{
                flag: true
            }
        },
        methods:{
            goToInfo(){},
            info(row){
                this.flag = false
            },
            back() {
                this.flag = true
            }
        }
    }
</script>

<style scoped>

</style>
