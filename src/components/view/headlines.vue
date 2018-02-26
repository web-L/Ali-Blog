<template>
  <div class="container relative headlines-list">
    <Tabs :v-model="uczzData.thisChannel" @on-click="cutChannel">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Tab-pane v-for="(item,index) in uczzData.channel" :key="index" :label="item.name" :name="item.id+''">
            <Row>
                <transition-group name="list" class="transition-list" tag="div">
                    <Col span="6" v-for="(item2,index) in item.articles" :key="index" >
                        <Card class="card-item" >
                            <div style="text-align:center" @click="openDetail(item2.id,item2.cmt_cnt)">
                                <div class="thumbnail-box">
                                    <img :title="item2.title" :alt="item2.title" v-if="item2.thumbnails.length >= 1" :src="item2.thumbnails[0].url+'&height=140&width=238'" >
                                    <p v-else><Icon type="sad-outline" class="icon-outline-diy"></Icon>没有找到图片...</p>
                                </div>
                                <h3 class="title">{{item2.title}}</h3>
                                <div class="info">
                                    <span class="source">{{item2.source_name}}</span>
                                    <span class="date">{{item2.publish_time | timeFilter('date')}}</span>
                                    <span class="time">{{item2.publish_time | timeFilter('time')}}</span>
                                    <span class="cmt-cut"><Icon type="chatbubble-working"></Icon>评论(<b>{{item2.cmt_cnt}}</b>)</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </transition-group>
                <Col span="6" >
                    <Card class="card-item" style="height:225px;">
                        <div style="text-align:center" >
                            <Icon type="load-a" :class="{'load-active': isIconLoad}" class="load-a-diy "></Icon>
                            <Button type="dashed" @click="loadMore">加载更多</Button>
                            <Button type="dashed" @click="againLoad">重新加载</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Tab-pane>
    </Tabs>
    <Modal
        v-model="detailModel"
        :mask-closable="false"
        class-name="detail-modal-wrap article-detail"
        width="900px"
        @on-cancel="closeDetail"
        ref="detailModel"
    >
        <h2 class="detail-title">{{uczzData.detail.title}}</h2>
        <div class="detail-content" v-html="uczzData.detail.content" @click="clickCon"></div>
        <div class="article-comments">
            <h2 class="title">热门评论</h2>
            <div class="comments">
                <div class="article-comment" v-for="commentItem in uczzData.detail.comments" :key="commentItem.id">
                    <div class="user">
                        <img class="avatar" :src="commentItem.user.faceimg">
                        <div class="user-info">
                            <div class="name">{{commentItem.user.nickname}}</div>
                            <div class="time">{{commentItem.timeShow | timeFilter('date')}}&nbsp;{{commentItem.timeShow | timeFilter('time')}}</div>
                        </div>
                    </div>
                    <div class="favor "><span class="count">{{commentItem.up_cnt}}</span><span class="laud"><img src="/static/images/laud.png" width="22" alt=""></span>
                    </div>
                    <div class="content">{{commentItem.content}}</div>
                </div>
            </div>
        </div>
        <a href="javascript:void(0);" class="back-top" @click="backTop"><Icon type="arrow-up-b "></Icon></a>
        <p slot="footer"></p>
    </Modal>
    <div ref="refVido" style="display:none;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'v-headlines',
  data: () => {
    return {
        detailModel: false,
        isIconLoad: false,
        spinShow: false,
    }
  },
  created(){
    this.cutChannel(100);
  },
  filters:{
      // 时间，日期过虑
      timeFilter(val,type){
        let time = new Date(val);
        function zeroize(val){
            return parseInt(val) >= 10 ? val : '0'+val;
        }
        if(type === "date"){
            return zeroize((time.getMonth()+1))+'-'+zeroize(time.getDate());
        }
        if( type === 'time' ){
            return zeroize(time.getHours())+':'+zeroize(time.getMinutes());
        }
      }
  },
  methods: {
    backTop(event){
        event.path.forEach(elem => {
            if(elem.className === 'ivu-modal-body'){
                this.scrollTopMove(elem,200);
            }
        });
    },
    scrollTopMove(elem,sp){
        let num = elem.scrollTop;
        let time = null;
        time = setInterval(function () {
            num -= sp;
            elem.scrollTop = num;
            if( num <= 0 ){
                clearInterval(time);
                return;
            }
        },10);
    },
    // 点击内容
    clickCon(event){
        this.scalableImg(event);
        this.playVideo(event);
    },
    // 扩展文章内容 图片
    scalableImg(ev){
        if(ev.target.nodeName === 'IMG'){
            if( ev.target.className === "scalable limited" ){
                ev.target.classList.remove("limited");
            }else{
                ev.target.classList.add("limited");
            }
        }
    },
    // 播放内容 视频
    playVideo(ev){
        if( ev.target.nodeName === "path" || ev.target.nodeName === "svg" || ev.target.getAttribute('id') === 'videoClick' ){
            for (let index = 0; index < ev.path.length; index++) {
                let node = ev.path[index];
                if( ev.path[index].getAttribute('id') === 'videoClick'){
                    this.$http.get('/api/getUczzdVideo',{
                        params: {url: ev.path[index].getAttribute("data-src")}
                    }).then( (result) => {
                        let videoNode = document.createElement("video");
                        videoNode.src = result.data.data.cdn_url;
                        videoNode.controls = "controls";
                        videoNode.autoplay = "autoplay";
                        videoNode.poster = result.data.data.thumbnail;
                        ev.path[index].parentNode.insertBefore(videoNode,ev.path[index]);
                        ev.path[index].parentNode.removeChild(node);
                    });
                    break;
                };
            };
        }
    },
    // 打开详情
    openDetail(id,cmt_cnt){
        this.$store.dispatch('getArticleDetail', id).then( () => {
            this.detailModel = true;
            this.$store.dispatch('getCommentsData', {total: cmt_cnt, current: 1,detailId: id});
            this.$store.commit('updateMetaTitle',this.uczzData.detail.title);
        });
    },
    // 关闭详情
    closeDetail(){
        this.$store.commit('emptyArticleDetail',this.uczzData.thisChannel);
        this.$store.commit('updateMetaTitle',this.getThisChannel().name);
    },
    // 加载更多频道文章
    loadMore(){
        this.isIconLoad = true;
        this.$store.dispatch('getChannelArticlesData', { channelId: this.uczzData.thisChannel, method: 'his' }).then( () => {
            this.isIconLoad = false;
        });
    },
    // 刷新频道文章
    againLoad(){
        this.isIconLoad = true;
        this.$store.commit('emptyChannelArticleData',this.uczzData.thisChannel);
        this.$store.dispatch('getChannelArticlesData', { channelId: this.uczzData.thisChannel, method: 'new' }).then( () => {
            this.isIconLoad = false;
        });
    },
    // 切换频道
    cutChannel(val){
        let channelItem = this.getThisChannel(val);
        this.$store.commit('cutChannel',val);
        if (channelItem.articles.length <= 0) {
            this.spinShow = true;
           this.$store.dispatch('getChannelArticlesData', { channelId: channelItem.id, method: channelItem.method }).then( () => {
               this.spinShow = false;
           });
        };
    },
    // 获取当前频道
    getThisChannel(channelid) {
        let channelItem = null;
        let id = channelid ? channelid : this.uczzData.thisChannel;
        this.uczzData.channel.forEach(item => {
            if (parseInt(id) === item.id) {
                channelItem = item;
            };
        });
        return channelItem;
    },
  },
  computed: {
    ...mapState([
        'uczzData'
    ])
  },
  components: {

  }
}
</script>

