<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input size="default" placeholder="请输入公司名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增公司
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="path"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column label="公司名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.meta.icon" />
						<span class="ml10">{{ $t(scope.row.meta.title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.component }}</span>
					</template>
				</el-table-column>
				<el-table-column label="权限标识" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.meta.roles }}</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column label="类型" show-overflow-tooltip width="80">
					<template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}公司</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddMenu('add')">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditMenu('edit', scope.row)">修改</el-button>
						<el-popconfirm :title="`此操作将永久删除路由：${$t(scope.row.meta.title)}, 是否继续?`" @confirm="onTabelRowDel(scope.row)">
							<template #reference>
								<el-button size="small" text type="primary">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<MenuDialog ref="menuDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '@/stores/routesList';
// import { setBackEndControlRefreshRoutes } from "@/router/backEnd";

// 引入组件
const MenuDialog = defineAsyncComponent(() => import('@/views/system/company/dialog.vue'));

// 定义变量内容
const stores = useRoutesList();
const { routesList } = storeToRefs(stores);
const menuDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as RouteRecordRaw[],
		loading: true,
	},
});

// 获取路由数据，真实请从接口获取
const getTableData = () => {
	state.tableData.loading = true;
	state.tableData.data = routesList.value;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增公司弹窗
const onOpenAddMenu = (type: string) => {
	menuDialogRef.value.openDialog(type);
};
// 打开编辑公司弹窗
const onOpenEditMenu = (type: string, row: RouteRecordRaw) => {
	menuDialogRef.value.openDialog(type, row);
};
// 删除当前行
const onTabelRowDel = (row: RouteRecordRaw) => {
	ElMessage.success('删除成功');
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
