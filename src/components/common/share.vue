<template>
   <div class="shareWrap">
        <div class="bdsharebuttonbox ">
            <a title="分享到微信" href="#" class="bds_weixin" data-cmd="weixin"></a>
            <a title="分享到新浪微博" 
                :href="'http://service.weibo.com/share/share.php?url=&title='+articleData.title+'&pic='+$http.defaults.baseURL+articleData.thumbnail+'&appkey='"
                class="bds_tsina" target="_blank" data-cmd="qzone">
            </a>
            <a title="分享到QQ空间" 
                :href="'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ url +'&title='+  articleData.title +'&summary='" 
                class="bds_qzone" 
                data-cmd="tsina">
            </a>
            <a title="分享到QQ好友" 
                :href="'http://connect.qq.com/widget/shareqq/index.html?url='+ url +'&title='+ articleData.title +'&summary='+ $http.defaults.baseURL+articleData.thumbnail +''" 
                class="bds_sqq" 
                data-cmd="sqq">
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'share',
  props: ['articleData'],
  computed: {
    url(){
      return window.location.href;
    }
  }
}
</script>
<style lang="scss" scoped="">
.bdsharebuttonbox a {
    background-image: url('../../assets/images/shareIcon.jpg') !important;
    width: 38px;
    height: 36px !important;
    margin: 0 2px;
    display: inline-block;
}
.shareWrap .bdsharebuttonbox {
    display: inline-block;
}
.shareWrap .shareTo {
    line-height: 38px;
    color: #666;
    font-size: 16px;
    font-family:"Microsoft YaHei";
}
.shareWrap .fl {
    float: left;
}
.shareWrap .fr {
    float: right;
}
.shareWrap .Keyword {
    width: 630px;
}
.shareWrap .fl ul li {
    float: left;
    background: #bcbcbc;
    border-radius: 4px;
    margin-right: 10px;
    padding: 6px;
    margin-bottom: 6px;
}
.shareWrap .fl ul li a {
    font-family:"Microsoft YaHei";
    font-size: 14px;
    color: #fff;
}
.shareWrap .fl ul li a:hover {
    color: #C60A09;
}
.shareWrap .bdsharebuttonbox.bds_more {
    background-position: -151px 0px;
}
.shareWrap .bdsharebuttonbox a.bds_weixin {
    background-position: -49px 0px;
}
.shareWrap .bdsharebuttonbox a.bds_qzone {
    background-position: -199px 0px;
}
.shareWrap .bdsharebuttonbox a.bds_tsina {
    background-position: 1px 0px;
}
.shareWrap .bdsharebuttonbox a.bds_sqq {
    background-position: -99px 0px;
}

</style>
