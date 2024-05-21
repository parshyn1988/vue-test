<template>
	<main class="main-container">
		<slot></slot>
	</main>
	<loader />
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
</script>
