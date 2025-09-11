<template>
	<section class="builder-container">
		<el-form :model="state.form" :rules="state.rules" label-position="top" label-width="100px" ref="formRef">
			<el-tabs v-model="state.activeName">
				<el-tab-pane :label="$t('message.builder.base')" name="base">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.root')" prop="root">
								<el-input v-model="state.form.root" :placeholder="$t('message.builder.rootPlaceholder')" maxlength="50" show-word-limit clearable />
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.solutionName')" prop="solutionName">
								<el-input
									v-model="state.form.solutionName"
									:placeholder="$t('message.builder.solutionNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.projrectName')" prop="projrectName">
								<el-input
									v-model="state.form.projrectName"
									:placeholder="$t('message.builder.projrectNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.srcName')" prop="srcName">
								<el-input
									v-model="state.form.srcName"
									:placeholder="$t('message.builder.srcNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.addName')" prop="addName">
								<el-input
									v-model="state.form.addName"
									:placeholder="$t('message.builder.addNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.deleteName')" prop="deleteName">
								<el-input
									v-model="state.form.deleteName"
									:placeholder="$t('message.builder.deleteNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.disableName')" prop="disableName">
								<el-input
									v-model="state.form.disableName"
									:placeholder="$t('message.builder.disableNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.editName')" prop="editName">
								<el-input
									v-model="state.form.editName"
									:placeholder="$t('message.builder.editNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.enableName')" prop="enableName">
								<el-input
									v-model="state.form.enableName"
									:placeholder="$t('message.builder.enableNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.getName')" prop="getName">
								<el-input
									v-model="state.form.getName"
									:placeholder="$t('message.builder.getNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.hasName')" prop="hasName">
								<el-input
									v-model="state.form.hasName"
									:placeholder="$t('message.builder.hasNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.pageName')" prop="pageName">
								<el-input
									v-model="state.form.pageName"
									:placeholder="$t('message.builder.pageNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.database')" name="database">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseName')" prop="database.name">
								<el-input
									v-model="state.form.database.name"
									:placeholder="$t('message.builder.databaseNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseCamelCaseName')" prop="database.camelCaseName">
								<el-input
									v-model="state.form.database.camelCaseName"
									:placeholder="$t('message.builder.databaseCamelCaseNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseType')" prop="database.type">
								<el-input
									v-model="state.form.database.type"
									:placeholder="$t('message.builder.databaseTypePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseServer')" prop="database.server">
								<el-input
									v-model="state.form.database.server"
									:placeholder="$t('message.builder.databaseServerPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseUser')" prop="database.user">
								<el-input
									v-model="state.form.database.user"
									:placeholder="$t('message.builder.databaseUserPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databasePassword')" prop="database.password">
								<el-input
									v-model="state.form.database.password"
									:placeholder="$t('message.builder.databasePasswordPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databasePort')" prop="database.port">
								<el-input
									v-model="state.form.database.port"
									:placeholder="$t('message.builder.databasePortPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.databaseCharSet')" prop="database.charSet">
								<el-input
									v-model="state.form.database.charSet"
									:placeholder="$t('message.builder.databaseCharSetPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.data')" name="data">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataProjrect')" prop="data.projrect">
								<el-input
									v-model="state.form.data.projrect"
									:placeholder="$t('message.builder.dataProjrectPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataName')" prop="data.name">
								<el-input
									v-model="state.form.data.name"
									:placeholder="$t('message.builder.dataNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataArgsSuffix')" prop="data.argsSuffix">
								<el-input
									v-model="state.form.data.argsSuffix"
									:placeholder="$t('message.builder.dataArgsSuffixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataListSuffix')" prop="data.listSuffix">
								<el-input
									v-model="state.form.data.listSuffix"
									:placeholder="$t('message.builder.dataListSuffixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataResultSuffix')" prop="data.resultSuffix">
								<el-input
									v-model="state.form.data.resultSuffix"
									:placeholder="$t('message.builder.dataResultSuffixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataSearchPrefix')" prop="data.searchPrefix">
								<el-input
									v-model="state.form.data.searchPrefix"
									:placeholder="$t('message.builder.dataSearchPrefixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.dataValidatorSuffix')" prop="data.validatorSuffix">
								<el-input
									v-model="state.form.data.validatorSuffix"
									:placeholder="$t('message.builder.dataValidatorSuffixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.entity')" name="entity">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.entityName')" prop="entity.name">
								<el-input
									v-model="state.form.entity.name"
									:placeholder="$t('message.builder.entityNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.entitySuffix')" prop="entity.suffix">
								<el-input
									v-model="state.form.entity.suffix"
									:placeholder="$t('message.builder.entitySuffixPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.api')" name="api">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiName')" prop="api.name">
								<el-input
									v-model="state.form.api.name"
									:placeholder="$t('message.builder.apiNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiFacName')" prop="api.facName">
								<el-input
									v-model="state.form.api.facName"
									:placeholder="$t('message.builder.apiFacNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiMapperName')" prop="api.mapperName">
								<el-input
									v-model="state.form.api.mapperName"
									:placeholder="$t('message.builder.apiMapperNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiEnvironment')" prop="api.environment">
								<el-input
									v-model="state.form.api.environment"
									:placeholder="$t('message.builder.apiEnvironmentPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiCache')" prop="api.cache">
								<el-input
									v-model="state.form.api.cache"
									:placeholder="$t('message.builder.apiCachePlaceholder')"
									maxlength="100"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiRegister')" prop="api.register">
								<el-input
									v-model="state.form.api.register"
									:placeholder="$t('message.builder.apiRegisterPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiTrace')" prop="api.trace">
								<el-input
									v-model="state.form.api.trace"
									:placeholder="$t('message.builder.apiTracePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiServiceAddress')" prop="api.serviceAddress">
								<el-input
									v-model="state.form.api.serviceAddress"
									:placeholder="$t('message.builder.apiServiceAddressPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiServiceName')" prop="api.serviceName">
								<el-input
									v-model="state.form.api.serviceName"
									:placeholder="$t('message.builder.apiServiceNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiServicePort')" prop="api.servicePort">
								<el-input
									v-model="state.form.api.servicePort"
									:placeholder="$t('message.builder.apiServicePortPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>

						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiJwtAudience')" prop="api.jwtAudience">
								<el-input
									v-model="state.form.api.jwtAudience"
									:placeholder="$t('message.builder.apiJwtAudiencePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiJwtIssuer')" prop="api.jwtIssuer">
								<el-input
									v-model="state.form.api.jwtIssuer"
									:placeholder="$t('message.builder.apiJwtIssuerPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.apiJwtKey')" prop="api.jwtKey">
								<el-input
									v-model="state.form.api.jwtKey"
									:placeholder="$t('message.builder.apiJwtKeyPlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.application')" name="application">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.applicationName')" prop="application.name">
								<el-input
									v-model="state.form.application.name"
									:placeholder="$t('message.builder.applicationNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.applicationInvoke')" prop="application.invoke">
								<el-switch
									v-model="state.form.application.invoke"
									:active-text="$t('message.common.yes')"
									:inactive-text="$t('message.common.no')"
									:active-value="true"
									:inactive-value="false"
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
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.applicationInvokeProjrect')" prop="application.invokeProjrect">
								<el-input
									v-model="state.form.application.invokeProjrect"
									:placeholder="$t('message.builder.applicationInvokeProjrectPlaceholder')"
									:disabled="!state.form.application.invoke"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane :label="$t('message.builder.domain')" name="domain">
					<el-row :gutter="10">
						<el-col :md="12" class="mb15">
							<el-form-item :label="$t('message.builder.domainName')" prop="domain.name">
								<el-input
									v-model="state.form.domain.name"
									:placeholder="$t('message.builder.domainNamePlaceholder')"
									maxlength="50"
									show-word-limit
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item class="mt30">
				<el-button type="primary" @click.native.prevent="onBuild">{{ $t('message.builder.build') }}</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script setup lang="ts" name="builder">
