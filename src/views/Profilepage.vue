<template>
  <div>
    <Navbar></Navbar>
    <div class="profile-container">
        <ProfileViewer  :username="username" 
                        :firstname="firstname" 
                        :lastname="lastname" 
                        :email="email"
                        :isOwner="isOwner"
                        :isRenter="isRenter"
        />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProfileViewer from '../components/profile_components/ProfileViewer.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'profilepage',
  components: {Navbar, ProfileViewer, Footer},
  data(){
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      isOwner: false,
      isRenter: false,
      unwatch: () => null,
    }
  },
  mounted(){
    const username = this.$route.params.username
    this.$store.dispatch("getProfileInfo", username)
    this.unwatch = this.$store.watch(() => this.$store.getters.getProfileStatus, (newValue) => {
      if(newValue){
        this.username = this.$store.getters.getProfileInformations.username
        this.firstname = this.$store.getters.getProfileInformations.firstname
        this.lastname = this.$store.getters.getProfileInformations.lastname
        this.email = this.$store.getters.getProfileInformations.email
        this.isOwner = this.$store.getters.getProfileInformations.isOwner
        this.isRenter = this.$store.getters.getProfileInformations.isRenter
      } else {
        this.$router.push({name: 'root'})
        this.$store.dispatch("resetProfileViewer")
      }
    })
  },
  beforeDestroy() {
    this.unwatch()
    this.$store.dispatch("resetProfileViewer")
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