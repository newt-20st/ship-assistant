import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        channelList: ["highCon", "highStudy", "highSchoolNews", "juniorCon", "juniorStudy", "juniorSchoolNews"],
        channelData: {
            highCon: {
                name: "高校連絡事項",
            },
            highStudy: {
                name: "高校学習教材",
            },
            highSchoolNews: {
                name: "高校学校通信",
            },
            juniorCon: {
                name: "中学連絡事項",
            },
            juniorStudy: {
                name: "中学学習教材",
            },
            juniorSchoolNews: {
                name: "中学学校通信",
            },
        },
    },
    mutations: {
    }
})
export default store