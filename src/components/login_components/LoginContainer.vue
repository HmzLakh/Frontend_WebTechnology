<template>
  <div id="login-container">
      <Loading v-if="loading" />
      <div v-else>
        <img class="login-img" src="../../assets/Images/login.png" />
        <div class="inputs">
            <div class="mail-input">
                <input v-model="username" type="text" required>
                <span></span>
                <label ref="usernameLabel" class="label-input">Username</label>
            </div>
            <div class="pass-input">
                <input ref="passwordLabel" v-model="password" type="password" required>
                <span></span>
                <label ref="passwordLabel" class="label-input">Password</label>
            </div>
            <p class="password-forgotten">Forgot password?</p>
            <input @click="logUserIn" class="login-btn" type="button" value="Login">
            <p class="loginerrormsg">{{ errorMsg }}</p>
            <p class="signup-link">Not registered? <router-link class="link" :to="{name: 'register_choice'}">Signup</router-link></p>
        </div>
      </div>
  </div>
</template>

<script>
import Loading from '../LoadingSpinner.vue'

export default {
    name: 'login-container',
    components: { Loading },
    data() { 
        return {
            username: '',
            password: '',
            errorMsg: null,
            loading: false
        }
    },
    methods: {
        logUserIn: function (event) {
            if(this.username.length == 0){
                this.$refs.usernameLabel.classList.add("not-valid")
                setTimeout(() => {
                    this.$refs.usernameLabel.classList.remove("not-valid")
                }, 1500)
            }
            if(this.password.length == 0){
                this.$refs.passwordLabel.classList.add("not-valid")
                setTimeout(() => {
                    this.$refs.passwordLabel.classList.remove("not-valid")
                }, 1500)
            }
            const login_model = {
                username: this.username,
                password: this.password
            }

            if(this.username.length !== 0 && this.password.length !== 0) {
                this.$store.dispatch('postLoginCredentials', login_model)
                this.loading = true
            }
        }
    },
    computed: {
        getLoginStatus(){
            return this.$store.getters.isUserConnected
        }
    },
    watch: {
        getLoginStatus: function () {
            const isConnected = this.$store.getters.isUserConnected
            if (isConnected === null) return;
            if(isConnected) {
                this.$router.push({name: 'root'})
            } else {
                this.errorMsg = this.$store.getters.getAuthenticationMessage
            }
            this.loading = false
            this.$store.dispatch('resetLoginState')
        }
    }
}
</script>

<style>
#login-container {
    position: relative;
    width: min(400px, 100%);
    padding: 0 40px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}

.mail-input {
    position: relative;
    border-bottom: 1px solid silver;
    margin: 100px 0 30px;
}

.mail-input input {
    height: 40px;
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    background: none;
}

.mail-input label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.25s;
}

.mail-input span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e4376;
    transition: 0.25s;
}

.mail-input input:focus ~ label,
.mail-input input:valid ~ label {
    font-size: 10px;
    top: -5px;
    transition: 0.25s;
}

.mail-input input:focus ~ span::before,
.mail-input input:valid ~ span::before {
    width: 100%;
    transition: 0.25s;
}

.pass-input {
    position: relative;
    border-bottom: 1px solid silver;
    margin: 30px 0;
}

.pass-input input {
    height: 40px;
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    background: none;
}

.pass-input label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.25s;
}

.pass-input span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e4376;
    transition: 0.25s;
}

.pass-input input:focus ~ label,
.pass-input input:valid ~ label {
    font-size: 10px;
    top: -5px;
    transition: 0.25s;
}

.pass-input input:focus ~ span::before,
.pass-input input:valid ~ span::before {
    width: 100%;
    transition: 0.25s;
}

.login-img {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -130%);
    position: absolute;
    width: 75%;
    pointer-events: none;
}

.label-input {
    font-family: Nunito;
    font-size: 12px;
}

.not-valid {
    color: red;
    font-weight: bold;
    transition: all 0.25s;
}

.login-btn {
    height: 45px;
    width: 100%;
    border: none;
    border-radius: 25px;
    margin: 30px 0;
    background-color: #61045f;
    color: white;
    font-family: Nunito;
    font-size: 18px;
}

.login-btn:hover {
    background-color: #aa076b;
}

.password-forgotten {
    font-family: Nunito;
    font-size: 11px;
    color: gray;
}

.password-forgotten:hover {
    text-decoration: underline;
    cursor: pointer;
}

.signup-link {
    text-align: center;
    margin: 30px 0;
}

.signup-link {
    font-family: Nunito;
    font-size: 14px;
}

.loginerrormsg {
  color: red;
  font-size: 13px;
  font-family: Nunito;
  text-align: center;
}
</style>