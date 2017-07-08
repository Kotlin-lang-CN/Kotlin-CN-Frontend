<template>
  <img v-bind:src="this.logo" v-bind:class="{
    'middle' : avatarSize==='middle',
    'small' : avatarSize === 'small',
    'big' : avatarSize === 'big'
    }"></img>
</template>
<script>
  import md5 from 'md5'

  export default {
    data: function () {
      return {
        colors: ["#bdc0c5", "#c5d3e8", "#93a7c8", "#9baebe"],
        avatarSize: 'big',
        logo: '',
        color: ''
      }
    },
    props: {
      user: {
        'username': '',
        'email': '',
        'logo': ''
      },
      size: ''
    },
    mounted() {
      if (this.user.logo === '' && this.user.email !== '') {
        this.logo = 'https://s.gravatar.com/avatar/' + md5(this.user.email)
      } else {
        this.logo = this.user.logo
      }
      if (this.size === 'small' || this.size === 'middle') {
        this.avatarSize = this.size;
      }
    },
  }
</script>
<style scoped>
  .avatar {
    display: inline-block;
    color: white;
    text-align: center;
    font-style: normal;
    vertical-align: top;
    cursor: default;
  }

  .small {
    line-height: 32px;
    font-size: 15px;
    border-radius: 15px;
    width: 30px;
    min-width: 30px;
    height: 30px;
  }

  .middle {
    line-height: 49px;
    font-size: 24px;
    border-radius: 22px;
    width: 44px;
    min-width: 44px;
    height: 44px;
  }

  .big {
    line-height: 60px;
    font-size: 36px;
    border-radius: 30px;
    width: 60px;
    min-width: 60px;
    height: 60px;
  }
</style>
