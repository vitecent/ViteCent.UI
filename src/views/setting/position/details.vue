<template>
	<section class="position-container">
		<h3 class="mb30">{{ $t('message.router.positionDetails') }}</h3>
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.type')" prop="type"> {{ state.form.type }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.code')" prop="code"> {{ state.form.code }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.name')" prop="name"> {{ state.form.name }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.abbreviation')" prop="abbreviation"> {{ state.form.abbreviation }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.server')" prop="server"> {{ state.form.server }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.port')" prop="port"> {{ state.form.port }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.user')" prop="user"> {{ state.form.user }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.password')" prop="password"> {{ state.form.password }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.charSet')" prop="charSet"> {{ state.form.charSet }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.color')" prop="color"> {{ state.form.color }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.sort')" prop="sort"> {{ state.form.sort }} </el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.position.status')" prop="status">
						{{ state.form.status }}
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.position.description')" prop="description"> {{ state.form.description }} </el-form-item>
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

<script setup lang="ts" name="addPosition">
import { reactive, onMounted } from 'vue';

import { usePositionApi } from '@/api/position';
var api = usePositionApi();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 定义变量内容
const state = reactive({
	form: {} as Position,
});

//确认
const onconfirm = () => {
	router.push({ name: 'settingPosition' });
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
.position-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
