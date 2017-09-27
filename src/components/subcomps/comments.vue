<template>
    <div class="comments">
        <div class="comment-post">
            <h4>发表评论</h4>
            <hr>
            <textarea name="" id="" cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" v-model="commentContent"></textarea>
            <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        </div>
        <div class="comment-list">
            <div class="comment-item" v-for="(item, index) in commentList" :key="index">
                <div class="comment-info">
                    <span>第{{index + 1}}楼</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间: {{item.add_time | dateFormat}}</span>
                </div>
                <div class="comment-content">
                    {{item.content}}
                </div>
            </div>

            <mt-button type="danger" size="large" :plain="true" @click="getMore" :disabled="isNoMoreData" v-show="this.commentList.length>0">加载更多</mt-button>

            <!-- {{this.articleId}} -->
        </div>
    </div>
</template>

<script>
import config from "../../config.js"
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            commentList: [],
            pageindex: 1,
            isNoMoreData: false,
            commentContent: ""
        }
    },
    created() {
        this.getData();
    },
    props: [
        "articleId"
    ],
    methods: {
        getData() {
            // console.log(this.articleId);
            // console.log(this.$route.params.id);
            this.$http.get(config.apiUrl + "/api/getcomments/" + this.articleId, { params: { pageindex: this.pageindex } }).then(function(res) {
                var data = res.body;
                if (data.status == 0) {
                    if(data.message.length > 0){
                        this.commentList = this.commentList.concat(data.message);
                    }else{
                        if(this.pageindex !=1 ){
                            Toast({
                                message: '没有更多内容了',
                                duration: 500
                            });
                            this.isNoMoreData = true;
                        }
                       
                    }
                }
            })
        },
        getMore(){
            this.pageindex ++;
            this.getData();
        },
        postComment(){
            // alert(this.commentContent)
            if(this.commentContent.trim()){
                this.$http.post(config.apiUrl + "/api/postcomment/" + this.articleId, {content: this.commentContent}, {emulateJSON: true}).then(function(res){
                    var data = res.body;
                    if(data.status == 0){
                        // console.log(data)
                        this.commentList.unshift({
                            user_name: "匿名用户",
                            add_time: new Date().toGMTString(),
                            content: this.commentContent
                        })
                        this.commentContent = "";
                    }
                })
            }else{
                Toast({
                    message: '请输入评论内容',
                    duration: 500
                });
            }
        }
    }
}
</script>


<style scoped>
textarea {
    margin-bottom: 0;
}


.comment-info {
    margin: 5px auto;
    background-color: #ccc;
    line-height: 30px;
}

.comment-content {
    text-indent: 2em;
}

.comments {
    margin-bottom: 10px;
    padding: 0px 3px;
}
</style>

