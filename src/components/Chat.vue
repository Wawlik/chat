<template>
	<div class="messages-container">
		<div class="messages">
			<div class="messages__header">
				<span class="messages__header__text1">Диалоги</span> <span v-if="dialogs && dialogs.length" class="messages-total">{{dialogs.length || 0}}</span>
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
		<div v-if="cDialog && !apiBusy" class="cDialog">
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
		<div v-else-if="apiBusy" class="cDialog">
			<loader color="#09f" fontS="10px" margin="300px auto" />
		</div>
		<div v-else class="noDialog">
		</div>
	</div>
</template>

<script>

import Vue from 'vue';
import mixins from '../mixins';
import msgForm from './msgForm';
import loader from './loader.vue';

export default {
	name: 'Chat',
	mixins: [mixins],
	components:{
		msgForm,
		loader
	},
	data(){
		return{
			dialogs: [],
			change: 0,
			cDialog: null,
			apiBusy: false
		}
	},
	methods:{
		gotoDialog(id){
			if(id !== this.$route.params.id){
				this.$router.push('/chat/' + id);
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
		$route(newV, oldV){
			// console.log({oldV});
			// console.log({newV});
			let id = newV.params.id;
			let oid = oldV.params.id;
			if(id && oid !== id){
				this.apiBusy = true;
				setTimeout(() => {
					this.setActiveDialog();
					this.apiBusy = false;
				}, 1500);
			}
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
@font-face {
	font-family: 'TT Norms Regular';
	src: url('../assets/fonts/TTNormsRegular/TTNorms-Regular.eot');
	src: url('../assets/fonts/TTNormsRegular/TTNorms-Regular.eot?#iefix') format('embedded-opentype'),
	url('../assets/fonts/TTNormsRegular/TTNorms-Regular.woff') format('woff'),
	url('../assets/fonts/TTNormsRegular/TTNorms-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'TT Norms Medium';
	src: url('../assets/fonts/TTNormsMedium/TTNorms-Medium.eot');
	src: url('../assets/fonts/TTNormsMedium/TTNorms-Medium.eot?#iefix') format('embedded-opentype'),
	url('../assets/fonts/TTNormsMedium/TTNorms-Medium.woff') format('woff'),
	url('../assets/fonts/TTNormsMedium/TTNorms-Medium.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'TT Norms Bold';
	src: url('../assets/fonts/TTNormsBold/TTNorms-Bold.eot');
	src: url('../assets/fonts/TTNormsBold/TTNorms-Bold.eot?#iefix') format('embedded-opentype'),
	url('../assets/fonts/TTNormsBold/TTNorms-Bold.woff') format('woff'),
	url('../assets/fonts/TTNormsBold/TTNorms-Bold.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
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
	font-family: 'TT Norms Regular';
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
.dialog-header{
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}
.dialog-header__subject{
	font-family: 'TT Norms Medium';
	font-size: 14px;
	line-height: 20px;
	color: #35383D;
}
.dialog-header__created{
	font-family: 'TT Norms Medium';
	font-size: 10px;
	line-height: 14px;
	text-align: right;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: #B7C0C8;
}
.dialog-content{
	text-align: left;
	font-family: 'TT Norms Regular';
	font-size: 13px;
	line-height: 18px;
	color: #7D8790;
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
	font-family: 'TT Norms Regular';
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
	font-family: 'TT Norms Medium';
	font-size: 13px;
	line-height: 141.62%;
	color: #000000;
}
.cDialog-part__created{
	font-family: 'TT Norms Medium';
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
.messages-total{
	font-family: 'TT Norms Bold';
	font-size: 14px;
	line-height: 20px;
	color: #D2D8DE;
	margin-left:10px;
}
.messages__header__text1{
	font-family: 'TT Norms Regular';
	font-size: 14px;
	line-height: 20px;
	color: #656B77;
}
</style>
