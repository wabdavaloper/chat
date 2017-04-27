window.onload = function() {

	var User = {
		MSG: '',
		name: (function() {
			var nick = prompt('Enter your nickname');
			if (nick === null) window.location.reload();	
			else return nick;
		})()
	};
	var socket = io();
	var box = document.getElementById('msgBox');
	var countBox = document.getElementById('countBox');

	var chat = new Vue({
		el: '#chat',
			data: {
				message: '',
			},
			methods: {
				sendMessage: function() {
					if (this.message == '' || this.message == ' ') {
						box.style.top = '100px';
						box.style.animationName = 'bounce';
						box.style.animationDuration = '1s';
					} 
					else if (this.message.length > 62) {
						countBox.style.top = '100px';
						countBox.style.animationName = 'shake';
						countBox.style.animationDuration = '1s';
					}
					else {
						var msg = this.message.replace(/</g,'&');
						User.MSG = msg;
						socket.emit('sendMsg',User);
						this.message = '';
						box.style.top = '-100px';
						countBox.style.top = '-100px';
					}

				}
			}
	});

	socket.on('returnMsg', function(data){
		var CHAT = document.getElementsByClassName('chat');
		var out = document.getElementById('messages');
		var li = document.createElement('li');
		li.innerHTML = data.name + ': ' + data.MSG;
		messages.appendChild(li);
	});
}