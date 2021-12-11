<template>
    <img id="slide" :src="img"/>
</template>
<script>
export default {
    name: 'slide',
    props: ['img']
}
</script>
<style>
#slide {
    max-height: 100%;
    max-width: 100%;
}
</style>