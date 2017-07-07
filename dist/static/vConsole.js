/*!
 * vconsole v2.5.3-dev (https://github.com/WechatFE/vConsole)
 * Copyright 2017, WechatFE Team
 * MIT license
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["vConsole"] = factory();
  else
    root["vConsole"] = factory();
})(this, function() {
  return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};

    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {

      /******/ 		// Check if module is in cache
      /******/ 		if(installedModules[moduleId])
      /******/ 			return installedModules[moduleId].exports;

      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		var module = installedModules[moduleId] = {
        /******/ 			exports: {},
        /******/ 			id: moduleId,
        /******/ 			loaded: false
        /******/ 		};

      /******/ 		// Execute the module function
      /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

      /******/ 		// Flag the module as loaded
      /******/ 		module.loaded = true;

      /******/ 		// Return the exports of the module
      /******/ 		return module.exports;
      /******/ 	}


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
  /************************************************************************/
  /******/ ([
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _core = __webpack_require__(1);

      var _core2 = _interopRequireDefault(_core);

      var _plugin = __webpack_require__(15);

      var _plugin2 = _interopRequireDefault(_plugin);

      var _default = __webpack_require__(16);

      var _default2 = _interopRequireDefault(_default);

      var _system = __webpack_require__(23);

      var _system2 = _interopRequireDefault(_system);

      var _network = __webpack_require__(25);

      var _network2 = _interopRequireDefault(_network);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      // here we go
      var vConsole = new _core2.default();
      // built-in tabs
      /**
       * A Front-End Console Panel for Mobile Webpage
       *
       * @author WechatFE
       */

        // classes


      var defaultTab = new _default2.default('default', 'Log');
      vConsole.addPlugin(defaultTab);

      var systemTab = new _system2.default('system', 'System');
      vConsole.addPlugin(systemTab);

      var networkTab = new _network2.default('network', 'Network');
      vConsole.addPlugin(networkTab);

      // export
      vConsole.VConsolePlugin = _plugin2.default;
      exports.default = vConsole;
      module.exports = exports['default'];

      /***/ },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
       * vConsole core class
       *
       * @author WechatFE
       */

      var _package = __webpack_require__(2);

      var _package2 = _interopRequireDefault(_package);

      var _tool = __webpack_require__(3);

      var tool = _interopRequireWildcard(_tool);

      var _query = __webpack_require__(4);

      var _query2 = _interopRequireDefault(_query);

      __webpack_require__(6);

      var _core = __webpack_require__(10);

      var _core2 = _interopRequireDefault(_core);

      var _tabbar = __webpack_require__(11);

      var _tabbar2 = _interopRequireDefault(_tabbar);

      var _tabbox = __webpack_require__(12);

      var _tabbox2 = _interopRequireDefault(_tabbox);

      var _topbar_item = __webpack_require__(13);

      var _topbar_item2 = _interopRequireDefault(_topbar_item);

      var _tool_item = __webpack_require__(14);

      var _tool_item2 = _interopRequireDefault(_tool_item);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      var VConsole = function () {
        function VConsole() {
          _classCallCheck(this, VConsole);

          var that = this;

          this.version = _package2.default.version;
          this.html = _core2.default;
          this.$dom = null;
          this.activedTab = '';
          this.tabList = [];
          this.pluginList = {};
          this.isReady = false;
          this.switchPos = {
            x: 10, // right
            y: 10, // bottom
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
          };

          // export helper functions to public
          this.tool = tool;
          this.$ = _query2.default;

          var _onload = function _onload() {
            that._render();
            that._mockTap();
            that._bindEvent();
            that._autoRun();
          };
          if (document !== undefined) {
            if (document.readyState == 'complete') {
              _onload();
            } else {
              _query2.default.bind(window, 'load', _onload);
            }
          } else {
            (function () {
              // if document does not exist, wait for it
              var _timer = void 0;
              var _pollingDocument = function _pollingDocument() {
                if (document && document.readyState == 'complete') {
                  _timer && clearTimeout(_timer);
                  _onload();
                } else {
                  _timer = setTimeout(_pollingDocument, 1);
                }
              };
              _timer = setTimeout(_pollingDocument, 1);
            })();
          }
        }

        /**
         * render panel DOM
         * @private
         */


        _createClass(VConsole, [{
          key: '_render',
          value: function _render() {
            var id = '#__vconsole';
            if (!_query2.default.one(id)) {
              var e = document.createElement('div');
              e.innerHTML = this.html;
              document.documentElement.insertAdjacentElement('beforeend', e.children[0]);
            }
            this.$dom = _query2.default.one(id);

            // reposition switch button
            var $switch = _query2.default.one('.vc-switch', this.$dom);
            var switchX = tool.getStorage('switch_x') * 1,
              switchY = tool.getStorage('switch_y') * 1;
            if (switchX || switchY) {
              // check edge
              if (switchX + $switch.offsetWidth > document.documentElement.offsetWidth) {
                switchX = document.documentElement.offsetWidth - $switch.offsetWidth;
              }
              if (switchY + $switch.offsetHeight > document.documentElement.offsetHeight) {
                switchY = document.documentElement.offsetHeight - $switch.offsetHeight;
              }
              if (switchX < 0) {
                switchX = 0;
              }
              if (switchY < 0) {
                switchY = 0;
              }
              this.switchPos.x = switchX;
              this.switchPos.y = switchY;
              _query2.default.one('.vc-switch').style.right = switchX + 'px';
              _query2.default.one('.vc-switch').style.bottom = switchY + 'px';
            }

            // remove from less to present transition effect
            _query2.default.one('.vc-mask', this.$dom).style.display = 'none';
          }
        }, {
          key: '_mockTap',


          /**
           * simulate tap event by touchstart & touchend
           * @private
           */
          value: function _mockTap() {
            var tapTime = 700,
              // maximun tap interval
              tapBoundary = 10; // max tap move distance

            var lastTouchStartTime = void 0,
              touchstartX = void 0,
              touchstartY = void 0,
              touchHasMoved = false,
              targetElem = null;

            this.$dom.addEventListener('touchstart', function (e) {
              // todo: if double click
              if (lastTouchStartTime === undefined) {
                var touch = e.targetTouches[0];
                touchstartX = touch.pageX;
                touchstartY = touch.pageY;
                lastTouchStartTime = e.timeStamp;
                targetElem = e.target.nodeType === Node.TEXT_NODE ? e.target.parentNode : e.target;
              }
            }, false);

            this.$dom.addEventListener('touchmove', function (e) {
              var touch = e.changedTouches[0];
              if (Math.abs(touch.pageX - touchstartX) > tapBoundary || Math.abs(touch.pageY - touchstartY) > tapBoundary) {
                touchHasMoved = true;
              }
            });

            this.$dom.addEventListener('touchend', function (e) {
              // move and time within limits, manually trigger `click` event
              if (touchHasMoved === false && e.timeStamp - lastTouchStartTime < tapTime && targetElem != null) {
                var tagName = targetElem.tagName.toLowerCase(),
                  needFocus = false;
                switch (tagName) {
                  case 'textarea':
                    // focus
                    needFocus = true;break;
                  case 'input':
                    switch (targetElem.type) {
                      case 'button':
                      case 'checkbox':
                      case 'file':
                      case 'image':
                      case 'radio':
                      case 'submit':
                        needFocus = false;break;
                      default:
                        needFocus = !targetElem.disabled && !targetElem.readOnly;
                    }
                  default:
                    break;
                }
                if (needFocus) {
                  targetElem.focus();
                } else {
                  e.preventDefault(); // prevent click 300ms later
                }
                var touch = e.changedTouches[0];
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                event.forwardedTouchEvent = true;
                event.initEvent('click', true, true);
                targetElem.dispatchEvent(event);
              }

              // reset values
              lastTouchStartTime = undefined;
              touchHasMoved = false;
              targetElem = null;
            }, false);
          }
          /**
           * bind DOM events
           * @private
           */

        }, {
          key: '_bindEvent',
          value: function _bindEvent() {
            var that = this;

            // drag & drop switch button
            var $switch = _query2.default.one('.vc-switch', that.$dom);
            _query2.default.bind($switch, 'touchstart', function (e) {
              that.switchPos.startX = e.touches[0].pageX;
              that.switchPos.startY = e.touches[0].pageY;
            });
            _query2.default.bind($switch, 'touchend', function (e) {
              that.switchPos.x = that.switchPos.endX;
              that.switchPos.y = that.switchPos.endY;
              that.switchPos.startX = 0;
              that.switchPos.startY = 0;
              that.switchPos.endX = 0;
              that.switchPos.endY = 0;
              tool.setStorage('switch_x', that.switchPos.x);
              tool.setStorage('switch_y', that.switchPos.y);
            });
            _query2.default.bind($switch, 'touchmove', function (e) {
              if (e.touches.length > 0) {
                var offsetX = e.touches[0].pageX - that.switchPos.startX,
                  offsetY = e.touches[0].pageY - that.switchPos.startY;
                var x = that.switchPos.x - offsetX,
                  y = that.switchPos.y - offsetY;
                // check edge
                if (x + $switch.offsetWidth > document.documentElement.offsetWidth) {
                  x = document.documentElement.offsetWidth - $switch.offsetWidth;
                }
                if (y + $switch.offsetHeight > document.documentElement.offsetHeight) {
                  y = document.documentElement.offsetHeight - $switch.offsetHeight;
                }
                if (x < 0) {
                  x = 0;
                }
                if (y < 0) {
                  y = 0;
                }
                $switch.style.right = x + 'px';
                $switch.style.bottom = y + 'px';
                that.switchPos.endX = x;
                that.switchPos.endY = y;
                e.preventDefault();
              }
            });

            // show console panel
            _query2.default.bind(_query2.default.one('.vc-switch', that.$dom), 'click', function () {
              that.show();
            });

            // hide console panel
            _query2.default.bind(_query2.default.one('.vc-hide', that.$dom), 'click', function () {
              that.hide();
            });

            // hide console panel when tap background mask
            _query2.default.bind(_query2.default.one('.vc-mask', that.$dom), 'click', function (e) {
              if (e.target != _query2.default.one('.vc-mask')) {
                return false;
              }
              that.hide();
            });

            // show tab box
            _query2.default.delegate(_query2.default.one('.vc-tabbar', that.$dom), 'click', '.vc-tab', function (e) {
              var tabName = this.dataset.tab;
              if (tabName == that.activedTab) {
                return;
              }
              that.showTab(tabName);
            });

            // after console panel, trigger a transitionend event to make panel's property 'display' change from 'block' to 'none'
            _query2.default.bind(_query2.default.one('.vc-panel', that.$dom), 'transitionend webkitTransitionEnd oTransitionEnd otransitionend', function (e) {
              if (e.target != _query2.default.one('.vc-panel')) {
                return false;
              }
              if (!_query2.default.hasClass(that.$dom, 'vc-toggle')) {
                e.target.style.display = 'none';
              }
            });

            // disable background scrolling
            var $content = _query2.default.one('.vc-content', that.$dom);
            var preventMove = false;
            _query2.default.bind($content, 'touchstart', function (e) {
              var top = $content.scrollTop,
                totalScroll = $content.scrollHeight,
                currentScroll = top + $content.offsetHeight;
              if (top === 0) {
                // when content is on the top,
                // reset scrollTop to lower position to prevent iOS apply scroll action to background
                $content.scrollTop = 1;
                // however, when content's height is less than its container's height,
                // scrollTop always equals to 0 (it is always on the top),
                // so we need to prevent scroll event manually
                if ($content.scrollTop === 0) {
                  if (!_query2.default.hasClass(e.target, 'vc-cmd-input')) {
                    // skip input
                    preventMove = true;
                  }
                }
              } else if (currentScroll === totalScroll) {
                // when content is on the bottom,
                // do similar processing
                $content.scrollTop = top - 1;
                if ($content.scrollTop === top) {
                  if (!_query2.default.hasClass(e.target, 'vc-cmd-input')) {
                    preventMove = true;
                  }
                }
              }
            });

            _query2.default.bind($content, 'touchmove', function (e) {
              if (preventMove) {
                e.preventDefault();
              }
            });

            _query2.default.bind($content, 'touchend', function (e) {
              preventMove = false;
            });
          }
        }, {
          key: '_autoRun',


          /**
           * auto run after initialization
           * @private
           */
          value: function _autoRun() {
            this.isReady = true;

            // init plugins
            for (var id in this.pluginList) {
              this._initPlugin(this.pluginList[id]);
            }

            // show first tab
            if (this.tabList.length > 0) {
              this.showTab(this.tabList[0]);
            }
          }

          /**
           * init a plugin
           * @private
           */

        }, {
          key: '_initPlugin',
          value: function _initPlugin(plugin) {
            var that = this;
            // start init
            plugin.trigger('init');
            // render tab (if it is a tab plugin then it should has tab-related events)
            plugin.trigger('renderTab', function (tabboxHTML) {
              // add to tabList
              that.tabList.push(plugin.id);
              // render tabbar
              var $tabbar = _query2.default.render(_tabbar2.default, { id: plugin.id, name: plugin.name });
              _query2.default.one('.vc-tabbar', that.$dom).insertAdjacentElement('beforeend', $tabbar);
              // render tabbox
              var $tabbox = _query2.default.render(_tabbox2.default, { id: plugin.id });
              if (!!tabboxHTML) {
                if (tool.isString(tabboxHTML)) {
                  $tabbox.innerHTML += tabboxHTML;
                } else if (tool.isFunction(tabboxHTML.appendTo)) {
                  tabboxHTML.appendTo($tabbox);
                } else if (tool.isElement(tabboxHTML)) {
                  $tabbox.insertAdjacentElement('beforeend', tabboxHTML);
                }
              }
              _query2.default.one('.vc-content', that.$dom).insertAdjacentElement('beforeend', $tabbox);
            });
            // render top bar
            plugin.trigger('addTopBar', function (btnList) {
              if (!btnList) {
                return;
              }
              var $topbar = _query2.default.one('.vc-topbar', that.$dom);

              var _loop = function _loop(i) {
                var item = btnList[i];
                var $item = _query2.default.render(_topbar_item2.default, {
                  name: item.name || 'Undefined',
                  className: item.className || '',
                  pluginID: plugin.id
                });
                if (item.data) {
                  for (var k in item.data) {
                    $item.dataset[k] = item.data[k];
                  }
                }
                if (tool.isFunction(item.onClick)) {
                  _query2.default.bind($item, 'click', function (e) {
                    var enable = item.onClick.call($item);
                    if (enable === false) {
                      // do nothing
                    } else {
                      _query2.default.removeClass(_query2.default.all('.vc-topbar-' + plugin.id), 'vc-actived');
                      _query2.default.addClass($item, 'vc-actived');
                    }
                  });
                }
                $topbar.insertAdjacentElement('beforeend', $item);
              };

              for (var i = 0; i < btnList.length; i++) {
                _loop(i);
              }
            });
            // render tool bar
            plugin.trigger('addTool', function (toolList) {
              if (!toolList) {
                return;
              }
              var $defaultBtn = _query2.default.one('.vc-tool-last');

              var _loop2 = function _loop2(i) {
                var item = toolList[i];
                var $item = _query2.default.render(_tool_item2.default, {
                  name: item.name || 'Undefined',
                  pluginID: plugin.id
                });
                if (item.global == true) {
                  _query2.default.addClass($item, 'vc-global-tool');
                }
                if (tool.isFunction(item.onClick)) {
                  _query2.default.bind($item, 'click', function (e) {
                    item.onClick.call($item);
                  });
                }
                $defaultBtn.parentNode.insertBefore($item, $defaultBtn);
              };

              for (var i = 0; i < toolList.length; i++) {
                _loop2(i);
              }
            });
            // end init
            plugin.trigger('ready');
          }

          /**
           * trigger an event for each plugin
           * @private
           */

        }, {
          key: '_triggerPluginsEvent',
          value: function _triggerPluginsEvent(eventName) {
            for (var id in this.pluginList) {
              this.pluginList[id].trigger(eventName);
            }
          }

          /**
           * trigger an event by plugin's name
           * @private
           */

        }, {
          key: '_triggerPluginEvent',
          value: function _triggerPluginEvent(pluginName, eventName) {
            var plugin = this.pluginList[pluginName];
            if (plugin) {
              plugin.trigger(eventName);
            }
          }

          /**
           * add a new plugin
           * @public
           * @param object VConsolePlugin object
           * @return boolean
           */

        }, {
          key: 'addPlugin',
          value: function addPlugin(plugin) {
            // ignore this plugin if it has already been installed
            if (this.pluginList[plugin.id] !== undefined) {
              console.warn('Plugin ' + plugin.id + ' has already been added.');
              return false;
            }
            this.pluginList[plugin.id] = plugin;
            // init plugin only if vConsole is ready
            if (this.isReady) {
              this._initPlugin(plugin);
              // if it's the first plugin, show it by default
              if (this.tabList.length == 1) {
                this.showTab(this.tabList[0]);
              }
            }
            return true;
          }

          /**
           * remove a plugin
           * @public
           * @param string pluginID
           * @return boolean
           */

        }, {
          key: 'removePlugin',
          value: function removePlugin(pluginID) {
            pluginID = (pluginID + '').toLowerCase();
            var plugin = this.pluginList[pluginID];
            // skip if is has not been installed
            if (plugin === undefined) {
              console.warn('Plugin ' + pluginID + ' does not exist.');
              return false;
            }
            // trigger `remove` event before uninstall
            plugin.trigger('remove');
            // the plugin will not be initialized before vConsole is ready,
            // so the plugin does not need to handle DOM-related actions in this case
            if (this.isReady) {
              var $tabbar = _query2.default.one('#__vc_tab_' + pluginID);
              $tabbar && $tabbar.parentNode.removeChild($tabbar);
              // remove topbar
              var $topbar = _query2.default.all('.vc-topbar-' + pluginID, this.$dom);
              for (var i = 0; i < $topbar.length; i++) {
                $topbar[i].parentNode.removeChild($topbar[i]);
              }
              // remove content
              var $content = _query2.default.one('#__vc_log_' + pluginID);
              $content && $content.parentNode.removeChild($content);
              // remove tool bar
              var $toolbar = _query2.default.all('.vc-tool-' + pluginID, this.$dom);
              for (var _i = 0; _i < $toolbar.length; _i++) {
                $toolbar[_i].parentNode.removeChild($toolbar[_i]);
              }
            }
            // remove plugin from list
            var index = this.tabList.indexOf(pluginID);
            if (index > -1) {
              this.tabList.splice(index, 1);
            }
            try {
              delete this.pluginList[pluginID];
            } catch (e) {
              this.pluginList[pluginID] = undefined;
            }
            // show the first plugin by default
            if (this.activedTab == pluginID) {
              if (this.tabList.length > 0) {
                this.showTab(this.tabList[0]);
              }
            }
            return true;
          }

          /**
           * show console panel
           * @public
           */

        }, {
          key: 'show',
          value: function show() {
            var that = this;
            // before show console panel,
            // trigger a transitionstart event to make panel's property 'display' change from 'none' to 'block'
            var $panel = _query2.default.one('.vc-panel', this.$dom);
            $panel.style.display = 'block';

            // set 10ms delay to fix confict between display and transition
            setTimeout(function () {
              _query2.default.addClass(that.$dom, 'vc-toggle');
              that._triggerPluginsEvent('showConsole');
              var $mask = _query2.default.one('.vc-mask', that.$dom);
              $mask.style.display = 'block';
            }, 10);
          }

          /**
           * hide console paneldocument.body.scrollTop
           * @public
           */

        }, {
          key: 'hide',
          value: function hide() {
            _query2.default.removeClass(this.$dom, 'vc-toggle');
            this._triggerPluginsEvent('hideConsole');

            var $mask = _query2.default.one('.vc-mask', this.$dom),
              $panel = _query2.default.one('.vc-panel', this.$dom);
            _query2.default.bind($mask, 'transitionend', function (evnet) {
              $mask.style.display = 'none';
              $panel.style.display = 'none';
            });
          }

          /**
           * show a tab
           * @public
           */

        }, {
          key: 'showTab',
          value: function showTab(tabID) {
            var $logbox = _query2.default.one('#__vc_log_' + tabID);
            // set actived status
            _query2.default.removeClass(_query2.default.all('.vc-tab', this.$dom), 'vc-actived');
            _query2.default.addClass(_query2.default.one('#__vc_tab_' + tabID), 'vc-actived');
            _query2.default.removeClass(_query2.default.all('.vc-logbox', this.$dom), 'vc-actived');
            _query2.default.addClass($logbox, 'vc-actived');
            // show topbar
            var $curTopbar = _query2.default.all('.vc-topbar-' + tabID, this.$dom);
            _query2.default.removeClass(_query2.default.all('.vc-toptab', this.$dom), 'vc-toggle');
            _query2.default.addClass($curTopbar, 'vc-toggle');
            if ($curTopbar.length > 0) {
              _query2.default.addClass(_query2.default.one('.vc-content', this.$dom), 'vc-has-topbar');
            } else {
              _query2.default.removeClass(_query2.default.one('.vc-content', this.$dom), 'vc-has-topbar');
            }
            // show toolbar
            _query2.default.removeClass(_query2.default.all('.vc-tool', this.$dom), 'vc-toggle');
            _query2.default.addClass(_query2.default.all('.vc-tool-' + tabID, this.$dom), 'vc-toggle');
            // trigger plugin event
            this._triggerPluginEvent(this.activedTab, 'hide');
            this.activedTab = tabID;
            this._triggerPluginEvent(this.activedTab, 'show');
          }
        }]);

        return VConsole;
      }(); // END class

      exports.default = VConsole;
      module.exports = exports['default'];

      /***/ },
    /* 2 */
    /***/ function(module, exports) {

      module.exports = {
        "name": "vconsole",
        "version": "2.5.3-dev",
        "description": "A lightweight, extendable front-end developer tool for mobile web page.",
        "homepage": "https://github.com/WechatFE/vConsole",
        "main": "dist/vconsole.min.js",
        "scripts": {
          "test": "mocha",
          "dist": "webpack && npm test"
        },
        "keywords": [
          "console",
          "debug",
          "mobile"
        ],
        "repository": {
          "type": "git",
          "url": "git+https://github.com/WechatFE/vConsole.git"
        },
        "dependencies": {},
        "devDependencies": {
          "babel-core": "^6.7.7",
          "babel-loader": "^6.2.4",
          "babel-plugin-add-module-exports": "^0.1.4",
          "babel-preset-es2015": "^6.6.0",
          "babel-preset-stage-3": "^6.5.0",
          "chai": "^3.5.0",
          "css-loader": "^0.23.1",
          "extract-text-webpack-plugin": "^1.0.1",
          "html-loader": "^0.4.3",
          "jsdom": "^9.2.1",
          "json-loader": "^0.5.4",
          "less": "^2.5.3",
          "less-loader": "^2.2.3",
          "mocha": "^2.5.3",
          "style-loader": "^0.13.1",
          "webpack": "~1.12.11"
        },
        "author": "WechatFE Team",
        "license": "MIT"
      };

      /***/ },
    /* 3 */
    /***/ function(module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

      exports.getDate = getDate;
      exports.isNumber = isNumber;
      exports.isString = isString;
      exports.isArray = isArray;
      exports.isBoolean = isBoolean;
      exports.isUndefined = isUndefined;
      exports.isNull = isNull;
      exports.isSymbol = isSymbol;
      exports.isObject = isObject;
      exports.isFunction = isFunction;
      exports.isElement = isElement;
      exports.isPlainObject = isPlainObject;
      exports.htmlEncode = htmlEncode;
      exports.JSONStringify = JSONStringify;
      exports.getObjAllKeys = getObjAllKeys;
      exports.getObjName = getObjName;
      exports.setStorage = setStorage;
      exports.getStorage = getStorage;
      /**
       * Utility Functions
       *
       * @author WechatFE
       */

      /**
       * get formatted date by timestamp
       * @param  int    time
       * @return  object
       */
      function getDate(time) {
        var d = time > 0 ? new Date(time) : new Date();
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
          month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
          year = d.getFullYear(),
          hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
          minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
          second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
          millisecond = d.getMilliseconds() < 10 ? '0' + d.getMilliseconds() : d.getMilliseconds();
        if (millisecond < 100) {
          millisecond = '0' + millisecond;
        }
        return {
          time: +d,
          year: year,
          month: month,
          day: day,
          hour: hour,
          minute: minute,
          second: second,
          millisecond: millisecond
        };
      }

      /**
       * determines whether the passed value is a specific type
       * @param mixed value
       * @return boolean
       */
      function isNumber(value) {
        return Object.prototype.toString.call(value) == '[object Number]';
      }
      function isString(value) {
        return Object.prototype.toString.call(value) == '[object String]';
      }
      function isArray(value) {
        return Object.prototype.toString.call(value) == '[object Array]';
      }
      function isBoolean(value) {
        return Object.prototype.toString.call(value) == '[object Boolean]';
      }
      function isUndefined(value) {
        return Object.prototype.toString.call(value) == '[object Undefined]';
      }
      function isNull(value) {
        return Object.prototype.toString.call(value) == '[object Null]';
      }
      function isSymbol(value) {
        return Object.prototype.toString.call(value) == '[object Symbol]';
      }
      function isObject(value) {
        return Object.prototype.toString.call(value) == '[object Object]' ||
          // if it isn't a primitive value, then it is a common object
          !isNumber(value) && !isString(value) && !isBoolean(value) && !isArray(value) && !isNull(value) && !isFunction(value) && !isUndefined(value) && !isSymbol(value);
      }
      function isFunction(value) {
        return Object.prototype.toString.call(value) == '[object Function]';
      }
      function isElement(value) {
        return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? value instanceof HTMLElement : //DOM2
          value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string";
      }

      /**
       * check whether an object is plain (using {})
       * @param object obj
       * @return boolean
       */
      function isPlainObject(obj) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // Must be an Object.
        if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj.nodeType || isWindow(obj)) {
          return false;
        }
        try {
          if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
          }
        } catch (e) {
          return false;
        }
        var key = void 0;
        for (key in obj) {}
        return key === undefined || hasOwn.call(obj, key);
      }

      /**
       * HTML encode a string
       * @param string text
       * @return string
       */
      function htmlEncode(text) {
        return document.createElement('a').appendChild(document.createTextNode(text)).parentNode.innerHTML;
      }

      /**
       * JSON stringify, support circular structure
       */
      function JSONStringify(obj) {
        var json = '',
          lv = 0;

        // use a map to track parent relationship
        var objMap = [];
        function _hasSameParentAsChild(child) {
          // find upper item which child is equal to this child
          for (var i = objMap.length - 1; i >= 0; i--) {
            if (objMap[i].child == child) {
              return true;
            }
          }
          return false;
        }

        function _iterateObj(val) {
          if (isObject(val)) {
            // object
            if (_hasSameParentAsChild(val)) {
              // this object is circular, skip it
              json += "CircularObject";
              return;
            }
            objMap.push({ parent: parent, child: val });

            var keys = Object.keys(val);
            json += "{";
            lv++;
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i];
              if (val.hasOwnProperty && !val.hasOwnProperty(k)) {
                continue;
              }
              json += k + ': ';
              _iterateObj(val[k], val);
              if (i < keys.length - 1) {
                json += ', ';
              }
            }
            lv--;
            json += '}';

            objMap.pop();
          } else if (isArray(val)) {
            // array
            if (_hasSameParentAsChild(val)) {
              // this array is circular, skip it
              json += "CircularArray";
              return;
            }
            objMap.push({ parent: parent, child: val });

            json += '[';
            lv++;
            for (var _i = 0; _i < val.length; _i++) {
              _iterateObj(val[_i], val);
              if (_i < val.length - 1) {
                json += ', ';
              }
            }
            lv--;
            json += ']';

            objMap.pop();
          } else if (isString(val)) {
            json += '"' + val + '"';
          } else if (isNumber(val)) {
            json += val;
          } else if (isBoolean(val)) {
            json += val;
          } else if (isNull(val)) {
            json += 'null';
          } else if (isUndefined(val)) {
            json += 'undefined';
          } else if (isFunction(val)) {
            json += 'function()';
          } else if (isSymbol(val)) {
            json += 'symbol';
          } else {
            json += 'unknown';
          }
        }
        _iterateObj(obj, null);

        return json;
      }

      /**
       * get an object's all keys ignore whether they are not enumerable
       */
      function getObjAllKeys(obj) {
        if (!isObject(obj) && !isArray(obj)) {
          return [];
        }
        var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
        var keys = [];
        for (var key in obj) {
          if (dontEnums.indexOf(key) < 0) {
            keys.push(key);
          }
        }
        keys = keys.sort();
        return keys;
      }

      /**
       * get an object's prototype name
       */
      function getObjName(obj) {
        return Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '');
      }

      /**
       * localStorage methods
       */
      function setStorage(key, value) {
        if (!window.localStorage) {
          return;
        }
        key = 'vConsole_' + key;
        localStorage.setItem(key, value);
      }
      function getStorage(key) {
        if (!window.localStorage) {
          return;
        }
        key = 'vConsole_' + key;
        return localStorage.getItem(key);
      }

      /***/ },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _tool = __webpack_require__(3);

      var _mito = __webpack_require__(5);

      var _mito2 = _interopRequireDefault(_mito);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      /**
       * DOM related Functions
       *
       * @author WechatFE
       */

      var $ = {};

      /**
       * get single element
       * @public
       */
      $.one = function (selector, contextElement) {
        if (contextElement) {
          return contextElement.querySelector(selector);
        }
        return document.querySelector(selector);
      };

      /**
       * get multiple elements
       * @public
       */
      $.all = function (selector, contextElement) {
        var nodeList = void 0,
          list = [];
        if (contextElement) {
          nodeList = contextElement.querySelectorAll(selector);
        } else {
          nodeList = document.querySelectorAll(selector);
        }
        if (nodeList && nodeList.length > 0) {
          list = Array.prototype.slice.call(nodeList);
        }
        return list;
      };

      /**
       * add className to an element
       * @public
       */
      $.addClass = function ($el, className) {
        if (!$el) {
          return;
        }
        if (!(0, _tool.isArray)($el)) {
          $el = [$el];
        }
        for (var i = 0; i < $el.length; i++) {
          var name = $el[i].className || '',
            arr = name.split(' ');
          if (arr.indexOf(className) > -1) {
            continue;
          }
          arr.push(className);
          $el[i].className = arr.join(' ');
        }
      };

      /**
       * remove className from an element
       * @public
       */
      $.removeClass = function ($el, className) {
        if (!$el) {
          return;
        }
        if (!(0, _tool.isArray)($el)) {
          $el = [$el];
        }
        for (var i = 0; i < $el.length; i++) {
          var arr = $el[i].className.split(' ');
          for (var j = 0; j < arr.length; j++) {
            if (arr[j] == className) {
              arr[j] = '';
            }
          }
          $el[i].className = arr.join(' ').trim();
        }
      };

      /**
       * see whether an element contains a className
       * @public
       */
      $.hasClass = function ($el, className) {
        if (!$el) {
          return false;
        }
        var arr = $el.className.split(' ');
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == className) {
            return true;
          }
        }
        return false;
      };

      /**
       * bind an event to element(s)
       * @public
       * @param  array    $el      element object or array
       * @param  string    eventType  name of the event
       * @param  function  fn
       * @param  boolean    useCapture
       */
      $.bind = function ($el, eventType, fn, useCapture) {
        if (!$el) {
          return;
        }
        if (useCapture === undefined) {
          useCapture = false;
        }
        if (!(0, _tool.isArray)($el)) {
          $el = [$el];
        }
        for (var i = 0; i < $el.length; i++) {
          $el[i].addEventListener(eventType, fn, useCapture);
        }
      };

      /**
       * delegate an event to a parent element
       * @public
       * @param  array     $el        parent element
       * @param  string    eventType  name of the event
       * @param  string    selector   target's selector
       * @param  function  fn
       */
      $.delegate = function ($el, eventType, selector, fn) {
        if (!$el) {
          return;
        }
        $el.addEventListener(eventType, function (e) {
          var targets = $.all(selector, $el);
          if (!targets) {
            return;
          }
          findTarget: for (var i = 0; i < targets.length; i++) {
            var $node = e.target;
            while ($node) {
              if ($node == targets[i]) {
                fn.call($node, e);
                break findTarget;
              }
              $node = $node.parentNode;
              if ($node == $el) {
                break;
              }
            }
          }
        }, false);
      };

      /**
       * simply render a HTML template
       * @param string tpl
       * @param object key-value data
       * @param boolean whether to conver to HTML string
       * @return object|string
       */
      $.render = _mito2.default;

      /**
       * export
       */
      exports.default = $;
      module.exports = exports['default'];

      /***/ },
    /* 5 */
    /***/ function(module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = render;
      /**
       * Mito.js
       * A simple template engine
       *
       * @author Maiz
       */

      function render(tpl, data, toString) {
        var pattern = /\{\{([^\}]+)\}\}/g,
          code = '',
          codeWrap = '',
          pointer = 0,
          match = [];
        var addCode = function addCode(line, isJS) {
          if (line === '') {
            return;
          }
          // console.log(line)
          if (isJS) {
            if (line.match(/^ ?else/g)) {
              // else  --> } else {
              code += '} ' + line + ' {\n';
            } else if (line.match(/\/(if|for|switch)/g)) {
              // /if  -->  }
              code += '}\n';
            } else if (line.match(/^ ?if|for|switch/g)) {
              // if (age)  -->  if (this.age) {
              code += line + ' {\n';
            } else if (line.match(/^ ?(break|continue) ?$/g)) {
              // break --> break;
              code += line + ';\n';
            } else if (line.match(/^ ?(case|default)/g)) {
              // case (1) --> case (1):
              code += line + ':\n';
            } else {
              // name  -->  name
              code += 'arr.push(' + line + ');\n';
            }
          } else {
            // plain text
            code += 'arr.push("' + line.replace(/"/g, '\\"') + '");\n';
          }
        };
        // init global param
        window.__mito_data = data;
        window.__mito_code = "";
        window.__mito_result = "";
        // remove spaces after switch
        tpl = tpl.replace(/(\{\{ ?switch(.+?)\}\})[\r\n\t ]+\{\{/g, '$1{{');
        // line breaks
        tpl = tpl.replace(/^\n/, '').replace(/\n/g, '\\\n');
        // init code
        codeWrap = '(function(){\n';
        code = 'var arr = [];\n';
        while (match = pattern.exec(tpl)) {
          addCode(tpl.slice(pointer, match.index), false);
          addCode(match[1], true);
          pointer = match.index + match[0].length;
        }
        addCode(tpl.substr(pointer, tpl.length - pointer), false);
        code += '__mito_result = arr.join("");';
        code = 'with (__mito_data) {\n' + code + '\n}';
        codeWrap += code;
        codeWrap += '})();';
        // console.log("code:\n"+codeWrap);
        // run code, do NOT use `eval` or `new Function` to avoid `unsafe-eval` CSP rule
        var script = document.createElement('SCRIPT');
        script.innerHTML = codeWrap;
        document.documentElement.appendChild(script);
        var dom = __mito_result;
        document.documentElement.removeChild(script);
        if (!toString) {
          var e = document.createElement('div');
          e.innerHTML = dom;
          dom = e.children[0];
        }
        return dom;
      }
      module.exports = exports['default'];

      /***/ },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(7);
      if(typeof content === 'string') content = [[module.id, content, '']];
      // add the styles to the DOM
      var update = __webpack_require__(9)(content, {});
      if(content.locals) module.exports = content.locals;
      // Hot Module Replacement
      if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
          module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./core.less", function() {
            var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./core.less");
            if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
            update(newContent);
          });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
      }

      /***/ },
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(8)();
      // imports


      // module
      exports.push([module.id, "#__vconsole {\n  color: #000;\n  font-size: 13px;\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  /* global */\n  /* compoment */\n}\n#__vconsole .vc-max-height {\n  max-height: 250px;\n}\n#__vconsole .vc-max-height-line {\n  max-height: 44px;\n}\n#__vconsole .vc-min-height {\n  min-height: 40px;\n}\n#__vconsole .vc-switch {\n  display: block;\n  position: fixed;\n  right: 10px;\n  bottom: 10px;\n  color: #FFF;\n  background-color: #04BE02;\n  line-height: 1;\n  font-size: 14px;\n  padding: 8px 16px;\n  z-index: 10000;\n  border-radius: 4px;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);\n}\n#__vconsole .vc-mask {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0);\n  z-index: 10001;\n  transition: background .3s;\n  -webkit-tap-highlight-color: transparent;\n  overflow-y: scroll;\n}\n#__vconsole .vc-panel {\n  display: none;\n  position: fixed;\n  min-height: 85%;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10002;\n  background-color: #EFEFF4;\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform .3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n  -webkit-transform: translate(0, 100%);\n  transform: translate(0, 100%);\n}\n#__vconsole .vc-tabbar {\n  border-bottom: 1px solid #D9D9D9;\n  overflow-x: auto;\n  height: 39px;\n  width: auto;\n  white-space: nowrap;\n}\n#__vconsole .vc-tabbar .vc-tab {\n  display: inline-block;\n  line-height: 39px;\n  padding: 0 15px;\n  border-right: 1px solid #D9D9D9;\n  text-decoration: none;\n  color: #000;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-tabbar .vc-tab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-tabbar .vc-tab.vc-actived {\n  background-color: #FFF;\n}\n#__vconsole .vc-content {\n  background-color: #FFF;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  right: 0;\n  bottom: 40px;\n  -webkit-overflow-scrolling: touch;\n}\n#__vconsole .vc-content.vc-has-topbar {\n  top: 71px;\n}\n#__vconsole .vc-topbar {\n  background-color: #FBF9FE;\n  display: flex;\n  display: -webkit-box;\n  flex-direction: row;\n  flex-wrap: wrap;\n  -webkit-box-direction: row;\n  -webkit-flex-wrap: wrap;\n  width: 100%;\n}\n#__vconsole .vc-topbar .vc-toptab {\n  display: none;\n  flex: 1;\n  -webkit-box-flex: 1;\n  line-height: 30px;\n  padding: 0 15px;\n  border-bottom: 1px solid #D9D9D9;\n  text-decoration: none;\n  text-align: center;\n  color: #000;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-topbar .vc-toptab.vc-toggle {\n  display: block;\n}\n#__vconsole .vc-topbar .vc-toptab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-topbar .vc-toptab.vc-actived {\n  border-bottom: 1px solid #3e82f7;\n}\n#__vconsole .vc-logbox {\n  display: none;\n  position: relative;\n  min-height: 100%;\n}\n#__vconsole .vc-logbox i {\n  font-style: normal;\n}\n#__vconsole .vc-logbox .vc-log {\n  -webkit-tap-highlight-color: transparent;\n}\n#__vconsole .vc-logbox .vc-log:empty:before {\n  content: \"Empty\";\n  color: #999;\n  position: absolute;\n  top: 45%;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 15px;\n  text-align: center;\n}\n#__vconsole .vc-logbox .vc-item {\n  margin: 0;\n  padding: 6px 8px;\n  overflow: hidden;\n  line-height: 1.3;\n  border-bottom: 1px solid #EEE;\n  word-break: break-word;\n}\n#__vconsole .vc-logbox .vc-item-info {\n  color: #6A5ACD;\n}\n#__vconsole .vc-logbox .vc-item-debug {\n  color: #DAA520;\n}\n#__vconsole .vc-logbox .vc-item-warn {\n  color: #FFA500;\n  border-color: #FFB930;\n  background-color: #FFFACD;\n}\n#__vconsole .vc-logbox .vc-item-error {\n  color: #DC143C;\n  border-color: #F4A0AB;\n  background-color: #FFE4E1;\n}\n#__vconsole .vc-logbox .vc-log.vc-log-partly .vc-item {\n  display: none;\n}\n#__vconsole .vc-logbox .vc-log.vc-log-partly-log .vc-item-log,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-info .vc-item-info,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-warn .vc-item-warn,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-error .vc-item-error {\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-content {\n  margin-right: 60px;\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-meta {\n  color: #888;\n  float: right;\n  width: 60px;\n  text-align: right;\n}\n#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-content {\n  margin-right: 0;\n}\n#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-meta {\n  display: none;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code {\n  display: block;\n  white-space: pre-wrap;\n  overflow: auto;\n  position: relative;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input,\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output {\n  padding-left: 12px;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input:before,\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before {\n  content: \"\\203A\";\n  position: absolute;\n  top: -3px;\n  left: 0;\n  font-size: 16px;\n  color: #6A5ACD;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before {\n  content: \"\\2039\";\n}\n#__vconsole .vc-logbox .vc-item .vc-fold {\n  display: block;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer {\n  display: block;\n  font-style: italic;\n  padding-left: 10px;\n  position: relative;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:active {\n  background-color: #E6E6E6;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:before {\n  content: \"\";\n  position: absolute;\n  top: 4px;\n  left: 2px;\n  width: 0;\n  height: 0;\n  border: transparent solid 4px;\n  border-left-color: #000;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer.vc-toggle:before {\n  top: 6px;\n  left: 0;\n  border-top-color: #000;\n  border-left-color: transparent;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner {\n  display: none;\n  margin-left: 10px;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner.vc-toggle {\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner .vc-code-key {\n  margin-left: 10px;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer .vc-code-key {\n  margin-left: 0;\n}\n#__vconsole .vc-logbox .vc-code-key {\n  color: #905;\n}\n#__vconsole .vc-logbox .vc-code-private-key {\n  color: #D391B5;\n}\n#__vconsole .vc-logbox .vc-code-function {\n  color: #905;\n  font-style: italic;\n}\n#__vconsole .vc-logbox .vc-code-number,\n#__vconsole .vc-logbox .vc-code-boolean {\n  color: #0086B3;\n}\n#__vconsole .vc-logbox .vc-code-string {\n  color: #183691;\n}\n#__vconsole .vc-logbox .vc-code-null,\n#__vconsole .vc-logbox .vc-code-undefined {\n  color: #666;\n}\n#__vconsole .vc-logbox .vc-cmd {\n  position: absolute;\n  height: 40px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-top: 1px solid #D9D9D9;\n  display: block!important;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input-wrap {\n  display: block;\n  height: 28px;\n  margin-right: 40px;\n  padding: 6px 8px;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input {\n  width: 100%;\n  border: none;\n  resize: none;\n  outline: none;\n  padding: 0;\n  font-size: 12px;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input::-webkit-input-placeholder {\n  line-height: 28px;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 40px;\n  border: none;\n  background-color: #EFEFF4;\n  outline: none;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-logbox .vc-group .vc-group-preview {\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-logbox .vc-group .vc-group-preview:active {\n  background-color: #E6E6E6;\n}\n#__vconsole .vc-logbox .vc-group .vc-group-detail {\n  display: none;\n  padding: 0 0 10px 20px;\n  border-bottom: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-detail {\n  display: block;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row {\n  display: flex;\n  display: -webkit-flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  -webkit-box-direction: row;\n  -webkit-flex-wrap: wrap;\n  overflow: hidden;\n  border-bottom: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row.vc-left-border {\n  border-left: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col {\n  flex: 1;\n  -webkit-box-flex: 1;\n  padding: 3px 4px;\n  border-left: 1px solid #EEE;\n  overflow: auto;\n  white-space: pre-wrap;\n  word-break: break-word;\n  /*white-space: nowrap;\n        text-overflow: ellipsis;*/\n  -webkit-overflow-scrolling: touch;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col:first-child {\n  border: none;\n}\n#__vconsole .vc-logbox .vc-table .vc-small .vc-table-col {\n  padding: 0 4px;\n  font-size: 12px;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-2 {\n  flex: 2;\n  -webkit-box-flex: 2;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-3 {\n  flex: 3;\n  -webkit-box-flex: 3;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-4 {\n  flex: 4;\n  -webkit-box-flex: 4;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-5 {\n  flex: 5;\n  -webkit-box-flex: 5;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-6 {\n  flex: 6;\n  -webkit-box-flex: 6;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row-error {\n  border-color: #F4A0AB;\n  background-color: #FFE4E1;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row-error .vc-table-col {\n  color: #DC143C;\n  border-color: #F4A0AB;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-title {\n  font-weight: bold;\n}\n#__vconsole .vc-logbox.vc-actived {\n  display: block;\n}\n#__vconsole .vc-toolbar {\n  border-top: 1px solid #D9D9D9;\n  line-height: 39px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  display: -webkit-box;\n  flex-direction: row;\n  -webkit-box-direction: row;\n}\n#__vconsole .vc-toolbar .vc-tool {\n  display: none;\n  text-decoration: none;\n  color: #000;\n  width: 50%;\n  flex: 1;\n  -webkit-box-flex: 1;\n  text-align: center;\n  position: relative;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-toolbar .vc-tool.vc-toggle,\n#__vconsole .vc-toolbar .vc-tool.vc-global-tool {\n  display: block;\n}\n#__vconsole .vc-toolbar .vc-tool:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-toolbar .vc-tool:after {\n  content: \" \";\n  position: absolute;\n  top: 7px;\n  bottom: 7px;\n  right: 0;\n  border-left: 1px solid #D9D9D9;\n}\n#__vconsole .vc-toolbar .vc-tool-last:after {\n  border: none;\n}\n#__vconsole.vc-toggle .vc-switch {\n  display: none;\n}\n#__vconsole.vc-toggle .vc-mask {\n  background: rgba(0, 0, 0, 0.6);\n  display: block;\n}\n#__vconsole.vc-toggle .vc-panel {\n  -webkit-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n", ""]);

      // exports


      /***/ },
    /* 8 */
    /***/ function(module, exports) {

      "use strict";

      /*
       MIT License http://www.opensource.org/licenses/mit-license.php
       Author Tobias Koppers @sokra
       */
      // css base code, injected by the css-loader
      module.exports = function () {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          var result = [];
          for (var i = 0; i < this.length; i++) {
            var item = this[i];
            if (item[2]) {
              result.push("@media " + item[2] + "{" + item[1] + "}");
            } else {
              result.push(item[1]);
            }
          }
          return result.join("");
        };

        // import a list of modules into the list
        list.i = function (modules, mediaQuery) {
          if (typeof modules === "string") modules = [[null, modules, ""]];
          var alreadyImportedModules = {};
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === "number") alreadyImportedModules[id] = true;
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if (mediaQuery) {
                item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      /***/ },
    /* 9 */
    /***/ function(module, exports, __webpack_require__) {

      /*
       MIT License http://www.opensource.org/licenses/mit-license.php
       Author Tobias Koppers @sokra
       */
      var stylesInDom = {},
        memoize = function(fn) {
          var memo;
          return function () {
            if (typeof memo === "undefined") memo = fn.apply(this, arguments);
            return memo;
          };
        },
        isOldIE = memoize(function() {
          return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
        }),
        getHeadElement = memoize(function () {
          return document.head || document.getElementsByTagName("head")[0];
        }),
        singletonElement = null,
        singletonCounter = 0,
        styleElementsInsertedAtTop = [];

      module.exports = function(list, options) {
        if(false) {
          if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }

        options = options || {};
        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (typeof options.singleton === "undefined") options.singleton = isOldIE();

        // By default, add <style> tags to the bottom of <head>.
        if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

        var styles = listToStyles(list);
        addStylesToDom(styles, options);

        return function update(newList) {
          var mayRemove = [];
          for(var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            domStyle.refs--;
            mayRemove.push(domStyle);
          }
          if(newList) {
            var newStyles = listToStyles(newList);
            addStylesToDom(newStyles, options);
          }
          for(var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];
            if(domStyle.refs === 0) {
              for(var j = 0; j < domStyle.parts.length; j++)
                domStyle.parts[j]();
              delete stylesInDom[domStyle.id];
            }
          }
        };
      }

      function addStylesToDom(styles, options) {
        for(var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          if(domStyle) {
            domStyle.refs++;
            for(var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }
            for(; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j], options));
            }
          } else {
            var parts = [];
            for(var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j], options));
            }
            stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
          }
        }
      }

      function listToStyles(list) {
        var styles = [];
        var newStyles = {};
        for(var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = {css: css, media: media, sourceMap: sourceMap};
          if(!newStyles[id])
            styles.push(newStyles[id] = {id: id, parts: [part]});
          else
            newStyles[id].parts.push(part);
        }
        return styles;
      }

      function insertStyleElement(options, styleElement) {
        var head = getHeadElement();
        var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
        if (options.insertAt === "top") {
          if(!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
          } else if(lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
          } else {
            head.appendChild(styleElement);
          }
          styleElementsInsertedAtTop.push(styleElement);
        } else if (options.insertAt === "bottom") {
          head.appendChild(styleElement);
        } else {
          throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        }
      }

      function removeStyleElement(styleElement) {
        styleElement.parentNode.removeChild(styleElement);
        var idx = styleElementsInsertedAtTop.indexOf(styleElement);
        if(idx >= 0) {
          styleElementsInsertedAtTop.splice(idx, 1);
        }
      }

      function createStyleElement(options) {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        insertStyleElement(options, styleElement);
        return styleElement;
      }

      function createLinkElement(options) {
        var linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        insertStyleElement(options, linkElement);
        return linkElement;
      }

      function addStyle(obj, options) {
        var styleElement, update, remove;

        if (options.singleton) {
          var styleIndex = singletonCounter++;
          styleElement = singletonElement || (singletonElement = createStyleElement(options));
          update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
          remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else if(obj.sourceMap &&
          typeof URL === "function" &&
          typeof URL.createObjectURL === "function" &&
          typeof URL.revokeObjectURL === "function" &&
          typeof Blob === "function" &&
          typeof btoa === "function") {
          styleElement = createLinkElement(options);
          update = updateLink.bind(null, styleElement);
          remove = function() {
            removeStyleElement(styleElement);
            if(styleElement.href)
              URL.revokeObjectURL(styleElement.href);
          };
        } else {
          styleElement = createStyleElement(options);
          update = applyToTag.bind(null, styleElement);
          remove = function() {
            removeStyleElement(styleElement);
          };
        }

        update(obj);

        return function updateStyle(newObj) {
          if(newObj) {
            if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
              return;
            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      var replaceText = (function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;
          return textStore.filter(Boolean).join('\n');
        };
      })();

      function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? "" : obj.css;

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = styleElement.childNodes;
          if (childNodes[index]) styleElement.removeChild(childNodes[index]);
          if (childNodes.length) {
            styleElement.insertBefore(cssNode, childNodes[index]);
          } else {
            styleElement.appendChild(cssNode);
          }
        }
      }

      function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;

        if(media) {
          styleElement.setAttribute("media", media)
        }

        if(styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css;
        } else {
          while(styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css));
        }
      }

      function updateLink(linkElement, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;

        if(sourceMap) {
          // http://stackoverflow.com/a/26603875
          css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }

        var blob = new Blob([css], { type: "text/css" });

        var oldSrc = linkElement.href;

        linkElement.href = URL.createObjectURL(blob);

        if(oldSrc)
          URL.revokeObjectURL(oldSrc);
      }


      /***/ },
    /* 10 */
    /***/ function(module, exports) {

      module.exports = "<div id=\"__vconsole\" class=\"\">\n  <div class=\"vc-switch\">vConsole</div>\n  <div class=\"vc-mask\">\n  </div>\n  <div class=\"vc-panel\">\n    <div class=\"vc-tabbar\">\n    </div>\n    <div class=\"vc-topbar\">\n    </div>\n    <div class=\"vc-content\">\n    </div>\n    <div class=\"vc-toolbar\">\n      <a class=\"vc-tool vc-global-tool vc-tool-last vc-hide\">Hide</a>\n    </div>\n  </div>\n</div>";

      /***/ },
    /* 11 */
    /***/ function(module, exports) {

      module.exports = "<a class=\"vc-tab\" data-tab=\"{{id}}\" id=\"__vc_tab_{{id}}\">{{name}}</a>";

      /***/ },
    /* 12 */
    /***/ function(module, exports) {

      module.exports = "<div class=\"vc-logbox\" id=\"__vc_log_{{id}}\">\n  \n</div>";

      /***/ },
    /* 13 */
    /***/ function(module, exports) {

      module.exports = "<a href=\"javascript:;\" class=\"vc-toptab vc-topbar-{{pluginID}}{{if (className)}} {{className}}{{/if}}\">{{name}}</a>";

      /***/ },
    /* 14 */
    /***/ function(module, exports) {

      module.exports = "<a class=\"vc-tool vc-tool-{{pluginID}}\">{{name}}</a>";

      /***/ },
    /* 15 */
    /***/ function(module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      /**
       * vConsole Plugin Class
       *
       * @author WechatFE
       */

      var VConsolePlugin = function () {
        function VConsolePlugin(id) {
          var name = arguments.length <= 1 || arguments[1] === undefined ? 'newPlugin' : arguments[1];

          _classCallCheck(this, VConsolePlugin);

          this.id = id;
          this.name = name;

          this.eventList = {};
        }

        _createClass(VConsolePlugin, [{
          key: 'on',


          /**
           * register an event
           * @public
           * @param string
           * @param function
           */
          value: function on(eventName, callback) {
            this.eventList[eventName] = callback;
            return this;
          }

          /**
           * trigger an event
           * @public
           * @param string
           * @param mixed
           */

        }, {
          key: 'trigger',
          value: function trigger(eventName, data) {
            if (typeof this.eventList[eventName] === 'function') {
              // registered by `.on()` method
              this.eventList[eventName].call(this, data);
            } else {
              // registered by `.onXxx()` method
              var method = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
              if (typeof this[method] === 'function') {
                this[method].call(this, data);
              }
            }
            return this;
          }
        }, {
          key: 'id',
          get: function get() {
            return this._id;
          },
          set: function set(value) {
            if (!value) {
              throw 'Plugin ID cannot be empty';
            }
            this._id = value.toLowerCase();
          }
        }, {
          key: 'name',
          get: function get() {
            return this._name;
          },
          set: function set(value) {
            if (!value) {
              throw 'Plugin name cannot be empty';
            }
            this._name = value;
          }
        }]);

        return VConsolePlugin;
      }(); // END class

      exports.default = VConsolePlugin;
      module.exports = exports['default'];

      /***/ },
    /* 16 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

      var _query = __webpack_require__(4);

      var _query2 = _interopRequireDefault(_query);

      var _tool = __webpack_require__(3);

      var tool = _interopRequireWildcard(_tool);

      var _log = __webpack_require__(17);

      var _log2 = _interopRequireDefault(_log);

      var _tabbox_default = __webpack_require__(21);

      var _tabbox_default2 = _interopRequireDefault(_tabbox_default);

      var _item_code = __webpack_require__(22);

      var _item_code2 = _interopRequireDefault(_item_code);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
       * vConsole Default Tab
       *
       * @author WechatFE
       */

      var VConsoleDefaultTab = function (_VConsoleLogTab) {
          _inherits(VConsoleDefaultTab, _VConsoleLogTab);

          function VConsoleDefaultTab() {
            var _Object$getPrototypeO;

            _classCallCheck(this, VConsoleDefaultTab);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VConsoleDefaultTab)).call.apply(_Object$getPrototypeO, [this].concat(args)));

            _this.tplTabbox = _tabbox_default2.default;
            _this.windowOnError = null;
            return _this;
          }

          _createClass(VConsoleDefaultTab, [{
            key: 'onReady',
            value: function onReady() {
              var that = this;
              _get(Object.getPrototypeOf(VConsoleDefaultTab.prototype), 'onReady', this).call(this);

              _query2.default.bind(_query2.default.one('.vc-cmd', this.$tabbox), 'submit', function (e) {
                e.preventDefault();
                var $input = _query2.default.one('.vc-cmd-input', e.target),
                  cmd = $input.value;
                $input.value = '';
                if (cmd !== '') {
                  that.evalCommand(cmd);
                }
              });

              // create a global variable to save custom command's result
              var code = '';
              code += 'if (!!window) {';
              code += 'window.__vConsole_cmd_result = undefined;';
              code += 'window.__vConsole_cmd_error = false;';
              code += '}';
              var script = document.createElement('SCRIPT');
              script.innerHTML = code;
              document.documentElement.appendChild(script);
              document.documentElement.removeChild(script);
            }

            /**
             * replace window.console & window.onerror with vConsole method
             * @private
             */

          }, {
            key: 'mockConsole',
            value: function mockConsole() {
              _get(Object.getPrototypeOf(VConsoleDefaultTab.prototype), 'mockConsole', this).call(this);
              var that = this;
              if (tool.isFunction(window.onerror)) {
                this.windowOnError = window.onerror;
              }
              window.onerror = function (message, source, lineNo, colNo, error) {
                var msg = message;
                if (source) {
                  msg += "\n" + source.replace(location.origin, '');
                }
                if (lineNo || colNo) {
                  msg += ':' + lineNo + ':' + colNo;
                }
                that.printLog({ logType: 'error', logs: [msg], noOrigin: true });
                if (tool.isFunction(that.windowOnError)) {
                  that.windowOnError.call(window, message, source, lineNo, colNo, error);
                }
              };
            }

            /**
             *
             * @private
             */

          }, {
            key: 'evalCommand',
            value: function evalCommand(cmd) {
              // print command to console
              this.printLog({
                logType: 'log',
                content: _query2.default.render(_item_code2.default, { content: cmd, type: 'input' }),
                noMeta: true,
                style: ''
              });
              // do not use `eval` or `new Function` to avoid `unsafe-eval` CSP rule
              var code = '';
              code += 'try {\n';
              code += 'window.__vConsole_cmd_result = (function() {\n';
              code += 'return ' + cmd + ';\n';
              code += '})();\n';
              code += 'window.__vConsole_cmd_error = false;\n';
              code += '} catch (e) {\n';
              code += 'window.__vConsole_cmd_result = e.message;\n';
              code += 'window.__vConsole_cmd_error = true;\n';
              code += '}';
              var script = document.createElement('SCRIPT');
              script.innerHTML = code;
              document.documentElement.appendChild(script);
              var result = window.__vConsole_cmd_result,
                error = window.__vConsole_cmd_error;
              document.documentElement.removeChild(script);
              // print result to console
              if (error == false) {
                var $content = void 0;
                if (tool.isArray(result) || tool.isObject(result)) {
                  $content = this.getFoldedLine(result);
                } else {
                  if (tool.isNull(result)) {
                    result = 'null';
                  } else if (tool.isUndefined(result)) {
                    result = 'undefined';
                  } else if (tool.isFunction(result)) {
                    result = 'function()';
                  } else if (tool.isString(result)) {
                    result = '"' + result + '"';
                  }
                  $content = _query2.default.render(_item_code2.default, { content: result, type: 'output' });
                }
                this.printLog({
                  logType: 'log',
                  content: $content,
                  noMeta: true,
                  style: ''
                });
              } else {
                this.printLog({
                  logType: 'error',
                  logs: [result],
                  noMeta: true,
                  style: ''
                });
              }
            }
          }]);

          return VConsoleDefaultTab;
        }(_log2.default); // END class

      exports.default = VConsoleDefaultTab;
      module.exports = exports['default'];

      /***/ },
    /* 17 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _tool = __webpack_require__(3);

      var tool = _interopRequireWildcard(_tool);

      var _query = __webpack_require__(4);

      var _query2 = _interopRequireDefault(_query);

      var _plugin = __webpack_require__(15);

      var _plugin2 = _interopRequireDefault(_plugin);

      var _item = __webpack_require__(18);

      var _item2 = _interopRequireDefault(_item);

      var _item_fold = __webpack_require__(19);

      var _item_fold2 = _interopRequireDefault(_item_fold);

      var _item_fold_code = __webpack_require__(20);

      var _item_fold_code2 = _interopRequireDefault(_item_fold_code);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
       * vConsole Basic Log Tab
       *
       * @author WechatFE
       */

      var VConsoleLogTab = function (_VConsolePlugin) {
          _inherits(VConsoleLogTab, _VConsolePlugin);

          function VConsoleLogTab() {
            var _Object$getPrototypeO;

            _classCallCheck(this, VConsoleLogTab);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VConsoleLogTab)).call.apply(_Object$getPrototypeO, [this].concat(args)));

            _this.tplTabbox = ''; // MUST be overwrite in child class
            _this.allowUnformattedLog = true; // `[xxx]` format log

            _this.isReady = false;
            _this.isShow = false;
            _this.$tabbox = null;
            _this.console = {};
            _this.logList = [];
            _this.isInBottom = true; // whether the panel is in the bottom

            _this.mockConsole();
            return _this;
          }

          /**
           * when vConsole is ready,
           * this event will be triggered (after 'add' event)
           * @public
           */


          _createClass(VConsoleLogTab, [{
            key: 'onInit',
            value: function onInit() {
              this.$tabbox = _query2.default.render(this.tplTabbox, {});
            }

            /**
             * this event will make this plugin be registered as a tab
             * @public
             */

          }, {
            key: 'onRenderTab',
            value: function onRenderTab(callback) {
              callback(this.$tabbox);
            }
          }, {
            key: 'onAddTopBar',
            value: function onAddTopBar(callback) {
              var that = this;
              var types = ['All', 'Log', 'Info', 'Warn', 'Error'];
              var btnList = [];
              for (var i = 0; i < types.length; i++) {
                btnList.push({
                  name: types[i],
                  data: {
                    type: types[i].toLowerCase()
                  },
                  className: '',
                  onClick: function onClick() {
                    if (!_query2.default.hasClass(this, 'vc-actived')) {
                      that.showLogType(this.dataset.type || 'all');
                    } else {
                      return false;
                    }
                  }
                });
              }
              btnList[0].className = 'vc-actived';
              callback(btnList);
            }
          }, {
            key: 'onAddTool',
            value: function onAddTool(callback) {
              var that = this;
              var toolList = [{
                name: 'Clear',
                global: false,
                onClick: function onClick() {
                  that.clearLog();
                }
              }];
              callback(toolList);
            }

            /**
             * after init
             * @public
             */

          }, {
            key: 'onReady',
            value: function onReady() {
              var that = this;
              that.isReady = true;

              // log type filter
              var $subTabs = _query2.default.all('.vc-subtab', that.$tabbox);
              _query2.default.bind($subTabs, 'click', function (e) {
                e.preventDefault();
                if (_query2.default.hasClass(this, 'vc-actived')) {
                  return false;
                }
                _query2.default.removeClass($subTabs, 'vc-actived');
                _query2.default.addClass(this, 'vc-actived');

                var logType = this.dataset.type,
                  $log = _query2.default.one('.vc-log', that.$tabbox);
                _query2.default.removeClass($log, 'vc-log-partly-log');
                _query2.default.removeClass($log, 'vc-log-partly-info');
                _query2.default.removeClass($log, 'vc-log-partly-warn');
                _query2.default.removeClass($log, 'vc-log-partly-error');
                if (logType == 'all') {
                  _query2.default.removeClass($log, 'vc-log-partly');
                } else {
                  _query2.default.addClass($log, 'vc-log-partly');
                  _query2.default.addClass($log, 'vc-log-partly-' + logType);
                }
              });

              var $content = _query2.default.one('.vc-content');
              _query2.default.bind($content, 'scroll', function (e) {
                if (!that.isShow) {
                  return;
                }
                if ($content.scrollTop + $content.offsetHeight >= $content.scrollHeight) {
                  that.isInBottom = true;
                } else {
                  that.isInBottom = false;
                }
              });

              for (var i = 0; i < that.logList.length; i++) {
                that.printLog(that.logList[i]);
              }
              that.logList = [];
            }

            /**
             * before remove
             * @public
             */

          }, {
            key: 'onRemove',
            value: function onRemove() {
              // recover original console
              window.console.log = this.console.log;
              window.console.info = this.console.info;
              window.console.warn = this.console.warn;
              window.console.debug = this.console.debug;
              window.console.error = this.console.error;
              this.console = {};
            }
          }, {
            key: 'onShow',
            value: function onShow() {
              this.isShow = true;
              if (this.isInBottom == true) {
                this.scrollToBottom();
              }
            }
          }, {
            key: 'onHide',
            value: function onHide() {
              this.isShow = false;
            }
          }, {
            key: 'onShowConsole',
            value: function onShowConsole() {
              if (this.isInBottom == true) {
                this.scrollToBottom();
              }
            }
          }, {
            key: 'showLogType',
            value: function showLogType(logType) {
              var $log = _query2.default.one('.vc-log', this.$tabbox);
              _query2.default.removeClass($log, 'vc-log-partly-log');
              _query2.default.removeClass($log, 'vc-log-partly-info');
              _query2.default.removeClass($log, 'vc-log-partly-warn');
              _query2.default.removeClass($log, 'vc-log-partly-error');
              if (logType == 'all') {
                _query2.default.removeClass($log, 'vc-log-partly');
              } else {
                _query2.default.addClass($log, 'vc-log-partly');
                _query2.default.addClass($log, 'vc-log-partly-' + logType);
              }
            }
          }, {
            key: 'scrollToBottom',
            value: function scrollToBottom() {
              var $content = _query2.default.one('.vc-content');
              $content.scrollTop = $content.scrollHeight - $content.offsetHeight;
            }

            /**
             * replace window.console with vConsole method
             * @private
             */

          }, {
            key: 'mockConsole',
            value: function mockConsole() {
              var that = this;
              if (!window.console) {
                window.console = {};
              } else {
                this.console.log = window.console.log;
                this.console.info = window.console.info;
                this.console.warn = window.console.warn;
                this.console.debug = window.console.debug;
                this.console.error = window.console.error;
              }
              window.console.log = function () {
                that.printLog({
                  logType: 'log',
                  logs: arguments
                });
              };
              window.console.info = function () {
                that.printLog({
                  logType: 'info',
                  logs: arguments
                });
              };
              window.console.warn = function () {
                that.printLog({
                  logType: 'warn',
                  logs: arguments
                });
              };
              window.console.debug = function () {
                that.printLog({
                  logType: 'debug',
                  logs: arguments
                });
              };
              window.console.error = function () {
                that.printLog({
                  logType: 'error',
                  logs: arguments
                });
              };
            }
          }, {
            key: 'clearLog',
            value: function clearLog() {
              _query2.default.one('.vc-log', this.$tabbox).innerHTML = '';
            }

            /**
             * print log to origin console
             * @protected
             */

          }, {
            key: 'printOriginLog',
            value: function printOriginLog(item) {
              if (typeof this.console[item.logType] === 'function') {
                this.console[item.logType].apply(window.console, item.logs);
              }
            }

            /**
             * print a log to log box
             * @protected
             * @param  string  tabName    auto|default|system
             * @param  string  logType    log|info|debug|error|warn
             * @param  array   logs       `logs` or `content` can't be empty
             * @param  object  content    `logs` or `content` can't be empty
             * @param  boolean noOrigin
             * @param  boolean noMeta
             * @param  int     date
             * @param  string  style
             * @param  string  meta
             */

          }, {
            key: 'printLog',
            value: function printLog(item) {
              var logs = item.logs || [];
              if (!logs.length && !item.content) {
                return;
              }

              // convert logs to a real array
              logs = [].slice.call(logs || []);

              // check `[default]` format
              var shouldBeHere = true;
              var pattern = /^\[(\w+)\] ?/i;
              var targetTabName = '';
              if (tool.isString(logs[0])) {
                var match = logs[0].match(pattern);
                if (match !== null && match.length > 0) {
                  targetTabName = match[1].toLowerCase();
                }
              }
              if (targetTabName) {
                shouldBeHere = targetTabName == this.id;
              } else if (this.allowUnformattedLog == false) {
                shouldBeHere = false;
              }

              if (!shouldBeHere) {
                // ignore this log and throw it to origin console
                if (!item.noOrigin) {
                  this.printOriginLog(item);
                }
                return;
              }

              // save log date
              if (!item.date) {
                item.date = +new Date();
              }

              // if vConsole is not ready, save current log to logList
              if (!this.isReady) {
                this.logList.push(item);
                return;
              }

              // remove `[xxx]` format
              if (tool.isString(logs[0])) {
                logs[0] = logs[0].replace(pattern, '');
                if (logs[0] === '') {
                  logs.shift();
                }
              }

              // use date as meta
              if (!item.meta) {
                var date = tool.getDate(item.date);
                item.meta = date.hour + ':' + date.minute + ':' + date.second;
              }

              // create line
              var $line = _query2.default.render(_item2.default, {
                logType: item.logType,
                noMeta: !!item.noMeta,
                meta: item.meta,
                style: item.style || ''
              });

              var $content = _query2.default.one('.vc-item-content', $line);
              // generate content from item.logs
              for (var i = 0; i < logs.length; i++) {
                var log = void 0;
                try {
                  if (logs[i] === '') {
                    // ignore empty string
                    continue;
                  } else if (tool.isFunction(logs[i])) {
                    // convert function to string
                    log = '<span> ' + logs[i].toString() + '</span>';
                  } else if (tool.isObject(logs[i]) || tool.isArray(logs[i])) {
                    // object or array
                    log = this.getFoldedLine(logs[i]);
                  } else {
                    // default
                    log = '<span> ' + tool.htmlEncode(logs[i]).replace(/\n/g, '<br/>') + '</span>';
                  }
                } catch (e) {
                  log = '<span> [' + _typeof(logs[i]) + ']</span>';
                }
                if (log) {
                  if (typeof log === 'string') $content.insertAdjacentHTML('beforeend', log);else $content.insertAdjacentElement('beforeend', log);
                }
              }

              // generate content from item.content
              if (tool.isObject(item.content)) {
                $content.insertAdjacentElement('beforeend', item.content);
              }

              // render to panel
              _query2.default.one('.vc-log', this.$tabbox).insertAdjacentElement('beforeend', $line);

              // scroll to bottom if it is in the bottom before
              if (this.isInBottom) {
                this.scrollToBottom();
              }

              // print log to origin console
              if (!item.noOrigin) {
                this.printOriginLog(item);
              }
            }

            /**
             * generate the HTML element of a folded line
             * @protected
             */

          }, {
            key: 'getFoldedLine',
            value: function getFoldedLine(obj, outer) {
              var that = this;
              if (!outer) {
                var json = tool.JSONStringify(obj);
                var preview = json.substr(0, 26);
                outer = tool.getObjName(obj);
                if (json.length > 26) {
                  preview += '...';
                }
                outer += ' ' + preview;
              }
              var $line = _query2.default.render(_item_fold2.default, {
                outer: outer,
                lineType: 'obj'
              });
              _query2.default.bind(_query2.default.one('.vc-fold-outer', $line), 'click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (_query2.default.hasClass($line, 'vc-toggle')) {
                  _query2.default.removeClass($line, 'vc-toggle');
                  _query2.default.removeClass(_query2.default.one('.vc-fold-inner', $line), 'vc-toggle');
                  _query2.default.removeClass(_query2.default.one('.vc-fold-outer', $line), 'vc-toggle');
                } else {
                  _query2.default.addClass($line, 'vc-toggle');
                  _query2.default.addClass(_query2.default.one('.vc-fold-inner', $line), 'vc-toggle');
                  _query2.default.addClass(_query2.default.one('.vc-fold-outer', $line), 'vc-toggle');
                }
                var $content = _query2.default.one('.vc-fold-inner', $line);
                if ($content.children.length == 0 && !!obj) {
                  // render object's keys
                  var keys = tool.getObjAllKeys(obj);
                  for (var i = 0; i < keys.length; i++) {
                    var val = obj[keys[i]],
                      valueType = 'undefined',
                      keyType = '',
                      _$line = void 0;
                    // handle value
                    if (tool.isString(val)) {
                      valueType = 'string';
                      val = '"' + val + '"';
                    } else if (tool.isNumber(val)) {
                      valueType = 'number';
                    } else if (tool.isBoolean(val)) {
                      valueType = 'boolean';
                    } else if (tool.isNull(val)) {
                      valueType = 'null';
                      val = 'null';
                    } else if (tool.isUndefined(val)) {
                      valueType = 'undefined';
                      val = 'undefined';
                    } else if (tool.isFunction(val)) {
                      valueType = 'function';
                      val = 'function()';
                    } else if (tool.isSymbol(val)) {
                      valueType = 'symbol';
                    }
                    // render
                    var $sub = void 0;
                    if (tool.isArray(val)) {
                      var name = tool.getObjName(val) + '[' + val.length + ']';
                      $sub = that.getFoldedLine(val, _query2.default.render(_item_fold_code2.default, {
                        key: keys[i],
                        keyType: keyType,
                        value: name,
                        valueType: 'array'
                      }, true));
                    } else if (tool.isObject(val)) {
                      var _name = tool.getObjName(val);
                      $sub = that.getFoldedLine(val, _query2.default.render(_item_fold_code2.default, {
                        key: tool.htmlEncode(keys[i]),
                        keyType: keyType,
                        value: _name,
                        valueType: 'object'
                      }, true));
                    } else {
                      if (obj.hasOwnProperty && !obj.hasOwnProperty(keys[i])) {
                        keyType = 'private';
                      }
                      var renderData = {
                        lineType: 'kv',
                        key: tool.htmlEncode(keys[i]),
                        keyType: keyType,
                        value: tool.htmlEncode(val),
                        valueType: valueType
                      };
                      $sub = _query2.default.render(_item_fold2.default, renderData);
                    }
                    $content.insertAdjacentElement('beforeend', $sub);
                  }
                  // render object's prototype
                  if (tool.isObject(obj)) {
                    var proto = obj.__proto__,
                      $proto = void 0;
                    if (tool.isObject(proto)) {
                      $proto = that.getFoldedLine(proto, _query2.default.render(_item_fold_code2.default, {
                        key: '__proto__',
                        keyType: 'private',
                        value: tool.getObjName(proto),
                        valueType: 'object'
                      }, true));
                    } else {
                      // if proto is not an object, it should be `null`
                      $proto = _query2.default.render(_item_fold_code2.default, {
                        key: '__proto__',
                        keyType: 'private',
                        value: 'null',
                        valueType: 'null'
                      });
                    }
                    $content.insertAdjacentElement('beforeend', $proto);
                  }
                }
                return false;
              });
              return $line;
            }
          }]);

          return VConsoleLogTab;
        }(_plugin2.default); // END class

      exports.default = VConsoleLogTab;
      module.exports = exports['default'];

      /***/ },
    /* 18 */
    /***/ function(module, exports) {

      module.exports = "<div class=\"vc-item vc-item-{{logType}} {{if (!noMeta)}}vc-item-nometa{{/if}} {{style}}\">\n\t<span class=\"vc-item-meta\">{{if (!noMeta)}}{{meta}}{{/if}}</span>\n\t<div class=\"vc-item-content\"></div>\n</div>";

      /***/ },
    /* 19 */
    /***/ function(module, exports) {

      module.exports = "<div class=\"vc-fold\">\n  {{if (lineType == 'obj')}}\n    <i class=\"vc-fold-outer\">{{outer}}</i>\n    <div class=\"vc-fold-inner\"></div>\n  {{else if (lineType == 'value')}}\n    <i class=\"vc-code-{{valueType}}\">{{value}}</i>\n  {{else if (lineType == 'kv')}}\n    <i class=\"vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}\">{{key}}</i>: <i class=\"vc-code-{{valueType}}\">{{value}}</i>\n  {{/if}}\n</div>";

      /***/ },
    /* 20 */
    /***/ function(module, exports) {

      module.exports = "<span>\n  <i class=\"vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}\">{{key}}</i>: <i class=\"vc-code-{{valueType}}\">{{value}}</i>\n</span>";

      /***/ },
    /* 21 */
    /***/ function(module, exports) {

      module.exports = "<div>\n  <div class=\"vc-log\" style=\"padding-bottom:40px\"></div>\n  <form class=\"vc-cmd\">\n    <button class=\"vc-cmd-btn\" type=\"submit\">OK</button>\n    <div class=\"vc-cmd-input-wrap\">\n      <textarea class=\"vc-cmd-input\" placeholder=\"command...\"></textarea>\n    </div>\n  </form>\n</div>";

      /***/ },
    /* 22 */
    /***/ function(module, exports) {

      module.exports = "<pre class=\"vc-item-code vc-item-code-{{type}}\">{{content}}</pre>";

      /***/ },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

      var _tool = __webpack_require__(3);

      var tool = _interopRequireWildcard(_tool);

      var _log = __webpack_require__(17);

      var _log2 = _interopRequireDefault(_log);

      var _tabbox_system = __webpack_require__(24);

      var _tabbox_system2 = _interopRequireDefault(_tabbox_system);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
       * vConsole System Tab
       *
       * @author WechatFE
       */

      var VConsoleSystemTab = function (_VConsoleLogTab) {
          _inherits(VConsoleSystemTab, _VConsoleLogTab);

          function VConsoleSystemTab() {
            var _Object$getPrototypeO;

            _classCallCheck(this, VConsoleSystemTab);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VConsoleSystemTab)).call.apply(_Object$getPrototypeO, [this].concat(args)));

            _this.tplTabbox = _tabbox_system2.default;
            _this.allowUnformattedLog = false; // only logs begin with `[system]` can be displayed
            return _this;
          }

          _createClass(VConsoleSystemTab, [{
            key: 'onInit',
            value: function onInit() {
              _get(Object.getPrototypeOf(VConsoleSystemTab.prototype), 'onInit', this).call(this);
              this.printSystemInfo();
            }
          }, {
            key: 'printSystemInfo',
            value: function printSystemInfo() {
              // print system info
              var ua = navigator.userAgent,
                logMsg = '';

              // device & system
              var ipod = ua.match(/(ipod).*\s([\d_]+)/i),
                ipad = ua.match(/(ipad).*\s([\d_]+)/i),
                iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
                android = ua.match(/(android)\s([\d\.]+)/i);

              logMsg = 'Unknown';
              if (android) {
                logMsg = 'Android ' + android[2];
              } else if (iphone) {
                logMsg = 'iPhone, iOS ' + iphone[2].replace(/_/g, '.');
              } else if (ipad) {
                logMsg = 'iPad, iOS ' + ipad[2].replace(/_/g, '.');
              } else if (ipod) {
                logMsg = 'iPod, iOS ' + ipod[2].replace(/_/g, '.');
              }
              var templogMsg = logMsg;
              // wechat client version
              var version = ua.match(/MicroMessenger\/([\d\.]+)/i);
              logMsg = 'Unknown';
              if (version && version[1]) {
                logMsg = version[1];
                templogMsg += ', WeChat ' + logMsg;
                console.info('[system]', 'System:', templogMsg);
              } else {
                console.info('[system]', 'System:', templogMsg);
              }

              // HTTP protocol
              logMsg = 'Unknown';
              if (location.protocol == 'https:') {
                logMsg = 'HTTPS';
              } else if (location.protocol == 'http:') {
                logMsg = 'HTTP';
              } else {
                logMsg = location.protocol.replace(':', '');
              }
              templogMsg = logMsg;
              // network type
              var network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g);
              logMsg = 'Unknown';
              if (network && network[0]) {
                network = network[0].split('/');
                logMsg = network[1];
                templogMsg += ', ' + logMsg;
                console.info('[system]', 'Network:', templogMsg);
              } else {
                console.info('[system]', 'Protocol:', templogMsg);
              }

              // User Agent
              console.info('[system]', 'UA:', ua);

              // performance related
              // use `setTimeout` to make sure all timing points are available
              setTimeout(function () {
                var performance = window.performance || window.msPerformance || window.webkitPerformance;

                // timing
                if (performance && performance.timing) {
                  var t = performance.timing;
                  if (t.navigationStart) {
                    console.info('[system]', 'navigationStart:', t.navigationStart);
                  }
                  if (t.navigationStart && t.domainLookupStart) {
                    console.info('[system]', 'navigation:', t.domainLookupStart - t.navigationStart + 'ms');
                  }
                  if (t.domainLookupEnd && t.domainLookupStart) {
                    console.info('[system]', 'dns:', t.domainLookupEnd - t.domainLookupStart + 'ms');
                  }
                  if (t.connectEnd && t.connectStart) {
                    if (t.connectEnd && t.secureConnectionStart) {
                      console.info('[system]', 'tcp (ssl):', t.connectEnd - t.connectStart + 'ms (' + (t.connectEnd - t.secureConnectionStart) + 'ms)');
                    } else {
                      console.info('[system]', 'tcp:', t.connectEnd - t.connectStart + 'ms');
                    }
                  }
                  if (t.responseStart && t.requestStart) {
                    console.info('[system]', 'request:', t.responseStart - t.requestStart + 'ms');
                  }
                  if (t.responseEnd && t.responseStart) {
                    console.info('[system]', 'response:', t.responseEnd - t.responseStart + 'ms');
                  }
                  if (t.domComplete && t.domLoading) {
                    if (t.domContentLoadedEventStart && t.domLoading) {
                      console.info('[system]', 'domComplete (domLoaded):', t.domComplete - t.domLoading + 'ms (' + (t.domContentLoadedEventStart - t.domLoading) + 'ms)');
                    } else {
                      console.info('[system]', 'domComplete:', t.domComplete - t.domLoading + 'ms');
                    }
                  }
                  if (t.loadEventEnd && t.loadEventStart) {
                    console.info('[system]', 'loadEvent:', t.loadEventEnd - t.loadEventStart + 'ms');
                  }
                  if (t.navigationStart && t.loadEventEnd) {
                    console.info('[system]', 'total (DOM):', t.loadEventEnd - t.navigationStart + 'ms (' + (t.domComplete - t.navigationStart) + 'ms)');
                  }
                }
              }, 0);
            }
          }]);

          return VConsoleSystemTab;
        }(_log2.default); // END class

      exports.default = VConsoleSystemTab;
      module.exports = exports['default'];

      /***/ },
    /* 24 */
    /***/ function(module, exports) {

      module.exports = "<div>\n  <div class=\"vc-log\"></div>\n</div>";

      /***/ },
    /* 25 */
    /***/ function(module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

      var _query = __webpack_require__(4);

      var _query2 = _interopRequireDefault(_query);

      var _tool = __webpack_require__(3);

      var tool = _interopRequireWildcard(_tool);

      var _plugin = __webpack_require__(15);

      var _plugin2 = _interopRequireDefault(_plugin);

      var _tabbox = __webpack_require__(26);

      var _tabbox2 = _interopRequireDefault(_tabbox);

      var _header = __webpack_require__(27);

      var _header2 = _interopRequireDefault(_header);

      var _item = __webpack_require__(28);

      var _item2 = _interopRequireDefault(_item);

      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
       * vConsole Default Tab
       *
       * @author WechatFE
       */

      var VConsoleNetworkTab = function (_VConsolePlugin) {
          _inherits(VConsoleNetworkTab, _VConsolePlugin);

          function VConsoleNetworkTab() {
            var _Object$getPrototypeO;

            _classCallCheck(this, VConsoleNetworkTab);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VConsoleNetworkTab)).call.apply(_Object$getPrototypeO, [this].concat(args)));

            _this.$tabbox = _query2.default.render(_tabbox2.default, {});
            _this.$header = null;
            _this.reqList = {}; // URL as key, request item as value
            _this.domList = {}; // URL as key, dom item as value
            _this.isReady = false;
            _this.isShow = false;
            _this.isInBottom = true; // whether the panel is in the bottom
            _this._open = undefined; // the origin function
            _this._send = undefined;

            _this.mockAjax();
            return _this;
          }

          _createClass(VConsoleNetworkTab, [{
            key: 'onRenderTab',
            value: function onRenderTab(callback) {
              callback(this.$tabbox);
            }
          }, {
            key: 'onAddTool',
            value: function onAddTool(callback) {
              var that = this;
              var toolList = [{
                name: 'Clear',
                global: false,
                onClick: function onClick(e) {
                  that.clearLog();
                }
              }];
              callback(toolList);
            }
          }, {
            key: 'onReady',
            value: function onReady() {
              var that = this;
              that.isReady = true;

              // header
              this.renderHeader();

              // expend group item
              _query2.default.delegate(_query2.default.one('.vc-log', this.$tabbox), 'click', '.vc-group-preview', function (e) {
                var $group = this.parentNode;
                if (_query2.default.hasClass($group, 'vc-actived')) {
                  _query2.default.removeClass($group, 'vc-actived');
                } else {
                  _query2.default.addClass($group, 'vc-actived');
                }
                e.preventDefault();
              });

              var $content = _query2.default.one('.vc-content');
              _query2.default.bind($content, 'scroll', function (e) {
                if (!that.isShow) {
                  return;
                }
                if ($content.scrollTop + $content.offsetHeight >= $content.scrollHeight) {
                  that.isInBottom = true;
                } else {
                  that.isInBottom = false;
                }
              });

              for (var k in that.reqList) {
                that.updateRequest(k, {});
              }
            }
          }, {
            key: 'onRemove',
            value: function onRemove() {
              // recover original functions
              if (window.XMLHttpRequest) {
                window.XMLHttpRequest.prototype.open = this._open;
                window.XMLHttpRequest.prototype.send = this._send;
                this._open = undefined;
                this._send = undefined;
              }
            }
          }, {
            key: 'onShow',
            value: function onShow() {
              this.isShow = true;
              if (this.isInBottom == true) {
                this.scrollToBottom();
              }
            }
          }, {
            key: 'onHide',
            value: function onHide() {
              this.isShow = false;
            }
          }, {
            key: 'onShowConsole',
            value: function onShowConsole() {
              if (this.isInBottom == true) {
                this.scrollToBottom();
              }
            }
          }, {
            key: 'scrollToBottom',
            value: function scrollToBottom() {
              var $box = _query2.default.one('.vc-content');
              $box.scrollTop = $box.scrollHeight - $box.offsetHeight;
            }
          }, {
            key: 'clearLog',
            value: function clearLog() {
              // remove list
              this.reqList = {};

              // remove dom
              for (var id in this.domList) {
                this.domList[id].remove();
                this.domList[id] = undefined;
              }
              this.domList = {};

              // update header
              this.renderHeader();
            }
          }, {
            key: 'renderHeader',
            value: function renderHeader() {
              var count = Object.keys(this.reqList).length,
                $header = _query2.default.render(_header2.default, { count: count }),
                $logbox = _query2.default.one('.vc-log', this.$tabbox);
              if (this.$header) {
                // update
                this.$header.parentNode.replaceChild($header, this.$header);
              } else {
                // add
                $logbox.parentNode.insertBefore($header, $logbox);
              }
              this.$header = $header;
            }

            /**
             * add or update a request item by request ID
             * @private
             * @param string id
             * @param object data
             */

          }, {
            key: 'updateRequest',
            value: function updateRequest(id, data) {
              // see whether add new item into list
              var preCount = Object.keys(this.reqList).length;

              // update item
              var item = this.reqList[id] || {};
              for (var key in data) {
                item[key] = data[key];
              }
              this.reqList[id] = item;
              // console.log(item);

              if (!this.isReady) {
                return;
              }

              // update dom
              var domData = {
                url: item.url,
                status: item.status,
                method: item.method || '-',
                costTime: item.costTime > 0 ? item.costTime + 'ms' : '-',
                header: item.header || null,
                getData: item.getData || null,
                postData: item.postData || null,
                response: null
              };
              switch (item.responseType) {
                case '':
                case 'text':
                  // try to parse JSON
                  if (tool.isString(item.response)) {
                    try {
                      domData.response = JSON.parse(item.response);
                      domData.response = JSON.stringify(domData.response, null, 1);
                      domData.response = tool.htmlEncode(domData.response);
                    } catch (e) {
                      // not a JSON string
                      domData.response = tool.htmlEncode(item.response);
                    }
                  } else {
                    domData.response = Object.prototype.toString.call(item.response);
                  }
                  break;
                case 'json':
                  domData.response = JSON.stringify(item.response, null, 1);
                  break;
                case 'blob':
                case 'document':
                case 'arraybuffer':
                default:
                  domData.response = Object.prototype.toString.call(item.response);
                  break;
              }
              if (item.readyState == 0 || item.readyState == 1) {
                domData.status = 'Pending';
              } else if (item.readyState == 2 || item.readyState == 3) {
                domData.status = 'Loading';
              } else if (item.readyState == 4) {
                // do nothing
              } else {
                domData.status = 'Unknown';
              }
              var $new = _query2.default.render(_item2.default, domData),
                $old = this.domList[id];
              if (item.status >= 400) {
                _query2.default.addClass(_query2.default.one('.vc-group-preview', $new), 'vc-table-row-error');
              }
              if ($old) {
                $old.parentNode.replaceChild($new, $old);
              } else {
                _query2.default.one('.vc-log', this.$tabbox).insertAdjacentElement('beforeend', $new);
              }
              this.domList[id] = $new;

              // update header
              var curCount = Object.keys(this.reqList).length;
              if (curCount != preCount) {
                this.renderHeader();
              }

              // scroll to bottom
              if (this.isInBottom) {
                this.scrollToBottom();
              }
            }

            /**
             * mock ajax request
             * @private
             */

          }, {
            key: 'mockAjax',
            value: function mockAjax() {
              var _XMLHttpRequest = window.XMLHttpRequest;
              if (!_XMLHttpRequest) {
                return;
              }

              var that = this;
              var _open = window.XMLHttpRequest.prototype.open,
                _send = window.XMLHttpRequest.prototype.send;
              that._open = _open;
              that._send = _send;

              // mock open()
              window.XMLHttpRequest.prototype.open = function () {
                var XMLReq = this;
                var args = [].slice.call(arguments),
                  method = args[0],
                  url = args[1],
                  id = that.getUniqueID();

                // may be used by other functions
                XMLReq._requestID = id;
                XMLReq._method = method;
                XMLReq._url = url;

                // mock onreadystatechange
                var _onreadystatechange = XMLReq.onreadystatechange || function () {};
                XMLReq.onreadystatechange = function () {

                  var item = that.reqList[id] || {};

                  // update status
                  item.readyState = XMLReq.readyState;
                  item.status = XMLReq.status;
                  item.responseType = XMLReq.responseType;

                  if (XMLReq.readyState == 0) {
                    // UNSENT
                    item.startTime = +new Date();
                  } else if (XMLReq.readyState == 1) {
                    // OPENED
                    item.startTime = +new Date();
                  } else if (XMLReq.readyState == 2) {
                    // HEADERS_RECEIVED
                    item.header = {};
                    var header = XMLReq.getAllResponseHeaders() || '',
                      headerArr = header.split("\n");
                    // extract plain text to key-value format
                    for (var i = 0; i < headerArr.length; i++) {
                      var line = headerArr[i];
                      if (!line) {
                        continue;
                      }
                      var arr = line.split(': ');
                      var key = arr[0],
                        value = arr.slice(1).join(': ');
                      item.header[key] = value;
                    }
                  } else if (XMLReq.readyState == 3) {
                    // LOADING
                  } else if (XMLReq.readyState == 4) {
                    // DONE
                    item.endTime = +new Date(), item.costTime = item.endTime - (item.startTime || item.endTime);
                    item.response = XMLReq.response;
                  }

                  if (!XMLReq._noVConsole) {
                    that.updateRequest(id, item);
                  }
                  return _onreadystatechange.apply(XMLReq, arguments);
                };

                return _open.apply(XMLReq, args);
              };

              // mock send()
              window.XMLHttpRequest.prototype.send = function () {
                var XMLReq = this;
                var args = [].slice.call(arguments),
                  data = args[0];

                var item = that.reqList[XMLReq._requestID] || {};
                item.method = XMLReq._method.toUpperCase();

                var query = XMLReq._url.split('?'); // a.php?b=c&d=?e => ['a.php', 'b=c&d=', '?e']
                item.url = query.shift(); // => ['b=c&d=', '?e']

                if (query.length > 0) {
                  item.getData = {};
                  query = query.join('?'); // => 'b=c&d=?e'
                  query = query.split('&'); // => ['b=c', 'd=?e']
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = query[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var q = _step.value;

                      q = q.split('=');
                      item.getData[q[0]] = q[1];
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                }

                if (item.method == 'POST') {

                  // save POST data
                  if (tool.isString(data)) {
                    var arr = data.split('&');
                    item.postData = {};
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _q = _step2.value;

                        _q = _q.split('=');
                        item.postData[_q[0]] = _q[1];
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }
                  } else if (tool.isPlainObject(data)) {
                    item.postData = data;
                  }
                }

                if (!XMLReq._noVConsole) {
                  that.updateRequest(XMLReq._requestID, item);
                }

                return _send.apply(XMLReq, args);
              };
            }
          }, {
            key: 'getUniqueID',


            /**
             * generate an unique id string (32)
             * @private
             * @return string
             */
            value: function getUniqueID() {
              var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                  v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
              });
              return id;
            }
          }]);

          return VConsoleNetworkTab;
        }(_plugin2.default); // END class

      exports.default = VConsoleNetworkTab;
      module.exports = exports['default'];

      /***/ },
    /* 26 */
    /***/ function(module, exports) {

      module.exports = "<div class=\"vc-table\">\n  <div class=\"vc-log\"></div>\n</div>";

      /***/ },
    /* 27 */
    /***/ function(module, exports) {

      module.exports = "<dl class=\"vc-table-row\">\n  <dd class=\"vc-table-col vc-table-col-4\">Name {{if (count > 0)}}({{count}}){{/if}}</dd>\n  <dd class=\"vc-table-col\">Method</dd>\n  <dd class=\"vc-table-col\">Status</dd>\n  <dd class=\"vc-table-col\">Time</dd>\n</dl>";

      /***/ },
    /* 28 */
    /***/ function(module, exports) {

      module.exports = "<div class=\"vc-group\">\n  <dl class=\"vc-table-row vc-group-preview\">\n    <dd class=\"vc-table-col vc-table-col-4\">{{url}}</dd>\n    <dd class=\"vc-table-col\">{{method}}</dd>\n    <dd class=\"vc-table-col\">{{status}}</dd>\n    <dd class=\"vc-table-col\">{{costTime}}</dd>\n  </dl>\n  <div class=\"vc-group-detail\">\n    <div>\n      <dl class=\"vc-table-row vc-left-border\">\n        <dt class=\"vc-table-col vc-table-col-title\">Headers</dt>\n      </dl>\n      {{if (header !== null)}}\n        {{for (var key in header)}}\n        <div class=\"vc-table-row vc-left-border vc-small\">\n          <div class=\"vc-table-col vc-table-col-2\">{{key}}</div>\n          <div class=\"vc-table-col vc-table-col-4 vc-max-height-line\">{{header[key]}}</div>\n        </div>\n        {{/for}}\n      {{else}}\n      <div class=\"vc-table-row vc-left-border vc-small\">\n        <div class=\"vc-table-col vc-table-col-2\">-</div>\n      </div>\n      {{/if}}\n    </div>\n    {{if (getData !== null)}}\n    <div>\n      <dl class=\"vc-table-row vc-left-border\">\n        <dt class=\"vc-table-col vc-table-col-title\">Query String Parameters</dt>\n      </dl>\n      {{for (var key in getData)}}\n      <div class=\"vc-table-row vc-left-border vc-small\">\n        <div class=\"vc-table-col vc-table-col-2\">{{key}}</div>\n        <div class=\"vc-table-col vc-table-col-4 vc-max-height-line\">{{getData[key]}}</div>\n      </div>\n      {{/for}}\n    </div>\n    {{/if}}\n    {{if (postData !== null)}}\n    <div>\n      <dl class=\"vc-table-row vc-left-border\">\n        <dt class=\"vc-table-col vc-table-col-title\">Form Data</dt>\n      </dl>\n      {{for (var key in postData)}}\n      <div class=\"vc-table-row vc-left-border vc-small\">\n        <div class=\"vc-table-col vc-table-col-2\">{{key}}</div>\n        <div class=\"vc-table-col vc-table-col-4 vc-max-height-line\">{{postData[key]}}</div>\n      </div>\n      {{/for}}\n    </div>\n    {{/if}}\n    <div>\n      <dl class=\"vc-table-row vc-left-border\">\n        <dt class=\"vc-table-col vc-table-col-title\">Response</dt>\n      </dl>\n      <div class=\"vc-table-row vc-left-border vc-small\">\n        <pre class=\"vc-table-col vc-max-height vc-min-height\">{{response || ''}}</pre>\n      </div>\n    </div>\n  </div>\n</div>";

      /***/ }
    /******/ ])
});
