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
                            <el-menu-item index="1" style="font-size: larger">注册</el-menu-item>
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
            <el-row style="height:150px"></el-row>
            <el-row type="flex" class="" justify="space-around">
                <el-col :span="8">
                    <div class="">
                        <el-form :label-position="labelPosition" ref="userReg" :rules="rules" :model="userReg"
                                 label-width="80px">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="userReg.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="userReg.password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input type="password" v-model="userReg.confirmPassword"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="userReg.gender">
                                    <el-radio label="汉子"></el-radio>
                                    <el-radio label="妹纸"></el-radio>
                                    <el-radio label="不告诉你"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出生日期" prop="birthday">
                                <el-date-picker
                                        v-model="userReg.birthday"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        style="width: auto">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="userReg.email"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" prop="phone">
                                <el-input v-model="userReg.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <Mslider ref="dragDiv" :key="timer"></Mslider>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit('userReg')">立即创建</el-button>
                                <el-button @click="resetForm('userReg')">清除</el-button>
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
    import Mslider from '../components/sliderComponer.vue'

    export default {
        name: "reg",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userReg.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('手机号不合法，请重新输入'));
                } else {
                    callback();
                }
            };
            var validateUsername = (rule, value, callback) => {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/countusername';
                let that = this;
                this.axios.get(url, {
                    params: {
                        username: value
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                        let count = response.data.data;
                        if (count != 0) {
                            callback(new Error('用户名已存在'));
                        } else {
                            callback();
                        }
                    } else {
                        that.$message({
                            message: "用户名称数据拉取失败",
                            type: 'error'
                        });
                    }
                });
            };
            return {
                activeIndex2: '1',
                labelPosition: 'right',
                userReg: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: '',
                    gender: '',
                    birthday: ''
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
                confirmSuccess: false,
                timer: '',

                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 15, message: '密码长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            goBack: function () {
                this.$router.go(-1)
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.$refs.dragDiv.confirmSuccess) {
                            let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/reg';
                            let that = this;
                            this.axios.post(url, that.userReg)
                                .then(function (response) {
                                    if (response.data.code == 200) {
                                        that.$message({
                                            message: '注册成功，已为您登录。',
                                            type: 'success'
                                        });
                                        let url2 = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/login';
                                        that.axios.get(url2, {
                                            params: {
                                                username: that.userReg.username,
                                                password: that.userReg.password
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
                                    } else {
                                        that.$message({
                                            message: response.data.msg,
                                            type: 'error'
                                        });
                                    }
                                })
                        } else {
                            that.$message.error('请滑动验证码滑块');
                        }

                    } else {
                        this.$message.error('请输入正确的信息');
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.$refs.dragDiv.confirmSuccess);
            },
            resetForm(formName) {
                /*if (this.$refs[formName]!==undefined) {
                    this.$refs[formName].resetFields();
                }*/
                this.$refs[formName].resetFields();
                this.timer = new Date().getTime()
            },
            login: function () {
                let url = 'http://' + this.GLOBAL.BaseURL + ':' + this.GLOBAL.PORT + '/loudbbs/t-users/login';
                let that = this;
                that.axios.get(url, {
                    params: {
                        username: that.userReg.username,
                        password: that.userReg.password
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
            }
        },
        components: {
            Mslider
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

    .footer {
        position: absolute;
        bottom: 0;
        width: 99%;
        height: 100px;
    }
</style>
