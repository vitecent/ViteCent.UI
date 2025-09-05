import { createApp } from 'vue';
import pinia from '@/stores/index';
import App from '@/App.vue';
import router from '@/router';
import { directive } from '@/directive/index';
import { i18n } from '@/i18n/index';
import other from '@/utils/other';

import ElementPlus from 'element-plus';
import '@/theme/index.scss';

import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .use(Particles, {
        init: async engine => {
            await loadSlim(engine);
        },
    })
    .mount('#app');
