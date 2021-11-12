<template>
  <div id="reserve-popup">
    <input type="text">
    <select class="popup-sport" name="sports">
        <option value="">Select</option>
        <option value="football">Football</option>
        <option value="basketball">Basketball</option>
        <option value="tennis">Tennis</option>
        <option value="handball">Handball</option>
        <option value="squash">Squash</option>
    </select>
    <button>Submit</button>
  </div>
</template>

<script>
export default {
    name: 'reserve-popup'
}
</script>
<style>
#reserve-popup {
    display: flex;
    flex-direction: column;
    padding: 25px;
    width: 250px;
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
}

#reserve-popup > * {
    margin-bottom: 15px;
}
</style>