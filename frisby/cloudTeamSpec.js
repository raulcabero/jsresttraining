//frisby test

// todoProjectSpec.js
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

frisby.create('Verify it is possible to get all the teams')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
	.expectStatus(200)
.toss();

var initialTeamList = [ { 'type': 'team', 'id': 26237 },
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
  { 'type': 'team', 'id': 26255 },
  { 'type': 'team', 'id': 26256 },
  { 'type': 'team', 'id': 26260 },
  { 'type': 'team', 'id': 26261 },
  { 'type': 'team', 'id': 26284 },
  { 'type': 'team', 'id': 26285 } ]


frisby.create('Verify that the list of teams returned is the correct')
	.get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
	.expectStatus(200)
    .expectJSON(initialTeamList)	
.toss();

var teamName = 'myteam51';
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


frisby.create('Create team')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams', newTeam,{json: true})
	.expectStatus(201)
	.afterJSON(function(json) {
	  idNewTeam = json[0].id;
      frisby.create('verify team created') 
       .get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ idNewTeam +'.json')
	   .expectStatus(200)
	   .expectJSON(
         [
	       {
		     'type':'team',
             'id': idNewTeam
		   }
          ]
	     )
	   .afterJSON(function(json) { 
	        var updateTeam = [
                              {
                                'name': teamNameUpdated,
                                'type': 'team'
                              }
                             ];
            
            frisby.create('verify that team can be updated') 
              .post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ idNewTeam, updateTeam,{json: true})
	          .expectStatus(200)
            .toss(); 
	      })
	      .afterJSON(function(json) {             
            frisby.create('verify that team can be updated') 
              .get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ idNewTeam + '?templates=Name' )
              .expectStatus(200)
              .expectJSON(
                    [
	                   {
                         'type':'team',
                         'id': idNewTeam,
                         'name': teamNameUpdated
                        }
                    ]
                 )       
              .toss(); 
            })  
            .afterJSON(function(json) {             
            frisby.create('verify that team can be deleted') 
              .delete('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ idNewTeam )
              .expectStatus(200)
            .toss(); 
	      })
	      .afterJSON(function(json) {             
            frisby.create('verify that deleted team is not listed in all the teams') 
              .get('https://cloud.agilefant.com:443/rcabero/api/v1/teams/all')
              .expectStatus(200)
              .expectJSON(initialTeamList)
            .toss(); 
	      })
	      
    .toss();
    })
.toss();

invalidTeam = [
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

frisby.create('Verify it is not possible to create a team with an invalid type')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams', invalidTeam,{json: true})
	.expectStatus(400)
.toss();


var invalidId = 25362142;
var updateTeam = [
                              {
                                'name': 'nameNew',
                                'type': 'team'
                              }
                             ];

frisby.create('Verify it is not possible to edit a team with an invalid id')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId, updateTeam,{json: true})
    .expectStatus(404)
.toss();

frisby.create('Verify that the error is the corect when an invalid task is updated')
	.post('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId, updateTeam,{json: true})
    .expectStatus(404)
    .expectJSON(
       {
          'errorMessage': 'Team with id: ' + invalidId + ' was not found!'
       }
    )

.toss();

frisby.create('Verify that is not possible to delete an non-exist task')
	.delete('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
    .expectStatus(404)
.toss();


frisby.create('Verify that an error is displayed when an non-exist task is deleted')
	.delete('https://cloud.agilefant.com:443/rcabero/api/v1/teams/'+ invalidId)
    .expectStatus(404)
    .expectJSON(
       {
          'errorMessage': 'Team with id: ' + invalidId + ' was not found!'
       }
    )
.toss();
