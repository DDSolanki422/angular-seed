
angular.module('module1',['ngRoute'])
.service('data',function(){
	return {};
})
.controller('ctr1',['$scope','data',function(scope,data){
	this.title="Angular 1.5"
	scope.data=data;
	scope.data.framework='Other framework';
	scope.data.version='1.5.1';
	scope.data.title='Angular.1.5';
}])

.directive('trancludeDirective',function(){
	return {
		restrict:'AE',
		scope:{
			title:'<'
		},
		transclude:true,
		controller:function($scope){
			
			//this.title="Wells Fargo";
			$scope.title="Wells Fargo";
		},
		controllerAs:'ctrl',		
		template:'<div> This is the directiveTemplate {{title}}</div>'+
		'<div ng-transclude></div>'
		
	}
})
.controller('ctrl2',['$scope','data',function(scope,data){
	scope.data=data;
}])
.controller('childController',function($scope,data){
		console.log($scope);
		$scope.data=data;
		$scope.data.title="Wells framework";
})

.filter('reverse',function(){
	return function(input,char){
		var reversedString;
		if(char == undefined){
			reversedString=input.split('').reverse().join('');
		}
		else{
			var expression='^\\w{0,'+char+'}';
			console.log(input);
			reversedString=input.replace(new RegExp(expression,'i'),function($1){ return $1.split("").reverse().join("");});
		}return reversedString;
	}
})
.component('firstComponent',{
		bindings:{
			hero:'<'
		},
		controller:function(){
			//console.log(this);
			this.name="firstComponent";	
			var self=this;

			this.$onInit=function(){
				console.log('insid ehte firstCompoennet init');
				
			}



		},
		template:'<div>Component {{$ctrl.hero}}</div><input type="text" ng-model="$ctrl.hero" />'+
		'<child-component hero="$ctrl.hero"></child-component>'+
		'<div>Inside the first Compoennt </div>'+
		'<div>{{$ctrl.name}}</div>'+
		'<input type="text" ng-model="$ctrl.hero"/>'

	}
)
.component('childComponent',{
	bindings:{
		hero:'<'
	},
	require:{
		firstCompo:'^^firstComponent'
	},
	controller:function(){
		//this.name=this.firstCompo;
		
		this.$onInit=function(){
			console.log('inside the childCompoennt init');
		}
		this.$onChanges= function(changesObj){
			console.log('inside the on changes of childCompoennt');
			console.log(changesObj);
		}
		this.$doCheck=function(){
			console.log('inside the on changes');
		}
	},
	template:'<hr/><div> Hi this is child Component which has dependency on firstComponent</div>'+
	'<div>{{$ctrl.firstCompo.name}}</div>'+
	'<div>{{$ctrl.hero}}</div><input type="text" ng-model="$ctrl.hero" /><hr/>'
})
.controller('view1Ctrl',['$scope',function(scope){
	scope.name='view1';
}])
.controller('view2Ctrl',['$scope',function(scope){
	scope.name='view2';
}])
.config(function($locationProvider,$routeProvider){
	
	

	$routeProvider.when('/view1',{
		templateUrl:'view1.htm',
		controller:'view1Ctrl'
	})
	.when('/view2',{
		templateUrl:'view2.htm',
		controller:'view2Ctrl'
	})

	.otherwise({redirectTo:'/'})
	//$locationProvider.html5Mode(true);
	
})