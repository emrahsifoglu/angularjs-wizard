var appController = function($scope, $http, itunesService, settings, ezfb, $location) {

    var currentStep = 0;
    var currentStepStatus = "";
    var stepsValid = [];

    $scope.user = {
        name:'',
        email: '',
        album:'',
        color:'',
        message:''
    };

    $scope.artistName = ""; // to make button disabled in second step
    $scope.selectedArtist = { id: 0, name: "", collection: "" };
    $scope.settings = settings;
    
    $scope.log = function(msg){
        console.log(msg);
    };

    $scope.$on('wizardLoaded', function() {
        $scope.log('wizardLoaded');
        $scope.$broadcast('showStep', 1); // first step, number will be decreased.
    });

    $scope.$on('formValid', function(event, valid){
        updateCurrentStepValid(valid);
    });

    $scope.$on('send', function(){
        $scope.log('send');
        $scope.$broadcast('buttonEnable', 'prev', false);
        $scope.$broadcast('buttonEnable', 'last', false);
        $http({
            url:'../../post.php',
            method: "POST",
            data: { 'user' : $scope.user }
        }).
            then(function(response) {
                refresh();
            },
            function(response) {
                refresh();
            }
        );
    });

    $scope.stepChanged = function(event) {
        currentStep = event.step.to; // number is increased which means first step is 1.
        currentStepStatus= event.name;
        if (currentStepStatus == 'change') $scope.$broadcast('buttonEnable', 'next', stepsValid[currentStep-1]);
    };

    $scope.colorChange = function(color){
        $scope.user.color = color; // this may be not valid but till correct format user won't pass the next step
        updateCurrentStepValid(isHexColor(color));
    };

    $scope.login = function () {
        ezfb.login(null, {scope: 'email'});
    };

    $scope.logout = function () {
        ezfb.logout();
    };

    $scope.$watch('loginStatus', function(newValue, oldValue){
        if (newValue != oldValue  && newValue == 'connected') {
            $scope.log('loginStatus');
            $scope.log(newValue);
            updateMe();
        } else {
            $scope.user.name = "";
            $scope.user.email = "";
        }
    });

    ezfb.Event.subscribe('auth.statusChange', function (statusRes) {
        $scope.log('auth.statusChange');
        $scope.log(statusRes);
        updateStatus();
    });

    $scope.selectedArtistClear = function(){
        $scope.selectedArtist = { id: 0, name: "", collection: "" };
    };

    $scope.submitArtist = function(artistName){
        if (artistName.length < 2) return;
        if (itunesService.getArtist() == artistName) return;
        updateCurrentStepValid(false);
        $scope.selectedArtistClear();
        itunesService.setArtist(artistName);
        $scope.loading = true;
        itunesService.callItunes().then(function(data){
            $scope.artists = data.results;
            $scope.loading = false;
        });
    };

    $scope.setCollection = function(id, artistName, collectionName){
        $scope.log($scope.selectedArtist);
        $scope.selectedArtist.id = id;
        $scope.selectedArtist.name = artistName;
        $scope.selectedArtist.collection = collectionName;
        $scope.user.album = $scope.selectedArtist.collection;
        updateCurrentStepValid(true);
    };

    function updateCurrentStepValid(valid){
        stepsValid[currentStep-1] = valid;
        if (valid) $scope.$broadcast('buttonEnable', 'next', true);
        if (!valid) $scope.$broadcast('buttonEnable', 'next', false);
    }

	function updateStatus () {
		return ezfb.getLoginStatus().then(
            function (res) {
				$scope.loginStatus = res.status;
			});
	}

	function updateMe () {
		ezfb.api('/me').then(
            function(me){
                $scope.log('updateMe');
                $scope.log(me);
                $scope.user.name = me.first_name + " "+ me.last_name; //directive?
                $scope.user.email = me.email;
		    });
	}

    function refresh(){
        $scope.log('You are being redirected to route.');
        location.reload();
    }
};
appController.$injects = ['$scope', '$http', 'itunesService', 'settings', 'ezfb'];