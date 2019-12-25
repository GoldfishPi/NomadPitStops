<template lang="pug">
    div.blog-posts
        v-card(
            v-for="post in posts" 
            :key="post.id" 
            :to="`/blog/${post.uid}`"
            flat
            outlined
            )
            v-img(:src="post.thumbnail" height="300")
            v-card-title
                | {{ post.title }}
            v-card-text
                | {{ post.snippet }}
            v-card-actions
                v-btn(color="primary" text :to="`/blog/${post.uid}`")
                    | Read More
</template>

<script lang="ts">
import Vue from 'vue'
import gql from "graphql-tag";
import Prismic from "prismic-javascript";
import { RichText, Link } from "prismic-dom";

export default Vue.extend({
    async asyncData({app}) {
        const api = await Prismic
            .api('https://nomadpitstops.cdn.prismic.io/api/v2');

        const documents = await api.query(
            Prismic.Predicates.at('document.type', 'blog-post'),
            { orderings : '[document.first_publication_date desc]' }
        );

        const posts = documents.results
            .map(res => ({
                id:res.id,
                uid:res.uid,
                title: RichText.asText(res.data.title),
                snippet: RichText.asText(res.data.snippet),
                thumbnail: Link.url(res.data.thumbnail), 
                type:res.data.type
            }));
        return {
            posts
        }
    }

})
</script>
<style scoped>
.blog-posts {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(400px, 1fr));
    grid-gap:1rem;
}
</style>


