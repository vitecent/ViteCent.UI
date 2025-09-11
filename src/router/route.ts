import { RouteRecordRaw } from 'vue-router';

/**
 * 建议:路由 path 路径与文件夹名称相同,找文件可浏览器地址找,方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink:        是否超链接菜单,开启外链条件,`1、isLink: 链接地址不为空 2、isIframe:false`
 *      isHide:        是否隐藏此路由
 *      isKeepAlive:   是否缓存组件状态
 *      isAffix:       是否固定在 tagsView 栏上
 *      isIframe:      是否内嵌窗口,开启条件,`1、isIframe:true 2、isLink:链接地址不为空`
 *      roles:         当前路由权限标识,取角色管理。控制路由显示、隐藏。超级管理员:admin 普通角色:common
 *      icon:          菜单、tagsView 图标,阿里:加 `iconfont xxx`,fontawesome:加 `fa xxx`
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		isLink?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
	}
}

/**
 * 定义动态路由
 * 前端添加路由,请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由）,开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: 'message.router.home',
					isKeepAlive: true,
					isAffix: true,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/data',
				name: 'data',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/data/database',
				meta: {
					title: 'message.router.data',
					isKeepAlive: true,
					roles: ['admin'],
					icon: 'ele-Suitcase',
				},
				children: [
					{
						path: '/data/database',
						name: 'dataDatabase',
						component: () => import('@/views/data/database/index.vue'),
						meta: {
							title: 'message.router.dataDatabase',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Coin',
						},
					},
					{
						path: '/data/database/add',
						name: 'addDatabase',
						component: () => import('@/views/data/database/add.vue'),
						meta: {
							title: 'message.router.addDatabase',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Coin',
						},
					},
					{
						path: '/data/database/edit',
						name: 'editDatabase',
						component: () => import('@/views/data/database/edit.vue'),
						meta: {
							title: 'message.router.editDatabase',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Coin',
						},
					},
					{
						path: '/data/database/details',
						name: 'databaseDetails',
						component: () => import('@/views/data/database/details.vue'),
						meta: {
							title: 'message.router.databaseDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Coin',
						},
					},
					{
						path: '/data/database/copy',
						name: 'copyDatabase',
						component: () => import('@/views/data/database/copy.vue'),
						meta: {
							title: 'message.router.copyDatabase',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Coin',
						},
					},
					{
						path: '/data/table',
						name: 'dataTable',
						component: () => import('@/views/data/table/index.vue'),
						meta: {
							title: 'message.router.dataTable',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Folder',
						},
					},
					{
						path: '/data/table/add',
						name: 'addTable',
						component: () => import('@/views/data/table/add.vue'),
						meta: {
							title: 'message.router.addTable',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Folder',
						},
					},
					{
						path: '/data/table/edit',
						name: 'editTable',
						component: () => import('@/views/data/table/edit.vue'),
						meta: {
							title: 'message.router.editTable',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Folder',
						},
					},
					{
						path: '/data/table/details',
						name: 'tableDetails',
						component: () => import('@/views/data/table/details.vue'),
						meta: {
							title: 'message.router.tableDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Folder',
						},
					},
					{
						path: '/data/field',
						name: 'dataField',
						component: () => import('@/views/data/field/index.vue'),
						meta: {
							title: 'message.router.dataField',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Files',
						},
					},
					{
						path: '/data/field/add',
						name: 'addField',
						component: () => import('@/views/data/field/add.vue'),
						meta: {
							title: 'message.router.addField',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Files',
						},
					},
					{
						path: '/data/field/edit',
						name: 'editField',
						component: () => import('@/views/data/field/edit.vue'),
						meta: {
							title: 'message.router.editField',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Files',
						},
					},
					{
						path: '/data/field/details',
						name: 'fieldDetails',
						component: () => import('@/views/data/field/details.vue'),
						meta: {
							title: 'message.router.fieldDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Files',
						},
					},
				]
			},
			{
				path: '/microservice',
				name: 'microservice',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/microservice/service',
				meta: {
					title: 'message.router.microservice',
					isKeepAlive: true,
					roles: ['admin'],
					icon: 'ele-Grid',
				},
				children: [
					{
						path: '/microservice/service',
						name: 'microserviceService',
						component: () => import('@/views/microservice/service/index.vue'),
						meta: {
							title: 'message.router.microserviceService',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-MostlyCloudy',
						},
					},
					{
						path: '/data/service/add',
						name: 'addService',
						component: () => import('@/views/microservice/service/add.vue'),
						meta: {
							title: 'message.router.addService',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-MostlyCloudy',
						},
					},
					{
						path: '/microservice/service/edit',
						name: 'editService',
						component: () => import('@/views/microservice/service/edit.vue'),
						meta: {
							title: 'message.router.editService',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-MostlyCloudy',
						},
					},
					{
						path: '/microservice/service/details',
						name: 'serviceDetails',
						component: () => import('@/views/microservice/service/details.vue'),
						meta: {
							title: 'message.router.serviceDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-MostlyCloudy',
						},
					},
					{
						path: '/microservice/resource',
						name: 'microserviceResource',
						component: () => import('@/views/microservice/resource/index.vue'),
						meta: {
							title: 'message.router.microserviceResource',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Menu',
						},
					},
					{
						path: '/microservice/resource/add',
						name: 'addResource',
						component: () => import('@/views/microservice/resource/add.vue'),
						meta: {
							title: 'message.router.addResource',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Menu',
						},
					},
					{
						path: '/microservice/resource/edit',
						name: 'editResource',
						component: () => import('@/views/microservice/resource/edit.vue'),
						meta: {
							title: 'message.router.editResource',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Menu',
						},
					},
					{
						path: '/microservice/resource/details',
						name: 'resourceDetails',
						component: () => import('@/views/microservice/resource/details.vue'),
						meta: {
							title: 'message.router.resourceDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Menu',
						},
					},
					{
						path: '/microservice/operation',
						name: 'microserviceOperation',
						component: () => import('@/views/microservice/operation/index.vue'),
						meta: {
							title: 'message.router.microserviceOperation',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/microservice/operation/add',
						name: 'addOperation',
						component: () => import('@/views/microservice/operation/add.vue'),
						meta: {
							title: 'message.router.addOperation',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/microservice/operation/edit',
						name: 'editOperation',
						component: () => import('@/views/microservice/operation/edit.vue'),
						meta: {
							title: 'message.router.editOperation',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/microservice/operation/details',
						name: 'operationDetails',
						component: () => import('@/views/microservice/operation/details.vue'),
						meta: {
							title: 'message.router.operationDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Pointer',
						},
					},
				]
			},
			{
				path: '/setting',
				name: 'setting',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/setting/company',
				meta: {
					title: 'message.router.setting',
					isKeepAlive: true,
					roles: ['admin'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/setting/company',
						name: 'settingCompany',
						component: () => import('@/views/setting/company/index.vue'),
						meta: {
							title: 'message.router.settingCompany',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/setting/company/add',
						name: 'addCompany',
						component: () => import('@/views/setting/company/add.vue'),
						meta: {
							title: 'message.router.addCompany',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/setting/company/edit',
						name: 'editCompany',
						component: () => import('@/views/setting/company/edit.vue'),
						meta: {
							title: 'message.router.editCompany',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/setting/company/details',
						name: 'companyDetails',
						component: () => import('@/views/setting/company/details.vue'),
						meta: {
							title: 'message.router.companyDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/setting/department',
						name: 'settingDepartment',
						component: () => import('@/views/setting/department/index.vue'),
						meta: {
							title: 'message.router.settingDepartment',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/setting/department/add',
						name: 'addDepartment',
						component: () => import('@/views/setting/department/add.vue'),
						meta: {
							title: 'message.router.addDepartment',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/setting/department/edit',
						name: 'editDepartment',
						component: () => import('@/views/setting/department/edit.vue'),
						meta: {
							title: 'message.router.editDepartment',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/setting/department/details',
						name: 'departmentDetails',
						component: () => import('@/views/setting/department/details.vue'),
						meta: {
							title: 'message.router.departmentDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/setting/position',
						name: 'settingPosition',
						component: () => import('@/views/setting/position/index.vue'),
						meta: {
							title: 'message.router.settingPosition',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-Position',
						},
					},
					{
						path: '/setting/position/add',
						name: 'addPosition',
						component: () => import('@/views/setting/position/add.vue'),
						meta: {
							title: 'message.router.addPosition',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Position',
						},
					},
					{
						path: '/setting/position/edit',
						name: 'editPosition',
						component: () => import('@/views/setting/position/edit.vue'),
						meta: {
							title: 'message.router.editPosition',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Position',
						},
					},
					{
						path: '/setting/position/details',
						name: 'positionDetails',
						component: () => import('@/views/setting/position/details.vue'),
						meta: {
							title: 'message.router.positionDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-Position',
						},
					},
					{
						path: '/setting/role',
						name: 'settingRole',
						component: () => import('@/views/setting/role/index.vue'),
						meta: {
							title: 'message.router.settingRole',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-PriceTag',
						},
					},
					{
						path: '/setting/role/add',
						name: 'addRole',
						component: () => import('@/views/setting/role/add.vue'),
						meta: {
							title: 'message.router.addRole',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-PriceTag',
						},
					},
					{
						path: '/setting/role/edit',
						name: 'editRole',
						component: () => import('@/views/setting/role/edit.vue'),
						meta: {
							title: 'message.router.editRole',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-PriceTag',
						},
					},
					{
						path: '/setting/role/details',
						name: 'roleDetails',
						component: () => import('@/views/setting/role/details.vue'),
						meta: {
							title: 'message.router.roleDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-PriceTag',
						},
					},
					{
						path: '/setting/user',
						name: 'settingUser',
						component: () => import('@/views/setting/user/index.vue'),
						meta: {
							title: 'message.router.settingUser',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'ele-User',
						},
					},
					{
						path: '/setting/user/add',
						name: 'addUser',
						component: () => import('@/views/setting/user/add.vue'),
						meta: {
							title: 'message.router.addUser',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-User',
						},
					},
					{
						path: '/setting/user/edit',
						name: 'editUser',
						component: () => import('@/views/setting/user/edit.vue'),
						meta: {
							title: 'message.router.editUser',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-User',
						},
					},
					{
						path: '/setting/user/details',
						name: 'userDetails',
						component: () => import('@/views/setting/user/details.vue'),
						meta: {
							title: 'message.router.userDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'ele-User',
						},
					},
					{
						path: '/setting/dictionary',
						name: 'settingDictionary',
						component: () => import('@/views/setting/dictionary/index.vue'),
						meta: {
							title: 'message.router.settingDictionary',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'iconfont icon-zhongduancanshuchaxun',
						},
					},
					{
						path: '/setting/dictionary/add',
						name: 'addDictionary',
						component: () => import('@/views/setting/dictionary/add.vue'),
						meta: {
							title: 'message.router.addDictionary',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-zhongduancanshuchaxun',
						},
					},
					{
						path: '/setting/dictionary/edit',
						name: 'editDictionary',
						component: () => import('@/views/setting/dictionary/edit.vue'),
						meta: {
							title: 'message.router.editDictionary',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-zhongduancanshuchaxun',
						},
					},
					{
						path: '/setting/dictionary/details',
						name: 'dictionaryDetails',
						component: () => import('@/views/setting/dictionary/details.vue'),
						meta: {
							title: 'message.router.dictionaryDetails',
							isHide: true,
							roles: ['admin'],
							icon: 'iconfont icon-zhongduancanshuchaxun',
						},
					},
					{
						path: '/setting/logs',
						name: 'settingLogs',
						component: () => import('@/views/setting/logs/index.vue'),
						meta: {
							title: 'message.router.settingLogs',
							isKeepAlive: true,
							roles: ['admin'],
							icon: 'iconfont icon-fuwenbenkuang',
						},
					},
				]
			},
			{
				path: '/builder',
				name: 'builder',
				component: () => import('@/views/builder/index.vue'),
				meta: {
					title: 'message.router.builder',
					isKeepAlive: true,
					isAffix: true,
					roles: ['admin'],
					icon: 'iconfont icon-zujian',
				},
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/index.vue'),
				meta: {
					title: 'message.router.about',
					isKeepAlive: true,
					isAffix: true,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-caidan',
				},
			},
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考:https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	},
	{
		path: '/personal',
		name: 'personal',
		component: () => import('@/views/personal/index.vue'),
		meta: {
			title: 'message.router.personal',
			isHide: true,
			isKeepAlive: true,
			roles: ['admin'],
			icon: 'iconfont icon-gerenzhongxin',
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动,前端添加路由的话,请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由,后端控制不需要修改,请求接口路由数据时,会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏,不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: 'message.router.login',
		},
	},
];
