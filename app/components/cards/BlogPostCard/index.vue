<template>
    <v-card flat outlined class="blog-post-card" :title="post.title" :to="`/blog/${post.uid}`">
        <v-img v-bind:src="post.lead" aspect-ratio="1.75"></v-img>
        <v-card-title>
            <div>
                <h3 class="title">{{post.title}}</h3>
            </div>
        </v-card-title>
        <v-card-text>
            <div class="grey--text body-1"><span v-if="post.type">{{post.type}} -</span> {{post.date}}</div>
            <div class="body-2">{{post.snippet}}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="blue" :title="post.title" :to="`/blog/${post.uid}`">More</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <div></div> -->
</template>
<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
    props:['post']
});
</script>
<style>
.blog-post-card {
    cursor: pointer;
}
</style>
