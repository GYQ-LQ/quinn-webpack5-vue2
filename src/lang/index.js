/*
 * @Date: 2019-10-16 14:47:31
 * @LastEditors: dingwen1
 * @LastEditTime: 2019-10-18 13:17:01
 * @Description:
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
// import esLocale from './es'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    'en-US': {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    'zh-CN': {
        ...zhLocale,
        ...elementZhLocale
    }
}

const allowLangs = ['en', 'en-US', 'zh', 'zh-CN']
const lang = window.navigator.language

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: allowLangs.includes(lang) ? lang : 'zh',
    // set locale messages
    messages
})

export default i18n
