<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import SideBar from '@/components/layouts/SideBar.vue';
</script>

<template>
    <div class="flex">
        <SideBar/>
        <div class="flex-1 p-5 content mt-20">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: calc(100% - 219px);
    min-height: 100vh;
}
</style>