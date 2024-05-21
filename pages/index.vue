<template>
	<input v-model="search" class="user__search" placeholder="Search by name" />
	<table class="user__list">
		<thead>
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Phone</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="user in filteredUsers" :key="user.id" @click="goToUser(user.id)">
			<td>{{ user.name }}</td>
			<td>{{ user.email }}</td>
			<td>{{ user.phone }}</td>
		</tr>
		</tbody>
	</table>
	<div class="user__pagination">
		<button @click="prevPage" :disabled="currentPage === 1">Previous</button>
		<button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '~/store/userStore';
import { storeToRefs } from 'pinia';

const search = ref('');
const currentPage = ref(1);
const usersPerPage = 5;

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const fetchUsers = async () => {
	if (users.value.length === 0) {
		await userStore.fetchUsers();
	}
}

const filteredUsers = computed(() => {
	const start = (currentPage.value - 1) * usersPerPage
	const end = start + usersPerPage
	return users.value.filter(user => user.name.toLowerCase().includes(search.value.toLowerCase())).slice(start, end)
})

const totalPages = computed(() => {
	return Math.ceil(users.value.filter(user => user.name.toLowerCase().includes(search.value.toLowerCase())).length / usersPerPage)
});

const goToUser = (id: number) => {
	router.push(`/user/${id}`);
}

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
}

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
}

onMounted(() => {
	fetchUsers();
	const savedPage = parseInt(route.query.page as string);
	if (savedPage) {
		currentPage.value = savedPage;
	}
})

watch(currentPage, (newPage) => {
	router.replace({ query: { ...route.query, page: newPage.toString() } });
});
</script>
