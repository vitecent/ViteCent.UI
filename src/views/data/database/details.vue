<template>
	<section class="database-container">
		<el-form :model="state.form" label-position="top" label-width="100px">
			<el-form-item :label="$t('message.database.type')"> {{ state.form.type }} </el-form-item>
			<el-form-item :label="$t('message.database.code')"> {{ state.form.code }} </el-form-item>
			<el-form-item :label="$t('message.database.name')"> {{ state.form.name }} </el-form-item>
			<el-form-item :label="$t('message.database.abbreviation')"> {{ state.form.abbreviation }} </el-form-item>
			<el-form-item :label="$t('message.database.server')"> {{ state.form.server }} </el-form-item>
			<el-form-item :label="$t('message.database.port')"> {{ state.form.port }} </el-form-item>
			<el-form-item :label="$t('message.database.user')"> {{ state.form.user }} </el-form-item>
			<el-form-item :label="$t('message.database.password')"> {{ state.form.password }} </el-form-item>
			<el-form-item :label="$t('message.database.charSet')"> {{ state.form.charSet }} </el-form-item>
			<el-form-item>
				<el-button type="info">{{ $t('message.common.cancel') }}</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addDatabase">
import { reactive } from 'vue';

import { useDatabaseApi } from '@/api/database';
var api = useDatabaseApi();

// 定义变量内容
const state = reactive({
	form: { type: '', code: '', name: '', abbreviation: '', server: '', port: '', user: '', password: '', charSet: '' } as Database,
});
</script>

<style scoped lang="scss">
.database-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
