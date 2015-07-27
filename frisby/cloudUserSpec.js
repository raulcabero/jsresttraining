// JavaScript Document
var frisby = require('frisby');

frisby.globalSetup({
    request: {
	    headers: {
		     'Authorization': 'Basic cmF1bC5jYWJlcm9AamFsYXNvZnQuY29tOk1hY3Jvc3My',
			 'Content-Type': 'application/json'
		},
	    //json: true
		 
	}
	
});


frisby.create('Verify it is possible to get all the users')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/all')
	.expectStatus(200)
.toss();

var initUsers = [ { 'type': 'user', 'id': 55805 },
 { 'type': 'user', 'id': 55810 },
 { 'type': 'user', 'id': 55811 },
 { 'type': 'user', 'id': 55813 },
 { 'type': 'user', 'id': 55816 },
 { 'type': 'user', 'id': 55817 },
 { 'type': 'user', 'id': 55820 } ];

frisby.create('Verify that the list of all the users is the correct')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/all')
	.expectStatus(200)
	.expectJSON(initUsers)
.toss();

frisby.create('Verify it is possible to get the user logged')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/loggedIn')
	.expectStatus(200)
.toss();

loggedUser = { 'type': 'user',
'id': 55805,
'initials': 'raul.cabero@jalasoft.com',
'fullName': 'raul.cabero@jalasoft.com',
'mode': 'ALL',
'admin': true,
'teams': [ { 'type': 'team', 'id': 26237, 'name': 'Admin team' } ],
'organizations':
 [ { 'type': 'organization',
     'id': 21330,
     'name': 'rcabero',
     'context': 'rcabero',
     'seatQuantity': 10000,
     'planCode': 'trial',
     'state': 'active',
     'seatsLeft': 9993,
     'teamsLeft': 9957 } ],
'passwordChanged': '2015-07-22T17:19:21.000Z' };


frisby.create('Verify that the info displayed for the logged user is the correct')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/loggedIn')
	.expectStatus(200)
.toss();


/*
Note the vsalues for the user needs to be change for eash run
as the user cannot be deleted, the application will raise
an error because duplicated object
*/
newUser = 
[
    {
        "type": "user",
        "fullName": "tes12",
        "loginName": "g12@softlayer.com",
        "name": "g12@softlayer.com",
        "email": "g12@softlayer.com",
        "initials": "tes12",
        "admin": true,
        "teams": [
            {
                "type": "team",
                "id": 26237
            }
        ],
        "defaultBacklog": {
            "type": "iteration",
            "id": 145265
        }
    }
];

updatedUser = [
    {
        "type": "user",
        "admin": false,
    }
];

expectedTeam = [ { 'type': 'team', 'id': 26237 } ];

frisby.create('Verify that is posible to create a new user')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/users', newUser,{json: true})
	.expectStatus(201)
	.afterJSON(function(json) {
	  frisby.create('Verify that is posible to edit user')
	    .post('https://cloud.agilefant.com:443/rcabero/api/v1/users/' + json[0].id, updatedUser,{json: true})
	    .expectStatus(200)
	  .toss();
	})
	.afterJSON(function(json) {
	  frisby.create('Verify that is possible to get the team of the user')
	    .get('https://cloud.agilefant.com:443/rcabero/api/v1/users/' + json[0].id + '/teams')
	    .expectStatus(200)
	  .toss();
	})
	.afterJSON(function(json) {
	  frisby.create('Verify that the team of the user is the correct')
	    .get('https://cloud.agilefant.com:443/rcabero/api/v1/users/' + json[0].id + '/teams')
	    .expectStatus(200)
	    .expectJSON(expectedTeam)
	  .toss();
	})
.toss();


