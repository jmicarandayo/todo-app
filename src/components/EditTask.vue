<template>
<div class="backdrop-task">
    <div class="edit-task center">
        <h1 class="title-text">Edit Task</h1>
        <div class="close-btn" @click="closeModal">X</div>
        <form @submit.prevent="handleEditTask" class="edit-task-form">
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
            <div class="btn-container-save">
                <button @click="handleEditTask">Save</button>
            </div>
        </form>
    </div>
</div>

</template>
<script>

import axios from 'axios'

export default {
    props: ['idToEdit'],
    data() {
        return {
            title: '',
            details: '',
            type: 'daily'
        }
    },
    mounted(){
            axios.get('http://localhost:5000/task/' + this.idToEdit)
            .then(res => {
                this.title = res.data.task.title
                this.details = res.data.task.details
                this.type = res.data.task.type
            }, err => console.log(err))
    },
    methods: {
        handleEditTask() {
            const editTask = {
                title: this.title,
                details: this.details,
                type: this.type
            }
            console.log(this.idToEdit)
            axios.put('http://localhost:5000/task/edit/' + this.idToEdit, editTask )
                .then(res => {
                    if(res.status === 200) {
                        location.reload()
                    }
                }, err => {
                    console.log(err.response)
                })
                .catch(err => console.log(err))
        },
         closeModal(){
             this.$emit('closeEditTask')
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
.edit-task {
    background-color: white;
    max-width: 600px;
    width: 90%;
    border-radius: 10px;
    padding: 1.5em;
}
.edit-task .close-btn {
    position: absolute;
    top: 2em;
    right: 2em;
    cursor: pointer;
}
.edit-task .title-text {
    margin: 0;
}
.edit-task-form .btn-container-save {
    display: flex;
    justify-content: center;
    align-items: center;
}
.edit-task .edit-task-form button {
    border: none;
    background-color: crimson;
    color: white;
    font-size: 1em;
    text-align: center;
    border-radius: 5px;
    width: 50%;
    padding: .8em;
    margin: 20px 0;
    cursor: pointer;
}
.edit-task .edit-task-form {
    margin: 0 1em;
}
.edit-task-form .input-box {
    display: flex;
    align-items: center;
}
.edit-task-form .input-box label {
    font-size: 1.3em;
    padding-right: 1em;
    width: 30%;
}
.edit-task-form .input-box input,
.edit-task-form .input-box textarea,
.edit-task-form .input-box select {
    width: 100%;
    font-size: 1em;
    padding: .5em;
    background: transparent;
    border: 1px solid crimson;
    border-radius: 5px;
    margin: 1em 0;
    font-weight: 500;
}
.edit-task-form .input-box textarea {
    font-size: 1.5em;
    font-weight: 300;
}
.edit-task-form .input-box input:focus,
.edit-task-form .input-box textarea:focus,
.edit-task-form .input-box select:focus {
    outline: none;
}
</style>