<template>
    <v-dialog 
        v-model="active" 
        hide-overlay 
        transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon @click="$emit('close')">
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
                <v-toolbar-title>Add Pit Stop</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-stepper v-model="el">
                <v-stepper-header>
                    <v-stepper-step :complete="el > 1" step="1">
                        Select Location
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="el > 2" step="2">
                        Add Info
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="el > 2" step="3">
                        Add Images
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="useLocation()"
                                color="primary" 
                                large 
                                >Use My Location</v-btn>
                        </v-layout>
                        <div class="map">
                            <GmapMap
                                :center="{lng:wLng, lat:wLat}"
                                :zoom="15"
                                :options="{disableDefaultUI: true}"
                                @click="moveCursor($event)"
                                >
                                <GmapMarker :position="{lng:cLng, lat:cLat}">
                                </GmapMarker> 
                            </GmapMap>
                        </div>

                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="el = 2">Continue</v-btn>
                        </v-layout>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-text-field v-model="title" placeholder="Pitstop Titlte">
                        </v-text-field>
                        <v-slider 
                          prepend-icon="fas fa-wifi"
                          v-model="wifi"
                          ></v-slider>
                        <v-textarea 
                            outlined 
                            placeholder="Description"
                            v-model="description"
                            ></v-textarea>
                        <v-layout>
                            <v-btn @click="el = 1">Back</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="el = 3">Continue</v-btn>
                        </v-layout>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-file-input
                            label="Upload Pitstop Image"  
                            prepend-icon="mdi-camera"
                            accept="image/*"
                            v-model="images"
                            chips
                            multiple
                            ></v-file-input>
                        <v-layout>
                            <v-btn @click="el = 2">Back</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="create()">
                                Create Pitstop
                            </v-btn>
                        </v-layout>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">

import Map from "./../../helpers/Map/index.vue"
import Vue from "vue";
import { getNavigatorCoords } from "geo-loc-utils";

export default Vue.extend({
    props:['active'],
    components: {
        Map
    },
    data:() => ({
        dialog:false,
        el:0,

        cLng:0,
        cLat:0,

        wLng:0,
        wLat:0,

        title:'',
        wifi:0,
        description:'',
        images:[],

    }),
    methods: {
        moveCursor({latLng}:any) {
            this.cLng = latLng.lng();
            this.cLat = latLng.lat();
        },
        async useLocation() {
            try {
                const coords = await getNavigatorCoords();
                this.wLng = coords.longitude;
                this.wLat = coords.latitude;

                this.cLng = coords.longitude;
                this.cLat = coords.latitude;
            } catch(err) {}
        },
        create() {
            const ps:any = {
                longitude:this.cLng,
                latitude:this.cLat,
                name:this.title,
                notes:this.description,
                connection:this.wifi
            }
            this.$emit('create', ps);
            this.$emit('close');
        }
    },
    watch: {
        async active() {
            try {
                const coords = await getNavigatorCoords();
                this.cLng = coords.longitude;
                this.cLat = coords.latitude;

                this.wLng = coords.longitude;
                this.wLat = coords.latitude;
            } catch(err) {}
        }
    }
});

</script>

<style scoped>
.map {
    height:500px;
    margin: 1rem 0;
}
</style>
