'use strict';

angular.module('owsWalletPlugin.controllers').controller('HomeCtrl', function($scope, $log, Session, Hello) {

	// Create an API object passing in a dependency configuration ID. The dependency configuration is defined in the applet's plugin.json.
	// Dependency configuration is used for providing the servlet with any necessary configuration data it requires to provide its service.
	// For example, dependency configuration may include external service API keys. The dependency configuration for the Hello applet looks
	// something like the following.
	//
	// Esach dependency configuration is identified using the dependent plugin id as the key. For the Hello servlet we use the id as provided
	// by the servlet author; "org.openwalletstack.wallet.plugin.servlet.hello".
	//
	// Within the dependency configuraiton there are three sections.
	//
	// package - A key to the object that points to an installable NPM package version.
	//
	// options - Options used by the host app customize interaction with the servlet. The following options are available.
	//   startMode:  How the servlet should be started. Values are "auto", "manual". If auto, then the host app automatically launches the servlet
	//               when the parent plugin starts. If manual then the parent plugin must issue a start message to the host app to start the servlet.
	//
	// myId - A key used to identify configuration data that can be used by the parent plugin or sent to the dependent servlet.
	//
  // "dependencies": {
  //   "org.openwalletstack.wallet.plugin.servlet.hello": {    // Hello servlet dependency configuration
  //     "package": {
  //       "@owstack/ows-wallet-servlet-hello": "^0.0.1"       // NPM package to install and use
  //     },
  //     "options": {                                          // Host app options for handling this dependency
  //       "startMode": "auto"                                 // Automatically start the Hello servlet when the parent plugin starts
  //     },
  //     "helloConfig": {
  //       "text": "Goodbye."                                  // User defined configuration, typically made available to the servlet
  //     }
  //   }
  // }
  //

  var hello = new Hello('helloConfig');

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
  	// Set a view title.
		$scope.title = Session.getInstance().plugin.header.name;

		// Call the Hello servlet and process the reponse.
		hello.say('Hello, World!').then(function(response) {

			$scope.respone = response;

		}).catch(function(error) {
			// Something bad happened.
			$log.error(error);

		});
  });

});
