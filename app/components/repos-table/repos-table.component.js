angular.module('githubSearchApp').component('reposTable', {
    templateUrl: 'components/repos-table/repos-table.template.html',
    controller: ['githubClient', function ReposTableController(githubClient){
        var self = this;
        this.results = [];
        githubClient.getRepos('git').then(function(response){
            self.results = response.data.items;
            console.log(self.results);
        });
    }]
});