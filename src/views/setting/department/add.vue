<template>
	<section class="department-container">
		<h3 class="mb30">{{ $t('message.router.addDepartment') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.type')" prop="type">
						<el-select
							v-model="state.form.type"
							:placeholder="$t('message.department.typePlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.code')" prop="code">
						<el-input
							v-model="state.form.code"
							:placeholder="$t('message.department.codePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.name')" prop="name">
						<el-input
							v-model="state.form.name"
							:placeholder="$t('message.department.namePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.department.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.server')" prop="server">
						<el-input
							v-model="state.form.server"
							:placeholder="$t('message.department.serverPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.port')" prop="port">
						<el-input
							v-model="state.form.port"
							:placeholder="$t('message.department.portPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.user')" prop="user">
						<el-input
							v-model="state.form.user"
							:placeholder="$t('message.department.userPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.department.passwordPlaceholder')"
							maxlength="50"
							show-password
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.charSet')" prop="charSet">
						<el-select
							v-model="state.form.charSet"
							:placeholder="$t('message.department.charSetPlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.department.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.department.status')" prop="status">
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
					<el-form-item :label="$t('message.department.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.department.descriptionPlaceholder')"
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24">
					<el-form-item>
						<el-button type="primary">{{ $t('message.common.add') }}</el-button>
						<el-button type="info">{{ $t('message.common.cancel') }}</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addDepartment">
import { reactive, ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useDepartmentApi } from '@/api/department';
var api = useDepartmentApi();

// 定义变量内容
const formRef = ref<RefType>();
const state = reactive({
	form: {
		id: '',
		companyId: '',
		companyName: '',
		type: '',
		code: '',
		name: '',
		server: '',
		port: '',
		user: '',
		password: '',
		charSet: '',
		abbreviation: '',
		description: '',
		color: '',
		sort: 1,
		status: 0,
	} as Department,
	rules: {
		type: { required: true, message: t('message.department.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.department.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.department.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.department.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.department.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.department.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.department.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.department.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.department.charSetPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.department.descriptionPlaceholder'), trigger: 'blur' },
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
</script>

<style scoped lang="scss">
.department-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
