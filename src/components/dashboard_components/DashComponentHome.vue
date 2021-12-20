<template>
    <div id="homecomponent">
        <h3 class="homecomponent-txt">Welcome to your dashboard</h3>
    </div>
</template>

<script>
export default {
  name: 'dashcomponenthome'
}
</script>

<style>
#homecomponent {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    background-color: #f7f6f9;
    padding-bottom: 50px;
}

.homecomponent-txt {
    font-family: Nunito;
}

</style>