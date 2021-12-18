<template>
  <div>
    <Navbar></Navbar>
    <div class="profile-container">
        <ProfileViewer :profile="getProfileInformations" />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProfileViewer from '../components/profile_components/ProfileViewer.vue'

export default {
  name: 'profilepage',
  components: {Navbar, ProfileViewer},
  data(){
    return {
      unwatch: () => null,
    }
  },
  mounted(){
    const username = this.$route.params.username
    this.$store.dispatch("getProfileInfo", username)
    this.unwatch = this.$store.watch(() => this.$store.getters.getProfileStatus, (newValue) => {
      console.log("VALUE MODIFIED!!!: ", newValue);
      if(newValue == false){
        this.$router.replace('/')
        this.$store.dispatch("resetProfileViewer")
        }
    })
  },
  computed: {
    getProfileInformations(){
      return this.$store.getters.getProfileInformations
    }
  },
  beforeDestroy() {
    this.unwatch()
  }
}
</script>

<style>
.profile-container {
    margin: auto auto;
    max-width: 1500px;
    padding: 0 20px;
}
</style>