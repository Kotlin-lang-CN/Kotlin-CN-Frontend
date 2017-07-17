<template>
  <div class="not-found">
    <h1><a href="/">{{title}}</a></h1>
    <p>{{body}}</p>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        title: window.location.hostname,
        body: '我们致力于提供最好的Kotlin中文教程, 共建最潮流的Kotlin中文社区',
      }
    },
    created() {
      if (!window.location.href.endsWith('/404')) {
        window.location.href = window.location.href.replace(window.location.hostname, 'blog.kotliner.cn')
      } else {
        this.body = '你来到什么都没有的处女地。'
      }
    }
  }
</script>
<style scoped lang="less">
  .not-found {
    color: #999;
    margin: 20% auto;
    text-align: center;
  }
</style>
