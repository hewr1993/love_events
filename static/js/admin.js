angular.module('tddApp', ['mm.foundation']);

var formCtrl = function($scope, $http) {
	$http.get('/cases/info').success(function(data, status) {
		$scope.cases = data;
		$scope.cases.splice(0, 0, {headline:"新增", _id:"new"});
	});
	$scope.selected = "new";
	$scope.updateForm = function(item) {
		$scope.info = {
			headline: "",
			text: "",
			tag: "",
			media: ""
		};
		if ($scope.cases != undefined) 
			for (var i = 1; i < $scope.cases.length; ++i) 
				if ($scope.cases[i]._id == item) {
					$scope.info = $scope.cases[i];
					break;
				}
	};
	$scope.updateForm();
	$('#upload-form').on('valid.fndtn.abide', function() {
		if ($("#upload-button").attr("disabled") == "disabled") return; // bug
		$("#upload-button").attr("disabled", "disabled");
		$("#upload-form").ajaxSubmit({
			type:'post',
			url: $("#case-selector").val() == "0" ? "/admin/new" : "/admin/modify/" + $scope.cases[$("#case-selector").val()]._id,
			beforeSubmit: function() {
				$("#upload-progress-bar").width("0%");
			},
			uploadProgress: function(event, position, total, percentComplete) {
				$("#upload-progress-bar").width(percentComplete + "%");
			},
			success: function(data) {
				//res = JSON.parse(data);
				$("#upload-button").removeAttr("disabled");
			},
			error: function(e) {
				$("#upload-button").removeAttr("disabled");
			}
		});
	});
};
