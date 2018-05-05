<template>
  <div class="container index">
    <div class="row">
      <div class="col-xs-25 main">

        <h2 style="text-align:center;">外国旅游攻略</h2>
        <hr>

        <div id="list-container">
          <!-- 文章列表模块 -->
          <ul class="note-list" infinite-scroll-url="/">

              <li v-if="article.isForeign" v-for="article in articles" :key="article.id" class="have-img">
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
  name: 'Foreign',
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

              if(o.data.iconPath){
                Vue.$set(Vue.articles[i],'iconPath', this.$http.options.root +o.data.iconPath);
              }else{
                Vue.$set(Vue.articles[i],'iconPath', null);
              }
            });
        });
      });
  }
}
</script>

<style scoped>

</style>
