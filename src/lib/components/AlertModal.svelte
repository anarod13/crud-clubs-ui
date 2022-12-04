<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import clickOutside from '../helpers/clickOutside';
	import type IAlertMessage from '../../lib/entities/IAlertMessage';
	import { isAlertModalVisible, alertMessage } from '../store/store';

	const alertMessages: IAlertMessage = {
		newTeamAdded: 'A new team was added!',
		teamEdited: 'Changes in team saved!',
		crestAdded: 'Crest updated!',
		deletedTeam: 'Team successfully deleted!',
		error: 'Something came up, please try again!'
	};

	$alertMessage = 'error';

	function hideAlertMessage() {
		$isAlertModalVisible = false;
	}

	$: if ($isAlertModalVisible) {
		setTimeout(() => hideAlertMessage(), 2000);
	}
</script>

{#if $isAlertModalVisible}
	<div
		in:fly={{ y: -200, duration: 1000 }}
		out:fade
		use:clickOutside={hideAlertMessage}
		class="crud-clubs-modal-container"
	>
		<p>{alertMessages[$alertMessage]}</p>
	</div>
{/if}

<style>
	.crud-clubs-modal-container {
		position: absolute;
		z-index: 10;
		top: 5%;
		right: 2%;
		background-color: #7e7471;
		color: #f7ebe8;
		font-family: 'Montserrat';
		font-size: 12px;
		border-radius: 10px;
		padding: 0px 10px;
		/* width: 20%;
		height: 40px; */
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		justify-content: flex-end;
		box-sizing: border-box;
	}
</style>
