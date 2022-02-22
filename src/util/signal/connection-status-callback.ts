import {Socket} from "socket.io-client";

/**
 * 连接状态回调
 */
export interface ConnectionStatusCallback {
    /**
     * 已连接
     */
    connected(): void;

    /**
     * 连接错误
     */
    connectError(err: Error): void;

    /**
     * 未连接
     */
    disconnected(reason: Socket.DisconnectReason): void;
}