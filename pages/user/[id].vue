<template>
	<h1 class="user__title">{{ user?.name }}</h1>
	<button class="user__back" @click="goBack">Back to Users</button>
	<table>
		<tbody>
		<tr v-for="todo in userTodos" :key="todo.id">
			<td :class="{ '-completed': todo.completed }">{{ todo.title }}}</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '~/store/userStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const userId = Number(route.params.id);

const userStore = useUserStore();
const { users, todos } = storeToRefs(userStore);

const user = computed(() => users.value.find(user => user.id === userId));
const userTodos = computed(() => todos.value[userId] || []);

const fetchUserData = async () => {
	if (!user.value) {
		await userStore.fetchUsers();
	}
	if (!userTodos.value.length) {
		await userStore.fetchTodos(userId);
	}
}

const goBack = () => {
	router.back();
}

onMounted(() => {
	fetchUserData();
});
</script>
