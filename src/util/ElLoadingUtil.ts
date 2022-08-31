import {ElLoading} from "element-plus";

export function getElLoading(msg?: string) {
    return ElLoading.service({
        lock: true,
        text: msg ?? "Loading",
        background: "rgba(0, 0, 0, 0.7)"
    });
}
