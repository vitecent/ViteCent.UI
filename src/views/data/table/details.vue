<template>
	<section class="table-container">
		<h3 class="mb30">{{ $t('message.router.tableDetails') }}</h3>
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.databaseName')" prop="databaseName"> {{ state.form.databaseName }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.splitType')" prop="splitType"> {{ state.form.splitType }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.code')" prop="code"> {{ state.form.code }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.name')" prop="name"> {{ state.form.name }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.abbreviation')" prop="abbreviation"> {{ state.form.abbreviation }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.color')" prop="color"> {{ state.form.color }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.sort')" prop="sort"> {{ state.form.sort }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.table.status')" prop="status">
						{{ state.form.status }}
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.table.description')" prop="description"> {{ state.form.description }} </el-form-item>
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

<script setup lang="ts" name="addTable">
import { reactive, onMounted } from 'vue';

import { useTableApi } from '@/api/table';
var api = useTableApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 定义变量内容
const state = reactive({
	form: {} as Table,
});

//确认
const onconfirm = () => {
	router.push({ name: 'dataTable' });
};

// 页面加载时
onMounted(() => {
	const id = route.params.id;

	api
		.get({ id: id })
		.then((res) => {
			state.form = res.data;
		})
		.catch((error) => {});
});
</script>

<style scoped lang="scss">
.table-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
