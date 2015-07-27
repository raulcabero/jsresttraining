//frisby test

var frisby = require('frisby');

frisby.globalSetup({
    request: {
	    headers: {
			 'Content-Type': 'application/json'
		},
		 
	}
	
});

frisby.create('Verify that unauthorized error is displayed when user is not authenticated and list tasks is called')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
	.expectStatus(401)
	.expectJSON(
	    { 
		  'errorMessage': 'Unauthenticated user cannot access this resource!' 
		}
	)
.toss();

var newTeam = [
    {
        'name': 'myteamSecurity',
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

frisby.create('Verify that unauthorized error is displayed when user is not authenticated and create task is called')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams', newTeam,{json: true})
	.expectStatus(401)
	.expectJSON(
	    { 
		  'errorMessage': 'Unauthenticated user cannot access this resource!' 
		}
	)
.toss();

frisby.create('Verify that unauthorized error is displayed when user is not authenticated and update task is called')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26242', newTeam,{json: true})
	.expectStatus(401)
	.expectJSON(
	    { 
		  'errorMessage': 'Unauthenticated user cannot access this resource!' 
		}
	)
.toss();

frisby.create('Verify that unauthorized error is displayed when user is not authenticated and get task is called')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26237?templates=Name%2CSummary')
	.expectStatus(401)
	.expectJSON(
	    { 
		  'errorMessage': 'Unauthenticated user cannot access this resource!' 
		}
	)
.toss();

frisby.create('Verify that unauthorized error is displayed when user is not authenticated and delete task is called')
	.delete('https://cloud.agilefant.com:443/rcabero/api/v1/teams/26237')
	.expectStatus(401)
	.expectJSON(
	    { 
		  'errorMessage': 'Unauthenticated user cannot access this resource!' 
		}
	)
.toss();