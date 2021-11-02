<template>
  <div id="navbar">
      <div class="sitename-container">
        <h1 class="link"><router-link class="link" :to="{name: 'root'}">MyGym</router-link></h1>
      </div>
      <div class="userprofile-container" v-if="isConnected">
          <div class="userprofile"></div>
      </div>
      <ul class="menu" v-else>
         <li class="menu-style"><p class="link">About us</p></li>
         <li class="menu-style"><router-link class="link" :to="{name: 'login'}">Login</router-link></li>
         <div class="signup">
            <li class="menu-style link">Sign up</li>
         </div>
      </ul>
      <div class="dropdown-container" v-if="showDropdown">
            <div class="dropdown-element">
              <p>My profile</p>
            </div>
            <div class="dropdown-element">
                <p>Something</p>
            </div>
            <div class="dropdown-element">
                <p>Disconnect</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['isConnected'],
  data () { 
    return {
        showDropdown: false
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
    width: 30%;
    background: url(../assets/Images/user.png);
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    transition: 0.25s;
    outline: none;
}

.userprofile:hover {
    background-size: 75%;
    transition: 0.25s;
}

.dropdown-container {
    position: absolute;
    top: 75px;
    right: 0;
    width: 250px;
    background-color: red;
    z-index: 1;
}

.dropdown-element {
    height: 40px;
    padding: 12px 16px 12px 12px;
    background-color: #fff;
    font-family: nunito;
    font-weight: 400;
    border-bottom: 1px solid silver;
    transition: 0.25s;
}

.dropdown-element:hover {
    padding-left: 20px;
    background-color: #d66d75;
    transition: 0.25s;
}

.dropdown-element:last-child {
    border: none;
}
</style>