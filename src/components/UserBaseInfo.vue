<template>
  <div class="base-info">
    <div>
      <img class="logo" :src="logo"
           style="width:150px;height:150px;" width="150" height="150"/>
      <h2>{{ me.info().username }} <a :href="'mailto:'+ me.info().email "><i class="email"></i></a></h2>
      <div>文章数{{articleCount}},回帖数{{replyCount}}</div>
    </div>
    <div>
      <div class="edit">
        <i class="fa fa-edit" v-if="!editMode" v-on:click="toggleEdit"><span>编辑</span></i>
        <i class="fa fa-check-square-o" v-if="editMode" v-on:click="doneEdit"><span>确认</span></i>
      </div>
      <table>
        <tr>
          <th>邮箱</th>
          <td>{{me.info().email}}</td>
          <!--
          <td v-if="!editMode">{{me.info().email}}</td>
          <td v-if="editMode"><input title="email" v-model="edit_email"/></td>
          -->
        </tr>
        <tr>
          <th>博客</th>
          <td v-if="!editMode">{{profile.blog}}</td>
          <td v-if="editMode"><input title="blog" v-model="edit.blog"/></td>
        </tr>
        <tr>
          <th>公司</th>
          <td v-if="!editMode">{{profile.company}}</td>
          <td v-if="editMode"><input title="company" v-model="edit.company"/></td>
        </tr>
        <tr>
          <th>教育</th>
          <td v-if="!editMode">{{profile.education}}</td>
          <td v-if="editMode"><input title="education" v-model="edit.education"/></td>
        </tr>
        <tr>
          <th>github</th>
          <td v-if="!editMode">{{profile.github}}</td>
          <td v-if="editMode"><input title="github" v-model="edit.github"/></td>
        </tr>
        <tr>
          <th>位置</th>
          <td v-if="!editMode">{{profile.location}}</td>
          <td v-if="editMode"><input title="location" v-model="edit.location"/></td>
        </tr>
        <tr>
          <th>个人说明</th>
          <td v-if="!editMode">{{profile.description}}</td>
          <td v-if="editMode"><input title="description" v-model="edit.description"/></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import LoginMgr from '../assets/js/LoginMgr.js';
  import Config from '../assets/js/Config.js';
  import Net from '../assets/js/Net.js';
  import md5 from 'md5'

  export default {
    data() {
      return {
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
        edit_email: LoginMgr.info().email,
        edit: {
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
    props: {
      uid: '',
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        Net.get({
          url: Config.URL.account.profile,
          condition: {id: this.uid}
        }, (resp) => {
          this.profile = resp.profile[0];
          this.edit = this.clone(this.profile);
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
        });
      },
      toggleEdit(){
        this.editMode = !this.editMode;
      },
      doneEdit(){
        if (this.edit.blog !== this.profile.blog
          || this.edit.blog !== this.profile.blog
          || this.edit.company !== this.profile.company
          || this.edit.description !== this.profile.description
          || this.edit.education !== this.profile.education
          || this.edit.github !== this.profile.github
          || this.edit.location !== this.profile.location) {

          window.layer.load();
          Net.post({
            url: Config.URL.account.profile_update,
            condition: this.edit
          }, () => {
            this.profile = this.clone(this.edit);
            window.layer.closeAll();
            this.toggleEdit();
          }, (msg) => {
            window.layer.closeAll();
            window.layer.msg(msg);
          });
        } else {
          this.toggleEdit();
        }
      },
      clone(obj){
        if (null === obj || "object" !== typeof obj) return obj;
        let copy = obj.constructor();
        for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
      }
    },
    computed: {
      logo() {
        if ((!LoginMgr.logo || LoginMgr.logo === '') && LoginMgr.email !== '') {
          return 'https://s.gravatar.com/avatar/' + md5(LoginMgr.email)
        } else {
          return LoginMgr.logo
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .base-info {
    border: 1px #f1f1f1 solid;
    padding: 20px;
    display: flex;

    .edit {
      float: right;
      cursor: pointer;
      margin-right: 10%;
    }

    > div:nth-child(1) {
      width: 30%;
    }
    > div:nth-child(2) {
      text-align: left;
      width: 70%;
      th {
        width: 30%;
      }
      td {
        word-break: break-all;
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
</style>
