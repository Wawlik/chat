<template>
	<div class="messages-container">
		<div class="messages">
			<div class="messages__header">
				<span>Диалоги</span> <span v-if="dialogs && dialogs.length" class="messages-total">{{dialogs.length || 0}}</span>
			</div>
			<div class="messages__content" :key="change">
				<div v-for="(one) in dialogs" :key="'dialog-'+one.id" @click="gotoDialog(one.id)" :class="'dialog ' + (cDialog && one.id === cDialog.id ? 'dialog-active':'')">
					<div class="dialog-header">
						<span class="dialog-header__subject">{{one.subject}}</span>
						<span class="dialog-header__created">{{(new Date(one.created).toLocaleDateString('ru', {year: 'numeric', month: 'short', day: 'numeric'}))}}</span>
					</div>
					<div class="dialog-content">
						{{one.parts[one.parts.length-1].text}}
					</div>
				</div>
			</div>
		</div>
		<div v-if="cDialog" class="cDialog">
			<div class="cDialog-list">
				<div :class="'cDialog-part ' + (getUser() === one.author ? 'cDialog-part-right':'cDialog-part-left')"
					v-for="(one, index) in cDialog.parts" :key="'cDialog-part-' + index">
					<div class="cDialog-part__content">
						<div>{{one.text}}</div>
					</div>
					<div v-if="(index === cDialog.parts.length - 1) || (cDialog.parts[index + 1].author !== one.author)" class="cDialog-part__info">
						<span class="cDialog-part__owner">
							{{one.author}}
						</span>
						<span class="cDialog-part__created">
							{{ (new Date(one.created).toLocaleDateString('ru' )) + ' ' + (new Date(one.created).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})) }}
						</span>
					</div>
				</div>
			</div>
			<msg-form/>
		</div>
		<div v-else class="noDialog">
		</div>
	</div>
</template>

<script>

import Vue from 'vue';
import mixins from '../mixins';
import msgForm from './msgForm';

export default {
	name: 'Chat',
	mixins: [mixins],
	components:{
		msgForm
	},
	data(){
		return{
			dialogs: [],
			change: 0,
			cDialog: null
		}
	},
	methods:{
		gotoDialog(id){
			if(id !== this.$route.params.id){
				this.$router.push('/' + id);
			}
		},
		updDialogs(){
			this.dialogs = this.getDialogsList();
			this.setActiveDialog();
		},
		setActiveDialog(){
			let id = this.$route.params.id;
			if(id){
				let dialogs = this.getDialogsList();
				if(dialogs){
					this.cDialog = dialogs[id];
				}
			}
			this.setScrollPos();
		},
		setScrollPos(){
			Vue.nextTick(function () {
				let elems = document.getElementsByClassName('cDialog-list');
					if(elems && elems[0]) {
						elems[0].scrollTo({
							top: elems[0].scrollHeight,
							left: 100,
							behavior: 'instant'
						});
					}
				})
		}
	},
	watch:{
		$route(){
			this.setActiveDialog();
		}
	},
	mounted(){
		this.updDialogs();
		this.setActiveDialog();
	},
}
</script>

<style>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.messages__header{
	padding: 24px 20px 16px 20px;
	border-bottom: 1px solid #E9EDF2;
	text-align: left;
}
.messages-container{
	display: flex;
	flex-flow: row nowrap;
	width: 70vw;
	margin: auto;
	min-height: 719px;
	height: 80vh;
	min-width: 680px;
}
.messages{
	background: #F3F6F8;
	width:300px;
}
.dialog{
	height: 100px;
	box-sizing: border-box;
	padding: 20px 20px 11px 20px;
	font-family: TT Norms;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 18px;
	color: #7D8790;
	border-bottom: 1px solid #E9EDF2;
	cursor: pointer;
}
.dialog-active{
	background: #fff;
	border-left: 2px solid #398BFF;
	padding: 20px 20px 11px 18px;
}
.messages-header{
	border-bottom: 1px solid #E9EDF2;
}
.dialog-header{
	/* text-align: left; */
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}
.dialog-header__subject{
	font-family: TT Norms;
	font-size: 14px;
	line-height: 20px;
	color: #656B77;
	font-weight: medium; /* !!!!! */
}
.dialog-header__created{
	font-family: TT Norms;
	font-size: 10px;
	line-height: 14px;
	/* identical to box height */
	text-align: right;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: #B7C0C8;
}
.dialog-content{
	text-align: left;
}
.cDialog-part{
	width:100%;
}
.cDialog-part__info{
	margin-bottom:20px;
}
.cDialog-part-left{
	text-align: left;
}
.cDialog-part__content{
	display: flex;
	font-family: TT Norms;
	font-size: 14px;
	line-height: 141.62%;
	margin-bottom: 10px;
	color: #475453;
	padding: 17px 17px 17px 25px;
	max-width: 400px;
	box-sizing: border-box;
}
.cDialog-part-left > .cDialog-part__content{
	border-radius: 8px 8px 8px 0px;
	background: #F6F7F9;
}
.cDialog-part-right > .cDialog-part__content{
	margin-left: auto;
	border-radius: 8px 8px 0px 8px;
	background: #E9F5F4;
}
.cDialog-part-right > .cDialog-part__info{
	text-align: right;
}
.cDialog-part__info{
	text-align: left;
}
.cDialog-part__owner{
	margin-right: 12px;
	font-family: TT Norms;
	font-size: 13px;
	line-height: 141.62%;
	color: #000000;
}
.cDialog-part__created{
	font-family: TT Norms;
	font-size: 10px;
	line-height: 141.62%;
	color: #B7C0C8;
}
.cDialog, .noDialog{
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
	width: calc(100% - 300px);
	box-sizing: border-box;
}
.cDialog-list{
	display: flex;
	height: calc(100% - 80px);
	flex-flow: column nowrap;
	padding: 20px 16px 0px 40px;
	box-sizing: border-box;
    overflow-y: auto;
}
.cDialog-list > :first-child {
    margin-top: auto;
}
.messages-header > span:first-child{
	font-size: 29px;
}
.messages-total{
	font-family: TT Norms;
	font-size: 14px;
	line-height: 20px;
	color: #D2D8DE;
	margin-left:10px;
}
</style>
