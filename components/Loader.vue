<template>
	<div v-if="loading" class="loader__wrapper">
		<div class="loader__animation"></div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { loading } = storeToRefs(userStore)
</script>
