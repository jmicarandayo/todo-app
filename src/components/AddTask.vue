<template>
<div class="backdrop-task">
    <div class="add-task center">
        <h1 class="title-text">Add Task</h1>
        <div class="close-btn" @click="closeModal">
        <i class="fas fa-times" @click="closeModal"></i></div>
        <form @submit.prevent="handleAddTask" class="add-task-form">
            <div class="input-box">
                <label>Title:</label>
                <input v-model="title" type="text">
                <!-- <InputField
                    v-model="title"
                    label="title"/> -->
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
            <div class="error-display">
                 {{ error }}
             </div>
            <div class="success-display">
                 {{ success }}
             </div>
            <div class="btn-container-add">
                <Button 
                class="add-btn"
                @click="handleAddTask">add task</Button>
            </div>
        </form>
    </div>
</div>

</template>
<script>

import axios from 'axios'
import InputField from './InputField.vue'
import Button from './Button.vue';

export default {
    data() {
        return {
            title: "",
            details: "",
            type: "daily",
            error: '',
            success:null
        };
    },
    methods: {
        handleAddTask() {
            const newTask = {
                title: this.title,
                details: this.details,
                type: this.type
            };
            if(this.errorChecking()) {
                axios.post("http://localhost:5000/add-task", newTask)
                    .then(res => {
                   if(res.status == 200) {
                        console.log(res);
                        this.title = "";
                        this.details = "";
                        this.type = "daily";
                        this.error = ''
                        this.success = res.data.message
                   }
                }, err => {
                    console.log(err.response);
                })
                    .catch(err => console.log(err));
            }
            
        },
        closeModal() {
            this.$emit("closeAddTask");
        },
        errorChecking() {
            if (this.title == null || this.title == '') {
                this.error = "Please enter a title";
            }
            else if (this.details == null || this.details == '') {
                this.error = "Details field should not be empty";
            }
            else {
                return true;
            }
        },
    },
    components: { InputField, Button }
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
    color:#798897;
}
.add-task {
    background-color: #FFF6F4;
    max-width: 450px;
    width: 90%;
    border-radius: 10px;
    padding: 1.5em;
}
.add-task .close-btn {
    position: absolute;
    top: 2em;
    right: 2em;
    cursor: pointer;
}
.add-task .title-text {
    margin-bottom: .7em;
}
.add-task-form .btn-container-add {
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
    /* width: 50%;
    padding: .8em; */
    margin: 20px 0 0 0;
    cursor: pointer;
}
.add-task .add-task-form .error-display {
    text-align: center;
    color: #940d0d;
    font-size: .9em;
}
.add-task .add-task-form {
    margin: 0 1em;
}
.add-task .add-task-form .error-display {
    text-align: center;
    color: #940d0d;
    font-size: .9em;
}
.add-task .add-task-form .success-display {
    text-align: center;
    color: #008800;
    font-size: .9em;
}
.add-task-form .input-box {
    /* display: flex; */
    /* align-items: center; */
}
.add-task-form .input-box label {
    font-size: 1em;
    padding-right: 1em;
    width: 30%;
}
.add-task-form .input-box input,
.add-task-form .input-box textarea,
.add-task-form .input-box select {
    width: 100%;
    font-size: 1.1rem;
    padding: .5em;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid crimson;
    /* border-radius: 5px; */
    margin: .4em 0;
    font-weight: 500;
    white-space: pre-wrap;
}
.add-task-form .input-box textarea {
    font-size: 1.1rem;
    font-weight:normal;
}
.add-task-form .input-box input:focus,
.add-task-form .input-box textarea:focus,
.add-task-form .input-box select:focus {
    outline: none;
}
</style>