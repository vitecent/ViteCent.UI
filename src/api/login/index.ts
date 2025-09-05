import request from '@/utils/request';

/**
 * （不建议写成 request.post(xxx),因为这样 post 时,无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method login 用户登录
 * @getUserInfo 获取用户信息
 * @method loginout 用户退出登录
 */
export function useLoginApi() {
	return {
		login: (params?: object) => {
			return request({
				url: '/api/Auth/BaseUser/Login',
				method: 'post',
				data: params,
			});
		},
		getUserInfo: () => {
			return request({
				url: '/api/Auth/BaseUser/GetUserInfo',
				method: 'post',
				data: {},
			});
		},
		loginout: () => {
			return request({
				url: '/api/Auth/BaseUser/Loginout',
				method: 'post',
				data: {},
			});
		},
	};
}

