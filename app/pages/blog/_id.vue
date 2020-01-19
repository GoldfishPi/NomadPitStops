<template lang="pug">
    .blog-post-page
        v-card(flat) 
            v-card-title 
                h1 {{post.title}}
            v-card-text(v-html="post.body")
</template>

<script lang="ts">
import Vue from 'vue'
import Prismic from "prismic-javascript";
import { RichText, Link } from "prismic-dom";

export default Vue.extend({
    async asyncData({ app, route }) {

        const api = await Prismic
            .api('https://nomadpitstops.cdn.prismic.io/api/v2');

        const post = await api
            .getByUID('blog-post', route.params.id);

        return {
            post: {
                title:RichText.asText(post.data.title),
                body:RichText.asHtml(post.data.body),
                thumbnail:Link.url(post.data.thumbnail),
            }
        }
    }
})
</script>
<style>
.blog-post-page {
    display:grid;
    grid-template-columns:1fr 3fr 1fr;
}
.blog-post-page h1 {
    word-break:keep-all;
}
.v-card {
    grid-column:2;
}
.blog-post-page img {
    width:100%;
}
</style>
