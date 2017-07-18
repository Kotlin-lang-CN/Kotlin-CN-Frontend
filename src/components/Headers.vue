<template>
  <div class="header" v-show="moduleShow">
    <div class="nav-bar" v-bind:class="{ 'not-top': !top}">
      <div class="nav-content">
        <a href="/" class="menu-header"><i class="logo"></i><span><b>Kotlin</b> CHINA</span></a>
        <div class="menu-main"><a href="/" title="论坛" v-bind:class="{'sel':current === 'home'}">论坛</a></div>
        <div class="menu-main"><a href="//www.kotlincn.net/docs/reference" title="wiki"
                                  v-bind:class="{'sel':current === 'wiki'}">Wiki</a></div>
        <div class="menu-main"><a href="//blog.kotliner.cn" title="博客">博客</a></div>
        <div class="menu-main"><a href="//www.kotlincn.net" title="中文站">中文站</a></div>

        <section class="menu-user menu-right" v-if="!me.isLogin">
          <div class="btn">
            <span><button v-on:click="register">注册</button></span>
          </div>
          <div class="btn">
            <span>登录</span>
            <ul>
              <li>
                <button v-on:click="loginWithGithub">GitHub登录</button>
              </li>
              <li>
                <button v-on:click="login">账号登录</button>
              </li>
            </ul>
          </div>
        </section>
        <section class="menu-user menu-right" v-if="me.isLogin">
          <div class="btn">
            <span><i class="publish-more"></i></span>
            <div class="sub-menu"><a :href="urlEdit">发布新话题</a></div>
          </div>
          <div class="btn">
            <span><i class="fa fa-bell" style="font-size: 20px"></i></span>
            <div class="sub-menu"><a href="/message">我的消息</a></div>
          </div>
          <div class="btn">
            <span>
              <app-avatar :user.sync="me" :size="'middle'" class="user-logo"></app-avatar>
              <i class="choice-icon"></i>
            </span>
            <ul>
              <li>
                <button v-on:click="userHome">我的主页</button>
              </li>
              <li>
                <button v-on:click="logout">退出登录</button>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
    <div v-if="isLoading" class="github-auth-loading">
      <h4>获取第三方登录信息...</h4>
      <vue-loading type="spin" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
  </div>
</template>
<script>
  import LoginMgr from '../assets/js/LoginMgr.js';
  import Event from '../assets/js/Event.js';
  import Config from '../assets/js/Config.js';
  import Avatar from "./Avatar.vue";
  import Net from '../assets/js/Net.js';
  import Cookie from 'js-cookie';
  import vueLoading from 'vue-loading-template'

  function getParam(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
        .exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }

  export default {
    components: {
      "app-avatar": Avatar,
      'vue-loading': vueLoading
    },
    data: function () {
      return {
        urlRoot: Config.UI.root,
        urlTopics: Config.UI.topics,
        urlRegister: Config.UI.register,
        urlAccount: Config.UI.account,
        urlEdit: Config.UI.edit,
        urlLogin: Config.UI.login,
        me: LoginMgr.info(),
        moduleShow: true,
        top: true,
        isLoading: false,
        current: 'home'
      }
    },
    created: function () {
      Event.on("fullscreen", (on) => this.moduleShow = !on);
      Event.on("page-scroll", (top) => this.top = top);
      const code = getParam('code');
      const state = getParam('state');
      if (code && state && code !== null && state !== null) {
        this.isLoading = true;
        this.handleGithubAuth(code, state)
      }
    },
    methods: {
      login() {
        LoginMgr.require()
      },
      loginWithGithub() {
        Net.get({
          url: Config.URL.github.createState
        }, (resp) => {
          window.location.href = 'http://github.com/login/oauth/authorize' +
            '?state=' + resp.state +
            '&client_id=' + Config.OAuth.github.clientId +
            '&redirect_url=' + window.location.host +
            '&scope=' + Config.OAuth.github.scope
        })
      },
      handleGithubAuth(code, state) {
        Net.post({
          url: Config.URL.github.auth,
          condition: {
            code: code,
            state: state
          }
        }, (resp) => {
          window.console.log(resp);
          if (resp.need_create_account) {
            Cookie.set('X-App-Github', resp.github_token);
            Cookie.set('X-App-Github-User', resp);
            this.isLoading = false;
            LoginMgr.require(/*login already*/ () => window.location.href = '/', "request_register")
          } else {
            LoginMgr.login(resp);
            window.location.href = '/'
          }
        }, () => window.location.href = '/');
      },
      userHome(){
        window.location.href = Config.UI.user + '/' + LoginMgr.info().uid;
      },
      userMessage() {
        window.location.href = Config.UI.message
      },
      register() {
        Event.emit('request_register')
      },
      logout() {
        LoginMgr.logout();
      }
    },
  }
