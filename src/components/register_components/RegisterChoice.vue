<template>
  <div id="register-choice">
    <h1 class="choice-title">Register as a</h1>
    <div class="choices">
      <router-link class="dash-router-link" :to="{name: 'register_renter'}">
        <div class="renter">
          <img src="../../assets/Images/renter.png">
          <p class="registerchoice-renterchoice">Renter</p>
        </div>
      </router-link>
      <router-link class="dash-router-link" :to="{name: 'register_owner'}">
        <div class="landlord">
            <img src="../../assets/Images/landlord.png">
            <p class="registerchoice-renterchoice">Owner</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register-choice'
}
</script>

<style>
#register-choice {
  width: min(800px, 100%);
  background-color: white;
  border-radius: 30px;
  padding: 0 30px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}

.choices {
  display: flex;
  justify-content: space-evenly;
  margin: 0 0 103px 0;
  width: 100%;
}

.choice-title {
  text-align: center;
  padding: 30px 0;
  font-family: Nunito;
  font-weight: 700;
  font-size: 30px;
}

.renter, .landlord {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  transition: 0.25s;
  background-color: #bdc3c7;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;
}

.renter:hover, .landlord:hover {
  height: 210px;
  width: 210px;
}

.renter img, .landlord img{
  width: 80%;
  pointer-events: none;
}

.renter p, .landlord p{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 500%);
  font-family: Nunito;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

.registerchoice-renterchoice {
  color: black;
}

@media screen and (max-width: 800px) {
  .choices {
    flex-direction: column;
    align-items: center;
  }
  
  .choices > * {
    margin: 30px 0;
  }
} 
</style>