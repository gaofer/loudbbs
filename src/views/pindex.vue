<template>
    <el-container>
        <el-header>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="7" ><div class="grid-content">
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="toIndex" style="font-size: larger"><img src="../assets/bbs.png" style="width: 33px">&nbsp某某论坛</el-menu-item>
                        <el-menu-item index="2" @click="">首页</el-menu-item>
                        <el-menu-item index="3" @click="">类别列表</el-menu-item>
                    </el-menu>
                </div></el-col>
                <el-col :span="6"><div class="grid-content">
                    <div style="padding-top: 10px"><el-input
                            placeholder="请输入内容"
                            v-model="search">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input></div>

                </div></el-col>
                <el-col :span="6"><div class="grid-content">
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#545c64"
                            text-color="#fff"
                            @select="handleSelect"
                            active-text-color="#ffd04b">
                        <el-submenu index="4">
                            <template slot="title">开始</template>
                            <el-menu-item index="4-1" @click="">设置</el-menu-item>
                            <el-menu-item index="4-2" @click="">个人中心</el-menu-item>
                            <el-menu-item index="4-3" @click="">提交bug</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="5" @click="logOut" v-if="showUser">欢迎您，<el-link>{{uid}}</el-link></el-menu-item>
                        <el-menu-item index="5" @click="toLogin" v-if="showNoUser">欢迎您，<el-link>{{uid}}</el-link></el-menu-item>
                        <el-menu-item index="6" @click="toReg" v-if="showNoUser"><a href="reg" target="_blank"></a>注册</el-menu-item>
                        <el-menu-item index="6" @click="toPost" v-if="showUser"><a href="gopost" target="_blank"></a>发帖</el-menu-item>
                    </el-menu>
                </div></el-col>
            </el-row>
            </el-header>
        <el-main>
            <el-table
                :data="tableData"
                height="700"
                border
                @current-change="handleCurrentChange"
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
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="updatetime"
                    label="最后更新"
                    width="180"
                    align="center">
            </el-table-column>
        </el-table>
            <!--因为使用了可以滚动的表格，所以没有做分页
            <el-pagination
                    :page-size="20"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>-->
        </el-main>
        <el-divider></el-divider>
        <el-footer>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="3"><div class="grid-content" style="color: #fff">
                    这里是页脚1，<br>还不知道写什么
                </div></el-col>
                <el-col :span="3"><div class="grid-content" style="color: #fff">
                    这里是页脚2，<br>还不知道写什么
                </div></el-col>
                <el-col :span="3"><div class="grid-content" style="color: #fff">
                    这里是页脚3，<br>还不知道写什么
                </div></el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "pindex",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                uid:'请登录',
                search: '',
                showNoUser: true,
                showUser: false,
                tableData: [{
                    heat: '15',
                    cname: '英雄联盟',
                    topicname: 'ig真能憋',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23',
                }],
                currentRow:null
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                //console.log("dianji");
                // 获取tid
                this.$router.push({ path:'/detail/'+this.currentRow.tid  })
                //console.log(this.currentRow.tid);
            },
            toIndex:function(){
                /*this.$router.push({ path:'/pindex'  })*/
                this.$router.go(0)
            },
            toLogin:function () {
                this.$router.push({ path:'/login'  })
            },
            toReg:function () {
                this.$router.push({ path:'/reg'  })
            },
            toPost:function () {
                this.$router.push({ path:'/post'  })
            },
            logOut:function() {
                this.$confirm('您将注销您的账号登录状态，继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem('loginUser');
                    this.$message({
                        type: 'success',
                        message: '注销成功!'
                    });
                    this.$router.go(0)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消注销'
                    });
                });
            },
            open() {
                var admin=JSON.parse(localStorage.getItem("loginUser")).access;
                if(admin=='admin'){
                    this.$confirm('您以管理员身份进行操作，请问是否进入后台管理页面？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        this.$router.push({ path:'/adminmain'  });
                        this.$message({
                            type: 'success',
                            message: '去管理页面!'
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'success',
                            message: '欢迎您！'
                        });
                    });
                }
            },
            initPage:function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/topic/';
                let that = this;
                this.axios.get(url, {
                })
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.tableData=response.data.data;
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })


            },

        },
        mounted:function(){
            this.initPage();
            //this.open();
        },
        created:function(){
            if(JSON.parse(localStorage.getItem("loginUser")).username!=""){
                this.uid= JSON.parse(localStorage.getItem("loginUser")).username+'\n(uid:'+JSON.parse(localStorage.getItem("loginUser")).uid+')';
                this.showNoUser= false;
                this.showUser= true;
            }


        },
    }
</script>

<style scoped>
    /*.el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }*/
    .el-menu.el-menu--horizontal{
        border-bottom: none;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #545c64;
    }
</style>
