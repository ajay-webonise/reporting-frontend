var Rsync = require('rsync');
var path = require('path');

if( process.env.npm_config_SERVER_USER && process.env.npm_config_SERVER_IP && process.env.npm_config_SERVER_DESTINATION ) {

  // Build the command
  var rsync = new Rsync()
    .shell('ssh')
    .flags('az')
    .source(path.join(__dirname, '..', 'build/'))
    .destination(process.env.npm_config_SERVER_USER+'@'+process.env.npm_config_SERVER_IP+':'+process.env.npm_config_SERVER_DESTINATION);


  console.log('Following command will be run: ');
  console.log(rsync.command());

  // simple execute
  var rsyncPid = rsync.execute(function(error, code, cmd) {
      if(error){
          console.log('There was an error in sending files to server: ', error);
      }else{
          console.log('Latest build pushed successfully');
      }
  });

  // signal handler function
  var quitting = function() {
      console.log('Aborting file uploading process..');
      if (rsyncPid) {
          rsyncPid.kill();
      }
      process.exit();
  };

  process.on("SIGINT", quitting); // run signal handler on CTRL-C
  process.on("SIGTERM", quitting); // run signal handler on SIGTERM
}else{
  console.error("\n\nPlease check for SERVER_USER, SERVER_IP & SERVER_DESTINATION. \n\n");
}
