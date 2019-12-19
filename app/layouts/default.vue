<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                    >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="item.title" ></v-list-item-title>
            </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
            >
            <v-btn
                icon
                @click.stop="miniVariant = !miniVariant"
                >
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer ></v-spacer>
            <v-btn
                icon
                @click.stop="rightDrawer = !rightDrawer"
                >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
            >
            <v-list>
            </v-list>
        </v-navigation-drawer>
        <v-footer
            :fixed="fixed"
            app
            >
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
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
            right: true,
            rightDrawer: false,
            title: 'Nomad Pit Stops'
        }
    }
});
</script>
