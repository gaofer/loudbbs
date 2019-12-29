<template>
    <div>
        <el-card class="box-card" style="width: 80%;margin: 0 auto;">
            <div slot="header" class="clearfix">
                <span>ㅤ</span>
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%"
                    height="700">
                <el-table-column
                        prop="uid"
                        label="用户ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户昵称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="access"
                        label="用户权限"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="upAccess(scope.row)" slot="reference" type="text" size="small"
                                   style="color: #f56c6c;">
                            提升权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal="mfalse">
            <span>确定要赋予该用户 ({{upName}}) 管理员权限吗？</span>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="comfimclick()">确 定</el-button>
                        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userControl",
        data() {
            return {
                mfalse:false,
                tableData:[],
                dialogVisible:false,
                upName:'',
            }
        },
        methods:{
            initPage: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/';
                let that = this;
                this.axios.get(url, {})
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.tableData = response.data.data;
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
            },
            upAccess:function (row) {
                if(row.access==='admin'){
                    console.log("已经是管理员了");
                    this.$message({
                        message: "ta已经是管理员了！",
                        type: 'warning'
                    });
                }else{
                    this.upName=row.username;
                    this.dialogVisible=true;
                }

            }
        },
        mounted() {
            this.initPage();
        }
    }
</script>

<style scoped>

</style>
