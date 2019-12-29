<template>
    <div>
        <el-card class="box-card" style="width: 60%;margin: 0 auto;">
            <div slot="header" class="clearfix">
                <span>ㅤ</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addC">添加类别</el-button>
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="cid"
                        label="类别ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="类别名称">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="editC(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteC(scope.row)" slot="reference" type="text" size="small"
                                   style="color: #f56c6c;">
                            删除
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
            <span>确定要删除这项类别吗？</span>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="comfimclick()">确 定</el-button>
                        </span>
        </el-dialog>
        <el-dialog title="编辑详情"
                   :visible.sync="dialogFormVisible"
                   width="45%"
                   :modal="mfalse">
            <div style="text-align: left;">
                <el-form
                        :model="form"
                        :label-position="labelPosition">
                    <el-form-item label="类别ID" :label-width="formLabelWidth">
                        <el-input :disabled="true" v-model="form.cid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类别名称">
                        <el-input type="textarea" v-model="form.cname"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="formpost">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑详情"
                   :visible.sync="addFormVisible"
                   width="45%"
                   :modal="mfalse">
            <div style="text-align: left;">
                <el-form
                        :model="form"
                        :label-position="labelPosition">
                    <el-form-item label="新类别名称" :label-width="formLabelWidth">
                        <el-input v-model="form.cname" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCategory">确 定</el-button>
                <el-button @click="addFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "categoryControl",
        data() {
            return {
                tableData: [],
                form: {
                    cid: '',
                    cname: ''
                },
                dialogVisible: false,
                deletcid: '',
                mfalse: false,
                dialogFormVisible: false,
                addFormVisible:false,
                formLabelWidth: '120px',
                labelPosition:'top'
            }
        },
        methods: {
            initPage: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/category/';
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
            addC:function () {
                this.addFormVisible = true;
            },
            deleteC: function (row) {
                this.dialogVisible = true;
                this.deletcid = row.cid;
            },
            editC: function (row) {
                this.dialogFormVisible = true;
                this.deletcid = row.cid;
                this.form=row;
            },
            comfimclick: function () {
                this.deletcategory(this.deletcid);
                this.dialogVisible = false;
                this.deletcid = '';
            },
            deletcategory: function (cid) {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/category/' + cid;
                let that = this;
                this.axios.delete(url, {})
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.$message({
                                message: response.data.msg,
                                type: 'success'
                            });
                            that.$router.go(0);
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })
            },
            formpost:function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/category/update' ;
                let that = this;
                this.axios.post(url, that.form)
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.$message({
                                message: response.data.msg,
                                type: 'success'
                            });
                            that.$router.go(0);
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
                this.dialogFormVisible = false;
            },
            addCategory:function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/category/' ;
                let that = this;
                this.axios.post(url, that.form)
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.$message({
                                message: response.data.msg,
                                type: 'success'
                            });
                            that.$router.go(0);
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
                this.dialogFormVisible = false;
            }
        },
        mounted() {
            this.initPage();
        }
    }
</script>

<style scoped>

</style>
