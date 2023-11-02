<script setup lang='ts'>
// 
</script>

<template>
    <button
        class="flex items-center justify-center gap-3 bg-white w-1/2 mx-auto px-5 shadow-md outline outline-[0.5px] outline-[#cacaca] rounded-lg py-5">
        <slot name="title" />
        <slot name="icon" />
        <slot></slot>
    </button>
</template>