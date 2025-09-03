<template>
	<div class="table-container">
		<div>
			<slot name="search"></slot>
		</div>
		<el-table
			:data="data"
			:border="setBorder"
			v-bind="$attrs"
			row-key="id"
			stripe
			style="width: 100%"
			v-loading="config.loading"
			@selection-change="onSelectionChange"
		>
			<el-table-column type="selection" :reserve-selection="true" width="30" v-if="config.isSelection" />
			<el-table-column type="index" :label="$t('message.common.index')" width="60" v-if="config.isSerialNo" />
			<el-table-column
				v-for="(item, index) in setHeader"
				:key="index"
				show-overflow-tooltip
				:prop="item.key"
				:width="item.colWidth"
				:label="item.title"
			>
				<template v-slot="scope">
					<template v-if="item.type === 'image'">
						<el-image
							:style="{ width: `${item.width}px`, height: `${item.height}px` }"
							:src="scope.row[item.key]"
							:zoom-rate="1.2"
							:preview-src-list="[scope.row[item.key]]"
							preview-teleported
							fit="cover"
						/>
					</template>
					<template v-else>
						{{ scope.row[item.key] }}
					</template>
				</template>
			</el-table-column>
			<el-table-column :label="$t('message.common.operate')" v-if="config.isOperate">
				<template v-slot="scope">
					<slot name="operate" :scope="scope.row"></slot>
				</template>
			</el-table-column>
			<template #empty>
				<el-empty :description="$t('message.common.empt')" />
			</template>
		</el-table>
		<div class="table-footer mt15">
			<el-pagination
				v-model:current-page="state.page.offset"
				v-model:page-size="state.page.limit"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				:total="config.total"
				layout="total, sizes, prev, pager, next, jumper"
				background
				@size-change="onSizeChange"
				@current-change="onCurrentChange"
			>
			</el-pagination>
			<div class="table-footer-tool">
				<el-tooltip :content="$t('message.common.print')"
					><el-button link type="primary"><SvgIcon name="ele-Printer" /></el-button
				></el-tooltip>
				<el-tooltip :content="$t('message.common.import')"
					><el-button link type="primary"><SvgIcon name="ele-Upload" /></el-button
				></el-tooltip>
				<el-tooltip :content="$t('message.common.export')"
					><el-button link type="primary"><SvgIcon name="ele-Download" /></el-button
				></el-tooltip>
				<el-popover width="300" popover-class="table-tool-popper" :persistent="false">
					<template #reference>
						<el-button link type="primary"><SvgIcon name="ele-Setting" /></el-button>
					</template>
					<template #default>
						<div class="tool-box">
							<el-checkbox v-model="getConfig.isSelection" class="ml12 mr1" :label="$t('message.common.selection')" />
							<el-checkbox v-model="getConfig.isSerialNo" class="ml12 mr1" :label="$t('message.common.index')" />
							<el-checkbox
								v-model="state.checkListAll"
								:indeterminate="state.checkListIndeterminate"
								class="ml10 mr1"
								:label="$t('message.common.data')"
								@change="onCheckAllChange"
							/>
							<el-checkbox v-model="getConfig.isOperate" class="ml12 mr1" :label="$t('message.common.operate')" />
						</div>
						<el-scrollbar>
							<div class="tool-sortable">
								<div class="tool-sortable-item1" v-for="v in header" :key="v.key" :data-key="v.key">
									<el-checkbox v-model="v.isCheck" class="ml12 mr8" @change="onCheckChange" />{{ v.title }}
								</div>
							</div>
						</el-scrollbar>
					</template>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="viteCentTtable">
import { reactive, computed } from 'vue';

// 定义父组件传过来的值
const props = defineProps({
	// 列表内容
	data: {
		type: Array<EmptyObjectType>,
		default: () => [],
	},
	// 表头内容
	header: {
		type: Array<EmptyObjectType>,
		default: () => [],
	},
	// 配置项
	config: {
		type: Object,
		default: () => {},
	},
	// 打印标题
	printName: {
		type: String,
		default: () => '',
	},
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['pageChange', 'sortHeader']);

const state = reactive({
	page: {
		offset: 1,
		limit: 10,
	},
	selectlist: [] as EmptyObjectType[],
	checkListAll: true,
	checkListIndeterminate: false,
});

// 设置边框显示/隐藏
const setBorder = computed(() => {
	return props.config.isBorder ? true : false;
});
// 获取父组件 配置项（必传）
const getConfig = computed(() => {
	return props.config;
});
// 设置 tool header 数据
const setHeader = computed(() => {
	return props.header.filter((v) => v.isCheck);
});
// tool 列显示全选改变时
const onCheckAllChange = <T,>(val: T) => {
	if (val) props.header.forEach((v) => (v.isCheck = true));
	else props.header.forEach((v) => (v.isCheck = false));
	state.checkListIndeterminate = false;
};
// tool 列显示当前项改变时
const onCheckChange = () => {
	const headers = props.header.filter((v) => v.isCheck).length;
	state.checkListAll = headers === props.header.length;
	state.checkListIndeterminate = headers > 0 && headers < props.header.length;
};
// 表格多选改变时
const onSelectionChange = (val: EmptyObjectType[]) => {
	state.selectlist = val;
};
// 分页改变
const onSizeChange = (val: number) => {
	state.page.limit = val;
	emit('pageChange', state.page);
};
// 分页改变
const onCurrentChange = (val: number) => {
	state.page.offset = val;
	emit('pageChange', state.page);
};
</script>

<style scoped lang="scss">
.table-container {
	display: flex;
	flex-direction: column;
	.el-table {
		flex: 1;
	}
	.table-footer {
		display: flex;
		.table-footer-tool {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
}
</style>
