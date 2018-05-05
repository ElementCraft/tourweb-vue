<template>
  <div class="container index">
    <div class="row">
      <div class="col-xs-25 main">
        
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="static/images/img.png" alt="">
              <div class="carousel-caption">

              </div>
            </div>
            <div class="item">
              <img src="static/images/img.png" alt="">
              <div class="carousel-caption">

              </div>
            </div>

          </div>

          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div id="list-container">
          <!-- 文章列表模块 -->
          <ul class="note-list" infinite-scroll-url="/">

              <li id="note-26813092" data-note-id="26813092" class="have-img">
                  <a class="wrap-img" href="" target="_blank">
                    <img class="  img-blur-done" src="static/images/img.png" alt="120">
                  </a>
                <div class="content">
                  <div class="author">
                    <a class="avatar" target="_blank" href="">
                      <img src="static/images/tou.jpg" alt="64">
                    </a>
                    <div class="info">
                        <a class="nickname" target="_blank" href="">麦大人</a>
                        <a target="_blank" href="">
                            <img width="30" height="30" class="badge-icon" title="" src="" alt="">
                        </a>
                        <span class="time">04.19 12:21</span>
                    </div>
                  </div>
                  <a class="title" target="_blank" href="">比贫穷更可怕的，是缺乏这3样东西</a>
                  <p class="abstract">
                    文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。文/麦大人 01 说到贫穷，每个人都想避而远之，毕竟缺起钱来，力。
                  </p>
                  <div class="meta">

                      <a target="_blank" href="https://www.jianshu.com/p/3ea8262b0927">
                          <i class="iconfont ic-list-read"></i> 40398
                      </a>
                      <a target="_blank" href="https://www.jianshu.com/p/3ea8262b0927#comments">
                          <i class="iconfont ic-list-comments"></i> 174
                      </a>
                      <span><i class="iconfont ic-list-like"></i> 974</span>
                      <span><i class="iconfont ic-list-money"></i> 6</span>
                  </div>
                </div>
              </li>

              <li v-for="article in articles" :key="article.id" class="have-img">
                  <a class="wrap-img" href="" target="_blank">
                    <img class="img-blur-done" :src="article.imgPath || ''" alt="120">
                  </a>
                <div class="content">
                  <div class="author">
                    <a class="avatar" target="_blank" href="">
                      <img :src="article.iconPath || 'static/images/default.png'" alt="64">
                    </a>
                    <div class="info">
                        <a class="nickname" target="_blank" href="">{{article.userAccount}}</a>
                        
                        <span class="time">{{article.gmtCreate}}</span>
                    </div>
                  </div>
                  <router-link class="title" :to="'/detail/' + article.id">{{article.title}}</router-link>
                  <p class="abstract">
                    {{article.content}}
                  </p>
                  <div class="meta">

                      <a target="_blank" href="https://www.jianshu.com/p/3ea8262b0927">
                          <i class="iconfont ic-list-read"></i> 40398
                      </a>
                      <a target="_blank" href="https://www.jianshu.com/p/3ea8262b0927#comments">
                          <i class="iconfont ic-list-comments"></i> 174
                      </a>
                  </div>
                </div>
              </li>

          </ul>
          <!-- 文章列表模块 -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      articles: [
      ]
    }
  },
  mounted(){
    this.$http.get("api/user/articles")
      .then((res) => {
        let result = res.body;

        result.map(obj => {
          obj.iconPath = "";
          obj.imgPath = this.$http.options.root + obj.imgPath;
          return obj;
        });

        this.articles = result;

        let Vue = this;
        result.forEach((obj, i) => {
          this.$http.get("api/user/info/" + obj.userAccount)
            .then((res) => {
              let o = res.body;

              Vue.$set(Vue.articles[i],'iconPath',o.data.iconPath);
            });
        });
      });
  }
}
</script>

<style scoped>

</style>
