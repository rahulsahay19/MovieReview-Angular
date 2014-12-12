//home-movie-edit.js

//Defined Module
var module = angular.module("homemovieEdit", []);

//Defined Routes
module.config(["$routeProvider", function ($routeProvider) {

    $routeProvider.when("/editReview/:Id", {
        controller: "reviewseditController",
        templateUrl: "/templates/editReview.html"
    });

    $routeProvider.when("/editMovie/:Id", {
        controller: "movieseditController",
        templateUrl: "/templates/editMovie.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });
}]);


var movieseditController = [
    "$scope", "dataService", "$window", "$routeParams",
    function ($scope, dataService, $window, $routeParams) {
        $scope.movie = null;
        $scope.MovieId = null;

        //Fetching the Movie by id
        dataService.getMovieById($routeParams.Id)
            .then(function (result) {
                //success
                $scope.movie = result;

            },
                function () {
                    //error
                    toastr.error("Error fetching Movie with Id:", +$routeParams.Id);
                });


        //Editing the movie
        $scope.editMovie = function () {


            dataService.movieEdit($scope.movie)
                .then(function () {
                    //success
                    toastr.success("Movie Edited Successfully");
                    $window.location = "#/";
                },
                    function () {
                        //error
                        toastr.error("Couldn't edit the Movie");
                    });
        };

        //Deleting the Movie
        
        $scope.deleteMovie = function () {
            dataService.removeMovie($scope.movie.Id)
                .then(function () {
                    //success
                    toastr.success("Movie Deleted Successfully");
                    $window.location = "#/";
                },
                    function () {
                        //error
                        toastr.error("Error Deleting Movie with Id:", +$scope.movie.Id);
                    });
        };
    }
];


var reviewseditController = [
    "$scope", "dataService", "$window", "$routeParams",
    function ($scope, dataService, $window, $routeParams) {
        $scope.review = null;
        $scope.newReview = {};
        $scope.editMovieId = null;
        $scope.isBusy = false;

        //Fetching the Review by id and setting  $scope.review
        dataService.getReviewByReviewId($routeParams.Id)
             .then(function (result) {
                 $scope.review = result;
                 console.log($scope.review);
             },
             function () {
                 toastr.error("Unable to Fetch the review");
             });

        //Editing the Review
        $scope.editReview = function () {

            dataService.newReviewEdit($scope.review)
                .then(function () {
                    //success
                    toastr.success("Review edited Successfully");
                    $window.location = "#/";

                },
                    function () {
                        //error
                        toastr.error("Couldn't edit the Review");
                    });
        };

        //Deleting the review
        $scope.deleteReview = function () {
            dataService.removeReview($scope.review.Id)
                .then(function () {
                    //success
                    toastr.success("Review Deleted Successfully");
                    $window.location = "#/";
                },
                    function () {
                        //error
                        toastr.error("Error Deleting Review with Id:", +$scope.review.Id);
                    });
        };



    }
];