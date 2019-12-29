<template>
    <el-container>
        <el-header>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="20">
                    <div class="grid-content">
                        <el-menu
                                default-active="1"
                                mode="horizontal"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                            <el-menu-item index="1" style="font-size: larger; width: 200px">论坛后台管理界面</el-menu-item>
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
                            <el-menu-item index="1" @click="">欢迎您，管理员 {{thisuser}}</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="241px" style="padding:0px 20px;">
                <div style="text-align: left;">
                    <el-menu default-active=""
                             class="el-menu-vertical-demo"
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#fff"
                             style="height: 890px">
                        <!--<el-submenu index="1" :collapse="isCollapse">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">分组一</span>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">选项4</span>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>-->
                        <el-menu-item index="1" @click="gotopicControl">
                            <i class="el-icon-menu"></i>
                            <span slot="title">话题管理</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="gocategoryControl">
                            <i class="el-icon-document"></i>
                            <span slot="title">类别管理</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="gouserControl">
                            <i class="el-icon-setting"></i>
                            <span slot="title">人员管理</span>
                        </el-menu-item>
                    </el-menu>
                </div>

            </el-aside>
            <el-main style="padding-bottom: 0px;padding-top: 15px">
                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick"
                         v-if="editableTabs">
                    <el-tab-pane
                            v-for="(item, index) in editableTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name">
                        <div class="adminmain">
                            <router-view style="height: 820px"/>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "adminmain",
        data() {
            return {
                isCollapse: true,
                editableTabsValue: '1',
                editableTabs: [{
                    title: '欢迎使用后台管理',
                    name: '1',
                    content: '/adminmain/test1'
                }],
                tabIndex: 1,
                newtab: {
                    title: '',
                    name: '',
                    content: ''
                },
                deleName: '',
                thisuser:''
            }
        },
        methods: {

            removeTab(targetName) {
                let tabs = this.editableTabs;
                this.deleName = targetName;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            tabClick(tab) {
                this.$router.push({path: tab.labelContent}).catch(err => {
                    err
                })
            },
            gotopicControl: function () {
                let newt = this.newtab;
                newt.title = "话题管理";
                newt.content = '/adminmain/topicControl';
                newt.name = (this.tabIndex + 1) + '';
                if (this.notexist(newt)) {
                    this.tabIndex = this.tabIndex + 1;
                    this.editableTabs.push(Object.assign({}, newt));
                    this.editableTabsValue = newt.name;
                }
            },
            gocategoryControl: function () {
                let newt = this.newtab;
                newt.title = "类别管理";
                newt.content = '/adminmain/categoryControl';
                newt.name = (this.tabIndex + 1) + '';
                if (this.notexist(newt)) {
                    this.tabIndex = this.tabIndex + 1;
                    this.editableTabs.push(Object.assign({}, newt));
                    this.editableTabsValue = newt.name;
                }
            },
            gouserControl: function () {
                let newt = this.newtab;
                newt.title = "人员管理";
                newt.content = '/adminmain/userControl';
                newt.name = (this.tabIndex + 1) + '';
                if (this.notexist(newt)) {
                    this.tabIndex = this.tabIndex + 1;
                    this.editableTabs.push(Object.assign({}, newt));
                    this.editableTabsValue = newt.name;
                }
            },
            notexist: function (newta) {
                let tabs = this.editableTabs;
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].title === newta.title) {
                        this.editableTabsValue = tabs[i].name;
                        return false;
                    }
                }
                return true;
            },
            inittabsValue: function () {
                this.$router.push({path: '/adminmain/test1'});
                this.thisuser=JSON.parse(localStorage.getItem("loginUser")).username+'\n(uid:'+JSON.parse(localStorage.getItem("loginUser")).uid+')';
            }
        },
        mounted: function () {
            this.inittabsValue();
        },
        watch: {
            editableTabsValue: function (val) {
                //console.log(val);
                let tabs = this.editableTabs;
                tabs.forEach((tab, index) => {
                    if (tab.name === val) {
                        //console.log(tab);
                        this.$router.push({path: tab.content}).catch(err => {
                            err
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
