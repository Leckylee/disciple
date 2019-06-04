import axios from "axios"
import { isDev } from "./index"

// 代理的配置,如果有修改,需要在'/src/setupProxy.js'中同时配置
const DEFAULT_PROXY = "/proxy"
const CUSTORM_PROXY_PREFIX = new RegExp("^\\/api")

// 用于取消请求
const cancelSource = axios.CancelToken.source()

const axiosIns = axios.create({
    baseURL: "",
    timeout: 10000,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

// 修改请求路径的前缀,用于代理
const withPrefix = url => {
    // 自定义代理必须以"/api"开头
    const hasCustomPrefix = CUSTORM_PROXY_PREFIX.test(url)

    if (hasCustomPrefix) {
        if (isDev) {
            return url
        } else {
            // 生产模式下, 自动去除自定义proxy
            const urlArr = url.split("/")
            urlArr.splice(0, 2)
            const baseReqUrl = "/" + urlArr.join("/")

            return baseReqUrl
        }
    } else {
        return isDev ? DEFAULT_PROXY + url : url
    }
}

axiosIns.interceptors.request.use(
    config => {
        // 统一修改请求体,例如添加token
        const { url, headers } = config

        // if(token){
        //     headers.authorize=token
        // }

        return { ...config, url: withPrefix(url), headers, cancelToken: cancelSource.token }
    },
    error => Promise.reject(error)
)

axiosIns.interceptors.response.use(result => result.data, error => Promise.reject(error))

const get = (url, params = null, config = {}) => axiosIns.get(url, { ...config, params })
const post = axiosIns.post
const all = axiosIns.all
const cancelRequest = cancelSource.cancel
export { get, post, all, cancelRequest }
