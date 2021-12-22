<template>
    <div>
        <ConfirmationBox :open="confirmationOpenOverlay" text="Are you sure you want to submit your modifications?" @close="closeConfirmationOverlay" @yes="submitConfirmationOverlay" @exitedOverlay="closeConfirmationOverlay"/>
        <div id="editcomponent">
            <div class="edit-pic-container">
                <div class="image-location" @click="openGravatar">
                    <img :src="profileImageURL" alt="Profile picture">
                    <div class="image-edit-container">
                        <p class="image-edit-txt">Edit profile</p>
                    </div>
                </div>
            </div>
            <div class="edit-profile-container">
                <table class="profile-table">
                    <tr>
                        <td><p>Firstname</p></td>
                        <td><input class="input-edit" type="text" v-model="firstname" placeholder="Firstname"/></td>
                    </tr>
                    <tr>
                        <td><p>Lastname</p></td>
                        <td><input class="input-edit" type="text" v-model="lastname" placeholder="Lastname"/></td>
                    </tr>
                    <tr>
                        <td><p>Email</p></td>
                        <td><input class="input-edit" type="email" v-model="email" placeholder="Email"/></td>
                    </tr>
                    <tr v-if="isRenter">
                        <td><p>Date of birth</p></td>
                        <td><input class="input-edit" type="date" v-model="dateofbirth" placeholder="Email"/></td>
                    </tr>
                    <tr>
                        <td><p>Password</p></td>
                        <td><input class="input-edit" type="password" v-model="password" placeholder="password"/></td>
                    </tr>
                </table>
                <p class="editprofile-pwd-msg">(Dont edit password if you don't want to change it)</p>
                <div class="edit-errormsg" v-if="errorMsg !== null">
                    <p>{{ errorMsg }}</p>
                </div>
                <div class="edit-successmsg" v-if="showSuccess">
                    <p>{{ successMsg }}</p>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-save-button" @click="openSubmitOverlay">Confirm changes</button>
            </div>
        </div>
    </div>
</template>
<script>
import ConfirmationBox from '../overlay/ConfirmationBox.vue'
import md5 from 'md5';

export default {
    name: 'dashcomponentedit',
    components: {ConfirmationBox},
    data(){
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            dateofbirth: '1970-01-01',
            isRenter: null,
            isOwner: null,
            confirmationOpenOverlay: false,
            errorMsg: null,
            successMsg: "Profile edited successfully!",
            showSuccess: false,
            profileImageURL: null,
            defaultpassword: '*-*-*-*--*-*-*-*-*-*-*' // Default passsword
        }
    },
    computed: {
        getEditProfileStatus(){
            return this.$store.getters.getEditProfileStatus
        }
    },
    watch: {
        getEditProfileStatus: function () {
            const profileResponse = this.$store.getters.getEditProfileStatus
            if (profileResponse === null) return;
            if(profileResponse) { //Profile has been edited!
                this.showSuccess = true
            } else { // Error occured when profile edited
                this.errorMsg = this.$store.getters.getEditProfileMsgError
            }
            this.$store.dispatch('resetEditProfile')
        }
    },
    mounted() {
        // Init data
        this.initUserInformations()
        // Gravatar image from email of user
        this.$nextTick(() => {
            const email = this.$store.getters.getUserProfile.email
            this.profileImageURL = `https://www.gravatar.com/avatar/${md5(email)}?s=200` 
        })
    },
    methods: {
        initUserInformations(){
            const info = this.$store.getters.getUserProfile
            this.firstname = info.firstname
            this.lastname = info.lastname
            this.email = info.email
            this.isRenter = info.is_renter
            this.isOwner = info.is_owner
            this.password = this.defaultpassword
        },
        closeConfirmationOverlay(){
            this.confirmationOpenOverlay = false
        },
        submitConfirmationOverlay(){
            const updateProfile = {
                fname: this.firstname,
                lname: this.lastname,
                email: this.email,
                password: this.password,
                dateofbirth: this.dateofbirth,
                is_renter: this.$store.getters.getUserProfile.is_renter,
                is_owner: this.$store.getters.getUserProfile.is_owner
            }
            if(updateProfile.password == this.defaultpassword){ // If password is unchanged, dont send it to backend
                delete updateProfile.password
            }
            console.log("Sending: ", updateProfile);
            this.$store.dispatch('postEditProfile', updateProfile)
            this.closeConfirmationOverlay()
        },
        openSubmitOverlay(){
            // Check edit form here
            if(this.firstname.length < 4 || this.lastname.length < 4){
                this.errorMsg = "Firstname or lastname must be at least 4 characters"
            } else if(this.password.length !== this.defaultpassword.length && this.defaultpassword.includes(this.password) && this.password.length > 6){
                this.errorMsg = "Password must be at least 6 characters and cannot be equal to the defaullt one!"
            } else if (!(this.firstname.length > 0 && this.lastname.length > 0 && this.email.length > 0 && this.password.length > 0)) {
                this.errorMsg = "One of the fields cannot be empty!"
            } else {
                console.log("=> ", this.email.indexOf("@"), " => ", this.email.indexOf("."));
                this.errorMsg = null
                this.showSuccess = false
                this.$store.dispatch('resetEditProfile')
                this.confirmationOpenOverlay = true
            }
        },
        openGravatar(){ // Open gravatar for client
            window.open("https://fr.gravatar.com/");
        }
    }
}
</script>

<style>
#editcomponent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f7f6f9;
}

.edit-pic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 25px 0;
}

.image-location img{
    width: 100%;
}

.image-location {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 150px;
    height: 150px;
    overflow: hidden;
    transition: 0.25s;
}

.image-location:hover .image-edit-container {
    cursor: pointer;
    display: flex;
}

.image-edit-container {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
}

.image-edit-container {
    display: none;
    justify-content: center;
    align-items: center;
}

.image-edit-txt {
    color: white;
    font-family: Nunito;
    font-size: 16px;
    font-weight: bold;
}

.edit-profile-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.profile-table tr td p{
    font-size: 16px;
}

.profile-table {
    border-spacing: 30px 10px;
}

.input-edit {
    width: 200px;
    border: none;
    background: transparent;
    outline: none;
    border-bottom: 1px solid silver;
}

.edit-btn {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.edit-save-button {
    height: 45px;
    width: 250px;
    border: none;
    border-radius: 25px;
    margin: 30px 0;
    background-color: purple;
    color: white;
    font-family: Nunito;
    font-size: 18px;
}

.edit-save-button:hover {
    background-color: #aa076b;
}

.edit-errormsg {
    margin: 15px 0;
}

.edit-errormsg p {
    font-family: Nunito;
    font-size: 12px;
    color: red;
    font-style: italic;
}

.edit-successmsg {
    margin: 15px 0;
}

.edit-successmsg p {
    font-family: Nunito;
    font-size: 12px;
    color: green;
    font-style: italic;
}

.editprofile-pwd-msg {
    color: red;
    font-style: italic;
    font-family: nunito;
    font-size:11px;
}
</style>