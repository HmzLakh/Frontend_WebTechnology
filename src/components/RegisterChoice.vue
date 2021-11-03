<template>
  <div id="register-choice">
    <h1 class="choice-title">I am a</h1>
    <div class="choices">
      <div class="renter">
        <img src="../assets/Images/renter.png">
        <p>Renter</p>
      </div>
      <div class="landlord">
          <img src="../assets/Images/landlord.png">
          <p>landlord</p>
      </div>
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
  width: 800px;
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
</style>