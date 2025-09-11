<template>
	<section class="database-container layout-padding">
		<div class="database-padding layout-padding-view layout-padding-auto">
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
								<el-tooltip :content="$t('message.common.copy')"
									><el-button link type="primary" @click.native.prevent="onCopy(scope)"><SvgIcon name="ele-CopyDocument" /></el-button
								></el-tooltip>
								<el-tooltip :content="$t('message.database.sync')"
									><el-button link type="primary" @click.native.prevent="onSync(scope)"><SvgIcon name="ele-Drizzling" /></el-button
								></el-tooltip>
								<el-tooltip :content="$t('message.router.dataTable')"
									><el-button link type="primary" @click.native.prevent="onTable(scope)"><SvgIcon name="ele-Folder" /></el-button
								></el-tooltip>
								<el-tooltip :content="$t('message.router.builder')"
									><el-button link type="primary" @click.native.prevent="onBuilder(scope)"><SvgIcon name="iconfont icon-zujian" /></el-button
								></el-tooltip>
							</el-space>
						</template>
					</el-popover>
				</template>
			</Table>
		</div>
	</section>
</template>

<script setup lang="ts" name="database">
import { defineAsyncComponent, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useDatabaseApi } from '@/api/database';
var api = useDatabaseApi();

import { useRouter } from 'vue-router';
const router = useRouter();

// 引入组件
const Table = defineAsyncComponent(() => import('@/components/table/index.vue'));

// 定义变量内容
const state = reactive<EmptyObjectType>({
	data: {
		config: {
			total: 0,
			isSerialNo: true,
			isSelection: true,
			isOperate: true,
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
		printName: t('message.router.dataDatabase'),
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
	router.push({ name: 'addDatabase' });
};

// 修改
const onEdit = (row: EmptyObjectType) => {
	router.push({ name: 'editDatabase', query: { id: row.scope.id } });
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
	router.push({ name: 'databaseDetails', query: { id: row.scope.id } });
};

// 复制
const onCopy = (row: EmptyObjectType) => {
	router.push({ name: 'copyDatabase', query: { id: row.scope.id } });
};

//同步
const onSync = (row: EmptyObjectType) => {
	ElMessageBox({
		title: t('message.database.sync'),
		message: t('message.database.syncConfirm'),
		showCancelButton: true,
	})
		.then(async () => {
			api
				.sync({ id: row.scope.id })
				.then((res) => {
					ElMessage.success(t('message.database.syncSuccess'));
				})
				.catch((error) => {});
		})
		.catch(() => {});
};

//查看表
const onTable = (row: EmptyObjectType) => {
	router.push({ name: 'dataTable', query: { databaseId: row.scope.id } });
};

//生成代码
const onBuilder = (row: EmptyObjectType) => {
	router.push({ name: 'builder', query: { databaseId: row.scope.id } });
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
	initData();
});
</script>

<style scoped lang="scss">
.database-container {
	.database-padding {
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
