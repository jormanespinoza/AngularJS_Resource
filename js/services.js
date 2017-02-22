/*global angular, console*/
angular.module('FinalApp')
	.factory('PostResource', function ($resource) {
		'use strict';
	
		return $resource('https://jsonplaceholder.typicode.com/posts/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	});