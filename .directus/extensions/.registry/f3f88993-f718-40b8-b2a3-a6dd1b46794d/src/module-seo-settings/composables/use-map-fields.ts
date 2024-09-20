import { useStores } from "@directus/extensions-sdk";
import { Ref, computed, onMounted, ref } from "vue";
import { getSectionField } from "../../shared/utils";

export default function useMapFields(collection: Ref | string | null = null) {
    const stores = useStores()
    const { useFieldsStore, useCollectionsStore, useRelationsStore } = stores
    const fieldsStore = useFieldsStore();
    const relationsStore = useRelationsStore()
    const mapCollection = ref(collection?.value ? collection?.value : collection)
    const mapFields = ref<any>([])

    
    const relations = relationsStore.getRelationsForCollection(mapCollection.value)
    const translationField = fieldsStore.getFieldsForCollection(mapCollection.value).find((field: any) => field.meta.interface === 'translations')
    mapCollection.value = translationField ? relations.find((relation: any) => relation.meta.one_field === translationField.field)?.collection : mapCollection.value

    console.log('relations', relations)

    const setMapCollection = (collection: string) => mapCollection.value = collection

    const selectItems = computed(() =>
        fieldsStore.getFieldsForCollection(mapCollection.value).map((field: any) => {
            let disabled = false;
            console.log(field)
            if ( field?.schema?.is_primary_key === true) disabled = true;
            if ( field?.meta?.interface === 'seo_analyzer') disabled = true;
            // if ( field?.schema?.foreign_key_table) disabled = true;
            let text = field.name
            let value = field.field

            

            if( translationField ) {
                text = `Translation: ${text}`
            }
            return {
                text,
                value,
                disabled,
            };
        })
    );


    onMounted(() => {
        mapFields.value = getSectionField(
            {
                field: 'field_mapping',
                title: 'Field Mapping'
            },
            [
                {
                    field: 'map_title',
                    name: 'Title field',
                    meta: {
                        interface: 'select-dropdown',
                        // interface: 'system-field',
                        options: {
                            choices: selectItems
                            // collectionName: collection
                        },
                        width: 'half',
                        group: "field_mapping_right",
                        note: 'The field will be used as a Title to analyze SEO Score'
                    },
                },
                {
                    field: 'map_content',
                    name: 'Content field',
                    meta: {
                        interface: 'select-dropdown',
                        options: {
                            choices: selectItems
                        },
                        width: 'half',
                        group: "field_mapping_right",
                        note: 'The field will be used as a Content to analyze SEO Score'
                    },
                },
                {
                    field: 'map_url',
                    name: 'URL/slug field',
                    meta: {
                        interface: 'select-dropdown',
                        options: {
                            choices: selectItems
                        },
                        width: 'half',
                        group: "field_mapping_right",
                        note: 'The field will be used as an URL to analyze SEO Score'
                    },
                },
                {
                    field: 'map_thumbnail',
                    name: 'Thumbnail field',
                    meta: {
                        interface: 'select-dropdown',
                        options: {
                            choices: selectItems
                        },
                        width: 'half',
                        group: "field_mapping_right",
                        note: 'The field will be used as a Thumbnail to analyze SEO Score'
                    },
                },
            ]
        );
    })

    return {
        mapCollection,
        mapFields,
        setMapCollection
    }
}