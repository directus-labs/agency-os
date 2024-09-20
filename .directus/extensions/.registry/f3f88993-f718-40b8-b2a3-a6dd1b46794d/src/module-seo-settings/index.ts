import { defineModule } from '@directus/extensions-sdk';
import RoutePass from '../shared/utils/router-passthrough'
import SiteBasic from './routes/general/site-basic.vue';
import LocalSEO from './routes/general/local-seo.vue';
import TitleMeta from './routes/general/title-meta.vue';
import TitleMetaDetail from './routes/general/title-meta-detail-new.vue';
import Scripts from './routes/advanced/scripts.vue';
import Setup from './routes/setup/setup.vue';
import SetupWizard from './routes/setup/setup-wizard.vue';
import Empty from './routes/empty.vue';
import '../styles/base.scss'
import '../styles/form.scss'

export default defineModule({
	id: 'seo-settings',
    name: 'SEO settings',
    icon: 'area_chart',
	routes: [
        {
            name: 'seo-settings',
            path: '/seo-settings',
            component: RoutePass,
            beforeEnter(to) {
                if( to.name === 'seo-settings' ) {

                    console.log(to)
                    return {
                        name: 'seo-title-meta',
                        path: 'title-meta',
                    }
                }
            },
            children: [
                {
                    name: 'seo-settings',
                    path: '',
                    component: TitleMeta,
                },
                {
                    name: 'seo-title-meta',
                    path: 'title-meta',
                    component: TitleMeta,
                },
                {
                    name: 'seo-title-meta-detail',
                    path: 'title-meta/:collection',
                    component: TitleMetaDetail,
                },
                {
                    name: 'seo-site-basic',
                    path: 'site-basic',
                    component: SiteBasic,
                },
                {
                    name: 'seo-local-seo',
                    path: 'local-seo',
                    component: LocalSEO,
                },
            ]
        },
        {
            name: 'seo-advanced-scripts',
            path: '/seo-settings/advanced/scripts',
            component: RoutePass,
            children: [
                {
                    name: 'seo-advanced-scripts',
                    path: '',
                    component: Scripts,
                },
            ]
        },
		{
            name: 'seo-setup',
            path: '/seo-settings/setup',
            component: Setup,
        },
        {
            name: 'seo-setup-wizard',
            path: '/seo-settings/setup-wizard',
            component: SetupWizard,
        },
		
	],
});
