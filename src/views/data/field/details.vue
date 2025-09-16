<template>
	<section class="field-container">
		<h3 class="mb30">{{ $t('message.router.fieldDetails') }}</h3>
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.databaseName')" prop="databaseName"> {{ state.form.databaseName }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.tableName')" prop="tableName"> {{ state.form.tableName }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.code')" prop="code"> {{ state.form.code }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.name')" prop="name"> {{ state.form.name }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.abbreviation')" prop="abbreviation"> {{ state.form.abbreviation }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.type')" prop="type">
						{{ state.form.type }}
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.length')" prop="length">
						{{ state.form.length }}
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.color')" prop="color"> {{ state.form.color }} </el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.primaryKey')" prop="primaryKey">
						{{ state.form.primaryKey }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.unique')" prop="unique">
						{{ state.form.unique }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.identity')" prop="identity">
						{{ state.form.identity }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.index')" prop="index">
						{{ state.form.index }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.splitField')" prop="splitField">
						{{ state.form.splitField }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.versionField')" prop="versionField">
						{{ state.form.versionField }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.nullable')" prop="nullable"> <{{ state.form.nullable }} </el-form-item>
				</el-col>
				<el-col :md="16" class="mb15">
					<el-form-item :label="$t('message.field.foreignKey')" prop="foreignKey">
						{{ state.form.foreignKey }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.add')" prop="add">
						{{ state.form.add }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.addWidth')" prop="addWidth">
						{{ state.form.addWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.addSort')" prop="addSort">
						{{ state.form.addSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.edit')" prop="edit">
						{{ state.form.edit }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.editWidth')" prop="editWidth">
						{{ state.form.editWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.editSort')" prop="editSort">
						{{ state.form.editSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detail')" prop="detail">
						{{ state.form.detail }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detailWidth')" prop="detailWidth">
						{{ state.form.detailWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.detailSort')" prop="detailSort">
						{{ state.form.detailSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.table')" prop="table">
						{{ state.form.table }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.tableWidth')" prop="tableWidth">
						{{ state.form.tableWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.tableSort')" prop="tableSort">
						{{ state.form.tableSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.list')" prop="list">
						{{ state.form.list }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.listWidth')" prop="listWidth">
						{{ state.form.listWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.listSort')" prop="listSort">
						{{ state.form.listSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.print')" prop="print">
						{{ state.form.print }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.printWidth')" prop="printWidth">
						{{ state.form.printWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.printSort')" prop="printSort">
						{{ state.form.printSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.export')" prop="export">
						{{ state.form.export }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.exportWidth')" prop="exportWidth">
						{{ state.form.exportWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.exportSort')" prop="exportSort">
						{{ state.form.exportSort }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.import')" prop="import">
						{{ state.form.import }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.importWidth')" prop="importWidth">
						{{ state.form.importWidth }}
					</el-form-item>
				</el-col>
				<el-col :md="8" class="mb15">
					<el-form-item :label="$t('message.field.importSort')" prop="importSort">
						{{ state.form.importSort }}
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.sort')" prop="sort"> {{ state.form.sort }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.field.status')" prop="status">
						{{ state.form.status }}
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.field.description')" prop="description"> {{ state.form.description }} </el-form-item>
				</el-col>
				<el-col>
					<el-form-item>
						<el-button type="primary" @click.native.prevent="onconfirm">{{ $t('message.common.confirm') }}</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addField">
import { reactive, onMounted } from 'vue';

import { useFieldApi } from '@/api/field';
var api = useFieldApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 定义变量内容
const state = reactive({
	id: '',
	databaseId: '',
	tableId: '',
	form: {} as Field,
});

//确认
const onconfirm = () => {
	let query = {} as EmptyObjectType;

	if (!!state.databaseId) query.databaseId = state.databaseId;

	if (!!state.tableId) query.tableId = state.tableId;

	router.push({ name: 'dataField', query });
};

// 页面加载时
onMounted(() => {
	const id = route.query.id as string;
	state.id = id;

	const databaseId = route.query.databaseId as string;
	state.databaseId = databaseId;

	const tableId = route.query.tableId as string;
	state.tableId = tableId;

	api
		.get({ id: state.id })
		.then((res) => {
			state.form = res.data;
		})
		.catch((error) => {});
});
</script>

<style scoped lang="scss">
.field-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
