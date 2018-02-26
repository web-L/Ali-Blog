<template>
   <Card :bordered="false">
        <p slot="title">分类目录</p>
        <p class="category" @click="cutCategory(item)" v-for="item in categoryList" :key="item.id" v-if="item.id != categoryId">{{item.name}}</p>
        <h3 v-else class="category thisCategory">{{item.name}}</h3>
    </Card>
</template>

<script>
export default {
  name: 'category-list',
  props: ['categoryList','categoryId'],
  methods: {
      cutCategory(categoryData){
        this.$router.push(`/article/${categoryData.pinpy}__${categoryData.id}`);
        this.$store.commit('updateMetaTitle',categoryData.name);
      }
  }
}
</script>
<style lang="scss" scoped="">
.category {
    padding-left: 20px;
    line-height: 24px;
    cursor: pointer;
}
.thisCategory{
    font-size: 15px;
    font-weight: bold;
    color: #050904;
    padding-left: 14px;
}

</style>
