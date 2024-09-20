import { useStores } from "@directus/extensions-sdk";
import { COLLECTION } from "../../shared/constants";
import { getSeoDetailRelation, getSeoDetailsField } from "../routes/setup/fields/seo-detail";
import { useCollectionsItems } from "../../shared/composables/use-collections-items";
import { Ref, computed } from "vue";
import useMapFields from "./use-map-fields";

export function useSEODetail(
    collection: Ref<string>
) {
    const { useFieldsStore, useRelationsStore } = useStores()
    const fieldsStore = useFieldsStore()
    const relationsStore = useRelationsStore();
    const { getTranslationCollection } = useCollectionsItems()
    
    const targetCollection = computed(() => getTranslationCollection(collection.value))
    const { mapFields } = useMapFields(targetCollection.value)

    async function createField() {
        const existing = fieldsStore.getField(targetCollection.value, COLLECTION.seo_detail);
        if(existing) {
            return
        }
    
        return await fieldsStore.createField(targetCollection.value, getSeoDetailsField(targetCollection.value))
    }
    async function createRelation() {
        const existing = relationsStore.getRelationForField(targetCollection.value, COLLECTION.seo_detail);
        if(existing) {
            return
        }
        return await relationsStore.upsertRelation(targetCollection.value, COLLECTION.seo_detail, getSeoDetailRelation(targetCollection.value))
    }

    async function saveSEODetailField() {
        await createField()
        await createRelation()
    }

    return {
        saveSEODetailField
    }
}