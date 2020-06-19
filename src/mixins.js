export default{
	methods: {
		getDialogsList(){
			let key = this.getLSKey();
			let result = null;
			try {
				const misc = localStorage.getItem(key);
				result = JSON.parse(misc);
				if(!result){
					this.setDialogsToLS(key);
				}
			} catch (err) {
				console.error(err)
			}
			return result || dialogsInit;
		},
		setDialogsToLS(key = 'dialogs', msgs){
			try {
				const misc = JSON.stringify(msgs || dialogsInit);
				localStorage.setItem(key, misc);
			} catch (err) {
				console.error(err);
			}
		},
		getUser(){
			return this.$store.getters.user;
		},
		getLSKey(){
			return 'dialogs';
		}
	}
};

const dialogsInit = [
	{
		id: '0',
		subject: 'Простой запрос',
		created: '2019-08-01 23:59',
		parts: [
			{
				id: '0',
				author: 'vasya',
				text: 'Привет, как дела?',
				created: '2019-08-01 23:59',
			},
			{
				id: '1',
				author: 'admin',
				created: '2019-08-02 01:20',
				text: 'Привет, все хорошо, спасибо!',
			},
			{
				id: '2',
				author: 'admin',
				created: '2019-08-02 05:20',
				text: 'А у тебя?',
			},
		],
	},
	{
		id: '1',
		subject: 'Вопрос по домену',
		created: '2016-03-02 14:19',
		parts: [
			{
				id: '0',
				author: 'petr',
				created: '2019-08-06 12:20',
				text: 'Здравствуйте, тут есть кто-нибудь?',
			},
			{
				id: '1',
				author: 'admin',
				created: '2019-08-06 12:34',
				text: 'Да, я вас слушаю!',
			},
			{
				id: '2',
				author: 'petr',
				created: '2019-08-06 12:38',
				text: 'Помогите мне настроить домен!',
			},
		],
	},
];