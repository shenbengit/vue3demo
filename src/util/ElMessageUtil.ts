import {ElMessage} from "element-plus";

export function showSuccessMessage(msg: string) {
    ElMessage.success({
        showClose: true,
        message: msg,
        center: true
    });
}

export function showWarningMessage(msg: string) {
    ElMessage.warning({
        showClose: true,
        message: msg,
        center: true
    });
}

export function showInfoMessage(msg: string) {
    ElMessage.info({
        showClose: true,
        message: msg,
        center: true
    });
}

export function showErrorMessage(msg: string) {
    ElMessage.error({
        showClose: true,
        message: msg,
        center: true
    });
}

