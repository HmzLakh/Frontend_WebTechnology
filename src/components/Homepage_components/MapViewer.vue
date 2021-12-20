<template>
  <div id="map">
    <l-map v-if="showMap" :zoom="zoom" :center="center" :options="mapOptions" style="height: 95%" @update:center="centerUpdate" @update:zoom="zoomUpdate">
      <l-tile-layer :url="url" :attribution="attribution" />
      <!--l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker-->
      <l-marker v-for="(item, i) in getMapInfo" :key="i" :lat-lng="item.maploc">
        <l-popup>
          <div class="mapviewer-popup">
            {{ item.title }}
            <p v-show="showParagraph">
              Sport played here: <span v-for="(sport, idx) in item.sports" :key="idx">{{ sport }} </span>
            </p>
            <router-link :to="{ name: 'article', params: {id: item.post_id} }"><div class="view-button"><font-awesome-icon class="view-button-image" :icon="['fas', 'eye']" /></div></router-link>
          </div>
        </l-popup>
        <l-icon :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" :icon-url="getRightIcon(item.sports)" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LControl, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css'
import axios from 'axios';

export default {
  name: 'mapviewer',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LControl,
    LIcon
  },
  data () {
    return {
      zoom: 13,
      center: latLng(50.8503396, 	4.3517103),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'MyGym',
      withPopup: latLng(50.81322, 4.3517103),
      withTooltip: latLng(50.81422, 4.3517103),
      currentZoom: 11.5,
      currentCenter: latLng(50.81322, 4.3517103),
      showParagraph: true,
      mapOptions: { zoomSnap: 0.5 },
      showMap: true
    }
  },
  mounted(){
    this.$store.dispatch('getMapInfo')
  },
  computed: {
    getMapInfo(){
      return this.$store.getters.getMapInfo
    },
    dynamicSize() {
      return [this.iconSize*2, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },
  watch: { 
    getMapInfo: function(newVal) {
      for (let index = 0; index < newVal.length; index++) {
        const item = newVal[index]
        axios.get("https://nominatim.openstreetmap.org/search?format=json&limit=3&q="+item.address, {withCredentials: false})
        .then((response) => {
        const long = response.data[0].lon
        const lat = response.data[0].lat
        item.maploc = latLng(lat, long)
        })
      }
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;address
    },
    getRightIcon(sports){
      if(sports.length > 1){
        return "/dist/sports.png"
      } else {
        const singleSport = sports[0]
        switch (singleSport) {
          case "football":
            return "/dist/football.png"
          case "basketball":
            return "/dist/basketball-ball.png"
          case "tennis":
            return "/dist/tennis.png"
          case "badminton":
            return "/dist/badminton.png"
          case "volleyball":
            return "/dist/volleyball.png"
          default:
            return "/dist/sports.png"
        }
      }
    }
  }
}
</script>

<style>
#map {
    height: 400px;
    width: 100%;
}

.view-button {
    position: absolute;
    right: 10px;
    bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 75px;
    background-color: #ff512f;
    border-radius: 25px;
    cursor: pointer;
}

.view-button:hover {
    background: #dd2476;
}

.view-button-image {
    color: white;
}

.mapviewer-popup {
  font-family: Nunito;
  height: 80px;
}
</style>