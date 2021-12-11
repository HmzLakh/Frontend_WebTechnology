<template>
    <div class="waitloader">
      <div class="waitloader-loadanimation">
        <font-awesome-icon class="waitloader-spinner" :icon="['fas', 'spinner']" />
      </div>
      <p class="waitloader_txt">Please wait</p>
    </div>
</template>

<script>

export default {
  name: 'loadingspinner'
}
</script>

<style>
.waitloader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 400px;
  width: 100%;
}

.waitloader_txt {
  font-size: 26px;
  color: black;
  margin: 30px 0;
}

.waitloader-loadanimation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.waitloader-spinner {
  font-size: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>