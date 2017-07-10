import page from 'page'
import routes from './router/routes'
import Event from './assets/js/Event.js'
import Vue from 'vue';
import MomentVue from './assets/js/Moment.js';
import ArrayMeta from './assets/js/Array';

Vue.config.productionTip = false;

MomentVue.init(Vue);
ArrayMeta.init();

//init router and create vue instance
(function (app) {
  function isMobile() {
    let ua = navigator.userAgent;
    return ua.match(/(Android)[\s\/]+([\d\.]+)/) !== null
      || ua.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/) !== null
      || ua.match(/(Windows\s+Phone)\s([\d\.]+)/) !== null;
  }

  Object.keys(routes).forEach(route => {
    page(route, (ctx) => {
        app.$root.params = ctx.params;
        app.ViewComponent = (function () {
          if (isMobile() && !route.startsWith("/m")) {
            app.renderTitle(routes[route].title);
            return require(routes[route].mobile + '.vue');
          } else {
            app.renderTitle(routes[route].title);
            return require(routes[route].pc + '.vue');
          }
        })();
        Event.emit('route-update');
      }
    )
  });
  page('*', () => app.ViewComponent = require('./views/404.vue'));
  page();
})(new Vue({
  el: '#app',
  data: {
    ViewComponent: {
      render: h => h('div', 'loading...')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  },
  methods: {
    renderTitle(title) {
      $("title").html(title);
    }
  }
}));
