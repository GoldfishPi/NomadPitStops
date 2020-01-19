import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD8p73THm2DBKXWy3wkJD7bL0PvtNcCUIM',
        libraries: 'places',
    },
})
