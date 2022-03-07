import {httpGet, httpPost} from "@/util/http";
import {ApiResponse, UserInfoBean, UserLoginBean, CheckUserIdBean, UserRegisterBean} from "@/bean/api-bean";

/**
 * 用户登录
 *
 * @param bean
 */
export function userLogin(bean: UserLoginBean): Promise<ApiResponse<UserInfoBean>> {
    return httpPost<ApiResponse<UserInfoBean>, UserLoginBean>("/srs_rtc/user/userLogin", bean);
}

/**
 * 校验用户Id是否可用
 *
 * @param bean
 */
export function checkUserId(bean: CheckUserIdBean): Promise<ApiResponse> {
    return httpPost<ApiResponse, CheckUserIdBean>("/srs_rtc/user/checkUserId", bean);
}

/**
 * 注册用户
 *
 * @param bean
 */
export function insertUser(bean: UserRegisterBean): Promise<ApiResponse> {
    return httpPost<ApiResponse, UserRegisterBean>("/srs_rtc/user/insertUser", bean);
}

/**
 * 根据用户id和用户类型获取用户信息
 *
 * @param userId
 * @param userType
 */
export function getUserInfo(userId: string, userType: string): Promise<ApiResponse<UserInfoBean>> {
    return httpGet<ApiResponse<UserInfoBean>>("/srs_rtc/user/insertUser", {
        params: {
            userId: userId,
            userType: userType
        }
    });
}
