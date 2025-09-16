<template>
	<section class="table-container layout-padding">
		<div class="table-padding layout-padding-view layout-padding-auto">
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
					<el-popover :persistent="false">
						<template #reference>
							<el-button link type="primary"><SvgIcon name="ele-More" /></el-button>
						</template>
						<template #default>
							<el-space wrap>
								<el-tooltip :content="$t('message.router.dataTable')"
									><el-button link type="primary" @click.native.prevent="onField(scope)"><SvgIcon name="ele-Files" /></el-button
								></el-tooltip>
							</el-space>
						</template>
					</el-popover>
				</template>
			</Table>
		</div>
	</section>
</template>

<script setup lang="ts" name="tables">
import { defineAsyncComponent, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useTableApi } from '@/api/table';
var api = useTableApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 引入组件
const Table = defineAsyncComponent(() => import('@/components/table/index.vue'));

// 定义变量内容
const state = reactive<EmptyObjectType>({
	databaseId: '',
	data: {
		config: {
			total: 0,
			isSerialNo: true,
			isSelection: true,
			isOperate: true,
		},
		header: [
			{ key: 'splitType', title: t('message.table.splitType'), type: 'text', isCheck: true },
			{ key: 'databaseName', title: t('message.table.databaseName'), type: 'text', isCheck: true },
			{ key: 'code', title: t('message.table.code'), type: 'text', isCheck: true },
			{ key: 'name', title: t('message.table.name'), type: 'text', isCheck: true },
			{ key: 'abbreviation', title: t('message.table.abbreviation'), type: 'text', isCheck: true },
		],
		data: [] as Table[],
		printName: t('message.router.dataTable'),
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

	router.push({ name: 'addTable', query });
};

// 修改
const onEdit = (row: EmptyObjectType) => {
	let query = { id: row.scope.id } as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	router.push({ name: 'editTable', query });
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

	router.push({ name: 'tableDetails', query });
};

//表详情
const onField = (row: EmptyObjectType) => {
	router.push({ name: 'dataField', query: { databaseId: row.scope.databaseId, tableId: row.scope.id } });
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

	initData();
});
</script>

<style scoped lang="scss">
.table-container {
	.table-padding {
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
