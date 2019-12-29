<template>
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
                            <el-menu-item index="1" style="font-size: larger">登录</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="2">
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
            <el-carousel height="815px" direction="vertical">
                <el-carousel-item v-for="(imgsrc,index) in imgsrclist" :key="index">
                    <el-image :src="imgsrc.src" style="width: 100%; top: -170px" :fit="fit"></el-image>
                </el-carousel-item>
            </el-carousel>
            <el-row :gutter="20">
                <el-col :span="6" :offset="14">
                    <div class="grid-content login-content" style="position: absolute; top:-600px;z-index:99">
                        <el-form :label-position="labelPosition" :model="loginForm" ref="loginForm" label-width="100px">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username" autocomplete="on"></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="年龄" prop="age">
                                <el-input ></el-input>
                            </el-form-item>-->
                            <el-form-item>
                                <el-button type="primary" @click="login">登录</el-button>
                                <el-button @click="resetForm('loginForm')">重置</el-button>
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
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                activeIndex2: '1',
                labelPosition: 'left',
                loginForm: {
                    username: '',
                    password: ''
                },
                loginSuccessUser: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: '',
                    gender: '',
                    birthday: ''
                },
                fit: 'cover',
                imgsrclist: [
                    {src: require('../assets/50a89246001087.584ec399365e8.png')},
                    {src: require('../assets/aeddda46001087.5844de310b96e.png')},
                    {src: require('../assets/c435ab46001087.5844de3109421.png')}
                ]
            }
        },
        methods: {
            goBack: function () {
                this.$router.go(-1)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            login: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/login';
                let that = this;
                this.axios.get(url, {
                    params: {
                        username: that.loginForm.username,
                        password: that.loginForm.password
                    }
                })
                    .then(function (response) {
                        if (response.data.code == 200) {
                            that.loginSuccessUser = response.data.data;
                            that.$message({
                                message: response.data.msg,
                                type: 'success'
                            });
                            //console.log(that.loginSuccessUser.username);

                            localStorage.setItem("loginUser",JSON.stringify(that.loginSuccessUser));

                            //JSON.parse(localStorage.getItem("loginUser")).username

                            //setTimeout(() =>{},1000);

                            that.$router.go(-1);

                        } else {
                            that.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })
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
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        destroyed() {
            this.open();
        }
    }
</script>

<style scoped>
    .row-bg {
        padding: 10px 0;
        background-color: #545c64;
    }

    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .login-content {
        padding: 30px;
        padding-top: 40px;
        background: #D3DCE6;
        min-width: 400px;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 99%;
        height: 100px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 0px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>
