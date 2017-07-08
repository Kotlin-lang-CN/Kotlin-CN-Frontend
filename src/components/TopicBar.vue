<!-- icon refer to http://fontawesome.io/icons -->
<template>
  <div class="tab-root">
    <ul>
      <li v-for="value in select">
        <a :href="setting[value].link">
          <div class="logo">
            <i :class="setting[value].logo" :style="'color:' + setting[value].color"></i>
          </div>
          <div class="text"><b>{{ setting[value].title }}</b> <i class="pull-right fa fa-arrow-right"></i></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Config from "../assets/js/Config.js";

  export default {
    data() {
      return {
        setting: Config.Topic.data,
        select: Config.Topic.select
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-root {
    width: 1120px;
    height: 114px;
    margin-bottom: 20px;
    position: relative;

    ul {
      position: relative;
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
      width: auto;
      li {
        float: left;
        width: 22.5%;
        border: 1px solid #f1f1f1;
        position: relative;
        margin-right: 3%;
        background-color: #f9fafa;
        a {
          display: block;
        }
        > div {
          display: block;
        }
        .logo {
          height: 80px;
          line-height: 100px;
          i {
            color: #55a532;
            font-size: 38px;
          }
        }
        .text {
          height: 32px;
          line-height: 32px;
          background-color: #f2f2f3;
          text-align: left;
          padding-left: 16px;
          color: #666;
          i {
            float: right;
            font-size: 16px;
            margin-top: 7px;
            margin-right: 8px;
          }
        }
      }
      li:nth-last-child(1) {
        margin-right: 0;
      }
      li:hover {
        background-color: #e5e5e5;
        b {
          color: #888;
        }
      }
    }
  }
</style>