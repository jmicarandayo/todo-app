<template>
<div class="task-container">
    <div class="sub-container">
        <div class="btn-container">
        <button @click="setType('all')">all</button>
        <button @click="setType('daily')">daily</button>
        <button @click="setType('weekly')">weekly</button>
        <button @click="setType('completed')">completed</button>
    </div>
    <form class="search-form">
        <input type="text" placeholder="Search">
    </form>  
    </div>
    <!-- <AddTask/> -->
    <TaskLists :tasks="tasks" :type="type"/>
    <!-- <div v-for="task in tasks" :key="task._id" class="task">
        <p>{{task.title}}</p>
        <p>{{task.details}}</p>
        <p>{{task.type}}</p>
    </div> -->
</div>
</template>

<script>
import AddTask from '../components/AddTask.vue'
import TaskLists from '../components/TaskLists.vue'

import axios from 'axios'

export default {
    components: {
        AddTask,
        TaskLists
    },
    data() {
        return {
            tasks: [],
            type: 'all'
        }
    },
    // created(){
    //     if(localStorage.getItem('token') === null) {
    //     this.$router.push('/')
    //     }
    // }
    mounted() {
        axios.get('http://localhost:5000/tasks')
            .then(res => {
                this.tasks = res.data.tasks
                console.log(res)
                console.log(this.tasks)
            }, err => console.log(err))
    },
    methods: {
        setType(type) {
            this.type = type
        }
    }
}
</script>

<style>
h1, p {
    color: #000;
}

.task-container {
    max-width: 1400px;
    width: 90%;
    background-color: antiquewhite;
    margin: 100px auto;
}
.task-container .sub-container {
    display: flex;
    justify-content: space-between;
    padding: 1.5em;
}
.sub-container .btn-container button {
    border: 0;
    margin-right: .5em ;
    font-size: 1em;
    text-transform: capitalize;
    padding: .5em 1.5em;
    border-radius: 5px;
    background-color: rgba(176, 181, 179, .4);
    font-weight: 600;
    letter-spacing: .1em;
    cursor: pointer;
}
.sub-container .btn-container button:focus {
    background-color: rgba(220, 20, 60, .4)
}
.search-form input {
    font-size: 1em;
    padding: .4em .6em;
    background: transparent;
    border: 1px solid crimson;
    border-radius: 5px;
}
.search-form input:focus {
    outline: none;
    box-shadow: 0 0 10px #bbb;
}
</style>