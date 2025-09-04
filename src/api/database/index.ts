import request from '@/utils/request';

/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method page 分页
 */
export function useDatabaseApi() {
    return {
        page: (params?: object) => {
            return request({
                url: '/api/Database/BaseDatabase/Page',
                method: 'post',
                data: params,
            });
        },
        get: (params?: object) => {
            return request({
                url: '/api/Database/BaseDatabase/Get',
                method: 'post',
                data: params,
            });
        }
    }
}

