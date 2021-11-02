<template>
  <div id="article-filter">
    <div class="cat-one">
      <label>Filter one</label>
      <input type="text" />
    </div>
    <div class="cat-two">
      <label>Filter two</label>
      <input type="text" />
    </div>
    <div class="cat-three">
      <label>Filter three</label>
      <input type="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-filter',
  data () {}
}
</script>

<style>
#article-filter {
  height: 500px;
  width: 350px;
  background-color: greenyellow;
  padding: 15px;
}
</style>