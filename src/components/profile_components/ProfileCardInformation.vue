<template>
    <div id="profilecard">
        <div class="profilecard-title-card">
            <p class="profilecard-title-card-t">{{ title }}</p>
        </div>
        <div class="profilecard-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profilecard',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
#profilecard {
    height: 100px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.profilecard-title-card {
    width: 100%;
    border-bottom: 1px solid silver;
}

.profilecard-title-card-t {
    font-family: Nunito;
    font-size: 20px;
    text-align: center;
}

.profilecard-container {
    padding: 15px;
}

.profilecard-container-desc {
    font-family: Nunito;
}
</style>