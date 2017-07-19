/*

Botkit Studio Skill module to enhance the "lookup" script

*/

var request = require('request');

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('lookup', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: lookup');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: email
    controller.studio.validate('lookup','email', function(convo, next) {

        var value = convo.extractResponse('email');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: lookup VARIABLE: email');

        // always call next!
        next();

    });

    // Validate user input: question_1
    controller.studio.validate('lookup','question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: lookup VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('lookup','question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: lookup VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('lookup','question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: lookup VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('lookup','default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *lookup*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('lookup','on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *lookup*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    var queryClearbit = function(convo, callback) {
    	console.log("queryClearbit url", 'https://person.clearbit.com/v2/combined/find?email=' + convo.extractResponse('email').trim());
    	request.get({
				url:     'https://' + process.env.clearbit_secret_key + ':@person.clearbit.com/v2/combined/find?email=' + convo.extractResponse('email').trim(),
				method: 'GET',
				followAllRedirects: true
			}, function(error, response, body) {
				console.log("queryClearbit error", error);
				console.log("queryClearbit body", body);
				return callback(body);
			});
    };

    // https://www.sitepoint.com/community/t/capitalizing-first-letter-of-each-word-in-string/209644/2
    function titleCase(str) {
			 str = str.toLowerCase().split(' ');                // will split the string delimited by space into an array of words

			 for(var i = 0; i < str.length; i++){               // str.length holds the number of occurrences of the array...
						str[i] = str[i].split('');                    // splits the array occurrence into an array of letters
						str[i][0] = str[i][0].toUpperCase();          // converts the first occurrence of the array to uppercase
						str[i] = str[i].join('');                     // converts the array of letters back into a word.
			 }
			 return str.join(' ');                              //  converts the array of words back to a sentence.
			}

    // Before the response thread starts, run this:
    controller.studio.beforeThread('lookup','response', function(convo, next) {

			console.log('In the script *lookup*, about to start the thread *response*');

			console.log("Querying Clearbit #1");
			queryClearbit(convo, function(response) {
				setTimeout(function() {
					console.log("Querying Clearbit #2");
					queryClearbit(convo, function(response) {
						setTimeout(function() {
							console.log("Querying Clearbit #3");
							queryClearbit(convo, function(response) {
								setTimeout(function(response) {
									if(!response || response == null || !response.person) {
										convo.setVar('status', 'Sorry, there was a problem querying for this email address.');
									} else {
										var p = repsonse.person;
										var about = 'Here\'s what I found...';
										if(p.name && p.name.fullName) {
											about = 'Here\'s what I found out about ' + p.name.fullName + '...';
										}
										if(p.location) about += '\nLocated In: ' + p.location;
										if(p.bio) about += '\nBiography: ' + p.bio;
										if(p.site) about += '\nWebsite: ' + p.site;
										if(p.employment) {
											if(p.employment.title) about += p.employment.title + ' at ';
											if(p.employment.name) about += p.employment.name;
											if(p.employment.seniority) about += '\nSeniority: ' + titleCase(p.employment.seniority);
											if(p.employment.role) about += '\nRole: ' + titleCase(p.employment.role);
											if(p.employment.domain) about += '\nCompany Website: ' + p.employment.domain;
										}
										if(p.facebook) {
											if(p.facebook.handle) about += '\nFacebook: http://facebook.com/' + p.facebook.handle;
										}
										if(p.github) {
											var github_followers_string = '';
											if(p.github.followers) github_followers_string = p.github.followers + ' Followers on ';
											if(p.github.handle) about += '\n' + github_followers_string + 'Github: http://github.com/' + p.github.handle;
										}
										if(p.twitter) {
											var twitter_followers_string = '';
											if(p.twitter.followers) twitter_followers_string = p.twitter.followers + ' Followers on ';
											if(p.twitter.handle) about += '\n' + twitter_followers_string + 'Twitter: http://twitter.com/' + p.twitter.handle;
										}
										if(p.linkedin) {
											if(p.linkedin.handle) about += '\nLinkedIn: http://linkedin.com/' + p.linkedin.handle;
										}
										if(p.googleplus) {
											if(p.googleplus.handle) about += '\nGoogle+: http://plus.google.com/' + p.googleplus.handle;
										}
										if(p.aboutme) {
											if(p.aboutme.handle) about += '\nAbout.me: http://about.me/' + p.aboutme.handle;
										}
										convo.setVar('status', about);
									}
									next();
								}, 1000);
							});
						}, 1000);
					});
				}, 1000);
			});

    });


    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudioafter
    controller.studio.after('lookup', function(convo, next) {

        console.log('AFTER: lookup');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
