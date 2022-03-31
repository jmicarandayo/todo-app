<template>
<div class="task-container">
    <div class="sub-container">
        <div class="tab-container">
        <button @click="setType(tab)" v-for="tab in tabs"  :class="{'is-active' : activeTab === tab}">{{tab}}  </button>
    </div>
    <form class="search-form">
        <input type="text" placeholder="Search">
    </form>  
    </div>
    <TaskLists :tasks="tasks" :type="type" @deleteTask="deleteTask" :showSelected="showSelected"/>
    <div class="btn-container">
        <button @click="openAddModal" class="new-task-btn">new task</button>
        <button class="save-btn">save</button>
    </div>
    <div v-if="showAddTask">
        <AddTask @closeAddTask="closeAddModal"/>
    </div>
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
            tabs:['all', 'daily', 'weekly', 'completed'],
            tasks: [],
            type: 'all',
            activeTab: 'all',
            showAddTask: false
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
    computed: {
        showSelected() {
            return this.tasks.filter(task => {
                if(this.type === 'all') {
                    return true
                }
                return task.type === this.type
            })
        }
    },
    methods: {
        setType(type) {
            this.type = type
            this.activeTab = type
        },
        deleteTask(title, id) {
             if (!window.confirm(`Are you sure you want to delete task "${title}"?`)) {
                return;
            }
            axios.delete('http://localhost:5000/tasks/' + id)
                .then(res => {
                    if(res.status === 200) {
                        location.reload()
                    }
                    
                }, err => console.log(err.response))
        },
        openAddModal() {
            this.showAddTask = true
        },
        closeAddModal() {
            // this.showAddTask = false
            location.reload()
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
.task-container .btn-container {
    display: flex;
    justify-content: end;
    margin: 1em 1em 0;
}
.task-container .sub-container {
    display: flex;
    justify-content: space-between;
    padding: 1.5em;
}
.sub-container .tab-container button,
.task-container .btn-container button {
    border: 0;
    margin-right: .5em ;
    font-size: 1em;
    text-transform: capitalize;
    padding: .5em 1.5em;
    border-radius: 5px;
    font-weight: 600;
    letter-spacing: .1em;
    cursor: pointer;
}
.save-btn {
    background-color: #0055B8;
    color: white;

}
.new-task-btn {
    background-color: #10C6BB;
}
.tab-btn {
    background-color: rgba(176, 181, 179, .4);
}
.sub-container .tab-container .is-active {
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