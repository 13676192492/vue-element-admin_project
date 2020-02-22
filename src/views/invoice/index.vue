<template>
    <div class="app-container" style="padding: 25px 40px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="发票管理" name="first">
                <div style="margin-top: 15px">
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
                </div>
            </el-tab-pane>

            <el-tab-pane label="发票抬头管理" name="second">
                <div style="margin-top: 15px">
                    <el-button type="primary" @click="openAdduser()">新增抬头</el-button>
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
            </el-tab-pane>

            <el-tab-pane label="发票地址管理" name="third">
                <div style="margin-top: 15px">
                    <el-button type="primary" @click="openAdduser()">新增地址</el-button>
                    <el-table
                            ref="singleTable"
                            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%;margin-top: 30px"
                    >
                        <el-table-column align="center" label="序号" width="60" type="index"/>
                        <el-table-column align="center" label="寄送地址"   prop="code">
                            <template slot-scope="{ row }">{{ row.code }}</template>
                        </el-table-column>
                        <el-table-column align="center" label="收件人" prop="stdAddress">
                            <template slot-scope="{ row }">{{ row.stdAddress }}</template>
                        </el-table-column>
                        <el-table-column align="center" label="联系电话" prop="stdAddress">
                            <template slot-scope="{ row }">{{ row.stdAddress }}</template>
                        </el-table-column>
                        <el-table-column label="操作" width="350" align="center">
                            <template slot-scope="scope">
                                <el-button type="text">默认发票抬头</el-button>
                                <el-button type="text">设为默认</el-button>
                                <el-button type="text">修改</el-button>
                                <el-button type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog
                            :title="textMap[dialogStatus]"
                            :visible.sync="addUpdateDialog"
                            :close-on-click-modal="false"
                            :append-to-body="true">
                        <el-form
                                ref="dataForm"
                                label-position="left"
                                label-width="100px">
                            <el-form-item label="地址" prop="name">
                                <el-input placeholder="请输入地址" clearable/>
                            </el-form-item>
                            <el-form-item label="收件人" prop="houseAdress">
                                <el-input placeholder="请输入收件人" clearable/>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="nation">
                                <el-input placeholder="请输入联系电话" clearable/>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addUpdateDialog = false">取消</el-button>
                            <el-button type="primary" @click="dialogStatus === 'create' ? addData() : updateData()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>

            <el-tab-pane label="开票历史" name="fourth">
                <div style="margin-top: 15px">
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
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Info from './component/info'
    export default {
        name: "index",
        data(){
            return{
                activeName: 'first',
                addUpdateDialog: false,
                textMap:{
                    create: "新增发票信息",
                    update: "修改发票信息"
                },
                dialogStatus:''
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            goToInfo(){},
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