import { reactive, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useBuilderApi } from '@/api/builder';
var api = useBuilderApi();

import { useDatabaseApi } from '@/api/database';
var databaseApi = useDatabaseApi();

import { useRoute } from 'vue-router';
const route = useRoute();

const formRef = ref<RefType>();

// 定义变量内容
const state = reactive({
	activeName: 'base',
	databaseId: '',
	form: {
		database: {} as BuilderDatabase,
		data: {} as BuilderData,
		entity: {} as BuilderEntity,
		api: {} as BuilderApi,
		application: {} as BuilderApplication,
		domain: {} as BuilderDomain,
	} as Builder,
	rules: {
		root: { required: true, message: t('message.builder.rootPlaceholder'), trigger: 'blur' },
		solutionName: { required: true, message: t('message.builder.solutionNamePlaceholder'), trigger: 'blur' },
		projrectName: { required: true, message: t('message.builder.projrectNamePlaceholder'), trigger: 'blur' },
		srcName: { required: true, message: t('message.builder.srcNamePlaceholder'), trigger: 'blur' },
		addName: { required: true, message: t('message.builder.addNamePlaceholder'), trigger: 'blur' },
		deleteName: { required: true, message: t('message.builder.deleteNamePlaceholder'), trigger: 'blur' },
		disableName: { required: true, message: t('message.builder.disableNamePlaceholder'), trigger: 'blur' },
		editName: { required: true, message: t('message.builder.editNamePlaceholder'), trigger: 'blur' },
		enableName: { required: true, message: t('message.builder.enableNamePlaceholder'), trigger: 'blur' },
		getName: { required: true, message: t('message.builder.getNamePlaceholder'), trigger: 'blur' },
		hasName: { required: true, message: t('message.builder.hasNamePlaceholder'), trigger: 'blur' },
		pageName: { required: true, message: t('message.builder.pageNamePlaceholder'), trigger: 'blur' },
		'database.name': { required: true, message: t('message.builder.databaseNamePlaceholder'), trigger: 'blur' },
		'database.camelCaseName': { required: true, message: t('message.builder.databaseCamelCaseNamePlaceholder'), trigger: 'blur' },
		'database.type': { required: true, message: t('message.builder.databaseTypePlaceholder'), trigger: 'blur' },
		'database.server': { required: true, message: t('message.builder.databaseServerPlaceholder'), trigger: 'blur' },
		'database.user': { required: true, message: t('message.builder.databaseUserPlaceholder'), trigger: 'blur' },
		'database.password': { required: true, message: t('message.builder.databasePasswordPlaceholder'), trigger: 'blur' },
		'database.port': { required: true, message: t('message.builder.databasePortPlaceholder'), trigger: 'blur' },
		'database.charSet': { required: true, message: t('message.builder.databaseCharSetPlaceholder'), trigger: 'blur' },
		'data.argsSuffix': { required: true, message: t('message.builder.dataArgsSuffixPlaceholder'), trigger: 'blur' },
		'data.listSuffix': { required: true, message: t('message.builder.dataListSuffixPlaceholder'), trigger: 'blur' },
		'data.name': { required: true, message: t('message.builder.dataNamePlaceholder'), trigger: 'blur' },
		'data.projrect': { required: true, message: t('message.builder.dataProjrectPlaceholder'), trigger: 'blur' },
		'data.resultSuffix': { required: true, message: t('message.builder.dataResultSuffixPlaceholder'), trigger: 'blur' },
		'data.searchPrefix': { required: true, message: t('message.builder.dataSearchPrefixPlaceholder'), trigger: 'blur' },
		'data.validatorSuffix': { required: true, message: t('message.builder.dataValidatorSuffixPlaceholder'), trigger: 'blur' },
		'entity.name': { required: true, message: t('message.builder.entityNamePlaceholder'), trigger: 'blur' },
		'entity.suffix': { required: true, message: t('message.builder.entitySuffixPlaceholder'), trigger: 'blur' },
		'api.cache': { required: true, message: t('message.builder.apiCachePlaceholder'), trigger: 'blur' },
		'api.environment': { required: true, message: t('message.builder.apiEnvironmentPlaceholder'), trigger: 'blur' },
		'api.facName': { required: true, message: t('message.builder.apiFacNamePlaceholder'), trigger: 'blur' },
		'api.jwtAudience': { required: true, message: t('message.builder.apiJwtAudiencePlaceholder'), trigger: 'blur' },
		'api.jwtIssuer': { required: true, message: t('message.builder.apiJwtIssuerPlaceholder'), trigger: 'blur' },
		'api.jwtKey': { required: true, message: t('message.builder.apiJwtKeyPlaceholder'), trigger: 'blur' },
		'api.mapperName': { required: true, message: t('message.builder.apiMapperNamePlaceholder'), trigger: 'blur' },
		'api.name': { required: true, message: t('message.builder.apiNamePlaceholder'), trigger: 'blur' },
		'api.Rregister': { required: true, message: t('message.builder.apiRegisterPlaceholder'), trigger: 'blur' },
		'api.serviceAddress': { required: true, message: t('message.builder.apiServiceAddressPlaceholder'), trigger: 'blur' },
		'api.serviceName': { required: true, message: t('message.builder.apiServiceNamePlaceholder'), trigger: 'blur' },
		'api.servicePort': { required: true, message: t('message.builder.apiServicePortPlaceholder'), trigger: 'blur' },
		'api.trace': { required: true, message: t('message.builder.apiTracePlaceholder'), trigger: 'blur' },
		'application.name': { required: true, message: t('message.builder.applicationNamePlaceholder'), trigger: 'blur' },
		'domain.name': { required: true, message: t('message.builder.domainNamePlaceholder'), trigger: 'blur' },
	},
});

