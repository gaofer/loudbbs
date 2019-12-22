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
                if(sessionStorage.getItem("overview")!=""){
                    this.htmlContent= sessionStorage.getItem("overview");
                }
            }
        },
        mounted:function(){
            this.initPage();
        },
        destroyed: function () {
            //sessionStorage.removeItem('overview');
        }
    }
</script>

<style scoped>

</style>
