/**
 * 用户登录
 */
export class UserLoginEntity {
    public userId = "";
    public password = "";
    /**
     * 客户端：0
     * 管理端：1
     */
    public userType = "";
}

/**
 * 用户注册
 */
export class UserRegisterEntity {
    public userId = "";
    public username = "";
    public password = "";
    /**
     * 保留字段，提交接口不用
     */
    public passwordAgain = "";
    /**
     * 客户端：0
     * 管理端：1
     */
    public userType = "";
}