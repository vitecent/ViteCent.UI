import axios, { AxiosInstance } from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import { Session } from '@/utils/storage';
import qs from 'qs';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import CryptoJS from 'crypto-js'
import { encryptAES, decryptAES } from '@/utils/encryption'

const AES_KEY = import.meta.env.VITE_AES_KEY
const ENCRYPT_REQUEST = import.meta.env.VITE_ENCRYPT_REQUEST
const ENCRYPT_RESPONSE = import.meta.env.VITE_ENCRYPT_RESPONSE

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
	if (count === 0)
		loading = ElLoading.service({
			lock: true,
			background: 'rgba(0, 0, 0, 0.35)',
		});

	count++;

	NProgress.start();
};

// 隐藏loading
const hideLoading = () => {
	count--;

	if (count === 0) loading?.close();

	NProgress.done();
};

// 添加时间戳和签名
const addSecurityHeaders = (config: any) => {
	const timestamp = Date.now()
	const sign = CryptoJS.HmacSHA256(
		`${timestamp}${JSON.stringify(config.data)}`,
		AES_KEY
	).toString()

	config.headers['X-Timestamp'] = timestamp
	config.headers['X-Signature'] = sign

	return config
}

// 添加Token
const addTokenHeaders = (config: any) => {
	if (Session.get('token'))
		config.headers!['Authorization'] = `${Session.get('token')}`;

	return config
}

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		showLoading();

		if (config.data && ENCRYPT_REQUEST === 'true')
			config.data = {
				data: encryptAES(config.data)
			};

		config = addTokenHeaders(config);

		config = addSecurityHeaders(config);

		return config;
	},
	error => {
		showLoading();

		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		hideLoading();

		if (response.data && response.data.data && ENCRYPT_RESPONSE === 'true') {
			var dataJson = decryptAES(response.data.data);

			if (dataJson !== '') {
				var json = JSON.parse(dataJson);

				if (json)
					response.data = json;
			}
		}

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
