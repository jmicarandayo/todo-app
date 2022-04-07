<template>
    <div class="widget-container">
        <h1 class="widget-title">{{label}}</h1>
        <div class="widget-box">
            <div class="widget-header-row">
                <div class="widget-header">title</div>
                <div class="widget-header">details</div>
                <div class="widget-header">completed</div>
            </div>
            <div v-for="(task, index) in widget" :key="task._id" class="widget-data-row">
                <div class="widget-data">{{ index +1 }}. {{ task.title}}</div>
                <div class="widget-data">{{ task.details}}</div>
                <div class="widget-data"><input v-model="task.done" type="checkbox" disabled></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tasks:{
            type: Array,
            default:[]
        },
        label: {
            type: String,
            default:''
        }
    },
    computed: {
        widget() {
            return this.tasks.filter(task => {
            return this.label == task.type
            
        })
        }
        
    }
}
</script>

<style>
.widget-container {
    max-width: 600px;
    height: 100%;
    width: 95%;
    margin: 0 1em;
    padding: 1em;
    color:#FFF6F4;
    /* background-color: rgba(220, 20, 60, 1); */
    background-color: #798897;
    border-radius: 20px;
}
.widget-container:hover {
    cursor: pointer;
}
.widget-container .widget-title {
    text-transform: capitalize;
    margin-bottom: .5em;
}
.widget-box .widget-header-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-transform: capitalize;
}
.widget-box .widget-header-row .widget-header:last-child {
    text-align: center;
}
.widget-box .widget-data-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
}
.widget-box .widget-data-row {
    white-space: pre-wrap;
    background-color: #FFF6F4;
    color: #798897;
    border-radius: 10px;
    padding: .5em;
    margin: .5em 0;
}
@media (max-width: 700px){
    .widget-container {
        margin-bottom: 3em;
    }
}
</style>