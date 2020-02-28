<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.account"
          :placeholder="$t('login.username')"
          name="account"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- <el-form-item prop="btn"> -->
      <!-- <p class="registerBtn" @click="registerDialog=true">注册</p> -->
      <!-- </el-form-item> -->
     
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;margin-top:16px;margin-left:0"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>
      <el-button
        type="text"
        @click.native.prevent="registerDialog=true"
      >注册</el-button>
      <el-button
        type="text"
        @click.native.prevent="forgetPwdDialog=true"
      >忘记密码</el-button> 
    </el-form>
    <el-dialog
      width="28%"
      title="账号注册"
      :visible.sync="registerDialog"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form ref="newUserForm" :model="newUser" :rules="newUserRules" label-width="100px">
        <el-form-item label="账号名:" prop="account">
          <el-input v-model="newUser.account" placeholder="请输入账户名" clearable />
        </el-form-item>
        <el-form-item label="密码:" prop="password" ref="password">
          <el-input v-model="newUser.password" show-password placeholder="请输入密码" clearable />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword" ref="confirmPassword">
          <el-input
            v-model="newUser.confirmPassword"
            show-password
            placeholder="请输入确认密码"
            clearable
          />
        </el-form-item>
        <el-form-item label="公司名:" prop="company">
          <el-input v-model="newUser.company" placeholder="请输入公司名" clearable />
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" ref="phone">
          <el-input
            v-model="newUser.phone"
            placeholder="请输入手机号"
            maxlength="11"
            style="width:80%"
            clearable
          />
        </el-form-item>
        <el-form-item label="验证码:" prop="captcha">
          <el-input v-model="newUser.captcha" placeholder="请输入验证码" clearable />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="newUser.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="getCode"
          :disabled="isGet"
          @click.native.prevent="getCode"
        >{{time}}</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('newUserForm')">取消</el-button>
        <el-button type="primary" @click="register('newUserForm')">确定</el-button>
      </div>
    </el-dialog>
  <!-- 忘记密码 -->
    <el-dialog
      width="28%"
      title="忘记密码"
      :visible.sync="forgetPwdDialog"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form ref="forgetPwdForm" :model="forgetPwdForm" :rules="forgetPwdFormRules" label-width="100px">
        

        <el-form-item label="账号名:" prop="userName">
          <el-input v-model="forgetPwdForm.userName" placeholder="请输入账户名" clearable />
        </el-form-item>
        
        <el-button
          :loading="loading"
          type="primary"
          class="getCode2"
          :disabled="isGet2"
          @click="getCode2()"
        >{{time2}}</el-button>
        <el-form-item label="验证码:" prop="code" ref="code" >
          <el-input v-model="forgetPwdForm.code" placeholder="请输入验证码" clearable auto-complete="new-code"/>
        </el-form-item>
         <el-form-item label="新密码:" prop="password" ref="password" >
          <el-input v-model="forgetPwdForm.password" show-password placeholder="请输入密码" clearable auto-complete="new-password"/>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword" ref="confirmPassword">
          <el-input
            v-model="forgetPwdForm.confirmPassword"
            show-password
            placeholder="请输入确认密码"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('forgetPwdForm')">取消</el-button>
        <el-button type="primary" @click="forgetPwd('forgetPwdForm')">确定</el-button>
      </div>
    </el-dialog>
    <particles></particles>
  </div>
</template>

