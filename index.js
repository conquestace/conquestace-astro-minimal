#!/usr/bin/env node
import degit from 'degit';
const emitter = degit('conquestace/conquestace-astro-minimal', {
  cache: false,
  force: true,
  verbose: true,
});

const target = process.argv[2] || 'new-astro-site';

emitter.clone(target).then(() => {
  console.log(`🚀 Project created in ./${target}`);
});
