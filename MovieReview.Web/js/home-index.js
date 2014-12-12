//home-index.js

//Defined Module
var module = angular.module("homeIndex", ["homemovieEdit"]);

//Defined Routes
module.config(["$routeProvider",function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "HomeController",
        templateUrl: "/templates/home.html"
    });

    $routeProvider.when("/newMovie", {
        controller: "newMovieController",
        templateUrl: "/templates/newMovie.html"
    });

    $routeProvider.when("/movies", {
        controller: "HomeController",
        templateUrl: "/templates/movies.html"
    });

 
    $routeProvider.when("/reviews/:Id", {
        controller: "reviewsController",
        templateUrl: "/templates/reviews.html"
    });


    //$routeProvider.when("/editReview/:Id", {
    //    controller: "reviewsController",
    //    templateUrl: "/templates/editReview.html"
    //});

    $routeProvider.otherwise({ redirectTo: "/" });
}]);

//SRP for Data Service. This will serve as single interface for 
//taking and submitting data

module.factory("dataService", ["$http","$q",function ($http, $q) {

    var _movies = [];
    var _reviews = [];
    var _isInit = false;

    var _singleReview = [];
    var _isReady = function () {
        return _isInit;
    }
    //Return all Movies
    var _getMovies = function () {

        var deferred = $q.defer();

        $http.get('http://localhost:19595/api/movies')
            .then(function (result) {
                //success  
                angular.copy(result.data, _movies);
                _isInit = true;
                deferred.resolve();
            },
                function () {
                    //error
                    deferred.reject();

                });
        return deferred.promise;
    };

    //Get Movie by Id
    var _getMovieById = function (Id) {

        var deferred = $q.defer();

        $http.get('http://localhost:19595/api/movies/'+Id)
            .then(function(result) {
                    //success
                    deferred.resolve(result.data);
                },
                function() {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    };

    //Delete Movie Review by id
    var _removeReview = function(Id) {
        var deferred = $q.defer();

        $http.delete('http://localhost:19595/api/MovieReviews/' + Id)
            .then(function() {
                    //success
                    deferred.resolve();
                },
                function() {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    }

    //Deleting the Movie by id
    var _removeMovie = function(Id) {
        var deferred = $q.defer();
        $http.delete('http://localhost:19595/api/Movies/' + Id)
            .then(function() {
                    //success
                    deferred.resolve();
                },
                function() {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    }

    //Adding New Movie
    var _addMovie = function (newMovie) {
        var deferred = $q.defer();

        $http.post('http://localhost:19595/api/movies', newMovie)
           .then(function (result) {
               //Success
               var newOne = result.data;
               //Merge the array with newly created movie
               _movies.splice(0, 0, newOne);
               //returned the newly created movie back to UI
               deferred.resolve(newOne);
           },
               function () {
                   //error
                   deferred.reject();
               });

        return deferred.promise;
    };

    var _getReviews = function (Id) {

        var deferred = $q.defer();

        $http.get('http://localhost:19595/api/MovieReviews/' + Id)
            .then(function (result) {
                //success  
                angular.copy(result.data, _reviews);
                _isInit = true;
                deferred.resolve();
            },
                function () {
                    //error
                    deferred.reject();

                });
        return deferred.promise;
    };

    var _getReviewByReviewId = function (Id) {

        var deferred = $q.defer();

        $http.get('http://localhost:19595/api/Lookups/getbyreviewerid?id=' + Id)
            .then(function (result) {
                //success  
                // angular.copy(result.data, _singleReview);
                var newOne = result.data;
                _isInit = true;
                deferred.resolve(newOne);
               // alert(result.data);
                toastr.success("information retrieved");
            },
                function () {
                    //error
                    deferred.reject();

                });
        return deferred.promise;
    };

    var _addReview = function (MovieId,newReview) {
        var deferred = $q.defer();
        $http.post('http://localhost:19595/api/MovieReviews/'+MovieId, newReview)
            .then(function (result) {
                //success
                var newOne = result.data;
                _reviews.splice(0, 0, newOne);
                deferred.resolve();
            },
                function () {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    };
    

    function _findReview(Id) {
        var found = null;

        $.each(_reviews, function(i, item) {
            if (item.id == Id) {
                found = item;
                return false;
            }
        });
        return found;
    }
    var _getReviewsById = function (Id) {
        var deferred = $q.defer();
         
        //if (_isReady()) {
        //    var review = _findReview(id);
        //    if (review) {
        //        deferred.resolve(review);
        //    } else {
        //        deferred.reject();
        //    }
        //} else {
        _getReviews(Id)
              .then(function () {
                  // success
                  //  var review = _findReview(id);
                  if (_reviews) {
                      deferred.resolve(_reviews);
                  } else {
                      deferred.reject();
                  }
              },
              function () {
                  // error
                  deferred.reject();
              });
        return deferred.promise;
    }

    //Editing the Review
    var _NewReviewEdit = function (newReview) {
        var deferred = $q.defer();
        $http.put('http://localhost:19595/api/MovieReviews/' , newReview)
            .then(function (result) {
                //success
                deferred.resolve();
            },
                function () {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    }

    //Editing the Movie
    var _movieEdit = function(Movie) {
        var deferred = $q.defer();
        $http.put('http://localhost:19595/api/Movies/', Movie)
            .then(function() {
                    //success
                    deferred.resolve();
                },
                function() {
                    //error
                    deferred.reject();
                });
        return deferred.promise;
    }
       
    // };
    return {
        movies: _movies,
        reviews: _reviews,
        singleReview:_singleReview,
        getMovies: _getMovies,
        addMovie: _addMovie,
        isReady: _isReady,
        getReviews: _getReviews,
        addReview: _addReview,
        getReviewById: _getReviewsById,
        newReviewEdit: _NewReviewEdit,
        movieEdit: _movieEdit,
        getReviewByReviewId: _getReviewByReviewId,
        getMovieById: _getMovieById,
        removeReview: _removeReview,
        removeMovie: _removeMovie
    };
}]);
var HomeController = [
    "$scope", "$http", "dataService", function($scope, $http, dataService) {
        $scope.movies = 0;
        $scope.data = dataService;
        $scope.isBusy = false;


        //isReady will avoid multiple calls to server as it will pickup the cached values
        if (dataService.isReady() == false) {
            $scope.isBusy = true;
            dataService.getMovies()
                .then(function() {
                    //success
                    toastr.success("Data Retrieved Successfully");
                },
                    function() {
                        //error
                        toastr.error("Error Fetching Data");
                    })
                .then(function() {
                    //switch off busy sign in any case
                    $scope.isBusy = false;
                });
        }
    }
];

var newMovieController = [
    "$scope", "$http", "$window", "dataService",
    function($scope, $http, $window, dataService) {
        $scope.newMovie = {};
        $scope.save = function() {

            dataService.addMovie($scope.newMovie)
                .then(function() {
                    //success
                    toastr.success("Data Saved Successfully");
                    $window.location = "#/";
                },
                    function() {
                        //error
                        toastr.error("Couldn't Save the New Movie");
                    });
        };
    }
];

var reviewsController = [
    "$scope", "dataService", "$window", "$routeParams",
    function($scope, dataService, $window, $routeParams) {
        $scope.review = null;
        $scope.MovieId = null;
        $scope.newReview = {};
        $scope.editMovieId = null;
        // $scope.data = dataService;
        $scope.isBusy = false;

        dataService.getReviewById($routeParams.Id)
            .then(function(review) {
                //success

                $scope.review = review;
                $scope.MovieId = $routeParams.Id;
                
                // console.log(review[0].MovieId);

            },
                function() {
                    //error
                    $window.location = "#/";
                    // alert("not fetched");
                });
        $scope.saveReview = function() {
            dataService.addReview($scope.MovieId, $scope.newReview)
                .then(function() {
                    //success
                    toastr.success("Review Saved Successfully");
                    $window.location = "#/";
                },
                    function() {
                        //error
                        toastr.error("Couldn't Save the New Review");
                    });
        };

        $scope.editReview = function () {

            dataService.NewReview($routeParams.Id, 1, $scope.newReview)
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
    }
];
