var request = require('superagent');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

var authorization = 'Basic cmF1bC5jYWJlcm9AamFsYXNvZnQuY29tOk1hY3Jvc3My';

describe('Teams', function(){

	beforeEach(function(){
	 
	
	});
	
	afterEach(function(){
	    
	});
	
	it('verify it is possible to get all the teams', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
	});
	
	it('Verify that the list of teams returned is the correct', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
			.set('Authorization', authorization)
			.end(function(error, response){
			
			    var initialListTeams = [ { 'type': 'team', 'id': 26237 },
  { 'type': 'team', 'id': 26241 },
  { 'type': 'team', 'id': 26262 },
  { 'type': 'team', 'id': 26264 },
  { 'type': 'team', 'id': 26267 },
  { 'type': 'team', 'id': 26269 },
  { 'type': 'team', 'id': 26270 },
  { 'type': 'team', 'id': 26271 },
  { 'type': 'team', 'id': 26272 },
  { 'type': 'team', 'id': 26273 },
  { 'type': 'team', 'id': 26274 },
  { 'type': 'team', 'id': 26275 },
  { 'type': 'team', 'id': 26277 },
  { 'type': 'team', 'id': 26278 },
  { 'type': 'team', 'id': 26279 },
  { 'type': 'team', 'id': 26280 },
  { 'type': 'team', 'id': 26281 },
  { 'type': 'team', 'id': 26242 },
  { 'type': 'team', 'id': 26282 },
  { 'type': 'team', 'id': 26276 },
  { 'type': 'team', 'id': 26283 },
  { 'type': 'team', 'id': 26286 },
  { 'type': 'team', 'id': 26287 },
  { 'type': 'team', 'id': 26288 },
  { 'type': 'team', 'id': 26289 },
  { 'type': 'team', 'id': 26290 },
  { 'type': 'team', 'id': 26247 },
  { 'type': 'team', 'id': 26291 },
  { 'type': 'team', 'id': 26292 },
  { 'type': 'team', 'id': 26293 },
  { 'type': 'team', 'id': 26294 },
  { 'type': 'team', 'id': 26295 },
  { 'type': 'team', 'id': 26296 },
  { 'type': 'team', 'id': 26297 },
  { 'type': 'team', 'id': 26298 },
  { 'type': 'team', 'id': 26299 },
  { 'type': 'team', 'id': 26307 },
  { 'type': 'team', 'id': 26490 },
  { 'type': 'team', 'id': 26492 },
  { 'type': 'team', 'id': 26494 },
  { 'type': 'team', 'id': 26497 },
  { 'type': 'team', 'id': 26499 },
  { 'type': 'team', 'id': 26500 },
  { 'type': 'team', 'id': 26501 },
  { 'type': 'team', 'id': 26255 },
  { 'type': 'team', 'id': 26256 },
  { 'type': 'team', 'id': 26260 },
  { 'type': 'team', 'id': 26261 },
  { 'type': 'team', 'id': 26284 },
  { 'type': 'team', 'id': 26285 } ]
			    
				expect(response.status).toBe(200);
				for (var i = 0; i<initialListTeams.length; i++){
				    expect(response.body[i].type).toBe(initialListTeams[i].type);   
					expect(response.body[i].id).toBe(initialListTeams[i].id);
				}
				done();
			});
	});
	
	
	var teamName = 'myteamA58';
        var teamNameUpdated = teamName + 'U';
        var idNewTeam;
        var newTeam = [
           {
             'name': teamName,
             'users': [],
             'productAccess': [
              {
                'type': 'product',
                'id': 145263
               }
             ],
           'standaloneIterationAccess': [],
           'type': 'team'
           }
        ];
		
		var updateTeam = [
                              {
                                'name': teamNameUpdated,
                                'type': 'team'
                              }
                             ];
	
	var invalidTeam = [
    {
        'name': teamName,
        'users': [],
        'productAccess': [
            {
                'type': 'product',
                'id': 145263
            }
        ],
        'standaloneIterationAccess': [],
        'type': 'test'
    }
     ];
	var invalidId = 25362142;
    var updateTeam = [
                              {
                                'name': 'nameNew',
                                'type': 'team'
                              }
                             ];
	
	
	it('verify that it is possible to create a team', function(done){
			
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams')
			.set('Authorization', authorization)
			.send(newTeam)
			.end(function(error, response){
				expect(response.status).toBe(201);
				idNewTeam = response.body[0].id;
				done();
			});
			
		
	});
	
	it('verify that the team has been created', function(done){
			
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				isListed = false;
				for (var i=0 ; i < response.body.length; i++){
				    if (response.body[i].id == idNewTeam){
					  isListed = true;
					  break;
					}
				}
				expect(isListed).toBe(true);
				done();
			});
			
		
	});
	
	it('verify that the team can be updated', function(done){
			
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/' + idNewTeam)
			.set('Authorization', authorization)
			.send(updateTeam)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
			
		
	});
	
	
	it('verify that the team has been updated', function(done){
			
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/' + idNewTeam + '?templates=Name')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				expect(response.body[0].name).toBe(teamNameUpdated);
				done();
			});
			
		
	});
	
	
	it('verify that it is possible to delete a team', function(done){
			
		request
			.del('https://cloud.agilefant.com:443/rcabero/api/v1/teams/' + idNewTeam)
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
			
		
	});
	
	
	it('verify that the deleted team is not listed anymore', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				isListed = false;
				for (var i=0 ; i < response.body.length; i++){
				    if (response.body[i].id == idNewTeam){
					  isListed = true;
					  break;
					}
				}
				expect(isListed).toBe(false);
				done();
			});
	});
	
	
	
	
	it('Verify it is not possible to create a team with an invalid type', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
			.set('Authorization', authorization)
			.send(invalidTeam)
			.end(function(error, response){
				expect(response.status).toBe(400);
				done();
			});
	});
	
	it('Verify it is not possible to edit a team with an invalid id', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
			.set('Authorization', authorization)
			.send(updateTeam)
			.end(function(error, response){
				expect(response.status).toBe(404);
				done();
			});
	});
	
	it('Verify that the error is the corect when an invalid task is updated', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
			.set('Authorization', authorization)
			.send(updateTeam)
			.end(function(error, response){
				expect(response.status).toBe(404);
				expect(response.body.errorMessage).toBe('Team with id: ' + invalidId + ' was not found!');
				done();
			});
	});
	
	it('Verify that is not possible to delete an non-exist task', function(done){
		
		request
			.del('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(404);
				done();
			});
	});
	
	it('Verify that an error is displayed when an non-exist task is deleted', function(done){
		
		request
			.del('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(404);
				expect(response.body.errorMessage).toBe('Team with id: ' + invalidId + ' was not found!');
				done();
			});
	});
	
	it('Verify that unauthorized error is displayed when user is not authenticated and list tasks is called', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all'+ invalidId)
			.end(function(error, response){
				expect(response.status).toBe(400);
				expect(response.body.errorMessage).toBe('Type mismatch');
				done();
			});
	});
	
	it('Verify that unauthorized error is displayed when user is not authenticated and create task is called', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams')
			.send(updateTeam)
			.end(function(error, response){
				expect(response.status).toBe(401);
				expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
				done();
			});
	});
	
	it('Verify that unauthorized error is displayed when user is not authenticated and update task is called', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26242')
			.send(updateTeam)
			.end(function(error, response){
				expect(response.status).toBe(401);
				expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
				done();
			});
	});
	
	it('Verify that unauthorized error is displayed when user is not authenticated and get task is called', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26237?templates=Name%2CSummary')
			.end(function(error, response){
				expect(response.status).toBe(401);
				expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
				done();
			});
	});
	
	it('Verify that unauthorized error is displayed when user is not authenticated and delete task is called', function(done){
		
		request
			.del('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26237')
			.end(function(error, response){
				expect(response.status).toBe(401);
				expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
				done();
			});
	});
	
});


