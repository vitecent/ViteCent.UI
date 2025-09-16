<template>
	<section class="database-container">
		<h3 class="mb30">{{ $t('message.router.databaseDetails') }}</h3>
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.type')" prop="type"> {{ state.form.type }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.code')" prop="code"> {{ state.form.code }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.name')" prop="name"> {{ state.form.name }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.abbreviation')" prop="abbreviation"> {{ state.form.abbreviation }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.server')" prop="server"> {{ state.form.server }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.port')" prop="port"> {{ state.form.port }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.user')" prop="user"> {{ state.form.user }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.password')" prop="password"> {{ state.form.password }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.charSet')" prop="charSet"> {{ state.form.charSet }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.color')" prop="color"> {{ state.form.color }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.sort')" prop="sort"> {{ state.form.sort }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.database.status')" prop="status">
						{{ state.form.status }}
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.database.description')" prop="description"> {{ state.form.description }} </el-form-item>
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

<script setup lang="ts" name="addDatabase">
import { reactive, onMounted } from 'vue';

import { useDatabaseApi } from '@/api/database';
var api = useDatabaseApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 定义变量内容
const state = reactive({
	form: {} as Database,
});

//确认
const onconfirm = () => {
	router.push({ name: 'dataDatabase' });
};

// 页面加载时
onMounted(() => {
	const id = route.query.id;

	api
		.get({ id: state.id })
		.then((res) => {
			state.form = res.data;
		})
		.catch((error) => {});
});
</script>

<style scoped lang="scss">
.database-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
