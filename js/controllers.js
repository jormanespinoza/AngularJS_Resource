/*global angular, console*/
angular.module('FinalApp')
	.controller('MainController', function ($scope, $resource, PostResource) {
		'use strict';

		var User = $resource('https://jsonplaceholder.typicode.com/users/:id', {
			id: '@id'
		});
		// query() -> GET /posts -> Posts array -> isArray: true
		$scope.posts = PostResource.query();
		$scope.users = User.query();
		// Delete
		$scope.removePost = function (post) {
			PostResource.delete({
				id: post.id
			}, function (data) {
				console.log(data);
			});
			$scope.posts = $scope.posts.filter(function (element) {
				return element.id !== post.id;
			});
		};
	})
	.controller('PostController', function ($scope, PostResource, $routeParams, $location) {
		'use strict';

		$scope.title = 'Edit Post';
		$scope.post = PostResource.get({
			id: $routeParams.id
		}); // isArray -> false / JSON Object
		$scope.savePost = function () {
			PostResource.update({
				id: $scope.post.id
			}, {
				data: $scope.post
			}, function (data) {
				console.log(data);
				$location.path('/post/' + $scope.post.id);
			});
		};
	})
	.controller('NewPostController', function ($scope, PostResource, $location) {
		'use strict';
		$scope.post = {};
		$scope.title = 'Create Post';
		$scope.savePost = function () {
			PostResource.save({
				data: $scope.post
			}, function (data) {
				console.log(data);
				$location.path('/');
			});
			$scope.post = {};
		};
	});