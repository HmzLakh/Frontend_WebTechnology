<template>
    <div>
        <input ref="fileuploadinput" type="file" accept="image/*" @change="handleFile($event)"/>    
    </div>
</template>
<script>
import FormData from 'form-data';

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
            if(this.file.type.includes("image/")){
                this.upload()
            } else {
                this.$refs.fileuploadinput.value = ''
            }
        },
        upload(){
            if(this.file.type.includes("image/")){
                const fd = new FormData()
                fd.append('thumbnail', this.file, this.file.name)
                this.$emit("uploadthumbnail", fd)
            }
        }
    }
}
</script>