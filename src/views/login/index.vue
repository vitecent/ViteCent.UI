<template>
	<div class="login-container flex">
		<div class="login-left">
			<div class="login-left-logo">
				<img :src="logoMini" />
				<div class="login-left-logo-text">
					<span>{{ getThemeConfig.globalViceTitle }}</span>
					<span class="login-left-logo-text-msg">{{ getThemeConfig.globalViceTitleMsg }}</span>
				</div>
			</div>
		</div>
		<div class="login-right flex">
			<div class="login-right-warp flex-margin">
				<span class="login-right-warp-one"></span>
				<span class="login-right-warp-two"></span>
				<div class="login-right-warp-mian">
					<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
						<div class="layout-navbars-breadcrumb-user-icon">
							<i
								class="iconfont"
								:class="state.disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'"
								:title="$t('message.user.language')"
							></i>
						</div>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="zh-cn" :disabled="state.disabledI18n === 'zh-cn'">简体中文</el-dropdown-item>
								<el-dropdown-item command="en" :disabled="state.disabledI18n === 'en'">English</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<div class="login-right-warp-main-title">{{ getThemeConfig.globalTitle }}</div>
					<div class="login-right-warp-main-form">
						<div v-if="!state.isScan">
							<el-tabs v-model="state.tabsActiveName">
								<el-tab-pane :label="$t('message.label.account')" name="account">
									<Account />
								</el-tab-pane>
								<el-tab-pane :label="$t('message.label.mobile')" name="mobile">
									<Mobile />
								</el-tab-pane>
							</el-tabs>
						</div>
						<Scan v-if="state.isScan" />
						<div class="login-content-main-sacn" @click="state.isScan = !state.isScan">
							<i class="iconfont" :class="state.isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
							<div class="login-content-main-sacn-delta"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="loginIndex">
import { defineAsyncComponent, onMounted, reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import { NextLoading } from '@/utils/loading';
import logoMini from '@/assets/logo-mini.svg';
import { Session } from '@/utils/storage';
import { Local } from '@/utils/storage';
import { useI18n } from 'vue-i18n';
import other from '@/utils/other';
const { locale } = useI18n();

// 引入组件
const Account = defineAsyncComponent(() => import('@/views/login/component/account.vue'));
const Mobile = defineAsyncComponent(() => import('@/views/login/component/mobile.vue'));
const Scan = defineAsyncComponent(() => import('@/views/login/component/scan.vue'));

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const state = reactive({
	tabsActiveName: 'account',
	isScan: false,
	disabledI18n: 'zh-cn',
});

// 获取布局配置信息
const getThemeConfig = computed(() => {
	return themeConfig.value;
});

// 语言切换
const onLanguageChange = (lang: string) => {
	Local.remove('themeConfig');
	themeConfig.value.globalI18n = lang;
	Local.set('themeConfig', themeConfig.value);
	locale.value = lang;
	other.useTitle();
	initI18nOrSize('globalI18n', 'disabledI18n');
};
// 初始化组件大小/i18n
const initI18nOrSize = (value: string, attr: string) => {
	(<any>state)[attr] = Local.get('themeConfig')[value];
};
// 页面加载时
onMounted(() => {
	// 清除缓存/token等
	Session.clear();
	initI18nOrSize('globalI18n', 'disabledI18n');
	NextLoading.done();
});
</script>

<style scoped lang="scss">
.login-container {
	height: 100%;

	.layout-navbars-breadcrumb-user-icon {
		padding-left: 5px;
		padding-top: 5px;
	}

	.login-left {
		flex: 1;
		position: relative;
		margin-right: 100px;

		.login-left-logo {
			display: flex;
			align-items: center;
			position: absolute;
			top: 50px;
			left: 80px;
			z-index: 1;
			animation: logoAnimation 0.3s ease;

			img {
				width: 52px;
				height: 52px;
			}

			.login-left-logo-text {
				display: flex;
				flex-direction: column;

				span {
					margin-left: 10px;
					font-size: 28px;
					color: #26a59a;
				}

				.login-left-logo-text-msg {
					font-size: 12px;
					color: #32a99e;
				}
			}
		}

		.login-left-img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 52%;

			img {
				width: 100%;
				height: 100%;
				animation: error-num 0.6s ease;
			}
		}

		.login-left-waves {
			position: absolute;
			top: 0;
			right: -100px;
		}
	}

	.login-right {
		width: 700px;

		.login-right-warp {
			border: 1px solid var(--el-color-primary-light-3);
			border-radius: 3px;
			width: 500px;
			height: 500px;
			position: relative;
			overflow: hidden;

			.login-right-warp-one,
			.login-right-warp-two {
				position: absolute;
				display: block;
				width: inherit;
				height: inherit;

				&::before,
				&::after {
					content: '';
					position: absolute;
					z-index: 1;
				}
			}

			.login-right-warp-one {
				&::before {
					filter: hue-rotate(0deg);
					top: 0px;
					left: 0;
					width: 100%;
					height: 3px;
					background: linear-gradient(90deg, transparent, var(--el-color-primary));
					animation: loginLeft 3s linear infinite;
				}

				&::after {
					filter: hue-rotate(60deg);
					top: -100%;
					right: 2px;
					width: 3px;
					height: 100%;
					background: linear-gradient(180deg, transparent, var(--el-color-primary));
					animation: loginTop 3s linear infinite;
					animation-delay: 0.7s;
				}
			}

			.login-right-warp-two {
				&::before {
					filter: hue-rotate(120deg);
					bottom: 2px;
					right: -100%;
					width: 100%;
					height: 3px;
					background: linear-gradient(270deg, transparent, var(--el-color-primary));
					animation: loginRight 3s linear infinite;
					animation-delay: 1.4s;
				}

				&::after {
					filter: hue-rotate(300deg);
					bottom: -100%;
					left: 0px;
					width: 3px;
					height: 100%;
					background: linear-gradient(360deg, transparent, var(--el-color-primary));
					animation: loginBottom 3s linear infinite;
					animation-delay: 2.1s;
				}
			}

			.login-right-warp-mian {
				display: flex;
				flex-direction: column;
				height: 100%;

				.login-right-warp-main-title {
					height: 130px;
					line-height: 130px;
					font-size: 27px;
					text-align: center;
					letter-spacing: 3px;
					animation: logoAnimation 0.3s ease;
					animation-delay: 0.3s;
					color: var(--el-text-color-primary);
				}

				.login-right-warp-main-form {
					flex: 1;
					padding: 0 50px 50px;

					.login-content-main-sacn {
						position: absolute;
						top: 0;
						right: 0;
						width: 50px;
						height: 50px;
						overflow: hidden;
						cursor: pointer;
						transition: all ease 0.3s;
						color: var(--el-color-primary);

						&-delta {
							position: absolute;
							width: 35px;
							height: 70px;
							z-index: 2;
							top: 2px;
							right: 21px;
							background: var(--el-color-white);
							transform: rotate(-45deg);
						}

						&:hover {
							opacity: 1;
							transition: all ease 0.3s;
							color: var(--el-color-primary) !important;
						}

						i {
							width: 47px;
							height: 50px;
							display: inline-block;
							font-size: 48px;
							position: absolute;
							right: 1px;
							top: 0px;
						}
					}
				}
			}
		}
	}
}
</style>
