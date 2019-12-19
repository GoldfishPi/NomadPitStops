<template lang="pug">
    v-card
        v-card-title {{pitstop.name}}
        v-card-text {{pitstop.notes}}
</template>

<script lang="ts">
import Vue from 'vue'
import gql from "graphql-tag";
export default Vue.extend({
    async asyncData({app, route}) {
        const query = gql`
            {
                pitstop: Pitstop(id:"${route.params.id}") {
                    name,
                    notes
                }
            }
        `;
        const res = await app.apolloProvider.defaultClient
            .query({query});
        return {
            pitstop: res.data.pitstop
        }
    }
})
</script>


