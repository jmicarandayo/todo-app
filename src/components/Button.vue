<template>
<button class="fancy-button">
    <slot></slot>
</button>
</template>

<style>
.fancy-button {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    /* background-color: aquamarine; */
    padding: .5em 1.2em;
    border-radius: 5px;
    text-transform: capitalize;
    /* margin-left: .5em; */
    cursor: pointer;
}
</style>