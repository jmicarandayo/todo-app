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
        <div class="table-caption"><p></p></div>
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
                    <button @click="openEdit(task._id)">Edit</button>
                    <button @click="deleteTask(task.title, task._id)">Delete</button>
                </div>
                <div class="table-body-cell">
                    <input v-model="task.done" type="checkbox" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['tasks', 'type', 'showSelected'],
    methods: {
        deleteTask(taskTitle, taskId) {
            this.$emit('deleteTask', taskTitle, taskId)
        },
        openEdit(taskId) {
            this.$emit('openEdit', taskId)
        }
    }
}
</script>

<style>
/* .table-body-cell:nth-last-child(1) {
    text-align: center;
} */
.table-container {
    width: 100%;
    background-color: rgba(0, 0, 0, .2);
    display: table;
    color: black;
    padding: 1.5em;
}
.table-caption {
    display: table-caption;
    text-align: center;
    font-size: 2em;
    font-weight: 700;
    
}
.table-header {
    display:table-header-group;
    background-color: gray;
    font-weight: 700;
    font-size: 1.5em;
    text-transform: capitalize;
}
.table-header-cell {
    display: table-cell;
    text-align: justify;
    border-bottom: 1px solid black;
    padding: 10px;
}
.table-body {
    display: table-row-group;
    
}
.table-body-cell {
    display: table-cell;
    padding: 10px;
    margin: 5px;
    background-color: aquamarine;
}
</style>