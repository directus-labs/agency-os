import { nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { computedEager, watchDebounced } from '@vueuse/core'
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'

import * as i18n from '@wordpress/i18n'

// @ts-ignore
import { Paper, Analyzer, ResultManager, Helpers } from '../analyzer/analyzer.js'
import { addAction, addFilter, doAction, applyFilters } from '@wordpress/hooks'

export const useSEOStore = defineStore('SEOStore', ()=>{
    const content = ref('')
    const options = ref({
        title: '',
        keyword: '',
        keywords: [''],
        titleWidth: 0,
        url: '',
        permalink: '',
        description: '',
        thumbnail: '',
        thumbnailAlt: '',
        locale: 'en_US',
        contentAI: false,
        schemas: {},
    })
    
    const selectedKeyWord = ref('')
    const analyzer = ref(new Analyzer({
        i18n
    }))
    const results = ref({})

    const resultManager = ref(new ResultManager())

    const getPaper = ( keyword: string, keywords: string[] ) => {
        const paper = new Paper( '' )
		paper.setTitle( options.value.title )
		paper.setPermalink( options.value.permalink )
		paper.setDescription( options.value.description )
		paper.setUrl( options.value.url )
		paper.setText(
			Helpers.unescape( content.value )
		)
		paper.setKeyword( keyword )
		paper.setKeywords( keywords )
		// paper.setSchema( store.appData.schemas )

		if ( ! isUndefined( options.value.thumbnail ) ) {
			paper.setThumbnail( options.value.thumbnail )
			paper.setThumbnailAltText(
				Helpers.removeDiacritics( options.value.thumbnailAlt )
			)
		}

		return paper
	}

    const analyzeScore = () => {
        
        const keywords: string[] = options.value.keywords || ['']
    
        keywords.map( ( keyword, index ) => {
            
            const paper = getPaper(
                Helpers.removeDiacritics( keyword ),
                keywords
            )

            resultManager.value.setConfigs(paper.configs)
            
            const researches = 0 === index ? [] : getSecondaryKeywordTests()

            analyzer.value.analyze( paper ).then( ( analyzerResults: any ) => {
                
                resultManager.value.update(
                    paper.getKeyword(),
                    analyzerResults,
                    0 === index
                );

            } )
        } )
    }

    const getSecondaryKeywordTests = () => {
		return [
			'keywordInContent',
			'lengthContent',
			'keywordInSubheadings',
			'keywordDensity',
			'lengthPermalink',
			'linksHasExternals',
			'linksNotAllExternals',
			'linksHasInternal',
			'titleSentiment',
			'titleHasPowerWords',
			'titleHasNumber',
			'contentHasTOC',
			'contentHasShortParagraphs',
			'contentHasAssets',
		]
	}

    const getPrimaryKeyword = () => {
		const keywords = options.value.keywords 
		return Helpers.removeDiacritics( keywords?.split( ',' )[ 0 ] )
	}

    const getGroupItems = ( group: string ) => {
        let hash = {
            basic: {
                keywordInTitle: true,
                keywordInMetaDescription: true,
                keywordInPermalink: true,
                keywordIn10Percent: true,
                keywordInContent: false,
                lengthContent: false,
                hasProductSchema: true,
            },
            advanced: {
                keywordInSubheadings: false,
                keywordInImageAlt: true,
                keywordDensity: false,
                lengthPermalink: false,
                linksHasExternals: false,
                linksNotAllExternals: false,
                linksHasInternal: false,
                keywordNotUsed: true,
                hasContentAI: true,
                isReviewEnabled: true,
            },
            'title-readability': {
                titleStartWithKeyword: true,
                titleSentiment: false,
                titleHasPowerWords: false,
                titleHasNumber: false,
            },
            'content-readability': {
                contentHasTOC: false,
                contentHasShortParagraphs: false,
                contentHasAssets: false,
            },
        };

        return hash[group]
    }

    const getGroupTitle = ( index ) => {
		return getGroups()[ index ]
	}

	const getGroups = () => {
        return {
            basic: i18n.__( 'Basic SEO', 'seo' ),
            advanced: i18n.__( 'Additional', 'seo' ),
            'title-readability': i18n.__( 'Title Readability', 'seo' ),
            'content-readability': i18n.__( 'Content Readability', 'seo' ),
        }
		// return {
		// 	basic: __( 'Basic SEO', 'seo' ),
		// 	advanced: __( 'Additional', 'seo' ),
		// }
	}

    const setOptions = (args: any) => options.value = {...options.value, ...args}
    const setContent = (data: string) => content.value = data
    const setSelectedKeyword = (data: string) => selectedKeyWord.value = data
    
    watchDebounced([content, options], function() {
        analyzeScore()
    }, { deep: true })
    
    onMounted(() => {
        analyzeScore()
    })

    return {
        content,
        options,
        i18n,
        selectedKeyWord,
        results,
        resultManager,
        setContent,
        setOptions,
        analyzeScore,
        getGroupItems,
        getGroupTitle,
        getGroups,
        setSelectedKeyword
    }
})