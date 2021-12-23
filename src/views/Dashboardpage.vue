<template>
  <div id="dashboardpage">
      <Navbar />
      <div class="dash-container">
        <div class="dash-menu">
          <h1 class="dash-menu-title">Menu</h1>
          <ol class="dash-list">
              <router-link class="dash-router-link" :to="{name: 'home_home'}">
                <li class="dash-element">
                    <font-awesome-icon :icon="['fas', 'home']" class="dash-logo" />
                    <p>Home</p>
                </li>
            </router-link>
            <router-link class="dash-router-link" :to="{name: 'home_edit'}">
                <li class="dash-element">
                    <font-awesome-icon :icon="['fas', 'user-edit']" class="dash-logo" />
                    <p>Edit profile</p>
                </li>
            </router-link>
            <router-link class="dash-router-link" :to="{name: 'home_post'}" v-if="this.$store.getters.getUserProfile.is_owner">
                <li class="dash-element">
                    <font-awesome-icon :icon="['fas', 'building']" class="dash-logo" />
                    <p>My posts</p>
                </li>
            </router-link>
          </ol>
        </div>
        <div class="dash-inner">
          <router-view></router-view>
        </div>
      </div>
      <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'dashboardpage',
  components: { Navbar, Footer },
  data(){
    return {
      unwatch: () => null,
      unwatchLogin: () => null
    }
  },
  mounted() {
    // Check if user is always connected!
    this.unwatch = this.$store.watch(() => this.$store.getters.isUserConnected, (newValue) => {
      if(!newValue){
        this.$router.push({name: 'root'})
      }
    })
    // Check if dashboard informatoins is available
    this.unwatch = this.$store.watch(() => this.$store.getters.getDashboardAvailability, (newValue) => {
      if(!newValue){
        this.$store.dispatch('resetDashboardAvailability')
        this.$router.push({name: 'root'})
      }
    })
    this.$store.dispatch('checkDashboardAvailability')
  },
  beforeDestroy() {
    this.unwatch()
    this.unwatchLogin()
  }
}
</script>

<style>
#registerpage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.dash-container {
  display: flex;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  transition: all 0.25s;
}

.dash-menu {
  width: 300px;
  background: rgb(195,55,100);
}

.dash-inner {
  width: calc(100% - 300px);
}

.dash-element {
  position: relative;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 25px;
  font-family: nunito;
  font-size: 18px;
  transition: 0.25s;
}

.dash-element:hover {
  padding-left: 40px;
  transition: 0.25s;
  cursor: pointer;
}

.dash-element > p,
.dash-element > a {
    color: white;
  padding-left: 15px;
}

.dash-menu-title {
  font-family: Nunito;
  color: white;
  font-weight: 600;
  text-align: center;
}

.dash-list {
    padding: 15px 0;
}

.dash-router-link {
    display: block;
    color: white;
    text-decoration: none;
    cursor: pointer;
}

@media screen and (max-width: 1450px) {
    .dash-container {
        flex-direction: column;
    }
    .dash-inner {
        width: 100%;
    }
    .dash-menu {
        width: 100%;
    }
    .dash-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
}
</style>