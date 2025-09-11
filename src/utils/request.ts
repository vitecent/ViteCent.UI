import axios, { AxiosInstance } from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import { Session } from '@/utils/storage';
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let count = 0;
let loading: any = null;

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 显示loading
const showLoading = () => {
	if (count === 0) {
		loading = ElLoading.service({
			lock: true,
			background: 'rgba(0, 0, 0, 0.35)',
		});
	}
	count++;
	NProgress.start();
};

// 隐藏loading
const hideLoading = () => {
	count--;
	if (count === 0) {
		loading?.close();
	}
	NProgress.done();
};

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		showLoading();
		if (Session.get('token')) {
			config.headers!['Authorization'] = `${Session.get('token')}`;
		}
		return config;
	},
	error => {
		// 对请求错误做些什么
		showLoading();
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		hideLoading();
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 200) {
			if (res.message)
				ElMessage.error(res.message);
			return Promise.reject(service.interceptors.response);
		} else {
			return res;
		}
	},
	error => {
		// 对响应错误做点什么
		hideLoading();
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
