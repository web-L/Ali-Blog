<template>
    <div ref="container" class="gitmentWrap" id="gitmentWrap"></div>
</template>

<script>
import '@/assets/style/gitalk.css';
const {Gitalk} = require('@/assets/js/gitalk');

export default {
  name: 'v-gitalk',
  props: ['title','id'],
  mounted(){
      const gitalk = new Gitalk({
            clientID: window.gitalkConfig.clientID,
            clientSecret: window.gitalkConfig.clientSecret,
            repo: window.gitalkConfig.repo,
            owner: 'web-L',
            admin: ['web-L'],
            distractionFreeMode: true,
            title: this.title,
            id: this.id,
        });
        gitalk.render(this.$refs.container);
  },
  methods: {
    
  },
}
</script>

<style>
  .gitmentWrap{
    padding: 0 12px;
    overflow: hidden;
    min-height: 600px;
  }
  .gitmentWrap .gt-container .gt-comment-admin .gt-comment-content{
        background-color: #fbf4f4;
        border-radius: 6px;
  }
  .gitmentWrap .gt-container .gt-comment-content:hover{
      box-shadow: 0 0.625em 0.75em 0 #e2d0d0;
  }
  .gitmentWrap .gt-container .gt-comment-content::after{
    content: "\F104";
    position: absolute;
    font-size: 34px;
    left: 61px;
    top: 0px;
    font-family: Ionicons;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fbf4f4;
  }
  .gitmentWrap .gt-container .gt-meta{
      border-bottom: 1px solid #d2d2d2;
  }
  .gitmentWrap .markdown-body blockquote{
      border-color:#7abbef; 
  }
</style>
