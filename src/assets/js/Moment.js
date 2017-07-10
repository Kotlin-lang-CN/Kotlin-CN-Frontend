import moment from 'moment';

/***
 * init moments filter to vue
 */
const MomentVue = {
  init(Vue) {
    moment.locale('zh-cn');
    Vue.filter('moment', (value) => moment(value).fromNow());
  }
};

export default MomentVue;

