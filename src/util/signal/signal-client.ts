/**
 * 信令客户端，基于socket.io
 */
import {io, Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";
import {ref} from "vue";
import {Ref} from "@vue/reactivity";

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


