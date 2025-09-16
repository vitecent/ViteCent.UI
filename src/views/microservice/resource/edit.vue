<template>
	<section class="resource-container">
		<h3 class="mb30">{{ $t('message.router.editResource') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.type')" prop="type">
						<el-input v-model="state.form.type" :placeholder="$t('message.resource.typePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.resource.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.resource.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.resource.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.server')" prop="server">
						<el-input v-model="state.form.server" :placeholder="$t('message.resource.serverPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.port')" prop="port">
						<el-input v-model="state.form.port" :placeholder="$t('message.resource.portPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.user')" prop="user">
						<el-input v-model="state.form.user" :placeholder="$t('message.resource.userPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.resource.passwordPlaceholder')"
							maxlength="50"
							show-password
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.charSet')" prop="charSet">
						<el-input
							v-model="state.form.charSet"
							:placeholder="$t('message.resource.charSetPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.resource.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.status')" prop="status">
						<el-switch
							v-model="state.form.status"
							:active-text="$t('message.common.enable')"
							:inactive-text="$t('message.common.disable')"
							:active-value="1"
							:inactive-value="2"
							inline-prompt
						>
							<template #active-action>
								<SvgIcon name="ele-Check" />
							</template>
							<template #inactive-action>
								<SvgIcon name="ele-Close" />
							</template>
						</el-switch>
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.resource.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.resource.descriptionPlaceholder')"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item>
						<el-button type="info" @click.native.prevent="onCancel">{{ $t('message.common.cancel') }}</el-button>
						<el-button type="primary" @click.native.prevent="onEdit">{{ $t('message.common.edit') }}</el-button>
						<el-checkbox v-model="state.flag" class="ml10 mr10" />跳转到列表
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addResource">
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useResourceApi } from '@/api/resource';
var api = useResourceApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,
	id: '',
	form: {} as Resource,
	rules: {
		type: { required: true, message: t('message.resource.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.resource.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.resource.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.resource.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.resource.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.resource.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.resource.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.resource.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.resource.charSetPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.resource.descriptionPlaceholder'), trigger: 'blur' },
	},
	colors: ['#009688', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
});

//新增
const onEdit = () => {
	if (!formRef.value) return;
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			api
				.edit(state.form)
				.then((res) => {
					ElMessage.success(t('message.common.editSuccess'));

					state.form = {} as Resource;

					if (state.flag) router.push({ name: 'microserviceResource' });
					else initData();
				})
				.catch((error) => {});
		} else {
			ElMessage.warning(t('message.common.validPlaceholder'));
		}
	});
};

//取消
const onCancel = () => {
	router.push({ name: 'microserviceResource' });
};

// 页面加载时
onMounted(() => {
	const id = route.query.id as string;
	state.id = id;

	initData();
});

//加载数据
const initData = () => {
	api
		.get({ id: state.id })
		.then((res) => {
			state.form = res.data;
		})
		.catch((error) => {});
};
</script>

<style scoped lang="scss">
.resource-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
