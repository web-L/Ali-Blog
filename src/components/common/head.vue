<template>
  <header>
    <div class="headtop"></div>
    <div class="contenttop">
      <div class="logo f_l">Ali-Blog</div>
      <!-- <div class="search f_r">
        <form action="" method="post" name="searchform" id="searchform">
          <input name="keyboard" id="keyboard" class="input_text" value="请输入关键字" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字'}" type="text">
          <input name="show" value="title" type="hidden">
          <input name="tempid" value="1" type="hidden">
          <input name="tbname" value="news" type="hidden">
          <input name="Submit" class="input_submit" value="搜索" type="submit">
        </form>
      </div> -->
      <div class="blank"></div>
      <nav>
        <div  class="navigation">
          <Menu mode="horizontal" class="nav" theme="light" active-name="1" top-title  @on-select="curNav" >
              <Menu-item :name="item.name" v-for="item in nav.data" :key="item.id" ><router-link :to="item.url">{{ item.name }}</router-link></Menu-item>
          </Menu>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'Header',
  created(){
    this.$store.dispatch('getNavData');
  },  
  methods: {
    curNav(name){
      this.$store.commit('updateMetaTitle',name);
    }
  },
  computed: {
    ...mapState([
      'nav',
    ])
  }
}
</script>

<style lang="scss" scoped="">
  
  .nav{
    background: none; 
    padding-left: 14px;
    
    li{
      border: none !important;
    }

    &:after{
      display: none !important;
    }   
    
    .ivu-menu-item-active{
      border: none;
    }

    .ivu-menu-item-active a{
      color: #979797 !important;
    }
    .ivu-menu-item,.ivu-menu-submenu{
      color: #e4e4e4;
      font-size: 15px;

      a{
        color: #fff;
        display: block;
      }

      &:hover{
        color: #e4e4e4;
        border: none!important;
      }
    }
  }
</style>