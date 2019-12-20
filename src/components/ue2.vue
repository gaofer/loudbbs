<template>
    <div>
        <!--<div id="wangeditor"></div>-->
        <div ref="editor" style="text-align:left">
            <div v-html="per"></div>

        </div>

    </div>

</template>

<script>

    import E from 'wangeditor'

    var editor;
    export default {
        name: "MyWangEditor",
        data() {
            return {
                mdContent: '',
                htmlContent: '',
                per:''
            }
        },

        mounted() {
            editor = new E(this.$refs.editor);
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                //'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]

            editor.customConfig.onchange = (html) => {
                this.htmlContent = html
            }
            editor.customConfig.uploadImgShowBase64 = true
            // editor.customConfig.uploadImgServer = '/upload'
            editor.create()
        },

        methods: {

            showMdContent: function () {
                //console.log(this.mdContent);
                //console.log(editor.txt.text());
                return editor.txt.text();
            },

            showHtmlContent: function () {
                //console.log(this.htmlContent);
                return this.htmlContent;
            },
            setper:function (ht) {
                this.per=ht;
            }
        }
    }


</script>
<style>
    .w-e-menu{
        z-index: 1 !important;
    }
    .w-e-text-container{
        z-index: 1 !important;
    }
</style>