describe('Users', function(){

	beforeEach(function(){
	 
	
	});
	
	afterEach(function(){
	    
	});
	
	
	it('Verify it is possible to get all the users', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/all')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
	});
	
	it('Verify it is possible to get the user logged', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/loggedIn')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
	});
	
	var loggedUser = { 'type': 'user',
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
 
      it('Verify that the info displayed for the logged user is the correct', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/loggedIn')
			.set('Authorization', authorization)
			.end(function(error, response){
				expect(response.status).toBe(200);
				expect(response.body.id).toBe(loggedUser.id);
				expect(response.body.fullName).toBe(loggedUser.fullName);
				done();
			});
	});
	
	
	/*
Note the values for the user needs to be change for eash run
as the user cannot be deleted, the application will raise
an error because duplicated object
*/

newUserName = "testA18";

newUser = 
[
    {
        "type": "user",
        "fullName": newUserName,
        "loginName": newUserName + "@softlayer.com",
        "name": newUserName + "@softlayer.com",
        "email": newUserName + "@softlayer.com",
        "initials": newUserName,
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

var updatedUser = [
    {
        "type": "user",
        "admin": false,
    }
];

var newId;

var expectedTeam = [ { 'type': 'team', 'id': 26237 } ];
	
	
	
	it('Verify that is posible to create a new user', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/users')
			.set('Authorization', authorization)
			.send(newUser)
			.end(function(error, response){
				expect(response.status).toBe(201);
				newId = reposnse.body[0].id;
				done();
			});
	});
	

	
	
	it('Verify that is posible to edit a user', function(done){
		
		request
			.post('https://cloud.agilefant.com:443/rcabero/api/v1/users/' + newId)
			.set('Authorization', authorization)
			.send(updatedUser)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
	});
	
	it('Verify that is possible to get the team of the user', function(done){
		
		request
			.get('https://cloud.agilefant.com:443/rcabero/api/v1/users/' + newId + '/teams')
			.set('Authorization', authorization)
			.send(updatedUser)
			.end(function(error, response){
				expect(response.status).toBe(200);
				done();
			});
	});
	
	
	it('Verify that is possible to get the team of the user', function(done){
		
		request
			.get('Verify that the team of the user is the correct' + newId + '/teams')
			.set('Authorization', authorization)
			.send(updatedUser)
			.end(function(error, response){
				expect(response.status).toBe(200);
				expect(response.body[0].id).toBe(expectedTeam[0].id);
				done();
			});
	});



});
