<template>
  <div class="reply-list-root">
    <ul>
      <li v-for="value in reply">
        <div v-on:click.stop="showUser(value.user)" class="name-card">
          <app-avatar :size="'middle'" :user.sync="value.user"></app-avatar>
        </div>
        <div class="cont">
          <div>
            <b v-on:click.stop="showUser(value.user)" class="name-card user-link">{{ value.user.username }}</b>
            <span v-if="value.alias">回复
              <b class="name-card user-reply" v-on:click.stop="showUser(value.alias)"> {{ value.alias.username }}</b>
            </span>
            <span>{{ value.meta.create_time | moment}}</span>
            <small v-if="showReply(value) && value.meta.state == 0" v-on:click="doReply(value)" class="btn-reply">
              回复
            </small>
            <small v-if="showDelete(value) && value.meta.state == 0" v-on:click="deleteReply(value)" class="btn-delete">
              删除
            </small>
            <select v-on:change="updateState(value.meta)" v-model="value.meta.state" class="right"
                    v-if="me.isAdminRole">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <span v-if="value.meta.state == 1 && !me.isAdminRole">#该评论内容涉嫌违规已被冻结, 申诉请联系管理员#</span>
          <span v-if="value.meta.state == 2 && !me.isAdminRole">#该评论已被删除#</span>
          <display-panels v-if="value.meta.state == 0 || me.isAdminRole" :content="value.content.content">
          </display-panels>
        </div>
      </li>
    </ul>
    <button class="more" v-on:click="loadMore" v-if="hasMore">加载更多</button>
    <reply-dialog></reply-dialog>
  </div>
</template>

<script>
  import DisplayPanels from './DisplayPanels.vue';
  import Avatar from './Avatar.vue';
  import ReplyDialog from './ReplyDialog.vue';

  import Event from '../assets/js/Event.js';
  import Net from '../assets/js/Net.js';
  import Config from '../assets/js/Config.js';
  import LoginMgr from '../assets/js/LoginMgr.js';

  export default {
    data() {
      return {
        me: LoginMgr,
        offset: 0,
        hasMore: true,
        reply: [],
        options: [{text: '正常', value: 0}, {text: '冻结', value: 1}, {text: '删除', value: 2}],
      }
    },
    components: {
      ReplyDialog,
      'display-panels': DisplayPanels,
      'app-avatar': Avatar,
      'reply-dialog': ReplyDialog,
    },
    props: {
      articleId: '',
    },
    created(){
      this.getReply(0);
      Event.on('comment-change', () => this.getReply(0));
      Event.on('reply-refresh', () => this.getReply(0));
      Event.on('login', () => {
        if (this.isAdminRole) this.getReply(0);
      });
    },
    watch: {
      articleId(newId, oldId) {
        window.console.log(newId);
        this.getReply(0, newId)
      }
    },
    methods: {
      requestUrl(aid) {
        return Config.URL.reply.article.format(aid ? aid : this.articleId)
      },
      getReply(index, aid) {
        const limit = 20;
        Net.get({
          url: this.requestUrl(aid),
          condition: {
            offset: index,
            limit: limit
          }
        }, (resp) => {
          let list = resp.reply;
          this.offset = resp.next_offset;
          this.hasMore = list.length >= limit;
          if (index === 0) this.reply = [];
          this.reply = this.reply.concat(list);
        })
      },
      loadMore() {
        this.getReply(this.offset);
      },
      updateState(reply) {
        Net.post({
          url: Config.URL.admin.updateReplyState.format(reply.id),
          condition: {
            state: reply.state
          },
        }, () => window.console.log("success!"), () => this.get(this.requestUrl(), 0))
      },
      showDelete(reply) {
        return !LoginMgr.isAdminRole && LoginMgr.isLogin && LoginMgr.uid === reply.user.uid
      },
      showReply(reply) {
        return LoginMgr.isLogin && LoginMgr.uid !== reply.user.uid
      },
      deleteReply(reply) {
        Event.emit('alert', {
          title: '删除评论',
          text: '确认删除该评论?',
          allow_dismiss: true,
          confirm: {
            text: '确定',
            action: () =>
              Net.post({
                url: Config.URL.reply.delete.format(reply.meta.id)
              }, () => reply.meta.state = 2)
          },
          cancel: {
            text: '取消',
            action: () => false
          },
        })
      },
      doReply(reply) {
        Event.emit('reply-to-user', {user: reply.user, id: this.articleId})
      },
      showUser(user) {
        Event.emit('name-card', user)
      }
    }
  }

</script>

<style scoped lang="less">
  .reply-list-root {
    ul {
      border: 1px #e1e1e1 solid;
      background-color: #fcfcfe;
      text-align: left;
      padding: 0;
      margin: 0;
      li:nth-last-child(1) {
        border-bottom: 0;
      }
      li {
        border-bottom: 1px #f1f1f1 solid;
        padding: 16px 20px;
        display: flex;
        span {
          font-size: 12px;
          color: #999;
          display: inline-block;
          margin-right: 4px;
        }
        .user-link {
          color: #333;
          font-size: 15px;
        }
        .user-reply {
          color: #333;
          font-size: 15px;
        }
        .cont {
          margin-left: 8px;
          width: 90%;
        }
      }
      .more {
        background-color: #f2f7fd;
        outline: none;
        border: 1px #6ba0f1 solid;
        border-radius: 4px;
        display: block;
        text-align: center;
        height: 50px;
        line-height: 46px;
        padding: 0;
        width: 100%;
        color: #6ba0f1;
        font-size: 16px;
      }
      li:hover .btn-delete {
        display: inline-block;
      }
      .btn-delete {
        color: red;
        display: none;
        cursor: pointer;
      }
      li:hover .btn-reply {
        display: inline-block;
      }
      .btn-reply {
        color: #6ba0f1;
        display: none;
        cursor: pointer;
      }
      .name-card {
        cursor: pointer;
      }
    }
  }
</style>