<style>

    .transition-list .ivu-col-span-6{
        transition: all 1s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateY(30px);
    }
    .list-leave-active {
        position: absolute;
    }

    .headlines-list .ivu-card-body{
        padding:0;
    }
    .headlines-list .ivu-tabs .ivu-tabs-tabpane{
        padding-left: 8px;
    }

    .headlines-list .ivu-card{
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .headlines-list .ivu-card:hover{
        -webkit-transform: translate(0px,-4px);
        transform: translate(0px,-4px);
    }
    .headlines-list .ivu-tabs-bar{
        border-color:#c1c1c1;
    }
    .headlines-list .ivu-tabs-nav-wrap{
        margin: 0 10px;
    }
    .headlines-list .title{
        margin: 15px 10px 10px;
        color: #333;
        font-size: 14px;
        height: 32px;
        line-height: 16px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
    .headlines-list .info{
        margin: 0 10px 10px;
        color: #999;
        font-size: 12px;
        text-align: left;
    }
    .headlines-list .load-a-diy{
        display: block;
        font-size: 46px;
        margin-top: 60px;
        margin-bottom: 10px;
        color: #090e08;
    }
    .headlines-list .load-active{
        -webkit-animation: load-rotate 1s linear;
        -webkit-animation-iteration-count:infinite;
        animation: load-rotate 1s linear;
        animation-iteration-count:infinite;
    }
    @-webkit-keyframes load-rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    @keyframes load-rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .headlines-list .ivu-tabs-tabpane .ivu-row{
        max-height: 940px;
        min-height: 706px;
        overflow: auto;
    }
    .headlines-list .thumbnail-box{
        height: 140px;
        overflow: hidden;
        position: relative;
    }
    .headlines-list .thumbnail-box img,.headlines-list .thumbnail-box p{
        position: relative;
        z-index: 2;
    }
    .headlines-list .thumbnail-box p{
        background: #fff;
    }
    .headlines-list .thumbnail-box::after {
        content: "\F45A";
        position: absolute;
        top: 44px;
        left: 42%;
        font-size: 46px;
        color: #090e08;
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
        -webkit-animation: load-rotate 1s linear;
        -webkit-animation-iteration-count:infinite;
        animation: load-rotate 1s linear;
        animation-iteration-count:infinite;
    }

    .icon-outline-diy{
        font-size:22px;
        margin-top:68px;
        vertical-align: sub;
        margin-right: 6px;
    }
    .card-item{
        width: 240px;
    }

    .detail-modal-wrap{
        overflow: hidden;
        height: 100%;
     }
    .detail-modal-wrap .ivu-modal-body{
        height: 100%;
        overflow-y: scroll;
     }
    .detail-modal-wrap .ivu-modal-footer{
        display: none;
    }
    .detail-modal-wrap .ivu-modal{
        padding-right: 40px;
        top: 0;
    }
    .detail-modal-wrap .ivu-modal-close{
        right: -30px;
        top: -8px;
        transition: transform .4s;
    }
    .detail-modal-wrap .ivu-modal-close:hover{
        transform: rotate(-180deg);
    }
    .detail-modal-wrap .ivu-modal-close .ivu-icon-ios-close-empty{
        font-size: 48px;
        color: #fff;
    }
    .detail-modal-wrap .detail-title{
        font-size: 24px;
        text-align: center;
        font-weight: 400;
        padding-right: 40px;
        color: #070c06;
        margin: 20px 0;
    }
    .detail-modal-wrap .news-stream .video-poster {
        width: 420px;
        height: 270px;
        background-size: cover;
        margin: 0 auto;
        cursor: pointer;
        text-align: center;
    }


    .detail-modal-wrap .detail-content * {
        font-size: 16px;
        color: #666;
    }
    .detail-modal-wrap .detail-content p{
         padding: 10px 30px;
        line-height: 30px;
        letter-spacing: 1px;
    }
    .detail-modal-wrap .detail-content img{
        max-width: 88%;
        display: block;
        margin: 10px auto;
    }
    .detail-modal-wrap .detail-content img.scalable {
        cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAlVJREFUOBF1U72LE0EUn5nExMIYiRAQtBKbpLwgYiEpBbHVysMPtDg8sL6/wkL0CsXOwkrEQlDIXW1AEEwjBxaia3Y3O5PJ5pJsdp+/N+euSeGD4X38fvPxPkYSkZJSZgISGnOVSN4TUlwWgs4QiQMpxQeVlnYbjRNfwJXMA59YF8JAqMe7SxgssNPAjIf2cOb8yE4oiMw2b0BAFRtzI4iiJ8wMtBmHkXn0W+vznuc1Q2vbobGP4/mCUsajaJP39Hq9cr5XDKPoymyZ8uYYKVwqgBXD1/r+InMXBJ5nmwwVL8Fznx/dPt5h4BtRFX6JCf1+/1hODIx5yzw+jHmMsUY+tDFNlkKV1TsO/NjbS1EkXlmn00kGg4F7rszkm6MNaoO1tdYVsozy1w6nU1oKsgz4vr9W4Var5TqE4IhxElRj3e12HU+hh78a9ZNSEZ1joN1ul1iviPNJZhc4JoX8+RdzLVVZRh/ZklJtMYADFki1glXmeiCV+Vf4YDzgp6QZ9ZhXSBiGZ9EB69o00q6QBQgDB1VDbV5BYz7M5xyD+28ehlrfmMz4YibpfVR8G/pmoPWOr80Bx3FJirUE9pAP4VlAWBb99EfmGgjfmbwq/DK07hOwebxIiIcKh7h0X6PdrhDglLh16EBNVCrX8TMuosF1QdLLUtpvnq6/xxTerlSPv0ySRFSqVZHMFluNU7VneUrr41lE1w38h00TTymyMU1mc8IU311j4CX59HF+PI2seaHL5AYqjMZ3+JMlCCCt2KWwdsp/HPCZy18fP9XcEhk9lUq++ANGG86YOxQgKgAAAABJRU5ErkJggg==), pointer;
    }
    .detail-modal-wrap .detail-content img.limited {
        max-height: 420px;
    }
    .detail-modal-wrap .video-poster {
        width: 420px;
        height: 270px;
        background-size: cover;
        margin: 0 auto;
        cursor: pointer;
        text-align: center;
    }
    .detail-modal-wrap .video-poster .icon-play {
        fill: #fff;
        height: 40%;
        margin: 20%;
    }
    .detail-modal-wrap video {
        display: block;
        margin: 5px auto;
        width: 80%;
    }
    .cmt-cut{
        float: right;
    }
    .headlines-list .info .ivu-icon{
        font-size: 14px;
        vertical-align: bottom;
        margin-right: 4px;
        color: #6f6f6f;
    }
    .article-detail .article-comments {
        padding: 0 20px;
    }
    .article-detail .article-comments .title {
        font-size: 16px;
        text-align: center;
        margin: 30px;
        color: #0b100a;
        font-weight: bold;
    }
    .article-detail .article-comments .user{
        position: relative;
        font-size: 14px;
    }
    .article-detail .article-comments .avatar{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
    }
    .article-detail .article-comments .user-info{
        color: #999;
        margin: 10px 0 0 35px;
    }
    .article-detail .article-comments .favor {
        min-width: 40px;
        float: right;
        margin: -30px 20px;
        cursor: pointer;
        z-index: 99;
        position: relative;
        color: #999;
    }
    .article-detail .article-comments .content{
        margin: 0 20px 16px;
        padding: 15px 0 15px 15px;
        color: #666;
        border-bottom: 1px solid #dddfe1;
    }
     .article-detail .article-comments .laud{
         display: inline-block;
        vertical-align: bottom;
        margin-left: 4px;
     }
    .headlines-list .source{
        max-width: 70px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .article-detail .back-top{
        position: absolute;
        bottom: 28px;
        right: -44px;
        background: #fff;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        text-align: center;
        font-size: 22px;
        color: black;
    }
    .article-detail .ivu-modal-content,.article-detail .ivu-modal{
        height: 100%;
    }

</style>
