angular.module('postController', [])
	.controller('mainController', function($scope, $http, Posts) {
		$scope.formData = {};

		// get all posts
		Posts.get()
			.success(function(data) {
				$scope.posts = data;
			});

		// create a new post
		$scope.createPost = function() {
			if(!$.isEmptyObject($scope.formData)) {
				Posts.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.posts = data;
					});
			}
		};

		// delete a post
		$scope.deletePost = function(id) {
			Posts.delete(id)
				.success(function(data) {
					$scope.posts = data;
				});
		};
	});