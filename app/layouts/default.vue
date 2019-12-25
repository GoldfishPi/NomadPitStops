<template lang="pug">
    v-app
        v-app-bar(fixed app)
            v-btn(icon @click.stop="miniVariant = !miniVariant")
                v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
            v-toolbar-title
                | {{ title }}
            v-spacer
            v-btn(icon @click.stop="rightDrawer = !rightDrawer")
                v-icon mdi-menu
        v-navigation-drawer(:mini-variant="miniVariant" fixed app )
            v-list
                v-list-item(v-for="(item, i) in items" :key="i" :to="item.to")
                    v-list-item-action
                        v-icon 
                            | {{item.icon}}
                    v-list-item-content
                        v-list-item-title(v-text="item.title")
        v-content
            v-container
                nuxt
        v-navigation-drawer(v-model="rightDrawer" right temporary fixed)
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data () {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                {
                    icon: 'mdi-home',
                    title: 'Home',
                    to: '/'
                },
                {
                    icon: 'mdi-book',
                    title: 'Blog',
                    to: '/blog'
                },
                {
                    icon:'mdi-apps',
                    title:'Pitstops',
                    to:'/pitstops'
                }
            ],
            miniVariant: true,
            rightDrawer: false,
            title: 'Nomad Pit Stops'
        }
    }
});
</script>
