<template>
	<section class="field-container layout-padding">
		<div class="field-padding layout-padding-view layout-padding-auto">
			<Table v-bind="state.data" @pageChange="onPageChange" @sortHeader="onSortHeader" @selectChange="onSelect">
				<template v-slot:search>
					<el-form :model="state.form" inline>
						<el-form-item :label="$t('message.common.query')">
							<el-input v-model="state.form.name" :placeholder="$t('message.common.queryPlaceholder')" clearable @keyup.enter="initData" />
						</el-form-item>
						<el-form-item>
							<el-tooltip :content="$t('message.common.query')"
								><el-button link type="primary" @click.native.prevent="initData"><SvgIcon name="ele-Search" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.reset')"
								><el-button link type="primary" @click.native.prevent="onReset"><SvgIcon name="ele-RefreshLeft" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.refresh')"
								><el-button link type="primary" @click.native.prevent="initData"><SvgIcon name="ele-Refresh" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.add')"
								><el-button link type="primary" @click.native.prevent="onAdd"><SvgIcon name="ele-Plus" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.delete')"
								><el-button link type="primary" @click.native.prevent="onDeleteSelect" :disabled="state.select.length == 0"
									><SvgIcon name="ele-Delete" /></el-button
							></el-tooltip>
						</el-form-item>
					</el-form>
				</template>
				<template v-slot:operate="scope: EmptyObjectType">
					<el-tooltip :content="$t('message.common.edit')"
						><el-button text type="primary" @click.native.prevent="onEdit(scope)"> <SvgIcon name="ele-Edit" /></el-button
					></el-tooltip>
					<el-popconfirm :title="$t('message.common.deleteConfirm')" width="200" @confirm="onDelete(scope)">
						<template #reference
							><el-button text type="primary"> <SvgIcon name="ele-Delete" /></el-button>
						</template>
					</el-popconfirm>
					<el-tooltip :content="$t('message.common.details')"
						><el-button text type="primary" @click.native.prevent="onDetails(scope)"> <SvgIcon name="ele-Document" /></el-button
					></el-tooltip>
				</template>
			</Table>
		</div>
	</section>
</template>

<script setup lang="ts" name="field">
import { defineAsyncComponent, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useFieldApi } from '@/api/field';
var api = useFieldApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 引入组件
const Table = defineAsyncComponent(() => import('@/components/table/index.vue'));

// 定义变量内容
const state = reactive<EmptyObjectType>({
	data: {
		databaseId: '',
		tableId: '',
		config: {
			total: 0,
			isSerialNo: true,
			isSelection: true,
			isOperate: true,
		},
		header: [
			{ key: 'databaseName', title: t('message.field.databaseName'), type: 'text', isCheck: true },
			{ key: 'tableName', title: t('message.field.tableName'), type: 'text', isCheck: true },
			{ key: 'code', title: t('message.field.code'), type: 'text', isCheck: true },
			{ key: 'name', title: t('message.field.name'), type: 'text', isCheck: true },
			{ key: 'abbreviation', title: t('message.field.abbreviation'), type: 'text', isCheck: true },
		],
		data: [] as Field[],
		printName: t('message.router.dataField'),
	},
	form: {
		name: '',
	},
	param: {
		offset: 1,
		limit: 10,
		args: [],
	},
	select: [],
});

// 初始化列表数据
const initData = () => {
	state.param.args = [];

	if (!!state.databaseId)
		state.param.args.push({
			field: 'databaseId',
			value: state.databaseId,
		});

	if (!!state.tableId)
		state.param.args.push({
			field: 'tableId',
			value: state.tableId,
		});

	if (!!state.form.name)
		state.param.args.push({
			field: 'name',
			value: state.form.name,
			method: 2,
		});

	state.data.data = [];

	api
		.page(state.param)
		.then((res) => {
			state.data.data = res.rows;
			state.data.config.total = res.total;
		})
		.catch((error) => {});
};

// 新增
const onAdd = () => {
	let query = {} as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	if (!!state.tableId) query.tableId = state.tableId;

	router.push({ name: 'addField', query });
};

// 修改
const onEdit = (row: EmptyObjectType) => {
	let query = { id: row.scope.id } as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	if (!!state.tableId) query.tableId = state.tableId;

	router.push({ name: 'editField', query });
};

// 删除
const onDelete = (row: EmptyObjectType) => {
	api
		.delete({ id: row.scope.id })
		.then((res) => {
			ElMessage.success(t('message.common.deleteSuccess'));

			initData();
		})
		.catch((error) => {});
};

//批量删除
const onDeleteSelect = () => {
	console.log('onDeleteSelect');
};

// 详情
const onDetails = (row: EmptyObjectType) => {
	let query = { id: row.scope.id } as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	if (!!state.tableId) query.tableId = state.tableId;

	router.push({ name: 'fieldDetails', query });
};

//重置
const onReset = () => {
	state.form.name = '';

	initData();
};

// 分页改变时回调
const onPageChange = (page: EmptyObjectType) => {
	state.param.offset = page.offset;
	state.param.limit = page.limit;

	initData();
};

// 拖动显示列排序回调
const onSortHeader = (data: EmptyObjectType[]) => {
	state.Data.header = data;
};

//表格多选改变时
const onSelect = (val: EmptyObjectType[]) => {
	state.select = val;
};

// 页面加载时
onMounted(() => {
	const databaseId = route.query.databaseId as string;
	state.databaseId = databaseId;

	const tableId = route.query.tableId as string;
	state.tableId = tableId;

	initData();
});
</script>

<style scoped lang="scss">
.field-container {
	.field-padding {
		padding: 15px;
		.table-container {
			flex: 1;
		}
		.el-form {
			text-align: right;
		}
	}
}
</style>
