import request from '@/utils/request';

/**
 * （不建议写成 request.post(xxx),因为这样 post 时,无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method page 分页
 */
export function useBuilderApi() {
    return {
        setting: (params?: object) => {
            return request({
                url: '/api/Builder/Builder/Setting',
                method: 'post',
                data: params,
            });
        },
        build: (params?: object) => {
            return request({
                url: '/api/Builder/Builder/Build',
                method: 'post',
                data: params,
            });
        },
    }
}

