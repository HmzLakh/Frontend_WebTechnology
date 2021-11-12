<template>
  <div id="comment">
      <div class="comment-profile">
          <img class="profilepic" src="../assets/Images/login.png">
      </div>
      <div class="right-side">
        <div class="comment-information">
            <p class="username">Username</p>
            <h6>Sep 9th at 8:44pm</h6>
        </div>
        <div class="comment">
            <p>{{msgContent}}</p>
        </div>
      </div>
      <div class="votes">
          <div class="votes-amount"> 0 </div>
          <div class="votes-buttons">
              <div class="up-button">/\</div>
              <div class="down-button">\/</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['msgContent'],
    name: 'comment'
}
</script>
<style>
#comment {
    display: flex;
    width: 100%;
    border-bottom: 1px solid silver;
}

.comment-profile {
    width: 60px;
}

.profilepic {
    width: 100%;
}

.username {
    color:green;
    font-weight: bold;
}

.right-side {
    width: calc(100% - 50px);
    padding-left: 10px;
}

.votes {
    display: flex;
    width: 50px;
}

.votes-amount {
    display: flex;
    justify-self: center;
    align-items: center;
}

.votes-buttons {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.votes-buttons > * {
    height: 50%;
    width: 100%;
}

</style>