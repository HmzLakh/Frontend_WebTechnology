<template>
  <div class="owner-register-container">
    <div class="special-input">
      <input type="text" required>
      <span></span>
      <label class="label-input">First name</label>
    </div>
    <div class="special-input">
      <input type="text" required>
      <span></span>
      <label class="label-input">Last name</label>
    </div>
    <div class="special-input">
      <input type="text" required>
      <span></span>
      <label class="label-input">Email</label>
    </div>
    <div class="special-input">
      <input type="text" required>
      <span></span>
      <label class="label-input">Username</label>
    </div>
    <div class="special-input">
      <input type="password" required>
      <span></span>
      <label class="label-input">Password</label>
    </div>
    <input class="register-btn" type="button" value="Register">
    <p class="login-link">Already registered? <router-link class="link" :to="{name: 'login'}">Login</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'registerpage_owner'
}
</script>

<style>
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
</style>