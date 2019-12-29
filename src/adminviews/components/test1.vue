<template>
    <div>
        <el-image
                :src="imgurl"
                fit="contain"></el-image>
    </div>
</template>

<script>
    export default {
        name: "test1",
        data(){
            return{
                imgurl:require('../../assets/home.jpg')
            }
        }
    }
</script>

<style scoped>

</style>
