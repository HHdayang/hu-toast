<template>
  <div class="vue-toast-white-mask">
    <div class="vue-toast">
      <p
        class="vue-toast-content"
        v-html="mes"
      ></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-toast',
  props: {
    mes: String,
    timeout: Number,
    callback: Function,
  },
};
</script>

<style lang="scss">
.vue-toast-white-mask {
  position: fixed;
  z-index: 2000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  .vue-toast {
    min-width: 124px;
    max-width: 80%;
    background: rgba(40, 40, 40, 0.85);
    text-align: center;
    border-radius: 3px;
    color: #fff;
    animation: yd-kf-zoom-in 0.06s ease forwards;

    &-content {
      font-size: 16px;
      padding: 12px 22px;
      margin: 0;
      word-break: break-all;
    }
  }
}
</style>
