

describe('Testing Module1 directive',function(){
	var $compile,$rootScope,$filter,$controller,$componentController;
	//var componentSpy;

		/*beforeEach(module('module1',function($provide){
			var componentSpyOn;
			componentSpyOn=function(name){
				var components={};
				components.bindings=[];
				$provide.decorator(name+'Directive',function($delegate){
						$delegate[0].template='';
						$delegate[0].controller=function(){
							components.bindings.push(this);
						}
						return $delegate[0];
				});
				return components;
			}
			$provide.factory('componentSpy',componentSpyOn);
		}));*/

		beforeEach(function(){
			module('module1');			
			
		});
		beforeEach(inject(function(_$compile_,_$rootScope_,_$filter_,_$controller_,_$componentController_){
				$compile=_$compile_;
				$rootScope=_$rootScope_;
				$filter=_$filter_;
				$controller=_$controller_;
				$componentController=_$componentController_;				
		}));
		describe('testing Directive',function(){
			it('should have the directive Embedded snippet',function(){
				var scope=$rootScope.$new();
				scope.data={framework: "Angular 1.5"};
				var element=$compile('<tranclude-directive><div> Hi Transclusion {{data.framework}}</div></transclude-directive>')(scope);
				 scope.$digest();
				 expect(element.html()).toContain('<div class="ng-binding"> This is the directiveTemplate Wells Fargo</div><div ng-transclude=""><div class="ng-binding ng-scope"> Hi Transclusion Angular 1.5</div></div>');
			});
		});
		
		describe('testing Filer',function(){
			it('should reverse the character sent',function(){
				var filter=$filter('reverse');

				expect(filter('Dinesh')).toEqual('hseniD');
			});
		});

		describe('testing controller',function(){
			it('Tetsing the scope of child Controller',function(){
				var parentScope=$rootScope.$new();
				
				var parentController=$controller('ctr1',{$scope:parentScope});
				var childScope=parentScope.$new();

				var childController=$controller('childController',{
					$scope:childScope
				});

				expect(childScope.data.framework).toEqual('Other framework');
			});
		});

		describe('testing Components',function(){


			
			it('testing first Component',function(){
				var parentScope=$rootScope.$new();
				var element=$compile('<first-component hero="hero"></firstComponent>')(parentScope);
				parentScope.hero="firstComponent";
				parentScope.$apply();
				//console.log(mockedComponentSpy);
			});
		});

});

