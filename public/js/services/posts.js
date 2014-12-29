angular.module('postService', [])

	.factory('Posts', function($http) {
		return {
			get : function() {
				return $http.get('/api/posts');
			},
			create : function(postData) {
				return $http.post('/api/posts', postData);
			},
			delete : function(id) {
				return $http.delete('/api/posts' + id);
			}
 		}
	});