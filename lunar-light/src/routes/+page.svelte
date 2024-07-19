<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	async function generate() {
		await fetch('/api/generate', {
			method: 'POST'
		});
	}

	async function rebuild() {
		await fetch('/api/rebuild', {
			method: 'POST'
		});
	}
</script>

<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
<form method="post" use:enhance>
	<button>Sign out</button>
</form>

{#if data.user.username === 'admin'}
	<button on:click={generate}>Generate Web</button>
	<button on:click={rebuild}>Rebuild Web</button>
{/if}
