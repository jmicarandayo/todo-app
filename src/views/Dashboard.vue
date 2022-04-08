<template>
    <div class="dashboard-container">
        <div class="banner-box">
            <h1 class="welcome-text">Welcome {{email}}</h1>
            <!-- <h2 class="name"></h2> -->
        </div>
        <div class="widgets">
            <TaskListWidget
                @click="goTo('daily')"
                :tasks="tasks"
                label="daily"/>
            <TaskListWidget
                @click="goTo('weekly')"
                :tasks="tasks"
                label="weekly"/>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import TaskListWidget from '../components/TaskListWidget.vue'


export default {
    components: { TaskListWidget },
    data() {
        return {
            email: null,
            tasks: [],
            taskType:''
        };
    },
    created() {
        if (localStorage.getItem("token") === null) {
            this.$router.push("/");
        }
    },
    mounted() {
        axios.get("http://localhost:5000/user", { headers: {
                token: localStorage.getItem("token")
            } })
            .then(res => {
            this.email = res.data.user.email;
            this.$emit("loggedIn", this.email);
        });
        axios.get("http://localhost:5000/tasks")
            .then(res => {
            this.tasks = res.data.tasks;
        }, err => console.log(err));
    },
    methods: {
        goTo(label) {
            this.taskType = label
            console.log(this.taskType)
            this.$router.push('/tasks/'+ this.taskType)
            this.emitter.emit('goToType', this.taskType )
        }
    }
}


</script>


<style>
.dashboard-container {
    padding: 50px 0;
    width: 95%;
    margin: 0 auto;
}
.dashboard-container .widgets {
    display: flex;
    justify-content: space-evenly;
}
.dashboard-container .banner-box{
    text-align: center;
    margin: 2em auto;
    color: #DC143C;
}

@media (max-width: 700px){
    .dashboard-container .widgets {
        flex-direction: column;
    }
}
</style>