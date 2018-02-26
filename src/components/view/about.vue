<template>
    <div class="container relative">
        <div class="about">
            <Card :bordered="false">
                <p slot="title">个人简介</p>
                <p><b>网名：</b>Ali</p>
                <p><b>星座：</b>天蝎座</p>
                <p><b>职业：</b>前端工程师</p>
                <p><b>爱好：</b>听音乐、看电影、旅游</p>
                <p><b>自我说明</b>：一名热爱前端开发实践者</p>
                <div><b>关于前端入门：</b>
                    <p style="text-indent: 28px;">2014年.夏，学校开了一门课程叫 网页制作 当时学的是 Dreamweaver、PS、Flash 也叫网页制作三剑客，那时教的是用表格做网页为了完成老师布置的作业，在网上找模版找素材东拼西凑，不懂 html、css、js 折腾了很久才弄出看起来类似Word
                    页面，后面还居然还获奖了，从那之后有了这方面兴趣，一到周末去网吧各种百度找资料老是上网觉得太贵就买了人生第一台电脑，之后过了很长时间才知道原来有个职业叫 前端开发 直到毕业出来实习，这段时间一直是自学（不得不说自学真的很痛苦）对前端认识还是九牛一毛，
                    实习那段日子过得很黑暗，始终觉得不甘心花了所有实习工资 2015年8月28日 报 潭州学院 成vip学员，之后每天如饥似渴从 html、css、div+css布局，实习结束后又在家待了四个多月，学完了 Js、CSS3、Html5,
                    一个人去了广东开始找工作 害怕找不到工作又恶补找工作写简历的技巧，害怕工作中技术不行又用jQuery写各种网上的常见交互特效，2016年中旬找到第一份前端工作在前端这个行业中，然后越走越远....
                    </p>
                </div>
            </Card>
            <Card :bordered="false">
                <p slot="title">励志名言</p>
                <p>付出不来于任何人的努力</p>
                <p>谦虚戒骄</p>
                <p>天天反省</p>
                <p>活着就要感谢</p>
                <p>积行善、思利他</p>
                <p>不要有感性的烦恼</p>
                <p class="mark">--活法</p>
            </Card>
        </div>
    </div>
</template>

<script>

export default {
  name: 'v-about',
  mounted(){
    
  },
  methods: {
    
  },
}
</script>

<style>
  .about .ivu-card-body p{
          line-height: 34px;
  }
  .about .mark{
      padding: 0 106px;
  }
</style>
