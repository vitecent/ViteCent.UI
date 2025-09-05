<template>
	<section class="field-container">
		<h3 class="mb30">{{ $t('message.router.addField') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.type')" prop="type">
						<el-select
							v-model="state.form.type"
							:placeholder="$t('message.field.typePlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.field.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.field.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.field.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.server')" prop="server">
						<el-input v-model="state.form.server" :placeholder="$t('message.field.serverPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.port')" prop="port">
						<el-input v-model="state.form.port" :placeholder="$t('message.field.portPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.user')" prop="user">
						<el-input v-model="state.form.user" :placeholder="$t('message.field.userPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.field.passwordPlaceholder')"
							maxlength="50"
							show-password
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.charSet')" prop="charSet">
						<el-select
							v-model="state.form.charSet"
							:placeholder="$t('message.field.charSetPlaceholder')"
							:options="state.options"
							filterable
							clearable
						></el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.field.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.field.status')" prop="status">
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
					<el-form-item :label="$t('message.field.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.field.descriptionPlaceholder')"
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

<script setup lang="ts" name="addField">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useFieldApi } from '@/api/field';
var api = useFieldApi();

import { useRouter } from 'vue-router';
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,

	form: {
		sort: 1,
		status: 0,
	} as Field,
	rules: {
		type: { required: true, message: t('message.field.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.field.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.field.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.field.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.field.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.field.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.field.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.field.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.field.charSetPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.field.descriptionPlaceholder'), trigger: 'blur' },
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
					} as Field;

					if (state.flag) router.push({ name: 'dataField' });
				})
				.catch((error) => {
					ElMessage.error(t('message.common.addError'));
				});
		}
	});
};

//取消
const onCancel = () => {
	router.push({ name: 'dataField' });
};
</script>

<style scoped lang="scss">
.field-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
