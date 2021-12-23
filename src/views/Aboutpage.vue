<template>
    <div id="aboutpage">
        <div class="aboutpage-container">
            <div class="aboutpage-container-topside">
                <h1 class="aboutpage-container-topside-txt">About us</h1>
            </div>
            <div class="aboutpage-container-botside">
                <p>Made by</p>
                <p>Taha El Hihi</p>
                <p>Hamza Lakhloufi</p>
                <p>Bilal Laaroussi El Alami</p>
            </div>
        </div>
        <a class="goback" @click="$router.go(-1)">
            <font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']" /> Go back
        </a>
    </div>
</template>

<script>
export default {
  name: 'aboutpage'
}
</script>

<style>

#aboutpage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: rgb(195,55,100);
  background: linear-gradient(348deg, rgba(195,55,100,1) 0%, rgba(29,38,113,1) 100%);
}

.aboutpage-container {
    height: 300px;
    width: min(500px, 100%);
    background-color: white;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: 1px solid silver;
    border-radius: 25px;
    overflow: hidden;
}

.aboutpage-container-topside {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    border-bottom: 1px solid silver;
    background: rgb(97,67,133);
    background: linear-gradient(320deg, rgba(97,67,133,1) 0%, rgba(81,99,149,1) 100%);
}

.aboutpage-container-topside-txt {
    font-family: Nunito;
    color: white;
}

.aboutpage-container-botside {
    height: 80%;
    padding: 25px;
}

.aboutpage-container-botside p {
    font-family: Nunito;
    font-size: 18px;
}

.goback {
  margin: 15px 0;
  font-family: Nunito;
  color: white;
  transition: 0.25s;
}

.goback:hover {
  color: #ffdde1;
  font-size: 20px;
  transition: 0.25s;
  cursor: pointer;
}
</style>