</script>
<style scoped>
  .github-auth-loading {
    margin-left: calc(50% - 200px);
  }
</style>
<style scoped lang="less">
  .header {
    .not-top {
      -webkit-box-shadow: 0 0 10px #f1f1f1;
      -moz-box-shadow: 0 0 10px #f1f1f1;
      box-shadow: 0 0 10px #f1f1f1;
    }
    .nav-bar {
      background: white;
      padding: 0 16px;
      font-size: 20px;
      .nav-content {
        width: 1120px;
        height: 86px;
        margin: auto;
        > div {
          display: inline-block;
        }
        .menu-main {
          height: 38px;
          line-height: 38px;
          text-align: center;
          margin-left: 20px;
          padding-top: 26px;
          padding-bottom: 24px;
          vertical-align: top;
          font-size: 18px;
        }
        .sel {
          color: #2b75e1;
        }
        a.menu-header {
          display: inline-block;
          margin-top: 26px;
          padding-bottom: 14px;
          color: #6b6b6b;
          font-weight: bolder;
          font-size: 20px;
          line-height: 38px;
          height: 38px;
          .logo {
            display: inline-block;
            width: 20px;
            height: 22.5px;
            background: url(../assets/img/logo_k.png) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-top: 4px;
            margin-right: 4px;
          }
        }
        .menu-user {
          .publish-more {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../assets/img/add-icon.png) no-repeat;
          }

          .btn {
            position: relative;
            vertical-align: top;
            height: 86px;
            display: inline-block;
            text-align: center;
          }
          .btn > span {
            margin-right: -5px;
            display: block;
            line-height: 70px;
            min-height: 70px;
            width: 65px;
            text-align: center;
            i {
              margin-top: 36px;
            }
            button {
              height: 66px;
              color: #333;
            }
            .user-logo {
              margin-top: 20px;
              margin-bottom: -8px;
              margin-left: 5px;
            }
            .choice-icon {
              display: inline-block;
              margin-left: -8px;
              margin-top: 10px;
              width: 18px;
              height: 18px;
              vertical-align: bottom;
              background: url(../assets/img/choice-icon.png) no-repeat;
            }
          }
          .btn > span .half {
            margin-right: -5px;
            display: block;
            line-height: 70px;
            min-height: 70px;
            width: 30px;
            text-align: center;
            i {
              margin-top: 36px;
            }
            button {
              height: 66px;
              color: #333;
            }
            .user-logo {
              margin-top: 20px;
              margin-bottom: -8px;
              margin-left: 5px;
            }
            .choice-icon {
              display: inline-block;
              margin-left: -8px;
              margin-top: 10px;
              width: 18px;
              height: 18px;
              vertical-align: bottom;
              background: url(../assets/img/choice-icon.png) no-repeat;
            }
          }
          .btn > span:hover {
            background-color: #f9f9f9;
          }
          .btn .sub-menu {
            display: none;
          }
          .btn:hover .sub-menu {
            position: absolute;
            background-color: white;
            right: -1px;
            width: 182px;
            height: 62px;
            display: block;
            box-shadow: 0 0 10px #ccc;
            a {
              display: block;
              line-height: 62px;
              color: #333;
            }
            button {
              display: block;
              line-height: 50px;
              color: #333;
              height: 62px;
              width: 182px;
            }
          }
          .btn .sub-menu:hover {
            background-color: #f8fbff;
            a {
              color: #2572e5;
            }
            button {
              color: #2572e5;
            }
          }
          .btn ul {
            display: none;
          }
          .btn:hover ul {
            position: absolute;
            background-color: white;
            right: -1px;
            width: 182px;
            height: 124px;
            display: block;
            box-shadow: 0 0 10px #ccc;
            li {
              border-top: 1px #f1f1f1 solid;
            }
            li:nth-child(1) {
              border-top: 0;
            }
            button {
              color: #333;
              line-height: 62px;
              height: 62px;
              width: 100%;
              padding: 0;
              margin: 0;
            }
            button:hover {
              background-color: #f8fbff;
              color: #2572e5;
            }
          }
        }
        .menu-right {
          float: right;
          font-size: 16px;
          position: relative;
        }
      }
    }
    .github-auth-loading {
      z-index: 3;
      position: absolute;
      width: 400px;
      margin-top: 200px;
      padding: 20px;
      box-sizing: border-box;
      background: white;
      border: 1px #f1f1f1 solid;
      box-shadow: 0 0 3px #2572e5;
      text-align: center;
    }
  }
</style>
