angular.module('githubSearchApp').factory('githubClient', ['$http', function($http) {
    var repoSearchUrl = 'https://api.github.com/search/repositories';

    return {
        getRepos: function(query, currentPage, pageSize) {
            return $http.get(repoSearchUrl, {
                params: {
                    q: query + " in:name",
                    page: currentPage,
                    per_page: pageSize
                }
            });
        }
    }
}]);