<template>
  <div id="article-filter">
    <div class="select-sport">
      <p>Sport</p>
      <select class="value-holder" name="sports">
        <option value="">Select</option>
        <option value="football">Football</option>
        <option value="basketball">Basketball</option>
        <option value="tennis">Tennis</option>
        <option value="handball">Handball</option>
        <option value="squash">Squash</option>
    </select>
    </div>
    <div class="select-price">
      <p>Price</p>
      <input class="value-holder" type="text" />
    </div>
    <div class="select-rating">
      <p>Rating</p>
      <input class="value-holder" type="text" />
    </div>
    <button class="apply-button" type="button">Apply</button>
  </div>
</template>

<script>
export default {
  name: 'article-filter'
}
</script>

<style>
#article-filter {
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid silver;
  padding: 15px;
  margin-right: 30px;
}

.value-holder {
  width: 100%;
}

.apply-button {
  border-radius: 25px;
  margin: 30px 0;
  outline: none;
}
</style>