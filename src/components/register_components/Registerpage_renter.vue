<template>
  <div class="owner-register-container">
    <Loading v-if="loading" />
    <div v-else>
      <div class="special-input">
        <input type="text" v-model="fname" required>
        <span></span>
        <label class="label-input">First name</label>
      </div>
      <div class="special-input">
        <input type="text" v-model="lname" required>
        <span></span>
        <label class="label-input">Last name</label>
      </div>
      <div class="special-input">
        <input type="text" v-model="email" required>
        <span></span>
        <label class="label-input">Email</label>
      </div>
      <div class="bod_input">
          <input type="date" v-model="birthdate" value="1970-01-01" min="1900-01-01" max="2100-12-31">
      </div>
      <div class="special-input">
        <input type="text" v-model="username" required>
        <span></span>
        <label class="label-input">Username</label>
      </div>
      <div class="special-input">
        <input type="password" v-model="password" required>
        <span></span>
        <label class="label-input">Password</label>
    </div>
    <p class="registerpagerenter-errormsg">{{ errorMsg }}</p>
    <input class="register-btn" type="button" @click="submitForm" value="Register">
    <p class="login-link">Already registered? <router-link class="link" :to="{name: 'login'}">Login</router-link></p>
  </div>
</div>
</template>

<script>
import Loading from '../LoadingSpinner.vue'

export default {
  name: 'registerpage_owner',
  components: { Loading },
  data () {
    return {
      loading: false,
      errorMsg: null,
      fname: '',
      lname: '',
      birthdate: '1970-01-01',
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm(){
      const renter_model = {
        'fname': this.fname,
        'lname': this.lname,
        'email': this.email,
        'dateofbirth': this.birthdate,
        'username': this.username,
        'password': this.password,
        'is_renter': true
      }
      this.$store.dispatch('postRegisterRenter', renter_model)
      this.loading = true
    }
  },
  computed: {
    getRegisterStatus(){
      return this.$store.getters.getRegisterStatus
    }
  },
  watch:{
    getRegisterStatus: function() {
      const register_succes = this.$store.getters.getRegisterStatus
      if(register_succes === null) return;

      if(register_succes){
        this.$router.replace('/')
      } else {
        this.errorMsg = this.$store.getters.getRegisterMessageStatus
      }
      this.loading = false
      this.$store.dispatch('resetRegisterStates')
    }
  }
}
</script>

<style scoped>
.owner-register-container {
  width: min(500px, 100%);
  padding: 25px;
  background: #ffffff;
  border-radius: 30px;
}

.owner-names {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.bod_input {
    width: 100%;
    margin: 10px 0 30px;
}

.bod_input input {
    border: none;
    border-bottom: 1px solid silver;
    height: 40px;
    font-family: Nunito;
    width: 100%;
    outline: none;
}

.special-input {
    position: relative;
    border-bottom: 1px solid silver;
    margin: 10px 0 30px;
}

.special-input input {
    height: 40px;
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    background: none;
}

.special-input label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.25s;
}

.special-input span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e4376;
    transition: 0.25s;
}

.special-input input:focus ~ label,
.special-input input:valid ~ label {
    font-size: 10px;
    top: -5px;
    transition: 0.25s;
}

.special-input input:focus ~ span::before,
.special-input input:valid ~ span::before {
    width: 100%;
    transition: 0.25s;
}

.label-input {
    font-family: Nunito;
    font-size: 12px;
}

.register-btn {
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

.register-btn:hover {
  background-color: #aa076b;
}

.login-link {
    text-align: center;
    margin: 5px 0;
}

.login-link {
    font-family: Nunito;
    font-size: 14px;
}

.registerpagerenter-errormsg {
  color: red;
  font-size: 13px;
  font-family: Nunito;
  text-align: center;
}
</style>