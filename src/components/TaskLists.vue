<template>
  <div>
    <!-- <div class="table">
   <div v-for="task in tasks" :key="task._id" class="task">
        <p>{{task.title}}</p>
        <p>{{task.details}}</p>
        <p>{{task.type}}</p>
    </div>
    </div> -->
    <div class="table-container">
        <div class="table-caption"><p>{{type}}</p></div>
            <div class="table-header">
                <div class="table-header-cell">title</div>
                <div class="table-header-cell">details</div>
                <div class="table-header-cell">type</div>
                <div class="table-header-cell">actions</div>
                <div class="table-header-cell">completed</div>
            </div>
            <div v-for="task in showSelected" :key="task._id" class="table-body">
                <div class="table-body-cell">{{ task.title }}</div>
                <div class="table-body-cell">{{ task.details }}</div>
                <div class="table-body-cell">{{ task.type }}</div>
                <div class="table-body-cell">
                    <!-- <button @click="openEdit(task._id)">Edit</button>
                    <button @click="deleteTask(task.title, task._id)">Delete</button> -->
                    <Button class="edit-btn" @click="openEdit(task._id)"><i class="fa-solid fa-pen-to-square"></i></Button>
                    <Button class="delete-btn" @click="deleteTask(task.title, task._id)"><i class="fa-solid fa-trash"></i></Button>
                </div>
                <div class="table-body-cell">
                    <input v-model="task.done" type="checkbox" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "./Button.vue"

export default {
    props: ["tasks", "type", "showSelected"],
    methods: {
        deleteTask(taskTitle, taskId) {
            this.$emit("deleteTask", taskTitle, taskId);
        },
        openEdit(taskId) {
            this.$emit("openEdit", taskId);
        }
    },
    components: { Button }
}
</script>

<style>
/* .table-body-cell:nth-last-child(1) {
    text-align: center;
} */
.table-container {
    width: 100%;
    background-color: #798897;
    display: table;
    color: black;
    padding: 1.5em;
    padding-top: 1em;
    border-radius: 20px;
}
.table-caption {
    display: table-caption;
    text-align: center;
    font-size: 2em;
    font-weight: 700;
    color: #FFF6F4;
    text-transform: capitalize;
}
.table-header {
    display:table-header-group;
    background-color: #FFF6F4;
    font-weight: 700;
    font-size: 1.5em;
    text-transform: capitalize;
    
}
.table-header-cell {
    display: table-cell;
    text-align: justify;
    border-bottom: 1px solid #798897;
    padding: 10px;
}
.table-header-cell:last-child {
    text-align: center;
}
.table-body {
    display: table-row-group;
    
}
.table-body-cell {
    display: table-cell;
    max-width: 400px;
    padding: 10px;
    margin: 5px;
    background-color: #FFF6F4;
    white-space: pre-wrap;
}
.table-body-cell .edit-btn {
    margin-right: .5em;
    background-color: #FFF6F4;
    color: #0080FF;
}
.table-body-cell .delete-btn {
    background-color: #FFF6F4;
    color: #DC143C;
}
</style>