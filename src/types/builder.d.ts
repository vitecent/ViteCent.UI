declare type Builder = {
    root: string,
    solutionName: string,
    projrectName: string,
    srcName: string,
    addName: string,
    deleteName: string,
    disableName: string,
    editName: string,
    enableName: string,
    getName: string,
    hasName: string,
    pageName: string,
    database: BuilderDatabase,
    data: BuilderData,
    entity: BuilderEntity,
    api: BuilderApi,
    application: BuilderApplication,
    domain: BuilderDomain,
};

declare type BuilderDatabase = {
    name: string,
    camelCaseName: string,
    type: string,
    server: string,
    user: string,
    password: string,
    port: string,
    charSet: string,
};

declare type BuilderData = {
    argsSuffix: string,
    listSuffix: string,
    name: string,
    projrect: string,
    resultSuffix: string,
    searchPrefix: string,
    validatorSuffix: string,
};

declare type BuilderEntity = {
    name: string,
    suffix: string,
};

declare type BuilderApi = {
    cache: string,
    environment: string,
    facName: string,
    jwtAudience: string,
    jwtIssuer: string,
    jwtKey: string,
    mapperName: string,
    name: string,
    register: string,
    serviceAddress: string,
    serviceName: string,
    servicePort: string | number,
    trace: string,
};

declare type BuilderApplication = {
    invoke: boolean,
    invokeProjrect: string,
    name: string,
};

declare type BuilderDomain = {
    name: string,
};