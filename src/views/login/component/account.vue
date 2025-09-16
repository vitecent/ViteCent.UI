<template>
	<el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" class="login-content-form">
		<el-form-item class="login-animation1" prop="username">
			<el-input
				text
				:placeholder="$t('message.account.usernamePlaceholder')"
				v-model="state.ruleForm.username"
				autocomplete="off"
				maxlength="16"
				show-word-limit
				clearable
				@keyup.enter="onValidate"
			>
				<template #prefix> <SvgIcon name="ele-User" /> </template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop="password">
			<el-input
				type="password"
				:placeholder="$t('message.account.passwordPlaceholder')"
				v-model="state.ruleForm.password"
				autocomplete="off"
				show-password
				clearable
				@keyup.enter="onValidate"
			>
				<template #prefix> <SvgIcon name="ele-Key" /> </template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click.native.prevent="onValidate">
				{{ $t('message.account.accountBtnText') }}
			</el-button>
		</el-form-item>
		<div class="font12 mt30 login-animation4 login-msg">{{ $t('message.mobile.msgText') }}</div>
		<Vcode :show="state.isShow" @success="onSuccess" @close="onClose" />
	</el-form>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed, ref } from 'vue';

import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import { initFrontEndControlRoutes } from '@/router/frontEnd';
import { initBackEndControlRoutes } from '@/router/backEnd';
import { Session } from '@/utils/storage';
import { formatAxis } from '@/utils/formatTime';

import Vcode from 'vue3-puzzle-vcode';

import { useLoginApi } from '@/api/login/index';
var api = useLoginApi();

const { t } = useI18n();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const formRef = ref();

// 定义变量内容
const state = reactive({
	isShow: false,
	ruleForm: {
		username: 'admin',
		password: '123qwe',
	},
	rules: {
		username: { required: true, message: t('message.account.usernamePlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.account.passwordPlaceholder'), trigger: 'blur' },
	},
});

// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});

//开启验证
const onSuccess = () => {
	state.isShow = false;
	onLogin();
};

//关闭验证
const onClose = () => {
	state.isShow = false;
};

//验证
const onValidate = () => {
	if (!formRef.value) return;
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			state.isShow = true;
		} else {
			ElMessage.warning(t('message.common.validPlaceholder'));
		}
	});
};

// 登录
const onLogin = async () => {
	api
		.login(state.ruleForm)
		.then(async (res) => {
			var data = res.data;
			// 存储 token 到浏览器缓存
			Session.set('token', data.token);
			Session.set('refreshToken', data.refreshToken);
			Session.set('expireTime', data.expireTime);

			if (!themeConfig.value.isRequestRoutes) {
				// 前端控制路由,2、请注意执行顺序
				const isNoPower = await initFrontEndControlRoutes();
				LoginSuccess(isNoPower);
			} else {
				// 模拟后端控制路由,isRequestRoutes 为 true,则开启后端控制路由
				// 添加完动态路由,再进行 router 跳转,否则可能报错 No match found for location with path "/"
				const isNoPower = await initBackEndControlRoutes();
				// 执行完 initBackEndControlRoutes,再执行 LoginSuccess
				LoginSuccess(isNoPower);
			}
		})
		.catch(() => {});
};

// 登录成功后的跳转
const LoginSuccess = (isNoPower: boolean | undefined) => {
	if (isNoPower) {
		ElMessage.warning('抱歉,您没有登录权限');
		Session.clear();
	} else {
		// 初始化登录成功时间问候语
		let currentTimeInfo = currentTime.value;
		// 登录成功,跳到转首页
		// 如果是复制粘贴的路径,非首页/登录页,那么登录成功后重定向到对应的路径中
		if (route.query?.redirect) {
			router.push({
				path: <string>route.query?.redirect,
				query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
			});
		} else {
			router.push('/');
		}
		// 登录成功提示
		const loginText = t('message.signInText');
		ElMessage.success(`${currentTimeInfo},${loginText}`);
	}
};
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
