<template>
    <div id="navbarmenu">
        <div ref="navbarmenucore" class="navbar-menu-container" @focus="insideClick" @focusout="outsideClick" tabindex="-1">
            <div class="navbar-menutop">
                <h2 class="navbar-menutop-title">MyGym</h2>
            </div>
            <ol>
                <router-link v-if="isConnected" class="navbar-router-link" :to="{name: 'home_home'}">
                    <li class="navbar-element">
                        <font-awesome-icon :icon="['fas', 'user-edit']" class="navbar-logo" />
                        <p>Dashboard</p>
                    </li>
                </router-link>
                <li class="navbar-element">
                    <font-awesome-icon :icon="['fas', 'info-circle']" class="navbar-logo" />
                    <p>About us</p>
                </li>
                <router-link v-if="!isConnected" class="navbar-router-link" :to="{name: 'login'}">
                    <li class="navbar-element">
                        <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="navbar-logo" />
                        <p>Login</p>
                    </li>
                </router-link>
                <router-link v-if="!isConnected" class="navbar-router-link" :to="{name: 'register_choice'}">
                    <li class="navbar-element">
                        <font-awesome-icon :icon="['fas', 'user-plus' ]" class="navbar-logo" />
                        <p>Sign up</p>
                    </li>
                </router-link>
                <li v-if="isConnected" class="navbar-element" @click="disconnectUser">
                    <font-awesome-icon :icon="['fas', 'info-circle']" class="navbar-logo" />
                    <p>Disconnect</p>
                </li>
                <li class="navbar-element" @click="outsideClick">
                    <font-awesome-icon :icon="['fas', 'times']" class="navbar-logo" />
                    <p>Close menu</p>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbarmenu',
    computed: {
        isConnected(){
            return this.$store.getters.isUserConnected
        }
    },
    methods: {
        insideClick(){
            // Nothing currently really
        },
        outsideClick(e){
            // When clicking outside window, focus is lost, so we fix this by doing this
            if(e.sourceCapabilities !== null){
                this.$emit('closeMenu')
            }
        },
        disconnectUser(){ // Disconnect user!
            this.$store.dispatch('logoutUser')
            this.$emit('closeMenu')
        }
    },
    mounted() {
        this.$refs.navbarmenucore.focus(); // Apply focus on the sidebar in order to close it when we click outside of it
    }
}
</script>

<style>
#navbarmenu {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(128,128,128,0.75);
    z-index: 1100;
}

.navbar-menu-container {
    transition: width .25s;
    margin-left: auto;
    height: 100%;
    width: 300px;
    background-color: white;
    outline: none;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}

@media screen and (max-width: 600px) {
    .navbar-menu-container {
        width: 100%;
    }
}

.navbar-menutop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid silver;
}

.navbar-menutop-title {
    font-family: Nunito;
}

.navbar-element {
  position: relative;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 25px;
  font-family: nunito;
  font-size: 18px;
  transition: 0.25s;
}

.navbar-element:hover {
  cursor: pointer;
  background-color: #dfe6e9;
}

.navbar-element > p,
.navbar-element > a {
    color: black;
    padding-left: 15px;
}

.navbar-logo {
    color: black;
}

.navbar-router-link {
    display: block;
    color: white;
    text-decoration: none;
    cursor: pointer;
}
</style>