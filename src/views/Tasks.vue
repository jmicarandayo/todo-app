<template>
<div class="task-container">
    <div class="sub-container">
        <div class="tab-container">
        <Button @click="setType(tab)" v-for="tab in tabs"  :class="{'is-active' : activeTab === tab}" class="tab-btn"> {{tab}} </Button>
    </div>
    <form class="search-form">
        <input v-model="search" placeholder="Search" @keyup="searchTask">
        <i class="fa-solid fa-magnifying-glass"></i>
    </form>  
    </div>
    <TaskLists :tasks="tasks" :type="type" @deleteTask="deleteTask" :showSelected="showSelected" @openEdit="openEdit"/>
    <div class="btn-container">
        <Button v-if="!(activeTab == 'completed')" @click="openAddModal"
        class="new-task-btn"><i class="fa-solid fa-plus"></i></Button>
        <Button class="delete-completed-btn" v-if="activeTab == 'completed'" @click="deleteCompleted">delete completed</Button>
        <Button class="save-btn" @click="saveCompleted">save</Button>
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
import InputField from '../components/InputField.vue'


export default {
    components: {
    AddTask,
    TaskLists,
    EditTask,
    Button,
    InputField
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
        this.emitter.on('goToType', taskType => {
            if(taskType !== null || taskType !== '') {
                this.activeTab = taskType
                this.type = taskType
                console.log('mounted', this.type, this.activeTab)
            }else {
                this.activeTab = 'all'
                this.type = 'all'
                console.log('fine')
                }
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
            if (!window.confirm(`Are you sure you want to save the updates?`)) {
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
    width: 95%;
    background-color: #798897;
    margin: 150px auto;
    border-radius: 10px;
}
.task-container .btn-container {
    display: flex;
    justify-content: end;
    padding: 0 1.5em 1.5em 1.5em;
}
.task-container .sub-container {
    display: flex;
    justify-content: space-between;
    padding: 1.5em;
    padding-bottom: 0;
}
.save-btn {
    background-color:#FFF6F4;
    border: #0055B8 1px solid;
    color: #0055B8;
    margin-left: .5em;
    font-size: 1em;
}
.delete-completed-btn {
    background-color:#FFF6F4;
    border: #DC143C 1px solid;
    color: #DC143C;
    margin-left: .5em;
    font-size: 1em;
}
.new-task-btn {
    background-color:#008800;
    color: #FFF6F4;
    font-weight: 700;
    font-size: 1em;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tab-btn {
    box-shadow: 0px 4px 4px rgba(189, 186, 186, 0.246);
    background-color: #FFF6F4;
    margin: 0 .5em 0 0;
    font-size: 1em;
}
.sub-container .tab-container .is-active {
    background-color: #DC143C;
    color: #FFF6F4;
}
.search-form {
    display: flex;
    font-size: 1em;
    padding: 0 .6em;
    height: 40px;
    align-items: center;
    background: #FFF6F4;
    border: 1px solid crimson;
    border-radius: 5px;
    color: black;
}
.search-form input {
    border: none;
    box-shadow: none;
    margin: 0;
    padding-left: 0;
}
.search-form i {
    color: #798897;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #798897;
}

.search-form:focus {
    outline: none;
    box-shadow: 0 0 10px #bbb;
}
@media (max-width: 750px) {
    .tab-btn,
    .search-form {
    margin-top: .5em;
    }
}
</style>