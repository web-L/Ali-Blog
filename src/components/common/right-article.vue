<template>
   <Card :bordered="false" style="margin-top:10px;">
        <p slot="title">{{title||'最新文章'}}</p>
        <ul>
            <li class="ivu-row right-news-article" v-for="item in newArticleList" :key="item.id">
                <Col span="7"><router-link :to="/details/+item.id"><img :src="$http.defaults.baseURL+item.thumbnail" :title="item.title" width="70" height="56" alt=""></router-link></Col>
                <Col span="17">
                    <router-link :to="/details/+item.id"><strong>{{ item.title }}</strong></router-link>
                    <span>{{item.create_time}}</span>
                </Col>
            </li>
        </ul>
    </Card>
</template>

<script>
export default {
  name: 'category-list',
  props: ['newArticleList','title'],
}
</script>
<style lang="scss" scoped="">
.right-news-article>div:nth-child(1){
    overflow: hidden;
}
.right-news-article>div:nth-child(1):hover img{
    -webkit-transform: scale(1.04);
    transform: scale(1.06);
}
.right-news-article>div:nth-child(1) img{
    border-radius: 2px;
    -webkit-transition:transform .8s;
    transition:transform .8s;
}
.right-news-article>div:nth-child(2) strong{
    font-size: 12px;
    color: #333333;
    height: 32px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.right-news-article>div:nth-child(2) span{
    display: block;
    font-size: 12px;
    color: #666;
    margin-top: 8px; 
}
.ivu-row.right-news-article {
    margin-bottom: 10px;
}
</style>
