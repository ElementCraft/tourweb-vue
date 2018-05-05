<template>
  <div class="container index">
    <div class="col-lg-2 col-md-2 col-sm-1"></div>

        <div class="col-xs-25">
            <form method="get">
                <div class="text">
                    <hr>
                    <h1>个人中心</h1>
                    <hr>
                    <div class="toux">
                        <h3>上传新头像</h3>
                        <h3 class="h3_alter">修改密码</h3>
                    </div>
                    <div class="kongbai"></div>
                    <form action="" method="get">
                        <div class="form_text">
                            <img class="man_img" :src="user.iconPath" />
                            <form id="formFile">
                                <input type="file" name="file" @change="fileChange">
                            </form>
                            <button @click.prevent="uploadNew" type="button" class="btn btn-info btn_upload">上传头像</button>
                            <div class="alter_pwd">
                                <input type="text" class="form-control" placeholder="请输入旧密码" aria-describedby="sizing-addon1">
                                <input type="text" class="form-control" placeholder="请输入新密码" aria-describedby="sizing-addon1">
                                <input type="text" class="form-control" placeholder="请确认新密码" aria-describedby="sizing-addon1">
                            </div>

                            <button type="submit" class="btn btn-info btn_submit">保存</button>

                        </div>
                    </form>

                </div>
            </form>
        </div>

        <div class="col-lg-2 col-md-2 col-sm-1"></div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      user:{
        
      },
      img : ""
    };
  },
  mounted(){
    var user =  JSON.parse(this.$localStorage.get("user"));

    if(user){
        user.iconPath = (this.$http.options.root + user.iconPath) || "static/images/default.png";
    }

    this.user = user;
  },
  methods: {
    fileChange(){
      var data = new FormData($("#formFile")[0]);

      this.$http.post("api/user/icon/upload", data)
      .then((res) => {
        let result = res.body;
        if(result.success){
          this.img = result.data;
          this.$set(this.user, "iconPath", (this.$http.options.root + result.data));
        }
      });
    },
    uploadNew(){
        let data = {
            iconPath : this.img
        }

        this.$http.post("api/user/icon/update/" + this.user.account, data)
        .then((res) => {    
            let result = res.body;
            if(result.success){
                let u = this.user;
                u.iconPath = this.img;
                this.$localStorage.set("user", JSON.stringify(u));
                this.$router.go();
            }
        });
    }
  }
};
</script>

<style scoped>

.text{
    background-color: white;
    height: 700px;
    box-shadow: 0 0 20px 1px rgba(0,0,0,0.1);
    margin-top: 50px;
}
.toux{
    width: 200px;
    height: 100%;
    float: left;
    margin-top: -20px;
}
.toux img{
    margin-left: 40px;
}

.kongbai{
    width: 40px;
    height: 100%;
    float: left;
}

h1{
    color: #999999;
    text-align: center;
    margin-top: 30px;
}
h3{
    color: #999999;
    text-align: center;
    margin-top: 30px;
}
.input-group-addon{
    width: 50px;
}

label{
    margin-left: 40px;
}
.form-control{
    width: 350px;
}
input{
    margin-bottom: 20px;
}
textarea{
    margin-top: 10px;
}
.btn_submit{

}
.man_img{
    border-radius: 50px;
    width: 95px;
    height: 95px;
    border: 1px solid #ccc;
}
.btn_upload{margin-left: 20px;}
.h3_alter{margin-top: 160px;}
.alter_pwd{margin-top: 50px;}
</style>
