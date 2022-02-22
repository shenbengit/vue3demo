export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

export interface UserInfoBean {
    createdAt: string;
    id: number;
    userId: string;
    userType: string;
    username: string;
}

/**
 * 登录使用
 */
export interface UserLoginBean {
    userId: string;
    password: string;
    /**
     * 客户端：0
     * 管理端：1
     */
    userType: string;
}

