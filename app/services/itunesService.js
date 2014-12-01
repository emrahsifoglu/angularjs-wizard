var itunesService = function($http, $q) {
    var baseUrl = 'https://itunes.apple.com/search?limit=5&term=';
    var _artist = '';
    var _finalUrl = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    };

    this.setArtist = function(artist){
        _artist = artist;
    };

    this.getArtist = function(){
        return _artist;
    };

    this.callItunes = function(){
        makeUrl();
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: _finalUrl
        }).success(function(data){
            console.log('callItunes : success');
            deferred.resolve(data);
        }).error(function(){
            console.log('callItunes : error');
            deferred.reject('There was an error')
        });
        return deferred.promise;
    };
};
itunesService.$injects = ['$http','$q'];