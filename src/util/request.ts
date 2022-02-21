/* eslint-disable */
const axios = require('axios').default;

const config = {
    baseURL: "https://shencoder.work:9899",
    timeout: 10 * 1000, // Timeout
    withCredentials: true // Check cross-site Access-Control
};
export const http = axios.create(config);


export function getAllUserInfo() {
    http.get("/srs_rtc/user/getAllUserInfo").then((response: { data: any }) => { // 获取请求返回数据
        console.log("getAllUserInfo success:",response)
    }).catch((reason: any) => {
        console.log("getAllUserInfo error:",reason)
    })
}

// export default {
//     get,
//     getAllUserInfo
// }

