<template>
<div class="backdrop-task">
    <div class="add-task">
        <h1>Add Task</h1>
        <form @submit.prevent="handleAddTask" class="add-task-form">
            <div class="input-box">
                <label>Title:</label>
                <input v-model="title" type="text">
            </div>
            <div class="input-box">
                <label>Details:</label>
                <textarea v-model="details" cols="30" rows="5"></textarea>
            </div>
            <div class="input-box">
                <label>Type:</label>
                <select v-model="type">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>
            <div class="btn-container">
                <button>Add Task</button>
            </div>
        </form>
    </div>
</div>

</template>
<script>

import axios from 'axios'

export default {
    data() {
        return {
            title: '',
            details: '',
            type: 'daily'
        }
    },
    methods: {
        handleAddTask() {
            const newTask = {
                title: this.title,
                details: this.details,
                type: this.type
            }
            console.log(newTask)
            axios.post('http://localhost:5000/add-task', newTask)
                .then(res => {
                    console.log(res)
                }, err => {
                    console.log(err.response)
                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style>

.backdrop-task {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    color: #000;
}
.add-task {
    background-color: white;
    max-width: 600px;
    width: 90%;
    margin: 20px auto;
    border-radius: 10px;
}
.add-task-form .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-task .add-task-form button {
    border: none;
    background-color: crimson;
    color: white;
    font-size: 1em;
    text-align: center;
    border-radius: 5px;
    width: 50%;
    padding: .8em;
    margin-bottom: 20px;
    cursor: pointer;
}
.add-task .add-task-form {
    margin: 0 1em;
}
.add-task-form .input-box {
    display: flex;
    align-items: center;
}
.add-task-form .input-box label {
    font-size: 1.3em;
    padding-right: 1em;
    width: 30%;
}
.add-task-form .input-box input,
.add-task-form .input-box textarea,
.add-task-form .input-box select {
    width: 100%;
    font-size: 1em;
    padding: .5em;
    background: transparent;
    border: 1px solid crimson;
    border-radius: 5px;
    margin: 1em 0;
    font-weight: 500;
}
.add-task-form .input-box textarea {
    font-size: 1.5em;
    font-weight: 300;
}
.add-task-form .input-box input:focus,
.add-task-form .input-box textarea:focus,
.add-task-form .input-box select:focus {
    outline: none;
}
</style>