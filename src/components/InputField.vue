<template>
    <label> {{ label }} </label>
    <input
        v-bind="$attrs"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number, Boolean],
            default: ''
        }
    }     
}
</script>
<style>
    label {
        font-size: 1.125rem;
        text-transform: capitalize;
    }
    input {
        width: 100%;
        font-size: 1.1rem;
        padding: .5em 0 .5em .8em;
        margin: .5em 0;
        outline: transparent;
        /* border-radius: 5px; */
        background-color: transparent;
    }
    ::-webkit-input-placeholder {
        text-transform: initial;
        text-transform: capitalize;
    }
    
</style>