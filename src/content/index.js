import { insertElementIcons } from '@/utils'
import Vue from 'vue'
import App from './App.vue'
import Test from './components/test.vue'
import ElementConfig from './config/element'

Vue.use(ElementConfig)

// 通过Chrome插件的API加载字体文件
insertElementIcons()
console.log('771',chrome)

// const app = (Vue.prototype.$app = new Vue(App).$mount())
// document.querySelector('#head_wrapper').appendChild(app.$el)

// const test = (Vue.prototype.$test = new Vue(Test).$mount())
// document.querySelector('#head_wrapper').appendChild(test.$el)


// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || "js/inject.js";
    var temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function () {
      // 放在页面不好看，执行完后移除掉
      this.parentNode.removeChild(this);
    };
    document.body.appendChild(temp);
  }
  //loadJs("https://www.medwords.co/js/extensions/plugin.js")
  injectCustomJs();
  
  // 发送消息给background
  chrome.runtime.sendMessage({ type: "CToB" }, function (response) {
    console.log(response.message, "color:red; font-size: 16px;");
  });
  
  // 接收来自popup的消息
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "PToC")
      sendResponse("你好，我是contentscript，我收到了你的信息了");
  });
  
  // 长期连接监听
  chrome.runtime.onConnect.addListener(function (port) {
    console.log(port);
    port.onMessage.addListener(function (msg) {
      if (port.name === "PToC")
        port.postMessage({
          message: port.name + "，你好,我是contentscript,我们可以开始通话了",
        });
    });
  });
  