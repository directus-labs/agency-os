import { useStores } from "@directus/extensions-sdk";
import { computed, ref } from "vue";

export function useCollectionsItems() {
    const stores = useStores()
    const { useCollectionsStore, useFieldsStore, useRelationsStore } = stores
    const collectionsStore = useCollectionsStore();
    const fieldsStore = useFieldsStore();
    const relationsStore = useRelationsStore();

    const listTranslationCollections = ref([])
    
    const collections = computed(() => {
        let collections = collectionsStore.collections;
        
        return collections.filter((collection: any) => {
            /* 
            * ! hasTranslation
            * && 
            */
            return excludeCollection(collection.collection)
            && excludeCollection(collection.collection, 'seo_')
            && excludeCollection(collection.collection, 'menu')
            && collection.collection !== 'languages'
        })?.map((collection: any) => {
            const relations = relationsStore.getRelationsForCollection(collection.collection)
            const translationField = fieldsStore.getFieldsForCollection(collection.collection).find((field: any) => field.meta.interface === 'translations')

            if( ! translationField ) {
                return collection
            }
            
            const relationTranslation = relations.find((relation: any) => relation.meta.one_field === translationField.field)
            if( relationTranslation ) {
                collection.translation_collection = relationTranslation.collection
                listTranslationCollections.value.push(relationTranslation.collection)
            }

            return collection
        })
    });
    
    const collectionsWithoutTranslation = computed(() => {
        return collections.value.filter((collection:any) => !listTranslationCollections.value?.includes(collection.collection))
    })
    
    const translationCollections = computed(() => {
        return collections.value.filter((collection:any) => listTranslationCollections.value?.includes(collection.collection))
    })

    const items = computed(() => {
        return collections.value.map((collection) => ({
            text: collection.name,
            value: collection.collection,
            icon: collection.icon,
            description: collection.meta.note
        }));
    });

    function excludeCollection(collection: any, startStr: string = 'directus_') {
        return collection?.startsWith(startStr) === false
    }

    function getTranslationCollection(collection: string = '') {
        const relations = relationsStore.getRelationsForCollection(collection)
        const translationField = fieldsStore.getFieldsForCollection(collection).find((field: any) => field.meta.interface === 'translations')

        if( ! translationField ) {
            return collection
        }
        
        const relationTranslation = relations.find((relation: any) => relation.meta.one_field === translationField.field)
        if( !relationTranslation ) {
            return collection
        }
        return relationTranslation.collection
    }

    return {
        collections,
        listTranslationCollections,
        translationCollections,
        collectionsWithoutTranslation,
        items,
        getTranslationCollection
    }
}