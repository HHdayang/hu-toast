import Vue from 'vue';
import VueToast from './vue-toast-c.vue';

const ToastConstructor = Vue.extend(VueToast);
const instance = new ToastConstructor().$mount();

const pageScroll = (() => {
  const fn = (e) => {
    const evt = e || window.event;
    evt.preventDefault();
    evt.stopPropagation();
  };
  let islock = false;

  return {
    lock(el) {
      if (islock) return;
      islock = true;
      (el || document).addEventListener('mousewheel', fn);
      (el || document).addEventListener('touchmove', fn);
    },
    unlock(el) {
      islock = false;
      (el || document).removeEventListener('mousewheel', fn);
      (el || document).removeEventListener('touchmove', fn);
    },
  };
})();

// eslint-disable-next-line func-names
ToastConstructor.prototype.closeToast = function () {
  const el = instance.$el;
  // eslint-disable-next-line no-unused-expressions
  el.parentNode && el.parentNode.removeChild(el);

  // 恢复滚动
  pageScroll.unlock();

  // eslint-disable-next-line no-unused-expressions
  typeof this.callback === 'function' && this.callback();
};

const Toast = (options = {}) => {
  instance.mes = options.mes;
  // eslint-disable-next-line no-bitwise
  instance.timeout = ~~options.timeout || 2000;
  instance.callback = options.callback;

  document.body.appendChild(instance.$el);

  // 禁止滚动
  pageScroll.lock();

  const timer = setTimeout(() => {
    clearTimeout(timer);
    instance.closeToast();
  }, instance.timeout + 100);
};

// eslint-disable-next-line no-shadow
const install = (Vue) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$toast = Toast;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}

export default install;
