<template>
	<section class="resource-container">
		<h3 class="mb30">{{ $t('message.router.resourceDetails') }}</h3>
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-row :gutter="10">
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.type')" prop="type"> {{ state.form.type }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.code')" prop="code"> {{ state.form.code }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.name')" prop="name"> {{ state.form.name }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.abbreviation')" prop="abbreviation"> {{ state.form.abbreviation }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.server')" prop="server"> {{ state.form.server }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.port')" prop="port"> {{ state.form.port }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.user')" prop="user"> {{ state.form.user }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.password')" prop="password"> {{ state.form.password }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.charSet')" prop="charSet"> {{ state.form.charSet }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.color')" prop="color"> {{ state.form.color }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.sort')" prop="sort"> {{ state.form.sort }} </el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" class="mb15">
					<el-form-item :label="$t('message.resource.status')" prop="status">
						<el-tag type="success" round v-if="state.form.status == 1">{{ $t('message.common.enable') }}</el-tag>
						<el-tag type="danger" round v-else>{{ $t('message.common.disable') }}</el-tag>
					</el-form-item>
				</el-col>
				<el-col :sm="24" class="mb30">
					<el-form-item :label="$t('message.resource.description')" prop="description"> {{ state.form.description }} </el-form-item>
				</el-col>
				<el-col :sm="24">
					<el-form-item>
						<el-button type="primary">{{ $t('message.common.confirm') }}</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addResource">
import { reactive, onMounted } from 'vue';

import { useResourceApi } from '@/api/resource';
var api = useResourceApi();

import { useRoute } from 'vue-router';
const route = useRoute();

// 定义变量内容
const state = reactive({
	form: {} as Resource,
});

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
.resource-container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
