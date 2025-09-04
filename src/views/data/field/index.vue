<template>
	<div class="field-container layout-padding">
		<div class="field-padding layout-padding-view layout-padding-auto">
			<Table v-bind="state.tableData" class="field" @pageChange="onTablePageChange" @sortHeader="onSortHeader">
				<template v-slot:search>
					<el-form :model="state.form" inline>
						<el-form-item :label="$t('message.common.query')">
							<el-input v-model="state.form.name" :placeholder="$t('message.common.queryPlaceholder')" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-tooltip :content="$t('message.common.query')"
								><el-button link type="primary"><SvgIcon name="ele-Search" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.reset')"
								><el-button link type="primary"><SvgIcon name="ele-RefreshLeft" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.refresh')"
								><el-button link type="primary"><SvgIcon name="ele-Refresh" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.add')"
								><el-button link type="primary" @click="onAdd"><SvgIcon name="ele-Plus" /></el-button
							></el-tooltip>
							<el-tooltip :content="$t('message.common.delete')"
								><el-button link type="primary"><SvgIcon name="ele-Delete" /></el-button
							></el-tooltip>
						</el-form-item>
					</el-form>
				</template>
				<template v-slot:operate="scope: EmptyObjectType">
					<el-tooltip :content="$t('message.common.edit')"
						><el-button text type="primary" @click="onEdit(scope)"> <SvgIcon name="ele-Edit" /></el-button
					></el-tooltip>
					<el-popconfirm :title="$t('message.common.deleteConfirm')" @confirm="onDelete(scope)">
						<template #reference
							><el-button text type="primary"> <SvgIcon name="ele-Delete" /></el-button>
						</template>
					</el-popconfirm>
					<el-tooltip :content="$t('message.common.details')"
						><el-button text type="primary" @click="onDetails(scope)"> <SvgIcon name="ele-Document" /></el-button
					></el-tooltip>
				</template>
			</Table>
		</div>
	</div>
</template>

<script setup lang="ts" name="field">
import { defineAsyncComponent, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useFieldApi } from '@/api/field';
var api = useFieldApi();

import { useRouter } from 'vue-router';
const router = useRouter();

// 引入组件
const Table = defineAsyncComponent(() => import('@/components/table/index.vue'));

// 定义变量内容

const state = reactive<EmptyObjectType>({
	tableData: {
		config: {
			total: 0, // 列表总数
			loading: true, // loading 加载
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否显示表格多选
			isOperate: true, // 是否显示表格操作栏
		},
		header: [
			{ key: 'type', title: t('message.field.type'), type: 'text', isCheck: true },
			{ key: 'code', title: t('message.field.code'), type: 'text', isCheck: true },
			{ key: 'name', title: t('message.field.name'), type: 'text', isCheck: true },
			{ key: 'abbreviation', title: t('message.field.abbreviation'), type: 'text', isCheck: true },
			{ key: 'server', title: t('message.field.server'), type: 'text', isCheck: true },
			{ key: 'port', title: t('message.field.port'), type: 'text', isCheck: true },
			{ key: 'user', title: t('message.field.user'), type: 'text', isCheck: true },
			{ key: 'password', title: t('message.field.password'), type: 'text', isCheck: true },
			{ key: 'charSet', title: t('message.field.charSet'), type: 'text', isCheck: true },
		],
		data: [] as Field[],
		// 打印标题
		printName: t('message.router.dataField'),
	},
	form: {
		name: '',
		email: '',
		autograph: '',
		occupation: '',
		phone: '',
		sex: '',
		phone1: '',
		phone2: '',
		phone3: '',
		phone4: '',
		phone5: '',
		phone6: '',
	},
	param: {
		offset: 1,
		limit: 10,
	},
});

// 初始化列表数据
const getTableData = () => {
	state.tableData.config.loading = true;
	state.tableData.data = [];
	api
		.page(state.param)
		.then((res) => {
			state.tableData.data = res.rows;
			state.tableData.config.total = res.total;
			state.tableData.config.loading = false;
		})
		.catch((error) => {
			state.tableData.config.loading = false;
		});
};
// 新增
const onAdd = () => {
	router.push({ name: 'addField' });
};
// 修改
const onEdit = (row: EmptyObjectType) => {
	router.push({ name: 'editField', params: { id: row.scope.id } });
};
// 删除
const onDelete = (row: EmptyObjectType) => {
	ElMessage.success(t('message.common.deleteSuccess'));
	getTableData();
};
// 详情
const onDetails = (row: EmptyObjectType) => {
	router.push({ name: 'fieldDetails', params: { id: row.scope.id } });
};
// 分页改变时回调
const onTablePageChange = (page: EmptyObjectType) => {
	state.param.offset = page.offset;
	state.param.limit = page.limit;
	getTableData();
};
// 拖动显示列排序回调
const onSortHeader = (data: EmptyObjectType[]) => {
	state.tableData.header = data;
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.field-container {
	.field-padding {
		padding: 15px;
		.field {
			flex: 1;
		}
	}
	.el-form {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
