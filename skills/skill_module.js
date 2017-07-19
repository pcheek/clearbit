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
				return callback(error, response, body);
			});
    };

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
								setTimeout(function() {
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
