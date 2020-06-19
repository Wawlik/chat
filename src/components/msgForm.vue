<template>
	<div class="msgForm">
		<textarea class="msgForm__textarea" resize="none" placeholder="Введите текст..." name="" id="" v-model="text" 
			:disabled="apiBusy ? 'disabled' : null" @keyup.enter="sendMessage()">
		</textarea>
		<button class="msgForm__button" @click="sendMessage()">
			<div v-if="!apiBusy">
				<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.00936317 17.2563C0.00989464 17.6114 0.3701 17.8528 0.698756 17.7183L20.8694 9.46274C21.2835 9.29324 21.2835 8.70676 20.8694 8.53726L0.698758 0.281704C0.370102 0.14719 0.00989463 0.388579 0.00936317 0.743697L0.000660091 6.55894C0.000282918 6.81096 0.187529 7.02387 0.437532 7.05569L11.8171 8.504C12.3996 8.57814 12.3996 9.42186 11.8172 9.496L0.437533 10.9443C0.187529 10.9761 0.000282918 11.189 0.000660091 11.4411L0.00936317 17.2563Z" fill="white"/>
				</svg>
			</div>
			<div v-else>
				<loader/>
			</div>
		</button>
	</div>
</template>

<script>
import mixins from '../mixins';
import loader from './loader.vue';

export default {
	name: 'msgForm',
	mixins: [mixins],
	components: {
		loader
	},
	data(){
		return {
			text: '',
			apiBusy: false
		};
	},
	methods: {
		sendMessage(){
			if(!this.text){
				return;
			}
			this.apiBusy = true;
			setTimeout(() => {
				let dialogs = this.getDialogsList();
				let id = this.$route.params.id;
				let date = (new Date());
				let obj = {
					id: dialogs[id].parts.length,
					author: this.getUser(),
					text: this.text,
					created: date
				};
				dialogs[id].parts.push(obj);
				// set to LS
				this.setDialogsToLS(this.getLSKey(), dialogs);
				this.$parent.updDialogs();
				this.text = '';
				this.apiBusy = false;
			}, 1500);
		}
	}
}
</script>

<style>
	.msgForm{
		width: 100%;
		height: 80px;
		display: flex;
	}
	.msgForm__textarea{
		width: calc(100% - 80px);
		height: 100%;
		border: none;
		border-top: 1px solid #E9EDF2;
		margin:0;
		padding: 20px;
		resize: none;
		box-sizing: border-box;
		font-family: 'TT Norms Regular';
		font-size: 14px;
		line-height: 141.62%;
		color: #7D8790;
		outline: none;
	}
	.msgForm__button{
		width: 80px;
		height: 100%;
		background: #398BFF;
		border: none;
		outline: none;
	}
</style>
