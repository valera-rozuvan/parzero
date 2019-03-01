<template>
  <section></section>
</template>

<script>
import { version } from '@/package.json';

export const Landing = {
  name: 'Landing',
  layout: 'centered',
  created() {
    console.log(`app version ${version}`);
    console.log('process.env.NODE_ENV = "' + process.env.NODE_ENV + '".');
    console.log('process.env.relayUrl = "' + process.env.relayUrl + '".');
  }
};

export default Landing;
</script>
