#!/usr/bin/env node

process.stdin.pipe(process.stdout);

process.stdin.on('end', function(code){
  process.exit(code);
});
