<template>
    <div>
        <el-container>
            <el-header>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-menu
                                    :default-active="activeIndex2"
                                    class="el-menu-demo"
                                    mode="horizontal"
                                    @select="handleSelect"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b">
                                <el-menu-item index="1" style="font-size: larger">发帖</el-menu-item>
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
                <!--<el-row style="height:150px">

                </el-row>-->
                <el-row type="flex" class="" justify="space-around">
                    <el-col :span="16">
                        <div class="formstyle">
                            <el-form :label-position="labelPosition" ref="postNew" :rules="rules" :model="postNew"
                                     label-width="80px"
                            >
                                <div class="titlestyle">标题</div>
                                <el-form-item label=" " prop="topicn">
                                    <el-input v-model="postNew.topicn"></el-input>
                                </el-form-item>
                                <el-form-item label="类别" prop="password">
                                    <el-select v-model="valuecid" clearable filterable placeholder="请选择">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.cname"
                                                :value="item.cid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item style="height: 450px" label="输入正文">
                                    <!--<qeditor>
                                    </qeditor>-->
                                    <qeditor2 ref="wangE">

                                    </qeditor2>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit('postNew')">发表帖子</el-button>
                                    <el-popover
                                            placement="top-start"
                                            title="提示"
                                            width="200"
                                            trigger="hover"
                                            content="我们不推荐您在未编辑的情况下再次使用该功能，如果希望再次确认，请修改一部分文本。">
                                        <el-button @click="gooverview" slot="reference" style="margin-left: 10px">预览
                                        </el-button>
                                    </el-popover>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>

                </el-row>
            </el-main>


            <el-footer class="footer">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                        <div class="grid-content" style="color: #fff">
                            这里是页脚1，还不知道写什么
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content" style="color: #fff">
                            这里是页脚2，还不知道写什么
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content" style="color: #fff">
                            这里是页脚3，还不知道写什么
                        </div>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>

    </div>
</template>

<script>
    import qeditor from '../components/ue.vue'
    import qeditor2 from '../components/ue2.vue'

    export default {
        name: "post",
        data() {
            return {
                activeIndex2: '1',
                labelPosition: 'top',
                options: [{
                    cid: '',
                    cname: ''
                }],
                postNew: {
                    topicn: ''
                },
                valuecid: '',
                topic: {
                    topicname: '',
                    uid: '',
                    cid: '',
                    heat: '',
                    htmlmainbody: '',
                    mainbody: '',
                    createtime: '',
                    updatetime: ''
                },

                rules: {}
            }


        },
        methods: {
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
            goBack: function () {
                this.$router.go(-1)
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            initPage: function () {
                let url = 'http://' + 'localhost' + ':8080/loudbbs/category/';
                let that = this;
                this.axios.get(url, {})
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.options = response.data.data;
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
                //todo 有一个bug 预览返回后不能显示正常的项目名称，直接显示模块ID……
                that.$refs.wangE.setper(sessionStorage.getItem("overview"));
                if (sessionStorage.getItem("topicname") != 'null') {
                    this.postNew.topicn = sessionStorage.getItem("topicname");
                }
                if (sessionStorage.getItem("topiccid") != 'null') {
                    this.valuecid = sessionStorage.getItem("topiccid");
                }
            },
            onSubmit(formName) {
                this.topic.topicname = this.postNew.topicn;
                this.topic.uid = JSON.parse(localStorage.getItem("loginUser")).uid;
                this.topic.cid = this.valuecid;
                this.topic.htmlmainbody = this.$refs.wangE.showHtmlContent();
                this.topic.mainbody = this.$refs.wangE.showMdContent();
                this.topic.createtime = this.formatDate();
                this.topic.updatetime = this.formatDate();
                console.log(this.topic);
                let url = 'http://' + 'localhost' + ':8080/loudbbs/topic/addtopic';
                let that = this;
                this.axios.post(url, that.topic)
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.$message({
                                type: 'success',
                                message: response.data.data
                            });
                            sessionStorage.removeItem("overview");
                            sessionStorage.removeItem("topicname");
                            sessionStorage.removeItem("topiccid");
                            that.$router.go(-1);
                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
                // 在控制台上打印获取到的HTML内容
                //this.$refs.wangE.showHtmlContent();
                //this.$refs.wangE.showMdContent();

            },
            gooverview: function () {
                let that = this;
                sessionStorage.setItem("topicname", that.postNew.topicn);
                sessionStorage.setItem("topiccid", that.valuecid);
                sessionStorage.setItem("overview", that.$refs.wangE.showHtmlContent());
                //localStorage.setItem("overview", that.$refs.wangE.showHtmlContent());
                this.$router.push({path: '/overview'})
            }


        },
        mounted: function () {
            this.initPage();
        },
        components: {
            qeditor,
            qeditor2
        }
    }
</script>

<style scoped>
    .el-menu.el-menu--horizontal {
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

    .formstyle {
        /*display: flex;*/
        text-align: left;
    }

    .titlestyle {
        padding: 20px 0px 10px;
        font-size: 30px;
    }

    /*以下全是汉化富文本框所用。*/
    /*
        .editor {
            line-height: normal !important;
            height: 500px;
        }

        .ql-snow .ql-tooltip[data-mode=link]::before {
            content: "请输入链接地址:";
        }

        .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
            border-right: 0px;
            content: '保存';
            padding-right: 0px;
        }

        .ql-snow .ql-tooltip[data-mode=video]::before {
            content: "请输入视频地址:";
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item::before {
            content: '14px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
            content: '10px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
            content: '18px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
            content: '32px';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item::before {
            content: '文本';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
            content: '标题1';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
            content: '标题2';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
            content: '标题3';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
            content: '标题4';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
            content: '标题5';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
            content: '标题6';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item::before {
            content: '标准字体';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
            content: '衬线字体';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
            content: '等宽字体';
        }*/

</style>
