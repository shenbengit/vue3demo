/**
 * 信令客户端，基于socket.io
 */
import {io, Socket} from "socket.io-client";
import {ConnectionStatusCallback} from "@/util/signal/connection-status-callback";

export class SignalClient {

    private static _instance: SignalClient
    // private socket: Socket = null;

    private constructor() {
        //私有构造方法
    }

    public static get instance(): SignalClient {
        if (!SignalClient._instance) {
            SignalClient._instance = new SignalClient();
        }
        return SignalClient._instance
    }

    private connectionStatusCallbackList: ConnectionStatusCallback[] = []

    public connect(url: string) {
        const socket = io(url);
        // client-side
        socket.on("connect", () => {
            this.connectionStatusCallbackList.forEach(item => {
                item.connected()
            })
        }).on("connect_error", (err: Error) => {
            this.connectionStatusCallbackList.forEach(item => {
                item.connectError(err)
            })
        }).on("disconnect", (reason: Socket.DisconnectReason) => {
            this.connectionStatusCallbackList.forEach(item => {
                item.disconnected(reason)
            })
        })
        socket.connect()
    }

    public addConnectionStatusCallback(callback?: ConnectionStatusCallback) {
        if (callback) {
            this.connectionStatusCallbackList.push(callback)
        }
    }

    public removeConnectionStatusCallback(callback?: ConnectionStatusCallback) {
        if (callback) {
            const index = this.connectionStatusCallbackList.indexOf(callback)
            if (index != -1) {
                this.connectionStatusCallbackList.splice(index, 1)
            }
        }
    }

}


