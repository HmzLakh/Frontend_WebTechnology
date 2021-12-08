<template>
    <div>
        <input type="file" @change="handleFile($event)"/>    
    </div>
</template>
<script>
export default {
    name: 'uploadsinglecomponent',
    data() {
        return {
            file: null
        }
    },
    methods: {
        handleFile(e) {
            this.file = e.target.files[0];
        }
    }
}
</script>