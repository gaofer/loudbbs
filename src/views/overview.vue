<template>
    <div v-html="htmlContent">

    </div>
</template>

<script>
    export default {
        name: "overview",
        data() {
            return{
                htmlContent:''
            }
        },
        methods: {
            initPage: function () {
                if(localStorage.getItem("overview")!=""){
                    this.htmlContent= localStorage.getItem("overview");
                }
            }
        },
        mounted:function(){
            this.initPage();
        },
        destroyed: function () {
            localStorage.removeItem('overview');
        }
    }
</script>

<style scoped>

</style>
