<template>
<div class="app-container" style="padding: 25px 35px;">
    <div>
        <div class="filter-container" style="position: relative">
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            <el-select  clearable style="width:180px;margin:0 20px 0 10px" placeholder="请选择状态">
                <el-option label="未寄送"  />
                <el-option label="已寄送"  />
            </el-select>
            <el-button style="margin-bottom:5px;" type="primary" icon="el-icon-search" >查询</el-button>
            <el-button type="primary" style="position: absolute;right: 0;top: 0;">批量标记为已发送</el-button>
        </div>

        <el-table
                v-loading="loading"
                ref="singleTable"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                border
                fit
                highlight-current-row
                style="width: 100%;margin-top: 18px">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="序号" width="60" type="index"/>
            <el-table-column label="申请账号" min-width="160"  prop="code">
                <template slot-scope="{ row }">{{ row.code }}</template>
            </el-table-column>
            <el-table-column label="发票抬头" min-width="210" prop="stdAddress">
                <template slot-scope="{ row }">{{ row.stdAddress }}</template>
            </el-table-column>
            <el-table-column label="发票类型" min-width="180" prop="community">
                <template slot-scope="{ row }">{{ row.community }}</template>
            </el-table-column>
            <el-table-column label="发票金额" min-width="200" prop="houseAddress">
                <template slot-scope="{ row }">{{ row.houseAddress }}</template>
            </el-table-column>
            <el-table-column label="状态" min-width="200" prop="houseAddress">
                <template slot-scope="{ row }">{{ row.houseAddress }}</template>
            </el-table-column>
            <el-table-column label="申请时间" min-width="140" prop="createTime">
                <template slot-scope="{ row }">{{ row.createTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button type="text">删除</el-button>
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
</div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>

</style>
