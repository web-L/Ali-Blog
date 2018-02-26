<template>
  <div class="container" id="container">
      <div class="con-content">
          <Spin size="large" fix v-if="spinShow"></Spin>
          <Row>
            <Col span="17">
                <Card style="width:99%">
                    <h2 class="content-title">{{articleLists.content.data.title}}&nbsp;<span class="from" v-if="articleLists.content.data.source == 2">[转]</span></h2>
                    <div class="content-author">
                        <ul>
                            <li class="author-name">{{articleLists.content.data.author}}</li>
                            <li><span class="dot">&nbsp;•&nbsp;</span>{{articleLists.content.data.category | categoryFilter(categoryData.data)}}</li>
                            <li><span class="dot">&nbsp;•&nbsp;</span>{{articleLists.content.data.create_time | dateFilter}}</li>
                            <li><span class="dot">&nbsp;•&nbsp;</span>{{articleLists.content.data.click}}&nbsp;次阅读</li>
                        </ul>
                    </div>
                    <div class="con-box" style="overflow:hidden;" v-html="articleLists.content.data.content"></div>
                    <Row class="content-bottom">
                        <Col span="16">
                            <Button type="dashed" v-for="item in articleLists.content.tags" :key="item.id">{{item.name}}</Button>
                        </Col>
                        <Col span="8">  
                            <Share :articleData="articleLists.content.data"></Share>
                        </Col>
                    </Row>
                </Card>
                <Card style="width:99%">
                    <Gitalk v-if="isGitalk" :title="articleLists.content.data.title" :id="articleLists.content.data.uid"></Gitalk>
                </Card>
            </Col>
            <Col span="7">
                <Category :categoryList="categoryData.data" :categoryId="articleLists.content.data.category"></Category>
                <RightArticle :newArticleList="articleLists.leftColumnData"></RightArticle>
            </Col>
        </Row>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import '@/assets/style/content.css';
import Category from '@/components/common/category.vue'
import RightArticle from '@/components/common/right-article.vue'
import Share from '@/components/common/share.vue'
import Gitalk from '@/components/common/gitalk';

export default {
  name: 'v-content',
  data(){
      return {
          spinShow: true,
          isGitalk: false,
      }
  },
  beforeRouteUpdate(to,from,next){
      this.getData(to.params.id);
      next();
  },
  created () {
      this.getData(this.$route.params.id);
  },
  components: {
    Category,
    RightArticle,
    Share,
    Gitalk,
  },
  computed: {
    ...mapState([
      'articleLists',
      'categoryData'
    ]),
  },
  methods: {
      getData(contentId){
        this.spinShow = true;
        this.isGitalk = false;
        this.$store.commit('deleteContentArticle');
        Promise.all([
            this.$store.dispatch('getContentArticleData',{id: contentId}),
            this.$store.dispatch('getCategoryData'),
            this.$store.dispatch('getNewsArticleData',{limit:10,offset: 1,dataType: 'receiveLeftColumnData' })
        ]).then(() => {
            this.$store.commit('updateMetaTitle',this.articleLists.content.data.title);
            this.spinShow = false;
            this.isGitalk = true;
        });
      }
  }
}
</script>

<style >
    .con-content {
        overflow: hidden;
        width: 1000px;
        margin: auto;
        position: relative;
       background: #f0f0f0;
        min-height: 770px;
    }
    .con-content img {
        max-width: 88%;
    }
</style>
