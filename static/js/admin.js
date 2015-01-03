angular.module('tddApp', ['mm.foundation', 'ngInputDate']);

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
			media: "",
			startDate: new Date(),
			endDate: new Date()
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
			success: function(res) {
				$("#upload-button").removeAttr("disabled");
				if (res.success == "yes") {
					window.location.reload();
				} else {
					alert(JSON.stringify(res));
				}
			},
			error: function(e) {
				$("#upload-button").removeAttr("disabled");
				alert(e);
			}
		});
	});
};
