<template>
<div class="task-container">
    <div class="sub-container">
        <div class="tab-container">
        <!-- <button @click="setType(tab)" v-for="tab in tabs"  :class="{'is-active' : activeTab === tab}">{{tab}}  </button> -->
        <Button @click="setType(tab)" v-for="tab in tabs"  :class="{'is-active' : activeTab === tab}"> {{tab}} </Button>
    </div>
    <form class="search-form">
        <input v-model="search" type="text" placeholder="Search" @keyup="searchTask">
        <!-- <p>{{ search }}</p>
        <button>search</button> -->
    </form>  
    </div>
    <TaskLists :tasks="tasks" :type="type" @deleteTask="deleteTask" :showSelected="showSelected" @openEdit="openEdit"/>
    <div class="btn-container">
        <!-- <button v-if="!(activeTab == 'completed')" @click="openAddModal" class="new-task-btn">new task</button> -->
        <!-- <button v-if="activeTab == 'completed'" @click="deleteCompleted" class="new-task-btn">delete completed</button> -->
        <!-- <button @click="saveCompleted" class="save-btn">save</button> -->
        <Button v-if="!(activeTab == 'completed')" @click="openAddModal">new task</Button>
        <Button v-if="activeTab == 'completed'" @click="deleteCompleted">delete completed</Button>
        <Button @click="saveCompleted">save</Button>
    </div>
    <div v-if="showAddTask">
        <AddTask @closeAddTask="closeAddModal"/>
    </div>
    <div v-if="showEditTask">
        <EditTask @closeEditTask="closeEdit" :idToEdit="idToEdit"/>
    </div>
</div>
</template>

<script>
import AddTask from '../components/AddTask.vue'
import TaskLists from '../components/TaskLists.vue'
import EditTask from '../components/EditTask.vue'
import Button from '../components/Button.vue'


import axios from 'axios'


export default {
    components: {
    AddTask,
    TaskLists,
    EditTask,
    Button
},
    data() {
        return {
            tabs:['all', 'daily', 'weekly', 'completed'],
            tasks: [],
            originalTask:null,
            type: 'all',
            activeTab: 'all',
            search:null,
            searchedTask:null,
            idToEdit: null,
            task:null,
            showAddTask: false,
            showEditTask: false,
            email: null
        }
    },
    created(){
        if(localStorage.getItem('token') === null) {
        this.$router.push('/')
        }
    },
    mounted() {
        axios.get('http://localhost:5000/tasks')
            .then(res => {
                this.tasks = res.data.tasks
                this.originalTask = res.data.tasks
            }, err => console.log(err))
        axios.get('http://localhost:5000/user', { headers: {
            token: localStorage.getItem('token')
        }})
        .then(res => {
            this.email = res.data.user.email
            console.log(this.email)
            this.$emit('loggedIn', this.email)
        })
    },
    computed: {  
        showSelected() {
                return this.tasks.filter(task => {
                if(this.type === 'all') {
                    return true
                }
                if(this.type === 'completed') {
                    return task.done === true
                }
                return task.type === this.type
            })
        },
        
    },
    methods: {
        searchTask() {
            this.searchedTask = this.originalTask.filter(task => task.title.toLowerCase().includes(this.search))
            if(this.search){
                console.log(this.searchedTask.length)
                this.tasks = this.searchedTask
                console.log('current',this.tasks)  
                console.log('searched',this.searchedTask)  
            } else{
                this.tasks = this.originalTask
                console.log('oroginal',this.tasks)
            }
        },
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
        deleteCompleted() {
             if (!window.confirm(`Are you sure you want to delete all completed task"?`)) {
                return;
            }
            const completed = this.tasks.filter(task => task.done).map(task => task._id)
            console.log(completed)
            axios.post('http://localhost:5000/tasks/completed', completed)
                .then(res => {
                    if(res.status === 200) {
                       location.reload()
                    }
                    
                }, err => console.log(err.response))
        },
        openEdit(id) {
            this.idToEdit = id
            this.showEditTask = true
        },
        closeEdit(id) {
            this.showEditTask = false
        },
        openAddModal() {
            this.showAddTask = true
        },
        closeAddModal() {
            this.showAddTask = false
            location.reload()
        },
        saveCompleted() {
            if (!window.confirm(`Are you sure you want to save completed task?`)) {
                location.reload()
                return;
            }
            const newTasks = this.tasks
            console.log(newTasks)
            axios.put('http://localhost:5000/task/edit-status/done', newTasks)
                .then(res => {
                    console.log(res)
                }, err => console.log(err))
                .catch(err => console.log(err))
            axios.put('http://localhost:5000/task/edit-status/not-done', newTasks)
                .then(res => {
                    console.log(res)
                }, err => console.log(err))
                .catch(err => console.log(err))
        }
    }
}
</script>

<style>

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
/* .sub-container .tab-container button,
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
} */
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