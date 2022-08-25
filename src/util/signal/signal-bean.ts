/**
 * 信令-客户端信息
 */
export interface ClientInfoBean {
    createdAt: string;
    id: number;
    userId: string;
    userType: string;
    username: string;
}

export interface RequestCallBean {
    /**
     * 邀请人信息
     */
    inviteInfo: ClientInfoBean,
    /**
     * 邀请人同时邀请除自己之外其他人信息
     */
    callList: ClientInfoBean[] | null,
    /**
     * 房间号
     */
    roomId: string
}

export interface InviteSomeoneBean {
    /**
     * 邀请人信息
     */
    inviteInfo: ClientInfoBean,
    /**
     * 邀请人信息
     */
    inviteeInfo: ClientInfoBean,
    /**
     * 房间号
     */
    roomId: string
}

export interface InviteSomePeopleBean {
    /**
     * 邀请人信息
     */
    inviteInfo: ClientInfoBean,
    /**
     * 被邀请列表
     */
    inviteeInfoList: ClientInfoBean[],
    /**
     * 房间号
     */
    roomId: string
}

export interface RejectCallBean {
    /**
     * 拒接人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 是否需要结束通话
     */
    callEnded: boolean,
    /**
     * 房间号
     */
    roomId: string
}

export interface AcceptCallBean {
    /**
     * 接听人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 房间号
     */
    roomId: string
}

export interface JoinChatRoomBean {
    /**
     * 接听人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 房间号
     */
    roomId: string
}

export interface LeaveChatRoomBean {
    /**
     * 离开人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 房间号
     */
    roomId: string
}

export interface PlayStreamBean {
    /**
     * 接听人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 推流地址
     */
    publishStreamUrl: string,
    /**
     * 房间号
     */
    roomId: string
}

export interface HangUpBean {
    /**
     * 拒接人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 是否需要结束通话
     */
    callEnded: boolean,
    /**
     * 房间号
     */
    roomId: string
}

export interface OfflineDuringCallBean {
    /**
     * 拒接人信息
     */
    userInfo: ClientInfoBean,
    /**
     * 是否需要结束通话
     */
    callEnded: boolean,
    /**
     * 断开连接原因
     */
    reason: string | null,
    /**
     * 房间号
     */
    roomId: string
}


