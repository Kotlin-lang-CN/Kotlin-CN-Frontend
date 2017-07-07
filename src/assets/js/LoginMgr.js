import Cookie from 'js-cookie';
import Event from './Event.js';

const LoginMgr = {

  info: function () {
    let uid = Cookie.get("X-App-UID");
    let username = Cookie.get("X-App-Name");
    let email = Cookie.get("X-App-Email");
    let token = Cookie.get("X-App-Token");
    let role = Cookie.get('X-App-Role');
    let logo = Cookie.get('X-App-Logo');
    if (uid && uid.length > 0
      && username && username.length > 0
      && email && email.length > 0
      && token && token.length > 0) {
      this.uid = uid;
      this.username = username;
      this.email = email;
      this.token = token;
      this.role = role;
      this.logo = logo;
      this.isLogin = true;
      this.isAdminRole = this.role === '1';
      return this
    } else {
      this.uid = undefined;
      this.username = undefined;
      this.email = undefined;
      this.token = undefined;
      this.role = undefined;
      this.logo = undefined;
      this.isLogin = false;
      this.isAdminRole = false;
      return this
    }
  },

  check: function (loginMode, guestMode) {
    let userInfo = this.info();
    if (userInfo.isLogin) {
      return loginMode ? loginMode(userInfo) : '';
    } else {
      return guestMode ? guestMode() : '';
    }
  },

  isAdmin: function () {
    const info = this.info();
    return info.isAdminRole
  },

  require: function (loginAlready, mode) {
    let info = this.info();
    if (info.isLogin) {
      loginAlready(info)
    } else {
      Event.emit(mode ? mode : 'request_login', loginAlready)
    }
  },

  login: function (data) {
    console.log(data);
    Cookie.set('X-App-Name', data.username);
    Cookie.set('X-App-Email', data.email);
    Cookie.set('X-App-UID', data.uid);
    Cookie.set('X-App-Token', data.token);
    Cookie.set('X-App-Role', data.role);
    Cookie.set('X-App-Logo', data.logo);
    Cookie.remove('X-App-Github');
    const info = this.info();
    Event.emit('login', info);
  },

  logout: function () {
    Cookie.remove('X-App-Email');
    Cookie.remove('X-App-Token');
    Cookie.remove('X-App-UID');
    Cookie.remove('X-App-Name');
    Cookie.remove('X-App-Role');
    Cookie.remove('X-App-Logo');
    Cookie.remove('X-App-Github');
    this.info();
    Event.emit('login', false);
  }

};

export default LoginMgr
