<template>
  <div class="login-wrap">
    <Navigation></Navigation>
    <div class="login-bg">
      <div class="login">
        <div class="box">
          <el-form class="form-box" ref="form">
            <div class="mb20 title">标签管理系统</div>
            <el-input
              class="mb20"
              placeholder="请输入账号"
              maxlength="20"
              v-model.trim="form.userAccount"
            >
              <template slot="prepend">
                <i class="el-icon-user"></i>
              </template>
            </el-input>
            <el-input
              type="password"
              maxlength="20"
              class="mb20"
              placeholder="请输入密码"
              v-model.trim="form.password"
            >
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
            <div class="mb20 validatecode-wrap">
              <el-input
                maxlength="4"
                class="input"
                placeholder="请输入验证码"
                @keyup.enter.native="login"
                v-model.trim="validateCode"
              ></el-input>
              <div class="img-wrap">
                <img class="img" :src="url" alt />
                <i class="el-icon-loading" v-if="validateCodeLoading"></i>
                <i class="el-icon-refresh" @click="getValidateCode"></i>
              </div>
            </div>
            <el-button class="login-btn" type="primary" @click="login" :loading="loginLoading">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, ValidateCode, CheckCode } from "@/api/login.js";
import Navigation from "@/components/Navigation";
import { mapState, mapMutations, mapActions } from "vuex";

import { getUserInfo } from "@/utils/handRoute.js";
export default {
  name: "Login",
  components: {
    Navigation
  },
  data() {
    return {
      validateCodeLoading: false, //验证码加载效果
      loginLoading: false, //登录加载效果
      form: {
        userAccount: "nl_label",
        password: "123456"
      },
      url: "",
      validateCode: ""
    };
  },
  created() {
    sessionStorage.clear();
    // let stateInitInfo = JSON.parse(localStorage.getItem("stateInitInfo"));
    // stateInitInfo ? this.resetState(stateInitInfo) : "";
    this.getValidateCode();
    let dd = JSON.parse(JSON.stringify(this.$store.state));
    console.log(dd);
  },
  computed: {
    
  },
  methods: {
    ...mapMutations(["setToken", "setTenants", "resetState"]),
    ...mapActions(["userInfo"]),
    checkCode(code) {
      return new Promise((resolve, reject) => {
        CheckCode(code).then(res => {
          resolve(res);
        });
      });
    },
    getValidateCode() {
      this.validateCodeLoading = true;
      ValidateCode({})
        .then(res => {
          this.validateCodeLoading = false;
          this.url = window.URL.createObjectURL(res); //创建本地url
        })
        .catch(err => {
          this.url = "";
          this.validateCodeLoading = false;
        });
    },
    login() {
      if (this.validateCode == "")
        return this.$message.warning("请输入验证码!");
      this.checkCode(this.validateCode).then(res => {
        console.log(res);
        if (res.success) {
          if (this.form.userAccount == "")
            return this.$message.warning("请输入账号!");

          if (this.form.password == "")
            return this.$message.warning("请输入密码!");
          let params = {
            appId: "2",
            ...this.form
          };
          this.loginLoading = true;
          Login(params)
            .then(res => {
              this.loginLoading = false;
              this.setToken(res.token);
              this.setTenants(res.tenants);
              console.log(res);
              //获取用户信息，动态路由信息
              getUserInfo().then(res => {
                this.$router.push("Home");
              });
            })
            .catch(err => {
              this.loginLoading = false;
              this.$message.error("服务异常！");
            });
        } else {
          this.$message.warning(res.msg);
          this.getValidateCode();
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  .login-bg {
    height: calc(100% - 70px);
    background: linear-gradient(to right, #2f46c0 50%, #2f3db3 50%);
    .login {
      width: 100%;
      height: 100%;
      position: relative;
      background-repeat: no-repeat;
      background-image: url("../assets/banners.jpg");
      background-size: contain;
      .box {
        bottom: 50%;
        right: 75px;
        transform: translateY(50%);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 414px;
        background-color: rgba(255, 255, 255, 0.1);
        width: 400px;
        padding: 50px 60px;
        box-sizing: border-box;
        border-radius: 10px;
        .form-box {
          .login-btn {
            width: 100%;
          }
          .title {
            text-align: center;
            color: #ffffff;
            font-size: 23px;
          }
          .mb20 {
            margin-bottom: 30px;
          }
          .validatecode-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .input {
              width: 155px;
            }
            .img-wrap {
              position: relative;
              .img {
                width: 120px;
                background: #ffffff;
                height: 40px;
              }
              .el-icon-loading {
                position: absolute;
                left: 50%;
                top: 28%;
              }
              .el-icon-refresh {
                cursor: pointer;
                position: absolute;
                top: 27%;
                right: -20px;
                color: #66b1ff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
