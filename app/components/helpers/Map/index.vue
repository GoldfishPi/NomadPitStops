<template >
    <div flat class="map">
        <GmapMap
            :center="{lng:loc[0], lat:loc[1]}"
            :zoom="15"
            :options="{disableDefaultUI: true}"
        >
        <GmapMarker :position="{lng:loc[0], lat:loc[1]}"></GmapMarker> 
        </GmapMap>
    </div>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
    props:['loc'],
});

</script>

<style>
.fullscreen-map {
    height: 94vh;
}
.close {
    color: grey;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
}
.map {
    position: relative;
    overflow: hidden;
    height: 100%;
}
.vue-map-container {
    transition: all 0.5s;
    width: 100%;
    height: 100%;
}
.selected .vue-map-container {
    width: 50%;
    margin-left: 50%;
}
.selecting * {
    cursor: crosshair;
}
.add-controlls {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    left: -100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.add-controlls .text {
    width: 100%;
}
.selected .add-controlls {
    left: 0%;
}
.speed {
    color: grey;
    font-size: 1.2rem;
}
@media screen and (max-width: 900px) {
    .add-controlls {
        width: 100%;
    }
}
</style>
