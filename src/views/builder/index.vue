<template>
	<div class="database-container layout-padding">
		<div class="database-padding layout-padding-view layout-padding-auto">
			<Table ref="tableRef" v-bind="state.tableData" class="database" @pageChange="onTablePageChange" @sortHeader="onSortHeader">
				<template v-slot:search>
					<el-form :model="state.form" inline>
						<el-form-item :label="$t('message.common.query')">
							<el-input v-model="state.form.name" :placeholder="$t('message.common.queryPlaceholder')" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button link><SvgIcon name="ele-RefreshLeft" /></el-button>
							<el-button link><SvgIcon name="ele-Search" /></el-button>
							<el-button link><SvgIcon name="ele-Refresh" /></el-button>
							<el-button link><SvgIcon name="ele-Plus" /></el-button>
							<el-button link><SvgIcon name="ele-Delete" /></el-button>
						</el-form-item>
					</el-form>
				</template>
				<template v-slot:operate="scope: EmptyObjectType">
					<el-button text type="primary"> <SvgIcon name="ele-Edit" /></el-button>
					<el-popconfirm :title="$t('message.common.deleteConfirm')" @confirm="onTableDelRow(scope.row)">
						<template #reference>
							<el-button text type="primary"> <SvgIcon name="ele-Delete" /></el-button>
						</template>
					</el-popconfirm>
					<el-button text type="primary"> <SvgIcon name="ele-Document" /></el-button>
				</template>
			</Table>
		</div>
	</div>
</template>

<script setup lang="ts" name="database">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useDatabaseApi } from '@/api/database';
var api = useDatabaseApi();

// 引入组件
const Table = defineAsyncComponent(() => import('@/components/table/index.vue'));

// 定义变量内容
const tableRef = ref<RefType>();
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
			{ key: 'type', title: t('message.database.type'), type: 'text', isCheck: true },
			{ key: 'code', title: t('message.database.code'), type: 'text', isCheck: true },
			{ key: 'name', title: t('message.database.name'), type: 'text', isCheck: true },
			{ key: 'abbreviation', title: t('message.database.abbreviation'), type: 'text', isCheck: true },
			{ key: 'server', title: t('message.database.server'), type: 'text', isCheck: true },
			{ key: 'port', title: t('message.database.port'), type: 'text', isCheck: true },
			{ key: 'user', title: t('message.database.user'), type: 'text', isCheck: true },
			{ key: 'password', title: t('message.database.password'), type: 'text', isCheck: true },
			{ key: 'charSet', title: t('message.database.charSet'), type: 'text', isCheck: true },
		],
		data: [] as Database[],
		// 打印标题
		printName: t('message.router.dataDatabase'),
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
// 删除当前项回调
const onTableDelRow = (row: EmptyObjectType) => {
	ElMessage.success(t('message.common.deleteSuccess'));
	getTableData();
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
.database-container {
	.database-padding {
		padding: 15px;
		.database {
			flex: 1;
			overflow: hidden;
		}
	}
	.el-form {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
