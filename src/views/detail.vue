<template>
    <div>
        <el-container>
            <el-header>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-menu
                                    default-active=1
                                    mode="horizontal"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b">
                                <el-menu-item index="1" style="font-size: larger">详情</el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">
                            <el-menu
                                    class="el-menu-demo"
                                    mode="horizontal"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b">
                                <el-menu-item index="1" @click="goBack">返回</el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>

                <el-card class="box-card">
                    <div style="text-align: left;"><h4>{{topics.topicname}}</h4></div>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="4">
                            <div class="topicmain">
                                <div>用户名 : {{topics.username}}</div>
                                <div>uid : {{topics.uid}}</div>
                                <br>
                                <div>发表时间 : {{topics.createtime}}</div>
                            </div>
                        </el-col>
                        <el-divider direction="vertical"></el-divider>
                        <el-col :span="17">
                            <div style="text-align: left;">
                                <div v-html="topics.htmlmainbody"></div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <br>
                <div style="text-align: left;padding: 5px;">
                    <h6>全部回复</h6>
                    <el-switch
                            v-model="reverse"
                            active-color="#C0CCDA"
                            active-text="按时间倒序"
                            inactive-text="按时间顺序"
                    v-if="!nocomment">
                    </el-switch>
                </div>
                <div style="text-align: left;">
                    <el-timeline :reverse='reverse' v-if="!nocomment">
                        <el-timeline-item v-for="(common,index) in commons" :key="index"
                                          :timestamp='common.updatetime'
                                          placement="top">
                            <el-card shadow="hover">
                                <el-row type="flex" justify="space-around">
                                    <el-col :span="4">
                                        <div class="commonmain">
                                            <div>用户名:{{common.username}}</div>
                                            <div>uid:{{common.uid}}</div>
                                        </div>
                                    </el-col>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-col :span="17">
                                        <div style="text-align: left;">
                                            <div v-html="common.maincommon"></div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <el-card shadow="hover" v-if="nocomment">
                        <div>
                            还没有人评论过，快来抢沙发！
                        </div>
                    </el-card>
                </div>
                <div style="font-size: small" v-if="!nocomment">没有更多了. ヾ(≧O≦)〃嗷~</div>
                <br>
                <el-card shadow="never" v-if="islogin">
                    <qeditor2  ref="wangE"></qeditor2>
                    <br>
                    <div style="text-align: right;">
                        <el-button type="primary" @click="postCommon">发表评论</el-button>
                    </div>
                </el-card>
                <el-card shadow="never" v-if="!islogin">
                    您还没有登录，点击<a href="../../login">这里</a>登陆
                </el-card>
            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
    </div>

</template>

<script>
    import qeditor2 from '../components/ue2.vue'

    export default {
        name: "detail",
        data() {
            return {
                islogin: false,
                tid: '',
                uid: '',
                reverse: true,
                commons: [
                    {
                        cid: '',
                        uid: '',
                        username: '',
                        updatetime: '',
                        tid: '',
                        maincommon: ''
                    }
                ],
                topics: {
                    topicname: '',
                    htmlmainbody: '',
                    tid: '',
                    uid: '',
                    username: '',
                    createtime: ''
                },
                postcommons:{
                    uid: '',
                    updatetime: '',
                    tid: '',
                    maincommon: ''
                },
                nocomment: true
            }
        },
        methods: {
            gettid: function () {
                this.tid = this.$route.params.tid;
            },
            goBack: function () {
                this.$router.go(-1)
            },
            inittopic: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/topic/topicdetal/' + this.tid;
                let that = this;
                this.axios.get(url, {})
                    .then(function (response) {
                        if (response.data.code == 200) {
                            //console.log(response.data.data);
                            that.topics = response.data.data[0];
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
            },
            initcommon: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/common/' + this.tid;
                let that = this;
                this.axios.get(url, {})
                    .then(function (response) {
                        if (response.data.code == 200) {
                            console.log(response.data.data);
                            if (response.data.data != null) {
                                that.nocomment = false;
                                that.commons = response.data.data;
                            } else {
                                that.nocomment = true;
                            }
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })
            },
            inituser: function () {
                if (localStorage.getItem("loginUser") != null) {
                    this.islogin = true;
                    this.uid = JSON.parse(localStorage.getItem("loginUser")).uid
                }
            },
            postCommon:function () {
                this.postcommons.uid=this.uid;
                this.postcommons.maincommon=this.$refs.wangE.showHtmlContent();
                this.postcommons.tid=this.tid;
                this.postcommons.updatetime=this.formatDate();
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/common/';
                let that = this;
                this.axios.post(url, that.postcommons)
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.$message({
                                type: 'success',
                                message: response.data.msg
                            });
                            that.$router.go(0);
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
            },
            formatDate: function () {
                let date = new Date();
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
        },
        mounted() {
            this.gettid();
            this.inittopic();
            this.initcommon();
            this.inituser();
        },
        components: {
            qeditor2
        }
    }
</script>

<style scoped>
    .el-divider--vertical {
        height: auto;
    }

    .topicmain {
        padding: 5px;
        text-align: left;
        font-size: smaller;
        border: #dcdfe6 solid 1px;
    }

    .commonmain {
        padding: 5px;
        text-align: left;
        font-size: smaller;
        border: #dcdfe6 solid 1px;
    }

</style>
