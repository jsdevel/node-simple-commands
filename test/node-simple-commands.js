'use strict';

describe('node-simple-commands', function(){
  var sut = require('..');
  var spawn = require('child_process').spawn;
  var bs = require('simple-bufferstream');

  describe('ignoreStdin', function(){
    it('shold be a string', function(){
      sut.ignoreStdin.should.be.type('string');
    });

    it('should ignore stdin', function(done){
      var data = bs(new Buffer('foo'));
      var command = spawn(sut.ignoreStdin);
      command.stdout.on('data', function(){
        done(new Error('stdin not ignored!'));
      });
      command.stderr.on('data', function(){
        done(new Error('stdin not ignored!'));
      });

      command.on('exit', function(code){
        if(code === 0)done();
        else done(code);
      });
      command.on('error', done);
      data.pipe(command.stdin);
    });
  });

  describe('echoStdin', function(){
    it('should be a string', function(){
      sut.echoStdin.should.be.type('string');
    });

    it('should echo stdin then exit', function(done){
      var data = bs(new Buffer('foo'));
      var received = '';
      var command = spawn(sut.echoStdin);

      command.stdout.on('data', function(chunk){
        received += chunk;
      });

      command.stderr.on('data', function(chunk){
        done(new Error('stderr had data!'));
      });

      command.on('exit', function(code){
        if(code)return done(new Error('code was not 0'));
        received.should.equal('foo');
        done();
      });
      command.on('error', done);

      data.pipe(command.stdin);
    });
  });
});
