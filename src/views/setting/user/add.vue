<template>
	<section class="user-container">
		<h3 class="mb30">{{ $t('message.router.addUser') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.type')" prop="type">
						<el-select
							v-model="state.form.type"
							:placeholder="$t('message.users.typePlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.users.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.users.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.users.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.server')" prop="server">
						<el-input v-model="state.form.server" :placeholder="$t('message.users.serverPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.port')" prop="port">
						<el-input v-model="state.form.port" :placeholder="$t('message.users.portPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.user')" prop="user">
						<el-input v-model="state.form.user" :placeholder="$t('message.users.userPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.users.passwordPlaceholder')"
							maxlength="50"
							show-password
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.charSet')" prop="charSet">
						<el-select
							v-model="state.form.charSet"
							:placeholder="$t('message.users.charSetPlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.users.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.users.status')" prop="status">
						<el-switch
							v-model="state.form.status"
							:active-text="$t('message.common.enable')"
							:inactive-text="$t('message.common.disable')"
							:active-value="1"
							:inactive-value="0"
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
				<el-col :sm="24" class="mb30">
					<el-form-item :label="$t('message.users.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.users.descriptionPlaceholder')"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24">
					<el-form-item>
						<el-button type="info" @click.native.prevent="onCancel">{{ $t('message.common.cancel') }}</el-button>
						<el-button type="primary" @click.native.prevent="onAdd">{{ $t('message.common.add') }}</el-button>
						<el-checkbox v-model="state.flag" class="ml10 mr10" />跳转到列表
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addUser">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useUserApi } from '@/api/user';
var api = useUserApi();

import { useRouter } from 'vue-router';
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,

	form: {
		sort: 1,
		status: 0,
	} as User,
	rules: {
		type: { required: true, message: t('message.users.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.users.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.users.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.users.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.users.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.users.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.users.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.users.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.users.charSetPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.users.descriptionPlaceholder'), trigger: 'blur' },
	},
	colors: ['#009688', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
	options: [
		{
			value: '1',
			label: 'Option1',
		},
		{
			value: '2',
			label: 'Option2',
		},
		{
			value: '3',
			label: 'Option3',
		},
		{
			value: '4',
			label: 'Option4',
		},
		{
			value: '5',
			label: 'Option5',
		},
	],
});

//新增
const onAdd = () => {
	if (!formRef.value) return;
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			api
				.add(state.form)
				.then((res) => {
					ElMessage.success(t('message.common.addSuccess'));

					state.form = {
						sort: 1,
						status: 0,
					} as User;

					if (state.flag) router.push({ name: 'dataUser' });
				})
				.catch((error) => {
					ElMessage.error(t('message.common.addError'));
				});
		}
	});
};

//取消
const onCancel = () => {
	router.push({ name: 'dataUser' });
};
</script>

<style scoped lang="scss">
.user-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
