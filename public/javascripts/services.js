/* candidateApp.services ========================================= */
angular.module('authServices', [])

// User service -- consumed by mongoDB
    .factory('User', function($resource) {
        return $resource('http://localhost:3000/users/:id', { id: '@_id' }, {
            update: {
                method: "PUT"
            }
        });
    })

// popupService used in .delete() -- asks for confirmation
    .service('popupService', function($window) {
        this.showPopup = function(message) {
            return $window.confirm(message);
        }
    })