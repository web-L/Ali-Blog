<template>
  <div class="container relative article-list">
     <Spin size="large" fix v-if="spinShow"></Spin>
      <Row>
            <Col span="17">
                <ArticleList :topTitle="title" :pageRouter="'v-article-page'" :listdata="articleLists.category.data" :totalPage="articleLists.category.total" :currentPage="articleLists.category.page"></ArticleList>
            </Col>
            <Col span="7">
                <Category :categoryList="categoryData.data" :categoryId="categoryId"></Category>
                <RightArticle :title="'最新推荐'" :newArticleList="articleLists.recommend.data"></RightArticle>
            </Col>
      </Row>
      
  </div>
</template>

<script>
import ArticleList from '@/components/common/article-list.vue'
import Category from '@/components/common/category.vue'
import RightArticle from '@/components/common/right-article.vue'
import { mapState } from "vuex";

export default {
  name: 'v-article',
  data: () => {
    return {
      title: "文章",
      spinShow: true,
      categoryId: 0
    }
  },
  created(){
      this.getData();
  },
  watch: {
      '$route': 'getData'
  },
  methods: {
      getData(){
        this.spinShow = true;
        this.$store.dispatch('getCategoryData').then(() => {
            this.categoryId = this.formatUrl(this.$route.fullPath) === ''? this.categoryData.data[0].id:this.formatUrl(this.$route.fullPath);
            Promise.all([
                this.$store.dispatch('getRecommendArticleData',{limit:10,tag:'推荐'}),
                this.$store.dispatch('getCategoryArticleData',{limit:10,offset:this.$route.params.id || 1,id: this.categoryId}),
            ]).then(() => {
                this.title = this.articleLists.category.item.name;
                this.spinShow = false;
            });
        });
    },
    formatUrl(url){
        let str = typeof url === "string"? url : '';
        str = str.split('/')[2].replace(/\D/g,'');
        return str;
    }
  },
  computed: {
    ...mapState([
      'articleLists',
      'categoryData',
    ])
  },
  components: {
      ArticleList,
      RightArticle,
      Category,
  }
}
</script>

<style>
 .article-list .ivu-card{
    background: none;
    border: 1px solid #d2d2d2;
    border-left: 0;
    border-radius: 0;
    border-right: 0;
    margin-top: 44px;
    
 }
 .article-list .ivu-card:hover{
     box-shadow:none;
     border-color: #d2d2d2;
 }
 
.article-list .ivu-card-head {
  border-bottom: 1px solid #d2d2d2;
  padding: 12px 16px;
}
</style>