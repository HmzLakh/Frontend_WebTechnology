<template>
    <div>
        <transition name="fade">
            <Menu v-if="openNavMenu" @closeMenu="closeMenu"/>
        </transition>
        <nav id="navbar">
            <div class="sitename-container">
                <h1 class="link"><router-link class="link" :to="{name: 'root'}">MyGym</router-link></h1>
            </div>
            <div class="userprofile-container" v-if="isConnected">
                <div class="userprofile" @click="openMenu"></div>
            </div>
            <ul class="menu" v-else>
                <router-link class="link" :to="{name: 'about'}">
                    <li class="menu-style"><p class="link">About us</p></li>
                </router-link>
                <li class="menu-style"><router-link class="link" :to="{name: 'login'}">Login</router-link></li>
                <router-link class="link" :to="{name: 'register_choice'}">
                    <div class="signup">
                        <li class="menu-style">Sign up</li>
                    </div>
                </router-link>
            </ul>
            <div v-if="!isConnected" @click="openMenu" class="responsive-menu">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </div>
        </nav>
    </div>
</template>

<script>
import Menu from './NavbarMenu.vue'

export default {
    name: 'navbar',
    components: { Menu },
    data (){
        return {
            openNavMenu: false
        }
    },
    computed: {
        isConnected(){
            return this.$store.getters.isUserConnected
        }
    },
    methods: {
        openMenu(){
            this.openNavMenu = true
            document.body.style.overflowY = "hidden";
        },
        closeMenu(){
            this.openNavMenu = false
            document.body.style.overflowY = "visible";
        }
    }
}
</script>

<style>
#navbar {
    display: flex;
    align-items: center;
    height: 75px;
    width: 100%;
    border-bottom: 1px solid silver;
    background: white;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 15px;
}

.sitename-container {
    display: flex;
    align-items: center;
    padding-left: 40px;
    height: 100%;
    width: calc(100% - 280px);
}

.sitename-container h1 {
    font-family: nunito;
}

.menu {
    display: flex;
    float: right;
    align-items: center;
    width: 280px;
    list-style-type: none;
}

.menu li {
    padding-right: 20px;
}

.menu-style {
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
}

.signup {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 100px;
    background-color: #c33764;
    border-radius: 25px;
}

.signup li {
    padding: 0;
    color: #FFFFFF;
}

.signup:hover {
    background-color: #4e4376;
    transition: 0.5;
}

.link {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.userprofile-container {
    height: 100%;
    width: 270px;
}

.userprofile {
    float: right;
    height: 100%;
    width: 80px;
    background: url(../assets/Images/user.png);
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    transition: 0.25s;
    outline: none;
    border-radius: 50px;
}

.userprofile:hover {
    background-size: 75%;
    transition: 0.25s;
}

.responsive-menu {
    display: none;
    float: right;
}

@media screen and (max-width: 440px) {
    .menu {
        display: none;
    }
    .responsive-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        height: 100%;
        width: 75px;
    }
    .sitename-container {
        width: calc(100% - 75px);
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>