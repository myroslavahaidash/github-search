angular.module('githubSearchApp').component('reposTable', {
    templateUrl: 'components/repos-table/repos-table.template.html',
    controller: ['githubClient', function ReposTableController(githubClient){
        var self = this;

        this.results = [];
        this.totalItems = 0;
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.searchQuery = '';
        this.isLoading = false;
        this.error = false;

        this._loadData = function() {
            var maxAllowedGithubResults = 1000;

            if(this.searchQuery){
                this.isLoading = true;
                this.error = false;
                githubClient.getRepos(this.searchQuery, this.currentPage, this.itemsPerPage).then(function(response) {
                    self.isLoading = false;
                    self.results = response.data.items;
                    self.totalItems =
                        response.data.total_count <= maxAllowedGithubResults ? response.data.total_count : maxAllowedGithubResults;
                }).catch(function(){
                    self.error = true;
                    self.isLoading = false;
                });
            } else {
                this.results = [];
            }
        };

        this.onPageChange = function() {
            this._loadData();
        };

        this.onSearchChange = function() {
            this._loadData();
        };
    }]
});