<template>
  <div id="app">
    <!-- 全局顶部导航栏 -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <div v-if="user == null">
          <a class="btn sign-up" href="" data-toggle="modal" data-target="#regModal">注册</a>
          <a class="btn log-in" href="" data-toggle="modal" data-target="#loginModal">登录</a>
        </div>
        <div v-else>
          <a class="btn sign-up" href="" data-toggle="modal" data-target="#addArticleModal">写攻略</a>
          <a class="btn log-in" @click.prevent="logout">欢迎，{{user.account}}</a>
        </div>
          
        <div class="container">
          <div class="collapse navbar-collapse" id="menu">
            <ul class="nav navbar-nav">
              <li class="tab active">
                <router-link to="/">
                  <span class="menu-text">驴友攻略站</span><i class="iconfont ic-navigation-discover menu-icon"></i>
                </router-link>
              </li>
              <li class="tab">
                <router-link class="app-download-btn" to="/china"><span class="menu-text">国内攻略</span></router-link>
              </li>
              <li class="tab">
                <router-link class="app-download-btn" to="/foreign"><span class="menu-text">国外攻略</span></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <router-view />

    <footer class="container">
      <div class="row">
          <div class="col-xs-25 main">

          <a target="_blank" href="">关于驴友攻略网站</a><em> · </em><a target="_blank" href="">联系我们</a><em> · </em><a target="_blank" href="">帮助中心</a>
            <div class="icp">
            ©2017-2018 
            </div>
          </div>
      </div>
    </footer>

    <!-- 注册Modal -->
    <div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">用户注册</h4>
          </div>
          <div class="modal-body">
            <div style="padding:12px;">
              <span style="color:red">{{err}}</span>
              <form>
                <div class="form-group">
                  <label>帐号</label>
                  <input type="text" @input="clearErr" class="form-control" id="inputAccount" placeholder="请输入帐号...">
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input type="password" @input="clearErr" class="form-control" id="inputPassword" placeholder="请输入密码...">
                </div>
                <div class="form-group">
                  <label>确认密码</label>
                  <input type="password" @input="clearErr" class="form-control" id="inputPassword2" placeholder="请再次输入密码...">
                </div>
              </form>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="btnRegistSubmit">确认注册</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 登录Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">用户登录</h4>
          </div>
          <div class="modal-body">
            <div style="padding:12px;">
              <span style="color:red">{{err}}</span>
              <form>
                <div class="form-group">
                  <label>帐号</label>
                  <input type="text" @input="clearErr" class="form-control" id="inputAccountLogin" placeholder="请输入帐号...">
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input type="password" @input="clearErr" class="form-control" id="inputPasswordLogin" placeholder="请输入密码...">
                </div>
              </form>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="btnLoginSubmit">确认登录</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 写攻略Modal -->
    <div class="modal fade" id="addArticleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">发表攻略</h4>
          </div>
          <div class="modal-body">
            <div style="padding:12px;">
              <span style="color:red">{{err}}</span>
              
                <div class="form-group">
                  <label>标题</label>
                  <input type="text" @input="clearErr" class="form-control" id="inputTitle" placeholder="请输入标题...">
                </div>
                <div class="form-group">
                  <label>分类</label>
                  <br>
                  <label class="radio-inline">
                    <input type="radio" name="radioForeign" id="radioChina" value="1" checked> 国内攻略
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="radioForeign" id="radioForeign" value="2"> 国外攻略
                  </label>
                </div>
                <div class="form-group">
                  <label>正文</label>
                  <textarea class="form-control" rows="5" id="areaContent"></textarea>
                </div>
              <form id="formFile">
                <div class="form-group">
                  <label>附图</label>
                  <input type="file" id="fileImg" name="file" @change="fileChange">
                </div>
                <img id="previewImg" src="" alt="" class="img-responsive" style="display:none;">
              </form>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="btnArticleSubmit">确认发表</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      err: "",
      user: null,
      img: ""
    }
  },
  mounted() {
    this.user = JSON.parse(this.$localStorage.get("user"));
    //$('#areaContent').wysiwyg();
  },
  methods : {
    btnRegistSubmit(){
      var inputAccount = $("#inputAccount");
      var inputPassword = $("#inputPassword");
      var inputPassword2 = $("#inputPassword2");
      var account = inputAccount.val();
      var password = inputPassword.val();
      var password2 = inputPassword2.val();

      if(!account || account.trim() == ""){
        this.err = "帐号不能为空";
        return ;
      }

      if(!password || password.trim() == ""){
        this.err = "密码不能为空";
        return ;
      }

      if(password2 != password){
        this.err = "两次输入的密码不一致";
        return ;
      }

      this.$http.post("api/user/reg", {
        account : account.trim(),
        password : password.trim()
      }).then((res) => {
        let result = res.body;
        if(result.success){
          alert("注册成功");
        }else{
          this.err = result.msg;
        }
      }, (err) => {
        this.err = "网络异常";
      });
    },
    btnLoginSubmit(){
      var inputAccount = $("#inputAccountLogin");
      var inputPassword = $("#inputPasswordLogin");
      var account = inputAccount.val();
      var password = inputPassword.val();

      if(!account || account.trim() == ""){
        this.err = "帐号不能为空";
        return ;
      }

      if(!password || password.trim() == ""){
        this.err = "密码不能为空";
        return ;
      }

      let user = {
        account : account.trim(),
        password : password.trim()
      }

      this.$http.post("api/user/login", user)
      .then((res) => {
        let result = res.body;
        if(result.success){
          this.$http.get("api/user/info/" + user.account)
            .then((res) => {
              this.$localStorage.set("user", JSON.stringify(res.body.data));
              this.$router.go();
            });
        }else{
          this.err = result.msg;
        }
      }, (err) => {
        this.err = "网络异常";
      });
    },
    clearErr(){
      this.err = "";
    },
    fileChange(){
      this.clearErr();

      var data = new FormData($("#formFile")[0]);

      this.$http.post("api/user/icon/upload", data)
      .then((res) => {
        let result = res.body;
        if(result.success){
          this.img = result.data;
          $("#previewImg").prop("src", this.$http.options.root + result.data);
          $("#previewImg").show();
        }else{
          this.err = result.msg;
        }
      });
    },
    btnArticleSubmit(){
      var title = $("#inputTitle").val();
      var content = $("#areaContent").val();
      var isForeign = $("#radioForeign").prop("checked") ? "true":"false";

      this.$http.post("api/user/article", {
        title: title,
        content: content,
        isForeign: isForeign,
        imgPath: this.img,
        userAccount: this.user.account
      })
      .then((res) => {
        let result = res.body;
        console.log(result);
        if(result.success){
          this.$router.go();
        }else{
          this.err = result.msg;
        }
      });
    },
    logout(){
      this.$localStorage.remove("user");
      this.$router.go();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
