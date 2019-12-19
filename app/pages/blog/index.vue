<template lang="pug">
    div hello    
</template>

<script lang="ts">
import Vue from 'vue'
import gql from "graphql-tag";

export default Vue.extend({
    async asyncData({app}) {
        const query = gql`
        {
          allPages {
            pageInfo {
              hasNextPage
            }
          }
        }
        `;
        console.log('clinet', app.apolloProvider.clients.blog);
        //const res = await app.apolloProvider.clients.blog
        //    .query({query});
        //console.log('got res lol', res);
    }

})
</script>


