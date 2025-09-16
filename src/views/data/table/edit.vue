<template>
	<section class="table-container">
		<h3 class="mb30">{{ $t('message.router.editTable') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.databaseName')" prop="databaseId">
						<el-input
							v-model="state.form.databaseId"
							:placeholder="$t('message.table.databaseNamePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.splitType')" prop="splitType">
						<el-input
							v-model="state.form.splitType"
							:placeholder="$t('message.table.splitTypePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.table.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.table.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.table.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.table.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.status')" prop="status">
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
					<el-form-item :label="$t('message.table.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.table.descriptionPlaceholder')"
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

<script setup lang="ts" name="addTable">
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useTableApi } from '@/api/table';
var api = useTableApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,
	id: '',
	databaseId: '',
	form: {} as Table,
	rules: {
		databaseId: { required: true, message: t('message.table.databaseNamePlaceholder'), trigger: 'blur' },
		splitType: { required: true, message: t('message.table.splitTypePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.table.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.table.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.table.abbreviationPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.table.descriptionPlaceholder'), trigger: 'blur' },
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

					state.form = {} as Table;

					let query = {} as EmptyObjectType;

					if (!!state.databaseId) query.databaseId = state.databaseId;

					if (state.flag) router.push({ name: 'dataTable', query });
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
	let query = {} as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	router.push({ name: 'dataTable', query });
};

// 页面加载时
onMounted(() => {
	const id = route.query.id as string;
	state.id = id;

	const databaseId = route.query.databaseId as string;
	state.databaseId = databaseId;

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
.table-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
