import {httpPost} from "@/util/http";
import {SrsRequestBean, SrsResponseBean} from "@/bean/srs-api-bean";

const BASE_SRS_URL = process.env.VUE_APP_BASE_SRS_URL as string;
const PLAY_URL = BASE_SRS_URL + "/rtc/v1/play/";
const PUBLISH_URL = BASE_SRS_URL + "/rtc/v1/publish/";

export function requestPlayStream(bean: SrsRequestBean): Promise<SrsResponseBean> {
    return httpPost<SrsResponseBean, SrsRequestBean>(PLAY_URL, bean);
}

export function requestPublishStream(bean: SrsRequestBean): Promise<SrsResponseBean> {
    return httpPost<SrsResponseBean, SrsRequestBean>(PUBLISH_URL, bean);
}
