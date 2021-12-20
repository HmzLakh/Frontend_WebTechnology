<template>
  <div id="profileviewer">
      <div class="profile-image">
          <div class="profile-image-container">
              <img :src="`https://www.gravatar.com/avatar/${getGravatarHash}?s=200`" alt="Profile picture">
          </div>
      </div>
      <div class="profile-informations-container">
          <ProfileCard title="Type of profile">
              <p v-if="profile.isOwner">This user is a owner</p>
              <p v-if="profile.isRenter">This user is a renter</p>
          </ProfileCard>
          <ProfileCard title="Profile information">
              <p>{{ profile.firstname }} {{ profile.lastname }} has {{ profile.email }} as email</p>
          </ProfileCard>
      </div>
  </div>
</template>

<script>
import ProfileCard from './ProfileCardInformation.vue'
import md5 from 'md5';

export default {
  name: 'profileviewer',
  props: ['profile'],
  components: {ProfileCard},
  computed: {
      getGravatarHash(){
          return md5(this.profile.email)
    }
  }
}
</script>

<style>
#profileviewer {
    width: 100%;
    border: 1px solid silver;
}

.profile-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-image-container {
    margin: 15px 0;
    height: 150px;
    width: 150px;
    border-radius: 100px;
    overflow: hidden;
}

.profile-image-container img {
    width: 100%;
}

.profile-informations-container {
    padding: 25px;
    width: 100%;
}

.profile-informations-container > * + * {
    margin-top: 25px;
}
</style>