<template>
    <div>
        <el-table
                :data="tableData"
                height="700"
                border
                @row-dblclick="handleCurrentChange"
                @current-change="addcount"
                style="width: 100%"
                stripe>
            <el-table-column
                    prop="heat"
                    label="回复数"
                    width="80"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="类别"
                    width="80"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="topicname"
                    label="标题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="mainbody"
                    label="详情">
            </el-table-column>
            <el-table-column
                    prop="createtime"
                    label="创建时间"
                    width="160"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="updatetime"
                    label="最后更新"
                    width="160"
                    align="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="editdetail(scope.row)" type="text" size="small">
                        编辑详情
                    </el-button>
                    <el-button @click="deleteT(scope.row)" slot="reference" type="text" size="small"
                               style="color: #f56c6c;">
                        删除
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal="mfalse">
            <span>确定要删除这条帖子吗？</span>
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
                    <el-form-item label="话题名称" :label-width="formLabelWidth">
                        <el-input v-model="form.topicname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="话题内容">
                        <el-input type="textarea" v-model="form.mainbody"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="formpost">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "topicControl",
        data() {
            return {
                tableData: [{
                    tid: '',
                    heat: '15',
                    cname: '英雄联盟',
                    topicname: 'ig真能憋',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23',
                }],
                mfalse: false,
                topicdata: {},
                dialogVisible: false,
                deletid: '',
                countN: 0,
                dialogFormVisible: false,
                form: {
                    tid: '',
                    topicname: '',
                    mainbody: ''
                },
                formLabelWidth: '120px',
                labelPosition: 'top'
            }
        },
        methods: {
            comfimclick: function () {
                console.log(this.deletid);
                this.deletTopic(this.deletid);
                this.dialogVisible = false;
                this.deletid = '';
            },
            deleteT: function (row) {
                this.dialogVisible = true;
                this.deletid = row.tid;
            },
            editdetail: function (row) {
                this.dialogFormVisible = true;
                this.deletid = row.tid;
                this.form=row;
            },
            formpost:function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/topic/update' ;
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
            addcount: function () {
                this.countN++;
            },
            deletTopic: function (tid) {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/topic/' + tid;
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
            handleCurrentChange(val) {
                this.currentRow = val;
                let routeUrl = this.$router.resolve({
                    path: '/detail/' + this.currentRow.tid
                });
                window.open(routeUrl.href, '_blank');
                //console.log("dianji");
                // 获取tid
                // this.$router.push({ path:'/detail/'+this.currentRow.tid  })
                //console.log(this.currentRow.tid);
            },
            initPage: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/topic/';
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
            notic: function () {
                this.$notify({
                    title: '提示',
                    message: '双击单元进入话题详情页。',
                    duration: 6000,
                    type: 'warning'
                });
            }
        },
        mounted: function () {
            this.initPage();
        },
        created() {
        },
        watch: {
            countN: function (val) {
                if (val == 1) {
                    this.notic();
                }
            }
        }
    }
</script>

<style scoped>


</style>
