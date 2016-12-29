/**
 * Created by Commissar on 16/7/20.
 */
angular.module("webapp")
    .service("NewsService", ["$http", "$q", NewsService]);
function NewsService($http, $q) {

    function handleRequest(method, url, data) {
        var defered = $q.defer();
        var config = {
            method: method,
            url: url
        };

        if ("POST" === method) {
            config.data = data;
        } else if ("GET" === method) {
            config.params = data;
        }

        $http(config).success(function (data) {
            defered.resolve(data);
        }).error(function (err) {
            defered.reject(err);
        });

        return defered.promise;
    }

    return {
        list: function (params) {
            return handleRequest("GET", "http://:7101/news", params);
        },
        save: function (data) {
            return handleRequest("POST", "http://localhost:7101/news", data);
        },
        detail: function (id) {
            return handleRequest("GET", "http://localhost:7101/news/" + id);
        }
    }

}