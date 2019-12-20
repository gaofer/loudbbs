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
                        label="热度"
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
                    uid:3
                }, {
                    heat: '3',
                    cname: '英雄联盟',
                    topicname: '现在冬转又没声音了',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23',
                    uid:3
                }, {
                    heat: '8',
                    cname: '英雄联盟',
                    topicname: '奥恩怎么打蛮子呢',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '60',
                    cname: '英雄联盟',
                    topicname: '我怎么感觉这个版本比上个版本还无聊。。。',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '95',
                    cname: '英雄联盟',
                    topicname: '这个版本，还玩那种塔之子，刷子英雄干嘛',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '5',
                    cname: '刺客信条',
                    topicname: '起源bug，大晚上玩差点吓哭了',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '3',
                    cname: '刺客信条',
                    topicname: '育碧到底是有多喜欢推箱子啊？',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '4',
                    cname: '刺客信条',
                    topicname: 'Uplay怎么也登不上服务器？',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '52',
                    cname: '刺客信条',
                    topicname: '起源的dlc值不值得买呢？',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
                }, {
                    heat: '20',
                    cname: '刺客信条',
                    topicname: '育碧什么时候重制二代三部曲',
                    createtime: '11-28 12:26',
                    updatetime: '12-4 11:23'
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
                console.log("dianji");
                // 获取tid
                console.log(this.currentRow.tid);
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
            getfromat:function(){

            },
            initPage:function () {
                let url = 'http://' + 'localhost' + ':8080/loudbbs/topic/';
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
