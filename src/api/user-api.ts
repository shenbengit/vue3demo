import {httpGet, httpPost} from "@/util/http";
import {ApiResponse, UserInfoBean, UserLoginBean} from "@/bean/api-bean";

/**
 * 用户登录
 *
 * @param bean
 */
export function userLogin(bean: UserLoginBean): Promise<ApiResponse<UserInfoBean>> {
    return httpPost<ApiResponse<UserInfoBean>, UserLoginBean>("/srs_rtc/user/userLogin", bean);
}
