<template>
  <div id="slideshow">
      <div class="previous-img"><font-awesome-icon :icon="['fas', 'chevron-left']" /></div>
      <img class="img" src="../assets/Images/exampleimg1.jpg" />
      <div class="next-img"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div>
  </div>
</template>

<script>
export default {
    name: 'slideshow'
}
</script>
<style>
#slideshow {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 300px;
    width: 100%;
    background-color: #cccccc;
}

.previous-img, .next-img {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 35px;
    background: rgba(0, 0, 0, 0.2);
    transition: .25s all;
}

.previous-img {
    left: 0;
}

.next-img {
    right: 0;
}

.previous-img:hover, .next-img:hover {
    background: rgba(0, 0, 0, 0.5);
    transition: .25s all;
}

.img {
    max-height: 100%;
    max-width: 100%;
}
</style>