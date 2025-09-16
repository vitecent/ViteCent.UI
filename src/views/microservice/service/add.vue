<template>
	<section class="service-container">
		<h3 class="mb30">{{ $t('message.router.addService') }}</h3>
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-row :gutter="10">
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.type')" prop="type">
						<el-input v-model="state.form.type" :placeholder="$t('message.service.typePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.code')" prop="code">
						<el-input v-model="state.form.code" :placeholder="$t('message.service.codePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.name')" prop="name">
						<el-input v-model="state.form.name" :placeholder="$t('message.service.namePlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.abbreviation')" prop="abbreviation">
						<el-input
							v-model="state.form.abbreviation"
							:placeholder="$t('message.service.abbreviationPlaceholder')"
							maxlength="50"
							show-word-limit
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.server')" prop="server">
						<el-input v-model="state.form.server" :placeholder="$t('message.service.serverPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.port')" prop="port">
						<el-input v-model="state.form.port" :placeholder="$t('message.service.portPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.user')" prop="user">
						<el-input v-model="state.form.user" :placeholder="$t('message.service.userPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.password')" prop="password">
						<el-input
							v-model="state.form.password"
							type="password"
							:placeholder="$t('message.service.passwordPlaceholder')"
							maxlength="50"
							show-password
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.charSet')" prop="charSet">
						<el-input v-model="state.form.charSet" :placeholder="$t('message.service.charSetPlaceholder')" maxlength="50" show-word-limit clearable />
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.color')" prop="color">
						<el-color-picker v-model="state.form.color" :predefine="state.colors"></el-color-picker>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.sort')" prop="sort">
						<el-input-number
							:min="1"
							:max="99"
							v-model="state.form.sort"
							:placeholder="$t('message.service.sortPlaceholder')"
							clearable
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="12" class="mb15">
					<el-form-item :label="$t('message.service.status')" prop="status">
						<el-switch
							v-model="state.form.status"
							:active-text="$t('message.common.enable')"
							:inactive-text="$t('message.common.disable')"
							:active-value="1"
							:inactive-value="2"
							inline-prompt
						>
							<template #active-action>
								<SvgIcon name="ele-Check" />
							</template>
							<template #inactive-action>
								<SvgIcon name="ele-Close" />
							</template>
						</el-switch>
					</el-form-item>
				</el-col>
				<el-col class="mb30">
					<el-form-item :label="$t('message.service.description')" prop="description">
						<el-input
							:rows="3"
							type="textarea"
							v-model="state.form.description"
							maxlength="100"
							show-word-limit
							:placeholder="$t('message.service.descriptionPlaceholder')"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item>
						<el-button type="info" @click.native.prevent="onCancel">{{ $t('message.common.cancel') }}</el-button>
						<el-button type="primary" @click.native.prevent="onAdd">{{ $t('message.common.add') }}</el-button>
						<el-checkbox v-model="state.flag" class="ml10 mr10" />跳转到列表
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="addService">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useServiceApi } from '@/api/service';
var api = useServiceApi();

import { useRouter } from 'vue-router';
const router = useRouter();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	flag: true,

	form: {
		sort: 1,
		status: 1,
	} as Service,
	rules: {
		type: { required: true, message: t('message.service.typePlaceholder'), trigger: 'blur' },
		code: { required: true, message: t('message.service.codePlaceholder'), trigger: 'blur' },
		name: { required: true, message: t('message.service.namePlaceholder'), trigger: 'blur' },
		abbreviation: { required: true, message: t('message.service.abbreviationPlaceholder'), trigger: 'blur' },
		server: { required: true, message: t('message.service.serverPlaceholder'), trigger: 'blur' },
		port: { required: true, message: t('message.service.portPlaceholder'), trigger: 'blur' },
		user: { required: true, message: t('message.service.userPlaceholder'), trigger: 'blur' },
		password: { required: true, message: t('message.service.passwordPlaceholder'), trigger: 'blur' },
		charSet: { required: true, message: t('message.service.charSetPlaceholder'), trigger: 'blur' },
		description: { required: true, message: t('message.service.descriptionPlaceholder'), trigger: 'blur' },
	},
	colors: ['#009688', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
});

//新增
const onAdd = () => {
	if (!formRef.value) return;
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			api
				.add(state.form)
				.then((res) => {
					ElMessage.success(t('message.common.addSuccess'));

					state.form = {
						sort: 1,
						status: 1,
					} as Service;

					if (state.flag) router.push({ name: 'microserviceService' });
				})
				.catch((error) => {});
		} else {
			ElMessage.warning(t('message.common.validPlaceholder'));
		}
	});
};

//取消
const onCancel = () => {
	router.push({ name: 'microserviceService' });
};
</script>

<style scoped lang="scss">
.service-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
