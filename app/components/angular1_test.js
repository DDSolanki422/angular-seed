

describe('Testing ctr1',function(){
	var $controller;
	var $rootScope;	var dataService,scope;
	beforeEach(module('module1'));
	beforeEach(module(function($provide){
		$provide.factory('data',function(){
			return {};
		});
	}))
	
	beforeEach(inject(function(_$controller_,_$rootScope_,data){
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			dataService=data;
			scope=$rootScope.$new();
		
				var controller=$controller('ctr1',{
			$scope: scope,
			data:dataService
		});
			}));

	it('should test if the data service is injected', function(){
		
		//console.log(scope instanceof $rootScope);
		expect(scope.data).not.toEqual({});
	});
	it('compare the data service value',function(){
		expect(scope.data).toEqual({framework:'Other framework',version:'1.5.1',title:'Angular.1.5'});
	})
})