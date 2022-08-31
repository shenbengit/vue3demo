export interface SrsRequestBean {
    sdp: string,
    streamurl: string
}

export interface SrsResponseBean {
    /**
     * 0:成功
     */
    code: number,
    sdp?: string,
    server?: string,
    sessionId?: string
}
