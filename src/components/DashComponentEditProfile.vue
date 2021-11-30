<template>
    <div id="editcomponent">
        <div class="edit-pic-container">
            <div class="image-location">
                <img src="https://cultivatedculture.com/wp-content/uploads/2019/12/Austin-Portrait-Taken-By-Professional-Photographer-683x1024.png" alt="Profile picture">
                <div class="image-edit-container">
                    <p class="image-edit-txt">Edit profile</p>
                </div>
            </div>
        </div>
        <div class="edit-profile-container">
            <table class="profile-table">
                <tr>
                    <td><p>Firstname</p></td>
                    <td><input class="input-edit" type="text" value="Firstname"/></td>
                </tr>
                <tr>
                    <td><p>Lastname</p></td>
                    <td><input class="input-edit" type="text" value="Lastname"/></td>
                </tr>
                <tr>
                    <td><p>Email</p></td>
                    <td><input class="input-edit" type="email" value="Email"/></td>
                </tr>
                <tr>
                    <td><p>Password</p></td>
                    <td><input class="input-edit" type="password" value="password"/></td>
                </tr>
            </table>
        </div>
        <div class="edit-btn">
            <button class="edit-save-button">Confirm changes</button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'dashcomponentedit'
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
    width: 20%;
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
</style>