<template>
  <div class="login_container">
    <div class="login_box">
      <!-- LOGO -->
      <div class="login_img">
        <img src="../../assets/logo.png" />
      </div>
      <!-- 登录表单 -->
      <el-form class="form" :model="form" :rules="Formrules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            class="input"
            v-model="form.username"
            type="text"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            class="input"
            type="password"
            v-model="form.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="my-button">
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "../../network/home.js";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      Formrules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "请密码长度在6-12位之间" }
        ]
      }
    };
  },
  methods: {
    //重置
    reset() {
      this.$refs.ruleForm.resetFields();
    },

    //登录
    login() {
      let data = {
        username: this.form.username,
        password: this.form.password
      };

      //表单预验证
      this.$refs.ruleForm.validate(vali => {
          //通过预验证
        if (vali) {
          register(data).then(res => {
           
            if (res.data.meta.status != 200) {
              this.$message({
                message: res.data.meta.msg,
                center: true,
                type: "error"
              });
            }

            this.$message({
                message: res.data.meta.msg,
                center: true,
                type: "success"
              });
           // console.log('通过预验证');
            //这里顺序不能错 要先存 在跳转，不然会出错
            window.sessionStorage.setItem("token", res.data.data.token);
            this.$router.push("/home");
            
           
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      //    let params={
      //        quer:'admin',
      //        pagenum:1,
      //        pagesize:5
      //    }
      //    console.log('params',params)
      //   testquery(params).then(res=>{
      //       console.log(res);
      //   })

      // this.$axios.post('http://127.0.0.1:8888/api/private/v1/login',
      //     {
      //        username:this.form.username,
      //       password:this.form.password
      //     }
      // ).then(res=>{
      //     console.log(res);
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #224463;
  height: 100%;
  width: 100%;
}
.login_box {
  width: 480px;
  height: 320px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.login_img {
  width: 160px;
  height: 160px;
  background-color: #e1e4e1;
  border-radius: 50%;
  border: 10px solid #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 4px 3px #e1e4e1;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    box-sizing: border-box;
  }
}

//   表单
.form {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-35%);
  padding: 0 30px;
  box-sizing: border-box;
}

.my-button {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-20%, -60%);
}
</style>