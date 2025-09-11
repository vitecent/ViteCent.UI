<template>
	<section class="field-container">
		<h3 class="mb30">{{ $t('message.router.editField') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.databaseName')" prop="databaseId">
						<el-input
							v-model="state.form.databaseId"
							:placeholder="$t('message.field.databaseNamePlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.tableName')" prop="tableId">
						<el-input v-model="state.form.tableId" :placeholder="$t('message.field.tableNamePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.field.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.field.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
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
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.primaryKey')" prop="primaryKey">
						<el-switch
							v-model="state.form.primaryKey"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.unique')" prop="unique">
						<el-switch
							v-model="state.form.unique"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.identity')" prop="identity">
						<el-switch
							v-model="state.form.identity"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.index')" prop="index">
						<el-switch
							v-model="state.form.index"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.splitField')" prop="splitField">
						<el-switch
							v-model="state.form.splitField"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.versionField')" prop="versionField">
						<el-switch
							v-model="state.form.versionField"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.add')" prop="add">
						<el-switch
							v-model="state.form.add"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.addWidth')" prop="addWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.addWidth"
							:placeholder="$t('message.field.addWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.addSort')" prop="addSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.addSort"
							:placeholder="$t('message.field.addSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.edit')" prop="edit">
						<el-switch
							v-model="state.form.edit"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.editWidth')" prop="editWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.editWidth"
							:placeholder="$t('message.field.editWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.editSort')" prop="editSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.editSort"
							:placeholder="$t('message.field.editSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detail')" prop="detail">
						<el-switch
							v-model="state.form.detail"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detailWidth')" prop="detailWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.detailWidth"
							:placeholder="$t('message.field.detailWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detailSort')" prop="detailSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.detailSort"
							:placeholder="$t('message.field.detailSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.table')" prop="table">
						<el-switch
							v-model="state.form.table"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.tableWidth')" prop="tableWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.tableWidth"
							:placeholder="$t('message.field.tableWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.tableSort')" prop="tableSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.tableSort"
							:placeholder="$t('message.field.tableSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.list')" prop="list">
						<el-switch
							v-model="state.form.list"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.listWidth')" prop="listWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.listWidth"
							:placeholder="$t('message.field.listWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.listSort')" prop="listSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.listSort"
							:placeholder="$t('message.field.listSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.print')" prop="print">
						<el-switch
							v-model="state.form.print"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.printWidth')" prop="printWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.printWidth"
							:placeholder="$t('message.field.printWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.printSort')" prop="printSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.printSort"
							:placeholder="$t('message.field.printSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.export')" prop="export">
						<el-switch
							v-model="state.form.export"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.exportWidth')" prop="exportWidth">
						<el-input-number
							:min="1"
							:max="999"
							v-model="state.form.exportWidth"
							:placeholder="$t('message.field.exportWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.exportSort')" prop="exportSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.exportSort"
							:placeholder="$t('message.field.exportSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.import')" prop="import">
						<el-switch
							v-model="state.form.import"
							:active-text="$t('message.common.yes')"
							:inactive-text="$t('message.common.no')"
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
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.importWidth')" prop="importWidth">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.importWidth"
							:placeholder="$t('message.field.importWidthPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.importSort')" prop="importSort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.importSort"
							:placeholder="$t('message.field.importSortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
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
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.status')" prop="status">
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

<script setup lang="ts" name="addField">
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useFieldApi } from '@/api/field';
var api = useFieldApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,
	id: '',
	form: {} as Field,
	rules: {
		databaseId: { required: true, message: t('message.field.databaseNamePlaceholder'), trigger: 'blur' },
		tableId: { required: true, message: t('message.field.tableNamePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.field.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.field.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.field.abbreviationPlaceholder'), trigger: 'blur' },
		type: { required: true, message: t('message.field.typePlaceholder'), trigger: 'blur' },
		length: { required: true, message: t('message.field.lengthPlaceholder'), trigger: 'blur' },
		primaryKey: { required: true, message: t('message.field.primaryKeyPlaceholder'), trigger: 'blur' },
		unique: { required: true, message: t('message.field.uniquePlaceholder'), trigger: 'blur' },
		identity: { required: true, message: t('message.field.identityPlaceholder'), trigger: 'blur' },
		index: { required: true, message: t('message.field.indexPlaceholder'), trigger: 'blur' },
		splitField: { required: true, message: t('message.field.splitFieldPlaceholder'), trigger: 'blur' },
		versionField: { required: true, message: t('message.field.versionFieldPlaceholder'), trigger: 'blur' },
		add: { required: true, message: t('message.field.addPlaceholder'), trigger: 'blur' },
		addWidth: { required: true, message: t('message.field.addWidthPlaceholder'), trigger: 'blur' },
		addSort: { required: true, message: t('message.field.addSortPlaceholder'), trigger: 'blur' },
		edit: { required: true, message: t('message.field.editPlaceholder'), trigger: 'blur' },
		editWidth: { required: true, message: t('message.field.editWidthPlaceholder'), trigger: 'blur' },
		editSort: { required: true, message: t('message.field.editSortPlaceholder'), trigger: 'blur' },
		detail: { required: true, message: t('message.field.detailPlaceholder'), trigger: 'blur' },
		detailWidth: { required: true, message: t('message.field.detailWidthPlaceholder'), trigger: 'blur' },
		detailSort: { required: true, message: t('message.field.detailSortPlaceholder'), trigger: 'blur' },
		table: { required: true, message: t('message.field.tablePlaceholder'), trigger: 'blur' },
		tableWidth: { required: true, message: t('message.field.tableWidthPlaceholder'), trigger: 'blur' },
		tableSort: { required: true, message: t('message.field.tableSortPlaceholder'), trigger: 'blur' },
		list: { required: true, message: t('message.field.listPlaceholder'), trigger: 'blur' },
		listWidth: { required: true, message: t('message.field.listWidthPlaceholder'), trigger: 'blur' },
		listSort: { required: true, message: t('message.field.listSortPlaceholder'), trigger: 'blur' },
		print: { required: true, message: t('message.field.printPlaceholder'), trigger: 'blur' },
		printWidth: { required: true, message: t('message.field.printWidthPlaceholder'), trigger: 'blur' },
		printSort: { required: true, message: t('message.field.printSortPlaceholder'), trigger: 'blur' },
		export: { required: true, message: t('message.field.exportPlaceholder'), trigger: 'blur' },
		exportWidth: { required: true, message: t('message.field.exportWidthPlaceholder'), trigger: 'blur' },
		exportSort: { required: true, message: t('message.field.exportSortPlaceholder'), trigger: 'blur' },
		import: { required: true, message: t('message.field.importPlaceholder'), trigger: 'blur' },
		importWidth: { required: true, message: t('message.field.importWidthPlaceholder'), trigger: 'blur' },
		importSort: { required: true, message: t('message.field.importSortPlaceholder'), trigger: 'blur' },
		sort: { required: true, message: t('message.field.sortPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.field.descriptionPlaceholder'), trigger: 'blur' },
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

					state.form = {} as Field;

					if (state.flag) router.push({ name: 'dataField' });
					else initData();
				})
				.catch((error) => {});
		}
	});
};

//取消
const onCancel = () => {
	router.push({ name: 'dataField' });
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
.field-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
