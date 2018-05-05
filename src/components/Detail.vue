<template>
  <div class="container index">
    <div class="row">
        <div class="col-xs-25 main">
            <div>
                <h1 class="title">{{article.title}}</h1>
            </div>
            <div class="author">
                <a class="avatar" href="">
                    <img :src="article.iconPath" alt="96">
                </a>
                <div class="info">
                  <span class="name"><a href="">{{article.userAccount}}</a></span>
                  <!-- 文章数据信息 -->
                  <div class="meta">
                      <span class="publish-time">{{article.gmtCreate}}</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <!--正文-->
    <div class="content">
        {{article.content}}
    </div>



    <hr >
    <div class="container">
        <div class="row">
            <div class="col-xs-25 main">


                <div class="top-title">
                    <span>173条评论</span>
                    <a class="author-only">只看作者</a>
                    <a class="close-btn" style="display: none;">关闭评论</a>
                </div>

                <div id="list-container">
                    <!-- 列表模块 -->
                    <ul class="note-list" infinite-scroll-url="/">

                        <li id="note-26813092" data-note-id="26813092" class="have-img">
                            <div class="content">
                                <div class="author">
                                    <a class="avatar" target="_blank" href="">
                                        <img src="images/tou.jpg" alt="64">
                                    </a>
                                    <div class="info">
                                        <a class="nickname" target="_blank" href="">麦大人</a>
                                        <span class="time">04.19 12:21</span>
                                    </div>
                                </div>
                                <a class="title" target="_blank" href="">比贫穷更可怕的，是缺乏这3样东西</a>
                                <p class="abstract">
                                    文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。
                                </p>
                                <div class="meta">

                                    <a target="_blank" href="">
                                        <i class="iconfont ic-list-read"></i> 40398
                                    </a>
                                    <a target="_blank" href="">
                                        <i class="iconfont ic-list-comments"></i> 174
                                    </a>
                                    <span><i class="iconfont ic-list-like"></i> 974</span>
                                    <span><i class="iconfont ic-list-money"></i> 6</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <!-- 列表模块 -->
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      article:{

      }
    };
  },
  mounted(){
    this.$http.get("api/user/article/" + this.$route.params.id)
      .then((res) => {
        this.article = res.body.data;

        this.$http.get("api/user/info/" + this.article.userAccount)
          .then((res) => {
            let o = res.body;
            this.$set(this.article, 'gmtCreate', o.data.gmtCreate.replace(/Z/," ").replace(/T/," "));
            this.$set(this.article, 'iconPath', o.data.iconPath ? (this.$http.options.root + o.data.iconPath) : "static/images/default.png");
          });

        
      });
  }
};
</script>

<style scoped>

</style>
