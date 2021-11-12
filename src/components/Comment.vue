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
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>
      <div class="votes">
          <div class="votes-amount">10000</div>
          <div class="votes-buttons">
              <div class="up-button"><font-awesome-icon :icon="['fas', 'thumbs-up']" /></div>
              <div class="down-button"><font-awesome-icon :icon="['fas', 'thumbs-down']" /></div>
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
    width: 100%;
    padding: 0 10px;
    border-right: 1px solid silver;
}

.votes {
    display: flex;
}

.votes-amount {
    display: flex;
    justify-self: center;
    align-items: center;
}

.votes-buttons {
    display: flex;
    flex-direction: column;
    width: 30px;
}

.votes-buttons > * {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.up-button {
    color: #6dd5ed;
}

.up-button:hover {
    color: #2193b0;
}

.down-button {
    color: #d66d75;
}

.down-button:hover {
    color: #dd2476;
}

</style>