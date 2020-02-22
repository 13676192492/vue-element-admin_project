<template>
    <div class="app-container" style="padding: 25px 40px;">
        <el-button type="primary" @click="openAdduser()">新增</el-button>
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
            <el-table-column label="操作" width="350" align="center">
                <template slot-scope="scope">
                    <el-button type="text">默认发票抬头</el-button>
                    <el-button type="text">设为默认</el-button>
                    <el-button type="text" @click.native="openUpdateUser(scope.row)">修改</el-button>
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

        <el-dialog
                :title="textMap[dialogStatus]"
                :visible.sync="addUpdateDialog"
                :close-on-click-modal="false"
                :append-to-body="true">
            <el-form
                    ref="dataForm"
                    label-position="left"
                    label-width="100px">
                <el-form-item label="发票抬头" prop="name">
                    <el-input placeholder="请输入公司抬头" clearable/>
                </el-form-item>
                <el-form-item label="发票类型" prop="gender">
                    <el-select clearable placeholder="请选择发票类型" >
                        <el-option label="企业增值税普通发票" />
                        <el-option label="企业增值税专用发票" />
                    </el-select>
                </el-form-item>
                <el-form-item label="纳税人识别号" prop="houseAdress">
                    <el-input placeholder="请输入纳税人识别号" clearable/>
                </el-form-item>
                <el-form-item label="基本开户银行" prop="nation">
                    <el-input placeholder="请输入基本开户银行" clearable/>
                </el-form-item>
                <el-form-item label="基本开户账号" prop="citizenshipNumber">
                    <el-input placeholder="请输入基本开户账号" clearable/>
                </el-form-item>
                <el-form-item label="企业注册地址" prop="citizenshipNumber">
                    <el-input placeholder="请输入企业注册地址" clearable/>
                </el-form-item>
                <el-form-item label="企业注册电话" prop="citizenshipNumber">
                    <el-input placeholder="请输入企业注册电话" clearable/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUpdateDialog = false">取消</el-button>
                <el-button type="primary" @click="dialogStatus === 'create' ? addData() : updateData()">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                addUpdateDialog: false,
                textMap:{
                    create: "新增发票信息",
                    update: "修改发票信息"
                },
                dialogStatus:''
            }
        },
        methods:{
            //打开新增弹框
            openAdduser() {
                this.dialogStatus = "create";
                this.addUpdateDialog = true;
            },
            //打开修改弹框
            openUpdateUser(row) {
                this.dialogStatus = "update";
                this.addUpdateDialog = true;
            },
        }
    }
</script>

<style scoped>

</style>
