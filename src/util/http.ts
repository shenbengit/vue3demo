import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

const config = {
    baseURL: /*读取配置文件*/process.env.VUE_APP_BASE_API_URL,
    timeout: 10 * 1000,
    withCredentials: true
};

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    //请求拦截器
    return config;
};

const http: AxiosInstance = axios.create(config);
http.interceptors.request.use(requestInterceptor, error => Promise.reject(error))
http.interceptors.response.use(response => Promise.resolve(response), error => Promise.reject(error))

export function httpRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const promise = http.request<T, AxiosResponse<T>>(config);
    return convertAxiosResponse(promise);
}

export function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.get<T, AxiosResponse<T>>(url, config);
    return convertAxiosResponse(promise);
}

export function httpDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.delete<T, AxiosResponse<T>>(url, config);
    return convertAxiosResponse(promise);
}

export function httpHead<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.head<T, AxiosResponse<T>>(url, config);
    return convertAxiosResponse(promise);
}

export function httpOptions<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.options<T, AxiosResponse<T>>(url, config);
    return convertAxiosResponse(promise);
}

export function httpPost<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.post<T, AxiosResponse<T>, D>(url, data, config)
    return convertAxiosResponse(promise);
}

export function httpPut<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.put<T, AxiosResponse<T>, D>(url, data, config);
    return convertAxiosResponse(promise);
}

export function httpPatch<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const promise = http.patch<T, AxiosResponse<T>, D>(url, data, config);
    return convertAxiosResponse(promise);
}

/**
 * @param axiosPromise AxiosResponse<T>
 */
function convertAxiosResponse<T>(axiosPromise: Promise<AxiosResponse<T>>): Promise<T> {
    return new Promise(function (resolve, reject) {
        axiosPromise.then(response => {
            resolve(response.data)
        }).then(err => {
            reject(err)
        });
    });
}

