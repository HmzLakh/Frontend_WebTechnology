<template>
  <div id="profileviewer">
      <div class="profile-image">
          <div class="profile-image-container">
              <img src="https://cultivatedculture.com/wp-content/uploads/2019/12/Austin-Portrait-Taken-By-Professional-Photographer-683x1024.png" alt="Profile picture">
          </div>
      </div>
      <div class="profile-informations-container">
          <ProfileCard title="Type of profile">
              <p>This user is a owner</p>
          </ProfileCard>
          <ProfileCard title="Profile information">
              <p>Hamza Lakhloufi enrolled 01/01/1999</p>
          </ProfileCard>
          <ProfileCard title="Last posts (ONLY IF OWNER)">
              <p>Show here the last posts with links</p>
          </ProfileCard>
      </div>
  </div>
</template>

<script>
import ProfileCard from './ProfileCardInformation.vue'

export default {
  name: 'profileviewer',
  components: {ProfileCard}
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