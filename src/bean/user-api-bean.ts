export interface ApiResponse<T = any> {
    code: number
    msg: string,
    data: T,
}

export interface UserInfoBean {
    createdAt: string,
    id: number,
    userId: string,
    userType: string,
    username: string,
}

/**
 * 登录使用
 */
export interface UserLoginBean {
    userId: string,
    password: string,
    /**
     * 客户端：0
     * 管理端：1
     */
    userType: string,
}

/**
 * 校验用户id是否可用
 */
export interface CheckUserIdBean {
    userId: string,
    /**
     * 客户端：0
     * 管理端：1
     */
    userType: string,
}

/**
 * 注册使用
 */
export interface UserRegisterBean {
    userId: string,
    username: string,
    password: string,
    /**
     * 客户端：0
     * 管理端：1
     */
    userType: string,
}

