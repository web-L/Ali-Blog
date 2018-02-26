<template>
  <div id="app">
    <Header></Header>
      <div class="jztop"></div>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <Back-top></Back-top>
      <div class="jzend"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/common/head.vue'
import Footer from '@/components/common/footer.vue'
export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
  .fade-enter-active{
    transition: all 1s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }

  .ivu-back-top-inner{
    border-radius: 50% !important;
    background: #5b5b5b !important;

  }
  .ivu-back-top-inner i {
      color: #fff !important;
      font-size: 20px !important;
      padding: 8px 9px !important;
  }
</style>
