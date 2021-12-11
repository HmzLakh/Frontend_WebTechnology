<template>
    <div id="singleappointment">
        <div class="appointment-desc">
            <div class="appointment-topside">
                <h2 class="appointment-title">VUB ZAAL D</h2>
            </div>
            <div class="appointment-botside">
                <p>Appointment at 26/10 at 14:00</p>
            </div>
        </div>
        <div class="appointment-cancel">
            <font-awesome-icon :icon="['fas', 'times']" class="cancel-appointment-logo" />
        </div>
    </div>
</template>
<script>
export default {
  name: 'dashcomponentsinglepost'
}
</script>

<style>
#singleappointment {
    display: flex;
    width: 100%;
    height: 100px;
    background-color: #ecf0f1;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid silver;
}

.appointment-desc {
    width: 95%;
}

.appointment-cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max(5%, 60px);
    background-color: #e74c3c;
}

.appointment-cancel:hover {
    background-color: #c0392b;
    cursor: pointer;
}

.appointment-cancel:hover .cancel-appointment-logo {
    font-size: 36px;
    transition: all 0.25s;
}

.appointment-title {
    color: white;
}

.appointment-topside {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
}

.appointment-botside {
    height: 50%;
    display: flex;
    align-items: center;
    padding-left: 15px;
}

.cancel-appointment-logo {
    color: white;
    transition: all 0.25s;
}

</style>