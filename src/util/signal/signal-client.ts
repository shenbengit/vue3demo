/**
 * 信令客户端，基于socket.io
 */
import {io, Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";

export class SignalClient {

    private static _instance: SignalClient;

    /**
     * 在调用{@link connect}之后有值
     * @private
     */
    private declare socket: Socket;

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
        // client-side
        this.socket.on("connect", () => {
            this.connectionStatusCallbackList.forEach(item => {
                item.connected();
            });
        }).on("connect_error", (err: Error) => {
            this.connectionStatusCallbackList.forEach(item => {
                item.connectError(err);
            });
        }).on("disconnect", (reason: Socket.DisconnectReason) => {
            this.connectionStatusCallbackList.forEach(item => {
                item.disconnected(reason);
            });
        });
        this.socket.connect();
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


