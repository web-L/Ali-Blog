import Vue from 'vue'
import Vuex from 'vuex'
import $http from 'axios'
import iView from 'iview'

Vue.use(Vuex);

$http.interceptors.response.use(function(response){
    if (response.data.status&& response.data.code !== 200){
        iView.Message.error(response.data.message || '获取数据异常！');
    }
    return response;
} ,function(error){
    iView.Message.error('获取数据异常！');
    return Promise.reject(error);
} );

export default new Vuex.Store({
    state: {
        metaInfoData: {
            api: '/api/getMetaInfo',
            data: null
        },
        nav: {
            api: '/api/getColumn',
            data: []
        },
        articleLists: {
            news: {
                api: '/api/getArticle',
                data:[],
                page: 1,
                total: 0
            },
            hot: {
                data: []
            },
            recommend: {
                api: '/api/getTagArticle',
                data: []
            },
            content: {
                api: '/api/getDetailsArticle',
                data: {}
            },
            leftColumnData: [],
            category: {
                api: '/api/getClassifyArticle',
                item: {},
                data: [],
                page: 1,
                total: 0
            }
        },
        categoryData: {
            api: '/api/getCategory',
            data: []
        },
        tagData: {
            api: '/api/getTag'
        },
        uczzData: {
            api: {
                channel: '/api/getUczzdArticle',
                detail: '/api/getUczzdArticleDetailed',
                comments: '/api/getUczzdArticleComments'
            },
            channel: [
                {
                    id: 100,
                    name: '推荐',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 10016,
                    name: '视频',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 51830095,
                    name: '热点',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 1192652582,
                    name: '社会',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 179223212,
                    name: '娱乐',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 1525483516,
                    name: '科技',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 1001932710,
                    name: '国际',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 835729,
                    name: '数码',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 242677432,
                    name: '互联网',
                    articles: [],
                    method: 'his',
                },
                {
                    id: 323644874,
                    name: "汽车",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 200,
                    name: "本地",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 1105405272,
                    name: "军事",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 696724,
                    name: "商业",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 169476544,
                    name: "游戏",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 472933935,
                    name: "健康",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 10013,
                    name: "趣图",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 10005,
                    name: "收藏",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 23154031,
                    name: "奥运会",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 10000,
                    name: "美食",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 674534,
                    name: "健身",
                    articles: [],
                    method: 'his',
                },
                {
                    id: 90005,
                    name: "美容瘦身",
                    articles: [],
                    method: 'his',
                },
            ],
            detail: {
                title: '',
                content: '',
                mapData: null,
                comments: null,
            },
            thisChannel: '100',
            
        }
    },
    mutations: {
        receiveNavData( state , {data} ){
            state.nav.data = data.data;
        },
        receiveNewsArticleData(state,{data}){
            state.articleLists.news.data = data.data;
            state.articleLists.news.page = parseInt(data.pageInfo.current);
            state.articleLists.news.total = data.pageInfo.total;
        },
        receiveHotArticleData(state, { data }) {
            state.articleLists.hot.data = data.data;
        },
        receiveRecommendArticleData(state, { data }) {
            state.articleLists.recommend.data = data.data;
        },
        receiveContentArticleData(state, dataRes) {
            state.articleLists.content.data = dataRes.articleRes.data.data;
            state.articleLists.content.tags = dataRes.tagRes.data.data;
        },
        receiveLeftColumnData(state, { data }) {
            state.articleLists.leftColumnData = data.data;
        },
        receiveCategoryData(state, {data}) {
            state.categoryData.data = data.data;
        },
        deleteContentArticle(state){
            state.articleLists.content.data = {};
            state.articleLists.content.tags = {};
        },
        receiveCategoryArticle(state, { data }){
            state.articleLists.category.data = data.data;
            state.articleLists.category.page = parseInt(data.pageInfo.current);
            state.articleLists.category.total = data.pageInfo.total;
            state.articleLists.category.item = data.categoryInfo && data.categoryInfo[0];
        },
        cutCategoryArticle(state,data){
            state.articleLists.category.item = data;
        },
        receiveChannelArticleData(state, { data, channelId }){
            let channelItem = null;
            state.uczzData.channel.forEach(item => {
                if (parseInt(channelId) === item.id) {
                    channelItem = item;
                };
            });
            for (const key in data) {
                channelItem.articles.push(data[key]);
            }
            state.uczzData.thisChannel = channelId+'';
            channelItem.method = 'his';
        },
        cutChannel(state, channelId){
            state.uczzData.thisChannel = channelId + '';
        },
        emptyChannelArticleData(state,channelId){
            let channelItem = null;
            state.uczzData.channel.forEach(item => {
                if (parseInt(channelId) === item.id) {
                    channelItem = item;
                };
            });
            channelItem.articles = [];
        },
        emptyArticleDetail(state){
            state.uczzData.detail.title = '';
            state.uczzData.detail.content = '';
            state.uczzData.detail.comments = null;
        },
        receiveDetaileData(state,detail) {
            let videosArr = detail.data.videos,
                imagesArr = detail.data.images,
                elem = detail.data.content;

            elem = elem.replace(new RegExp('<!--', 'g'), '');
            elem = elem.replace(new RegExp('-->', 'g'), '');
            for (let index = 0; index < elem.length; index++) {
                if (elem.indexOf("{") === -1) break;
                let str = elem.substring(elem.indexOf("{") + 1, elem.indexOf("}"));
                let arr = str.split(":");

                if (arr[0] === "video") {
                    let videoStr = `<div class="video-poster" id="videoClick" style="background-image: url(${videosArr[parseInt(arr[1])].poster.url})" data-src="${videosArr[parseInt(arr[1])].url}">
                                <svg class="icon-play disable-event" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1813">
                                    <path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM512 960c-247.424 0-448-200.576-448-448s200.576-448 448-448 448 200.576 448 448S759.424 960 512 960zM384 256 768 512 384 768Z" p-id="1814"></path>
                                </svg>
                            </div>`;
                    elem = elem.replace(`{${str}}`, videoStr);
                }

                if (arr[0] === "img") {
                    if (imagesArr[parseInt(arr[1])].width > 420) {
                        elem = elem.replace(`{${str}}`, `<img src="${imagesArr[parseInt(arr[1])].url}" class="scalable limited"/>`);
                    } else {
                        elem = elem.replace(`{${str}}`, `<img src="${imagesArr[parseInt(arr[1])].url}" />`);
                    }
                }
            };
            state.uczzData.detail.title = detail.data.title;
            state.uczzData.detail.content = elem;
        },
        receiveCommentsData(state,data){
            state.uczzData.detail.comments = data.data.comments_map 
        },
        receiveMetaInfoData(state, data){
            state.metaInfoData.data = data.data;
        },
        updateMetaTitle(state, title){
            state.metaInfoData.data.title = state.metaInfoData.data.title === undefined ? state.metaInfoData.data.site_title : state.metaInfoData.data.title;
            state.metaInfoData.data.site_title = `${title} | ${state.metaInfoData.data.title}`;
        }
    },
    actions: {
        async getNavData({ commit, state } ){
            const result = await $http.get(state.nav.api);
            if (result.status === 200){
                commit("receiveNavData", result);
            };
        },
        async getNewsArticleData({ commit, state },pageParams){
            const params = pageParams || { limit: 10, offset: 0, field: 'id', order: 'desc' };
            const result = await $http.get(state.articleLists.news.api, {
                params: params
            });
            if (result.data.code === 200) {
                commit(params.dataType||"receiveNewsArticleData", result);
            };
        },
        async getHotArticleData({ commit, state }, params) {
            const httpParams = params || { limit: 10, offset: 0, field: 'id', order: 'desc'};
            const result = await $http.get(state.articleLists.news.api, {
                params: httpParams
            });
            if (result.data.code === 200) {
                commit("receiveHotArticleData", result);
            };
        },
        async getRecommendArticleData({ commit, state }, params) {
            const httpParams = params || { limit: 8, tag: '推荐' };
            const result = await $http.get(state.articleLists.recommend.api, {
                params: httpParams
            });
            if (result.data.code === 200) {
                commit("receiveRecommendArticleData", result);
            };
        },
        async getCategoryArticleData({ commit, state }, params) {
            const httpParams = params || { limit: 10};
            const result = await $http.get(state.articleLists.category.api, {
                params: httpParams
            });
            if (result.data.code === 200) {
                commit("receiveCategoryArticle", result);
            };
        },
        async getContentArticleData({ commit, state }, params) {
            const articleRes = await $http.get(state.articleLists.content.api, {
                params: params
            });
            const tagRes = await $http.get(state.tagData.api, {
                params: { articleId: articleRes.data.data.tag_id}
            });
            if (articleRes.data.code === 200 && tagRes.data.code === 200) {
                commit("receiveContentArticleData", { articleRes, tagRes});
            };
        },
        async getCategoryData({ commit, state }) {
            const result = await $http.get(state.categoryData.api);
            if (result.data.code === 200) {
                commit("receiveCategoryData", result);
            };
        },
        async getChannelArticlesData({ commit, state }, { channelId, method }){
            const result = await $http.get(state.uczzData.api.channel, {
                params: { channel: channelId, method: method }
            });
            if (result.data.message === 'ok') {
                commit("receiveChannelArticleData", { channelId: channelId, data: result.data.data.articles });                
            }
        },
        async getArticleDetail({ commit, state }, detailId){
            const result = await $http.get(state.uczzData.api.detail, {
                params: { id: detailId }
            });
            if (result.data.message === 'ok') {
                commit('receiveDetaileData', result.data);
            };
        },
        async getCommentsData({ commit, state }, { total, current, detailId}){
            const result = await $http.get(state.uczzData.api.comments, {
                params: { id: detailId, total: total || 0, current: 1}
            });
            if (result.data.message === 'ok') {
                commit('receiveCommentsData', result.data);
            };
        },
        async getMetaInfoData({ commit, state }){
            const result = await $http.get(state.metaInfoData.api);
            if (result.data.code === 200) {
                commit('receiveMetaInfoData', result.data);
            };
        }
    }
});