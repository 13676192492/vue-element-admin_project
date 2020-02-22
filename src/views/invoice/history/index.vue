<template>
    <div class="app-container" style="padding: 20px 40px;">
        <el-table
                ref="singleTable"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                border
                fit
                highlight-current-row
                style="width: 100%;margin-top: 30px"
        >
            <el-table-column align="center" label="序号" width="60" type="index"/>
            <el-table-column align="center" label="发票抬头"   prop="code">
                <template slot-scope="{ row }">{{ row.code }}</template>
            </el-table-column>
            <el-table-column align="center" label="发票类型" prop="stdAddress">
                <template slot-scope="{ row }">{{ row.stdAddress }}</template>
            </el-table-column>
            <el-table-column align="center" label="发票金额" prop="stdAddress">
                <template slot-scope="{ row }">{{ row.stdAddress }}</template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="stdAddress">
                <template slot-scope="{ row }">{{ row.stdAddress }}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text">查看</el-button>
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
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
