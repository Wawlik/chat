import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	user: 'admin'
	},
	mutations: {
	},
	actions: {
	},
	getters: {
		user: state => {
			return state.user;
		}
	},
	modules: {
	}
})