<script>
import { getCaptcha, register, changePwd, getCaptcha2 } from "@/api/login";
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import Particles from "@/components/Particles/index";
export default {
  name: "Login",
  components: { LangSelect, Particles },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    var validate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validate2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetPwdForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      time: "获取验证码",
      time2: "获取验证码",
      isGet: false,
      isGet2: false,
      loginForm: {
        account: null,
        password: null,
        rememberMe: true
      },
      loginRules: {
        account: [
          { required: true, message: "必须填写账号", trigger: "change" }
        ],
        password: [
          { required: true, message: "必须填写密码", trigger: "change" }
        ]
      },
      registerDialog: false,
      forgetPwdDialog: false,
      forgetPwdForm: {
        userName: null,
        code: null,
        password: null,
        confirmPassword: null
      },

      newUser: {
        account: null,
        password: null,
        confirmPassword: null,
        company: null,
        phone: null,
        captcha: null,
        email: null
      },
      newUserRules: {
        account: [
          { required: true, message: "必须填写账号", trigger: "change" }
        ],
        password: [
          { required: true, message: "必须填写密码", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码必须设置在6到16位，且包含字母和数字",
            trigger: "blur"
          },
          {
            pattern: /^(?=.*[A-z])(?=.*\d)[\d\D]*$/,
            message: "密码设置在6到16位，且包含字母和数字",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "必须填写确认密码", trigger: "change" },
          { validator: validate, trigger: "blur", required: true }
        ],
        company: [
          { required: true, message: "必须填写公司名", trigger: "change" }
        ],
        phone: [
          { required: true, message: "必须填写手机号码", trigger: "change" }
        ],
        captcha: [
          { required: true, message: "必须填写验证码", trigger: "change" }
        ]
      },

      forgetPwdFormRules: {
        userName: [
          {
            required: true,
            message: "必须填写需要修改密码的账号",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "必须填写验证码", trigger: "blur" }],
        password: [
          { required: true, message: "必须填写密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码必须设置在6到16位，且包含字母和数字",
            trigger: "blur"
          },
          {
            pattern: /^(?=.*[A-z])(?=.*\d)[\d\D]*$/,
            message: "密码设置在6到16位，且包含字母和数字",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "必须填写确认密码", trigger: "blur" },
          { validator: validate2, trigger: "blur", required: true }
        ]
      },
      passwordType: "password",
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$store.dispatch("GetUserInfo").then(res => {
                const roles = res.roles;
                this.$store.dispatch("GenerateRoutes", { roles }).then(() => {
                  // 根据roles权限生成可访问的路由表
                  this.$router.addRoutes(this.$store.getters.addRouters); // 动态添加可访问路由表
                  this.$router.push({ path: this.redirect || "/" });
                });
              });

              // this.$router.addRoutes(this.$store.getters.addRouters)
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          //   console.log('error submit!!')
          Message({
            message: '登录失败',
            type: 'error',
             duration: 5 * 1000
          })
          this.loading = false;
          return false;
        }
      });
    },
    //获取验证码
    getCode() {
      if (this.newUser.phone) {
        let params = {
          phone: this.newUser.phone
        };
        getCaptcha(params).then(res => {
          if (res.data.success) {
            this.isGet = true;
            this.countDown(60);
          } else {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error"
            });
          }
        });
      }
    },
    getCode2() {
      let params = {
        userName: this.forgetPwdForm.userName
      };
      getCaptcha2(params).then(res => {
        if (res.data.success) {
          this.isGet2 = true;
          this.countDown2(60);
        } else {
          this.$notify({
            title: "失败",
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    //倒计时
    countDown(time) {
      this.time = time;
      if (time > 0) {
        setTimeout(() => {
          this.countDown(time - 1);
        }, 1000);
      } else {
        this.isGet = false;
        this.time = "重新获取验证码";
      }
    },
    countDown2(time) {
      this.time2 = time;
      if (time > 0) {
        setTimeout(() => {
          this.countDown(time - 1);
        }, 1000);
      } else {
        this.isGet2 = false;
        this.time2 = "重新获取验证码";
      }
    },
    //注册
    register(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(this.form)
        if (valid) {
          register(this.newUser).then(res => {
            this.$notify({
              title: "成功",
              message: "注册成功",
              type: "success"
            });
            this.resetForm(formName);
            this.time = "获取验证码";
            this.isGet = false;
            // this.registerDialog = false;
          });
        }
      });
    },
    resetForm(formName){
      this.registerDialog = false;
      this.forgetPwdDialog = false;
      this.$refs[formName].resetFields();
    },
    //忘记密码
    forgetPwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.forgetPwdForm, "123");
          changePwd(this.forgetPwdForm).then(res => {
            if (res.data.success) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
              this.resetForm(formName);
              this.time2 = "获取验证码";
              this.isGet2 = false;
              this.forgetPwdDialog = false;
            } else {
              this.$notify({
                title: "失败",
                message: res.data.message,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
// $bg:#2d3a4b;
$bg: transparent;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
/deep/.el-dialog {
  min-width: 600px !important;
}
.el-input--medium {
  width: 80% !important;
}

.getCode {
  width: 22%;
  position: absolute;
  top: 54%;
  right: 6%;
}
.getCode2 {
  width: 22%;
  position: absolute;
  top: 34.5%;
  right: 6%;
}
</style>
