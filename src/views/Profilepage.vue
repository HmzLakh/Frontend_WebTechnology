<template>
  <div>
    <Navbar></Navbar>
    <div class="profile-container">
        <ProfileViewer />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProfileViewer from '../components/profile_components/ProfileViewer.vue'

export default {
  name: 'profilepage',
  components: {Navbar, ProfileViewer},
}
</script>

<style>
.profile-container {
    margin: auto auto;
    max-width: 1500px;
    padding: 0 20px;
}
</style>