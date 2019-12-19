<template lang="pug">
    div.pitstops
        v-card(v-for="p of pitstops" :to="`/pitstops/${p.id}`" flat outlined)
            v-img(v-if="p.images.length > 0" src="p.images[0].link")
            v-card-title {{p.name}}
            v-card-text {{p.notes}}
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
    async asyncData(context) {
        const query = gql`
            {
                pitstops:Pitstops {
                    name,
                    id,
                    notes,
                    images {
                        link
                    }
                }
            }
        `;

        const res = await context.app.apolloProvider.defaultClient
            .query({query});

        return {
            pitstops:res.data.pitstops
        }
    }
});
</script>

<style scoped>
.pitstops {
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));
    grid-gap:1rem;
}
</style>
