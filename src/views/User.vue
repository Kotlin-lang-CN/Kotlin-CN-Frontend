<template>
  <app-layout>
    <div class="user-root">
      <div class="base-info">
        <div>
          <img class="logo" :src="me.info().logo"
               style="width:150px;height:150px;" width="150" height="150"/>
          <h2>{{ me.info().username }} <a :href="'mailto:'+ me.info().email "><i class="email"></i></a></h2>
          <div>文章数{{articleCount}},回帖数{{replyCount}}</div>
        </div>
        <div>
          <i class="fa fa-edit" v-if="!editMode" v-on:click="toggleEdit"></i>
          <i class="fa fa-check-square-o" v-if="editMode" v-on:click="doneEdit"></i>
          <table>
            <tr>
              <th>邮箱</th>
              <td v-if="!editMode">{{me.info().email}}</td>
              <td v-if="editMode"><input :value="me.info().email"/></td>
            </tr>
            <tr>
              <th>博客</th>
              <td v-if="!editMode">{{profile.blog}}</td>
              <td v-if="editMode"><input :value="profile.blog"/></td>
            </tr>
            <tr>
              <th>公司</th>
              <td v-if="!editMode">{{profile.company}}</td>
              <td v-if="editMode"><input :value="profile.company"/></td>
            </tr>
            <tr>
              <th>教育</th>
              <td v-if="!editMode">{{profile.education}}</td>
              <td v-if="editMode"><input :value="profile.education"/></td>
            </tr>
            <tr>
              <th>github</th>
              <td v-if="!editMode">{{profile.github}}</td>
              <td v-if="editMode"><input :value="profile.github"/></td>
            </tr>
            <tr>
              <th>位置</th>
              <td v-if="!editMode">{{profile.location}}</td>
              <td v-if="editMode"><input :value="profile.location"/></td>
            </tr>
          </table>
        </div>
      </div>
      <ul class="user-nav">
        <li>热门文章</li>
        <li>最近回复</li>
        <li>新消息提醒</li>
      </ul>
      <ul>
        <li>TODO</li>
        <li>TODO</li>
      </ul>
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from '../layout/AppWeb.vue';
  import Avatar from "../components/Avatar.vue";

  import LoginMgr from "../assets/js/LoginMgr.js";
  import Config from "../assets/js/Config.js";
  import Net from "../assets/js/Net.js";
  import md5 from 'md5'

  export default {
    components: {
      'app-layout': AppLayout,
      "app-avatar": Avatar
    },
    data() {
      return {
        uid: this.$root.params.uid,
        me: LoginMgr,
        profile: {
          blog: '',
          company: '',
          description: '',
          education: '',
          gender: 0,
          github: '',
          location: '',
        },
        articleCount: 0,
        replyCount: 0,
        editMode: false,
      }
    },
    created(){
      if (this.me.info().uid !== this.uid) {
        window.location.href = "/404";
        return;
      }
      this.init();
    },
    methods: {
      init(){
        Net.get({
          url: Config.URL.account.profile,
          condition: {id: this.uid}
        }, (resp) => {
          this.profile = resp.profile[0];
          console.log(this.profile);
        });
        Net.get({
          url: Config.URL.creator.article_count,
          condition: {id: this.uid}
        }, (resp) => {
          this.articleCount = resp.result[this.uid];
        });
        Net.get({
          url: Config.URL.creator.reply_count,
          condition: {id: this.uid}
        }, (resp) => {
          this.replyCount = resp.result[this.uid];
        })
      },
      toggleEdit(){
        this.editMode = !this.editMode;
      },
      doneEdit(){
        //TODO http
        this.toggleEdit();
      }
    }
  }

</script>

<style scoped lang="less">
  .user-root {
    width: 1120px;
    margin: auto;
  }

  .base-info {
    display: flex;
    > div:nth-child(1) {
      width: 30%;
    }
    > div:nth-child(2) {
      width: 40%;
      i {
        text-align: right;
        width: 100%;
      }
    }
    i.email {
      display: inline-block;
      width: 30px;
      height: 25px;
      vertical-align: top;
      margin-top: 3px;
      background: url(../assets/img/email.png) no-repeat;
    }
  }

  .user-nav {
    position: relative;
    display: block;
    list-style: none;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 16px;
    line-height: 40px;
    padding: 0;
    width: auto;
    li {
      float: left;
      width: 100px;
      height: 40px;
      border: 1px solid #f1f1f1;
      position: relative;
      background-color: #f9fafa;
      cursor: pointer;
    }
    li:hover {
      color: #888;
    }
  }
</style>