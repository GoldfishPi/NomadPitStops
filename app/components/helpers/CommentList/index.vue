<template>
    <div>
        <v-list three-line>
            <v-list-item v-for="c in splitComments" :key="c.id">
                <v-list-item-avatar>
                    <v-img
                        src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
                        ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{c.user.username}} 
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{c.text}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-layout justify-center align-cente>
            <v-btn 
                  text 
                  color="primary"
                  @click="showMore = true"
                  v-if="comments.length >= 3">
                Show More
            </v-btn>
        </v-layout>
        <v-dialog v-model="showMore">
            <v-card>
                <v-card-text>
                    <v-list three-line>
                        <v-list-item v-for="c in comments" :key="c.id">
                            <v-list-item-avatar>
                                <v-img
                                    src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
                                    ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{c.user.username}} 
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{c.text}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="showMore = false" text color="primary">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    computed: {
        splitComments() {
            const comments:any[] = this.comments;
            if(comments.length >= 3) {
                return comments.slice(0, 3);
            }
            return comments;
        }
    },
    props:{
        comments: Array
    },
    data:() => ({
        showMore:false
    })
});
</script>

<style scoped>

</style>
