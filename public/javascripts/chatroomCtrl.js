var socket = io.connect();

				app.controller("chatroomCtrl", function($scope) {
				$scope.startChat = false;
				$scope.msgPool = '';
				$scope.msgInput = '';
				$scope.nickname = '';

			    $scope.login = function(){
			    	if($scope.nickname.length==0)
			    		window.alert("Please enter your nickname");
			    	else{
			    		$scope.startChat = true; 
			    	}
			    }

			    $scope.sendMsg = function(){	
			    	if($scope.msgInput.length!=0){
				    	socket.emit('client_data', {
				            'msg': $scope.nickname+': '+$scope.msgInput+'\n'
				          });
				    	$scope.msgInput = '';  
			    	}
			    }

			    $scope.pressEnter = function(keyEvent) {
			  		if (keyEvent.which === 13)
			  			$scope.sendMsg();
				}

				$scope.nameEnter = function(keyEvent){
					if (keyEvent.which === 13)
			  			$scope.login();
				}

				socket.on('message', function(data) {
					$scope.msgPool = $scope.msgPool+data.msg;
						$scope.test = $scope.msgPool+data.msg;
						$scope.$apply();
				     	var scrollTop = $("#message")[0].scrollHeight;  
				        $("#message").scrollTop(scrollTop); 
					});

			});