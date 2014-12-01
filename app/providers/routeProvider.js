var routeProvider = function($routeProvider){
    $routeProvider
        .when('/',
        {
            controller: 'appController',
            templateUrl: 'app/views/layout.html'
        })
        .otherwise({ redirectTo: '/' });
};
routeProvider.$injects = ['$routeProvider'];