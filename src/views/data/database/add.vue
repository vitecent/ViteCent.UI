<template>
	<section class="database-container">
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-form-item :label="$t('message.database.type')" prop="type">
				<el-input v-model="state.form.type" :placeholder="$t('message.database.typePlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.code')" prop="code">
				<el-input v-model="state.form.code" :placeholder="$t('message.database.codePlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.name')" prop="name">
				<el-input v-model="state.form.name" :placeholder="$t('message.database.namePlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.abbreviation')" prop="abbreviation">
				<el-input v-model="state.form.abbreviation" :placeholder="$t('message.database.abbreviationPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.server')" prop="server">
				<el-input v-model="state.form.server" :placeholder="$t('message.database.serverPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.port')" prop="port">
				<el-input v-model="state.form.port" :placeholder="$t('message.database.portPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.user')" prop="user">
				<el-input v-model="state.form.user" :placeholder="$t('message.database.userPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.password')" prop="password">
				<el-input v-model="state.form.password" :placeholder="$t('message.database.passwordPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item :label="$t('message.database.charSet')" prop="charSet">
				<el-input v-model="state.form.charSet" :placeholder="$t('message.database.charSetPlaceholder')" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">{{ $t('message.common.add') }}</el-button>
				<el-button type="info">{{ $t('message.common.cancel') }}</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addDatabase">
import { reactive, ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useDatabaseApi } from '@/api/database';
var api = useDatabaseApi();

// 定义变量内容
const formRef = ref<RefType>();
const state = reactive({
	form: { type: '', code: '', name: '', abbreviation: '', server: '', port: '', user: '', password: '', charSet: '' } as Database,
	rules: {
		type: { required: true, message: t('message.database.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.database.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.database.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.database.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.database.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.database.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.database.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.database.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.database.charSetPlaceholder'), trigger: 'blur' },
	},
});
</script>

<style scoped lang="scss">
.database-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 15px;
}
</style>
