<template>
    <div id="appointmentcomponent">
        <div class="appointment-menu">
            <div class="search-appointment">
                <div class="appointment-search">
                    <input type="text" required>
                    <span></span>
                    <label class="search-appointment">Search</label>
                </div>
            </div>
        </div>
        <div class="appointment-container">
            <div class="empty-appointments" v-if="!dataset">
                <p class="empty-app-txt">You dont have any appointments.</p>
            </div>
            <div class="appointments" v-else>
                <SingleAppointment v-for="i in 20" :key="i"></SingleAppointment>
            </div>
        </div>
    </div>
</template>
<script>
import SingleAppointment from "./DashComponentSingleAppointment.vue"

export default {
  name: 'dashcomponentappointment',
  components: { SingleAppointment },
  data () {
      return {
          dataset: ['ok']
      }
  }
}
</script>

<style>
#appointmentcomponent {
    width: 100%;
    height: 100%;
    background-color: #f7f6f9;
}

.appointment-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    width: 100%;
    background: rgb(195,55,100);
    padding-left: 25px;
}

.appointment-container {
    height: calc(100% - 100px);
    width: 100%;
}

.search-appointment {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.appointment-search {
    position: relative;
    border-bottom: 1px solid silver;
}

.appointment-search input {
    height: 40px;
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    background: none;
    color: white;
}

.appointment-search label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.25s;
}

.appointment-search span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4e4376;
    transition: 0.25s;
}

.appointment-search input:focus ~ label,
.appointment-search input:valid ~ label {
    font-size: 10px;
    top: -5px;
    transition: 0.25s;
}

.appointment-search input:focus ~ span::before,
.appointment-search input:valid ~ span::before {
    width: 100%;
    transition: 0.25s;
}

.search-appointment {
    color: white;
    font-family: Nunito;
    font-size: 12px;
}

.empty-appointments {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.empty-app-txt {
    font-size: 16px;
}

.appointments {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}

.appointments > * {
    margin: 8px;
}

</style>