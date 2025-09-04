<template>
	<section class="resource-container">
		<h3 class="mb30">{{ $t('message.router.editResource') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.type')" prop="type">
						<el-select
							v-model="state.form.type"
							:placeholder="$t('message.resource.typePlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.code')" prop="code">
						<el-input
							v-model="state.form.code"
							:placeholder="$t('message.resource.codePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.name')" prop="name">
						<el-input
							v-model="state.form.name"
							:placeholder="$t('message.resource.namePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.resource.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.server')" prop="server">
						<el-input
							v-model="state.form.server"
							:placeholder="$t('message.resource.serverPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.port')" prop="port">
						<el-input
							v-model="state.form.port"
							:placeholder="$t('message.resource.portPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.user')" prop="user">
						<el-input
							v-model="state.form.user"
							:placeholder="$t('message.resource.userPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.resource.passwordPlaceholder')"
							maxlength="50"
							show-password
							show-word-limit
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.charSet')" prop="charSet">
						<el-select
							v-model="state.form.charSet"
							:placeholder="$t('message.resource.charSetPlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
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
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.status')" prop="status">
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
					<el-form-item :label="$t('message.resource.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.resource.descriptionPlaceholder')"
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :sm="24">
					<el-form-item>
						<el-button type="primary">{{ $t('message.common.edit') }}</el-button>
						<el-button type="info">{{ $t('message.common.cancel') }}</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addResource">
import { reactive, ref, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useResourceApi } from '@/api/resource';
var api = useResourceApi();

import { useRoute } from 'vue-router';
const route = useRoute();

// 定义变量内容
const formRef = ref<RefType>();
const state = reactive({
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
// 页面加载时
onMounted(() => {
	const id = route.params.id;

	api
		.get({ id: id })
		.then((res) => {
			state.form = res.data;
		})
		.catch((error) => {});
});
</script>

<style scoped lang="scss">
.resource-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
