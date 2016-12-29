/**
 * Created by Commissar on 16/7/20.
 */
angular.module("webapp")
    .controller("NewsController", ["$scope", "NewsService", NewsController]);

function NewsController($scope, NewsService) {
    $scope.list = [];
    $scope.current = {};
    $scope.new = {};

    $scope.createNews = function () {
        $("#modal-create").modal("show");
    }
    $scope.save = function () {
        if (!$scope.new.title) {
            $scope.editorMessage = "Title Is Required";
            return;
        }
        if (!$scope.new.content) {
            $scope.editorMessage = "Content Is Required";
            return;
        }
        $scope.editorMessage = "";
        NewsService.save($scope.new).then(
            function (data) {
                $("#modal-create").modal("hide");
                $scope.new.title = "";
                $scope.new.content = "";
                $scope.loadNews();
            }, function (err) {
                $scope.editorMessage = err;
            }
        );
    }
    $scope.openNewsDetail = function (id) {
        $scope.loadDetail(id);
        $("#modal-detail").modal("show");
    }

    $scope.loadDetail = function (id) {
        NewsService.detail(id).then(
            function (data) {
                $scope.current = data;
            }, function (err) {
            }
        );
    }

    $scope.formatTime = function (time) {
        return moment(time).format('YYYY-MM-DD HH:mm');
    }

    $scope.loadNews = function () {
        NewsService.list().then(
            function (data) {
                $scope.list = data;
            }, function (err) {
            }
        );
    }
    $scope.loadNews();
}
