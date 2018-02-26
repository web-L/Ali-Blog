<template>
  <div class="index">
    <div class="container relative">
      <div class="f_l">
        <ArticleList :topTitle="title" :pageRouter="'page'" :listdata="articleLists.news.data" :totalPage="articleLists.news.total" :currentPage="articleLists.news.page"></ArticleList>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
      <div class="r_box f_r">
        <iframe allowtransparency="true" frameborder="0" width="290" height="96" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=2&bd=0&k=000000&f=808080&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=59289&w=290&h=96&align=center"></iframe>
        <div class="tit01">
          <h3 class="tit">联系我</h3>
          <div class="gzwm">
            <ul>
              <li>
                <Poptip>
                    <a class="email" href="javascript:void(0);" target="_blank">微信</a>
                    <div slot="content">
                      <img src="../../assets/images/wx.png" width="124" alt="">
                    </div>
                </Poptip>
              </li>
              <li><a class="qq" target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=UWBlZWJoZmRnYmcRICB-Mj48" style="text-decoration:none;">Email</a></li>
              <li><a target="_blank" class="tel" href="http://wpa.qq.com/msgrd?v=3&uin=1443975636&site=qq&menu=yes">QQ</a></li>
              <li><a target="_blank" class="github" href="https://github.com/web-L">Github</a></li>
            </ul>
          </div>
        </div>
        <!--tit01 end-->
        
        <div class="tuwen">
          <h3 class="tit">推荐文章</h3>
          <ul>
            <li v-for="item in articleLists.recommend.data" :key="item.id" >
              <router-link :to="/details/+item.id"><img :src="$http.defaults.baseURL+item.thumbnail" width="70" height="56"><b>{{item.title}}</b></router-link>
              <p>
                 <router-link :to="`/article/${item.category.pinpy}__${item.category.id}`">
                  <span class="tulanmu">{{item.category | categoryFilter(categoryData.data)}}</span>
                 </router-link>
                <span class="tutime">{{ item.create_time | dateFilter }}</span>
              </p>
            </li>
          </ul>
        </div>
        
        <div class="ph">
          <h3 class="tit">点击排行</h3>
          <ul class="rank">
            <li v-for="item in articleLists.hot.data" :key="item.id"><router-link :to="/details/+item.id"><b>【{{item.category.name}}】</b>{{item.title}}</router-link></li>
          </ul>
        </div>
        <div class="ad"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/common/article-list.vue'
import { mapState } from "vuex";
export default {
  name: 'index',
  data: () => {
    return {
      title: "最新文章",
      spinShow: true,
    }
  },
  mounted(){
    let store =  this.$store;
    Promise.all([
      store.dispatch('getHotArticleData',{limit:5,field:'click',order: 'desc'}),
      store.dispatch('getRecommendArticleData',{limit:10,tag:'推荐'}),
      store.dispatch('getNewsArticleData',{limit:10,offset: this.$route.params.id||1 }),
      store.dispatch('getCategoryData'),
    ]).then(() => {
      this.$store.commit('updateMetaTitle','首页');
      this.spinShow = false;
    });
  },
  computed: {
    ...mapState([
      'articleLists',
      'categoryData'
    ]),
  },
  components: {
    ArticleList
  },
  watch: {
    '$route': 'fetchPageData'
  },
  methods: {
    fetchPageData(){
      this.spinShow = true;
      this.$store.dispatch('getNewsArticleData',{
        limit:10,
        offset: this.$route.params.id
      }).then( () => {
        this.spinShow = false;
      });
    },
  }
}
</script>
<style lang="scss" scoped="">
  .top-title{
    background: none;
    height: 46px;
    border-bottom: 1px solid #d2d2d2;
    margin-left: 16px;

    .ivu-menu-item,.ivu-menu-item:hover{
      height: auto;
      color: #090e08;
      border-color:#090e08; 
      background: none;
      font-size: 16px;
      font-weight: bold;
    }
   
  }
  
  .blank20 {
    height: 20px;
    width: 100%;
    overflow: hidden;
  }

    .tit01 h3 {
      line-height: 44px;
      color: white;
      font-size: 16px;
      border-bottom: 1px solid #E6E6E6;
      height: 40px;
    }


  .dateview {
    width: 100%;
    overflow: hidden;
    clear: both;
    margin: 10px 0 0 0;
    display: inline-block;
    background: #f6f6f6 url(../../assets/images/time.jpg) 15px center no-repeat;
    line-height: 26px;
    height: 26px;
    color: #838383;
    padding-left: 25px;

    span{
      margin: 0 10px;

    }
    
    a{
      color: #41607d;
    }
  }
  
  .r_box {
    width: 300px;
    margin: 20px 20px 0 0
  }
  .tit {
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    height: 44px;
    background: url(../../assets/images/rtitbg.png) no-repeat;
    padding-left: 40px;
    margin: 0 0 10px 0
  }
  /* 关注我 */
  .gzwm {

    .email {
      background-size: 90%;
      background: url(../../assets/images/gz01.png) no-repeat center top;
    }
    .qq {
      background: url(../../assets/images/gz02.png) no-repeat center top;
    }
    .tel {
      background-size: 94%;
      background: url(../../assets/images/gz03.png) no-repeat center top;
    }
    .github {
      background: url(../../assets/images/github.png) no-repeat center top;
    }
    
    ul {
      width: 100%;
      display: flex;
      justify-content: center;

      li:hover{
        -webkit-animation-name: bounce;
        animation-name: bounce;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
      }
      li{
        width: 60px;
        margin: 0 10px 0 5px;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        position: relative;

        a {
          color: #747F8C;
          width: 62px;
          text-align: center;
          padding-top: 36px;
          float: left;
        }
        a:hover {
          opacity: 0.6;
        }
      }
    }
  }

  /*图文列表*/
  .tuwen {
    width: 100%;
    clear: both;
    overflow: hidden;
    margin: 20px 0;


    p {
      margin-top: 5px
    }
    
    li:hover::after{
      content: "";
      width: 100%;
      transition: width .4s;
    }

    li::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: rgba(239, 239, 239, 0.534);
      z-index: -1;
      transition: width .4s;
    }

    li {
      overflow: hidden;
      clear: both;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;

      b {
        display: inline-block;
        width: 70%;
        font-weight: normal;
        color: #333;
        font-size: 14px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      span {
        color: #999;
        margin-right: 10px
      }

      img {
        width: 70px;
        float: left;
        margin-right: 15px
      }
    }
  }
  .tulanmu {
    background: url(../../assets/images/lanmbq.png) no-repeat center left;
    padding-left: 17px;

    a {
      color: #999;
    }

    a:hover {
      color: #066
    }
  }
  .tutime {
    background: url(../../assets/images/datepng.png) no-repeat left center;
    padding-left: 15px
  }

  /*排行*/
  .rank {
    margin: 10px 0;

    li {
      height: 25px;
      line-height: 25px;
      clear: both;
      padding-left: 5px;
      overflow: hidden;
      padding-left: 15px;
      background: url(../../assets/images/libg.jpg) no-repeat left center;

      a {
        color: #333;
      }
      a:hover{
          color: #627174;
      }

      li:first-child a {
        color: #f00;
        display: block;
      }
    }
  }
  .ph {
    overflow: hidden
  }
  /*首页右侧广告 300*/
  .ad {
    width: 300px;
    overflow: hidden;
    margin: 30px 0;

    img {
      width: 300px;
    }
  }
</style>
