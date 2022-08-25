/*** 信令客户端，基于socket.io*/


import {io, Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";
import {Ref, ref} from "vue";
import {NOTIFY_CMD, CLIENT_NOTIFY_CMD} from "./signal-constant";
import {
    AcceptCallBean,
    HangUpBean,
    InviteSomeoneBean,
    InviteSomePeopleBean,
    JoinChatRoomBean,
    LeaveChatRoomBean,
    OfflineDuringCallBean,
    PlayStreamBean,
    RejectCallBean,
    RequestCallBean
} from "@/util/signal/signal-bean";

/**
 * socket.io 连接状态
 */
export enum SocketIoConnectionStatus {
    /**
     * 连接中
     */
    CONNECTING,

    /**
     * 已连接
     */
    CONNECTED,

    /**
     * 未连接
     */
    DISCONNECTED
}

/**
 * Socket.io 连接工具，单例模式
 */
export class SignalClient {

    private static _instance: SignalClient;

    /**
     * 在调用{@link connect}之后有值
     * @private
     */
    private declare socket: Socket;

    /**
     * 连接状态
     * @private
     */
    private connectionStatus = ref(SocketIoConnectionStatus.DISCONNECTED);

    private constructor() {
        //私有构造方法
    }

    public static getInstance(): SignalClient {
        if (!SignalClient._instance) {
            SignalClient._instance = new SignalClient();
        }
        return SignalClient._instance;
    }

    private connectionStatusCallbackList: ConnectionStatusCallback[] = [];

    public connect(userId: string) {
        const baseUrl = process.env.VUE_APP_BASE_SIGNAL_URL;
        this.socket = io(`${baseUrl}/srs_rtc/signal/client?userId=${userId}`);

        this.connectionStatus.value = SocketIoConnectionStatus.CONNECTING;

        // client-side
        this.socket.on("connect", () => {
            this.connectionStatus.value = SocketIoConnectionStatus.CONNECTED;
            this.connectionStatusCallbackList.forEach(item => {
                item.connected();
            });
        }).on("connect_error", (err: Error) => {
            this.connectionStatus.value = SocketIoConnectionStatus.DISCONNECTED;
            this.connectionStatusCallbackList.forEach(item => {
                item.connectError(err);
            });
        }).on("disconnect", (reason: Socket.DisconnectReason) => {
            this.connectionStatus.value = SocketIoConnectionStatus.DISCONNECTED;
            this.connectionStatusCallbackList.forEach(item => {
                item.disconnected(reason);
            });
        }).on(NOTIFY_CMD.NOTIFY_FORCED_OFFLINE, () => {
            //单点登录：强制下线

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_REQUEST_CALL, (bean: RequestCallBean) => {
            //通知请求通话
            console.log("NOTIFY_REQUEST_CALL: ", bean);
        }).on(CLIENT_NOTIFY_CMD.NOTIFY_INVITE_SOMEONE_JOIN_ROOM, (bean: InviteSomeoneBean) => {
            //通知邀请某人进入房间

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_INVITE_SOME_PEOPLE_JOIN_ROOM, (bean: InviteSomePeopleBean) => {
            //通知邀请某些人进入房间

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_REJECT_CALL, (bean: RejectCallBean) => {
            //通知拒接通话

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_ACCEPT_CALL, (bean: AcceptCallBean) => {
            //通知接受通话

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_JOIN_CHAT_ROOM, (bean: JoinChatRoomBean) => {
            //通知有人离开房间->用于聊天室

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_LEAVE_CHAT_ROOM, (bean: LeaveChatRoomBean) => {
            //通知有人离开房间->用于聊天室

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_PLAY_STREAM, (bean: PlayStreamBean) => {
            //通知拉流

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_HANG_UP, (bean: HangUpBean) => {
            //通知挂断

        }).on(CLIENT_NOTIFY_CMD.NOTIFY_OFFLINE_DURING_CALL, (bean: OfflineDuringCallBean) => {
            //通知房间内，有人通话中掉线

        });
        this.socket.connect();
    }

    public getConnectionStatus(): Ref<SocketIoConnectionStatus> {
        return this.connectionStatus;
    }

    public addConnectionStatusCallback(callback?: ConnectionStatusCallback) {
        if (callback) {
            this.connectionStatusCallbackList.push(callback);
        }
    }

    public removeConnectionStatusCallback(callback?: ConnectionStatusCallback) {
        if (callback) {
            const index = this.connectionStatusCallbackList.indexOf(callback);
            if (index != -1) {
                this.connectionStatusCallbackList.splice(index, 1);
            }
        }
    }

}


