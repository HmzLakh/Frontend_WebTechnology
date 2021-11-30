<template>
  <div id="dashboardpage">
      <Navbar></Navbar>
      <div class="dash-container">
        <div class="dash-menu">
          <h1 class="dash-menu-title">Menu</h1>
          <ol class="dash-menu-list">
            <li class="dash-element">
              <font-awesome-icon :icon="['fas', 'home']" class="dash-logo" />
              <p>Home</p>
            </li>
            <li class="dash-element">
              <font-awesome-icon :icon="['fas', 'user-edit']" class="dash-logo" />
              <p>Edit profile</p>
            </li>
            <li class="dash-element">
              <font-awesome-icon :icon="['fas', 'search-location']" class="dash-logo" />
              <p>My reviews</p>
            </li>
            <li class="dash-element">
              <font-awesome-icon :icon="['fas', 'building']" class="dash-logo" />
              <p>My posts</p>
            </li>
          </ol>
        </div>
        <div class="dash-inner">
          <EditComponent></EditComponent>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import HomeComponent from '../components/DashComponentHome.vue'
import EditComponent from '../components/DashComponentEdit.vue'

export default {
  name: 'dashboardpage',
  components: { Navbar, HomeComponent, EditComponent },
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
  transition: 0.25;
}

.dash-container {
  display: flex;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.dash-menu {
  width: 300px;
  border: 1px solid silver;
  border-right: none;
  background: rgb(195,55,100);
}

.dash-menu-list {
  margin-bottom: 20px;
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
  color: white;
  transition: 0.25s;
}

.dash-element:hover {
  padding-left: 40px;
  transition: 0.25s;
  cursor: pointer;
}

.dash-element > p {
  padding-left: 15px;
}

.dash-menu-title {
  font-family: Nunito;
  color: white;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
}
</style>