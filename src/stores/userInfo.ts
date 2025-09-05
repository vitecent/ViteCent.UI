import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import { useLoginApi } from '@/api/login';

var api = useLoginApi();

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos = <UserInfos>await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		// 模拟接口数据

		async getApiUserInfo() {
			return api.getUserInfo().then(res => {
				return new Promise((resolve) => {
					// 模拟数据,请求接口时,记得删除多余代码及对应依赖的引入
					const username = res.data.name;
					// 模拟数据
					let defaultRoles: Array<string> = [];
					let defaultAuthBtnList: Array<string> = [];
					// admin 页面权限标识,对应路由 meta.roles,用于控制路由的显示/隐藏
					let adminRoles: Array<string> = ['admin'];
					// common 页面权限标识,对应路由 meta.roles,用于控制路由的显示/隐藏
					let commonRoles: Array<string> = ['common'];
					//  按钮权限标识
					let authBtnList: Array<string> = res.data.auth;
					// 不同用户模拟不同的用户权限
					if (res.data.isSuper === 1) {
						defaultRoles = adminRoles;
						defaultAuthBtnList = authBtnList;
					} else {
						defaultRoles = commonRoles;
						defaultAuthBtnList = authBtnList;
					}
					// 用户信息模拟数据
					const userInfos = {
						userName: username,
						photo: '/src/assets/logo-mini.svg',
						time: new Date().getTime(),
						roles: defaultRoles,
						authBtnList: defaultAuthBtnList,
					};
					Session.set('userInfo', userInfos);
					resolve(userInfos);
				});
			}).catch(error => {
				return new Promise((resolve) => {
					// common 页面权限标识,对应路由 meta.roles,用于控制路由的显示/隐藏
					let commonRoles: Array<string> = ['common'];
					//  按钮权限标识
					let authBtnList: Array<string> = [];
					// 用户信息模拟数据
					const userInfos = {
						userName: 'common',
						photo: '/src/assets/logo-mini.svg',
						time: new Date().getTime(),
						roles: commonRoles,
						authBtnList: authBtnList,
					};
					Session.set('userInfo', userInfos);
					resolve(userInfos);
				});
			});

		},
	},
});