//生成代码
const onBuild = () => {
	if (!formRef.value) return;
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			if (state.form.application.invoke) {
				if (state.form.application.invokeProjrect === '') {
					ElMessage.error(t('message.builder.applicationInvokeProjrectPlaceholder'));
					return;
				}
			}
			api
				.build(state.form)
				.then((res) => {
					ElMessage.success(t('message.builder.buildSuccess'));
				})
				.catch((error) => {});
		}
	});
};

const initDatabase = () => {
	if (!!state.databaseId)
		databaseApi
			.get({ id: state.databaseId })
			.then((res) => {
				state.form.projrectName = res.data.code;

				state.form.database.name = res.data.name;
				state.form.database.camelCaseName = res.data.code;
				state.form.database.type = res.data.type;
				state.form.database.server = res.data.server;
				state.form.database.port = res.data.port;
				state.form.database.user = res.data.user;
				state.form.database.password = res.data.password;
				state.form.database.charSet = res.data.charSet;

				state.form.api.serviceName = res.data.abbreviation;

				if (res.data.abbreviation != 'Auth') {
					state.form.application.invoke = true;
					state.form.application.invokeProjrect = 'ViteCent.Auth';
				} else {
					state.form.application.invoke = false;
					state.form.application.invokeProjrect = '';
				}
			})
			.catch((error) => {});
};

// 页面加载时
onMounted(() => {
	const databaseId = route.query.databaseId as string;
	state.databaseId = databaseId;

	api
		.setting({})
		.then((res) => {
			state.form = res.data;

			initDatabase();
		})
		.catch((error) => {});
});
</script>

<style scoped lang="scss">
.builder-container {
	max-width: 1366px;
	margin: 0 auto;
	padding: 15px;
	color: var(--el-text-color-primary);
}
</style>
