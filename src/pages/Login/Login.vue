<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="(loginWay = false), updateImg()"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="clickTime !== 0"
                class="get_verification"
                :class="{ right_phone: handlePhone && isClass }"
                @click.prevent="sendCode"
              >
                {{ clickTime > 0 ? `已发送${clickTime}s` : "获取验证码" }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                v-model="code"
                placeholder="验证码"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  v-model="phone"
                  placeholder="手机/邮箱/用户名"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="!showPwd ? 'password' : 'tel'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="password"
                />
                <div
                  class="switch_button"
                  @click="loginPwd"
                  :class="showPwd ? 'on' : 'off'"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{
                    !showPwd ? "..." : "abc"
                  }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="code"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="updateImg"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="verifyLogin">
            登录
          </button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      v-show="alertShow"
      @closeTip="closeTip"
    ></AlertTip>
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import api from "../../api";

export default {
  name: "MyLogin",
  components: {
    AlertTip,
  },
  data() {
    return {
      loginWay: true, //true为短信登录,false为密码登录
      isClass: true, //true表示没有开启定时器,用于短信登录的发送短信
      clickTime: 0, //倒计时时间
      showPwd: false, //false为未显示密码
      alertText: "", //错误提示框信息
      alertShow: false, //true为显示错误提示框
      phone: "", //电话号
      password: "", //密码
      code: "", //验证码
      loginResult: undefined, //用于判断登录状态
    };
  },
  computed: {
    handlePhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  methods: {
    // 切换密码登录短信登录
    loginPwd() {
      if (this.showPwd) {
        this.showPwd = false;
      } else {
        this.showPwd = true;
      }
    },
    // 发送短信验证码
    async sendCode() {
      // 判断当前是否正在计时
      if (this.clickTime) return;
      // 开启定时器前准备工作
      this.isClass = false;
      this.clickTime = 30;
      // 开启定时器
      this.setIntervalId = setInterval(() => {
        this.clickTime--;
        // 根据条件清除定时器
        if (this.clickTime === 0) {
          this.isClass = true;
          clearInterval(this.setIntervalId);
        }
      }, 1000);
      // 发送短信验证码请求 13716962779
      let result = await api.sendNoteCode(this.phone);
      if (result.code === 1) {
        // 失败则弹出报错信息
        this.openAlert(result.msg);
        // 清除验证码
        if (this.clickTime > 0) {
          this.clickTime = 0;
          this.isClass = true;
          clearInterval(this.setIntervalId);
        }
      } else {
        // 清除验证码
        if (this.clickTime > 0) {
          this.clickTime = 0;
          this.isClass = true;
          clearInterval(this.setIntervalId);
        }
      }
    },
    // 关闭提示框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    // 登录校验
    async verifyLogin() {
      let { loginWay, phone, password, code } = this;
      // 短信登录验证;
      if (loginWay) {
        // 电话号不正确
        if (/^\d{11}$/.test(phone)) {
          // 验证码不正确
          if (code) {
            this.loginResult = await api.usePhoneCodeRegister(phone, code);
          } else {
            this.openAlert("验证码不正确");
          }
        } else {
          this.openAlert("电话号不正确");
        }
      } else {
        //密码登录验证
        // 电话号不正确
        if (/^\d{11}$/.test(phone) || /^\d/.test(phone)) {
          // 密码不正确
          if (password) {
            // 验证码不正确
            if (code) {
              this.loginResult = await api.useAccountRegister(
                phone,
                password,
                code
              );
            } else {
              this.openAlert("验证码不正确");
            }
          } else {
            this.openAlert("密码不正确");
          }
        } else {
          this.openAlert("电话号不正确");
        }
      }
    },
    // 开启弹窗
    openAlert(text) {
      this.alertText = text;
      this.alertShow = true;
    },
    // 更新验证码图片
    updateImg() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
  },
  watch: {
    loginResult() {
      if (this.loginResult.code === 1) {
        this.openAlert(this.loginResult.msg);
        this.updateImg();
      } else {
        // 更新vuex中state的全局状态
        this.$store.commit("receive_user_info", this.loginResult.data);
        // 提示登录成功
        this.$bus.$emit("succInfo");
        // 跳转个人中心
        this.$router.replace("/profile");
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.icon-icon-jiantou2 {
  margin-top: 10px;
}

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>