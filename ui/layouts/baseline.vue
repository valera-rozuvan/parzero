<template>
  <v-app light>
    <div class="app-background"></div>

    <v-content>
      <v-container fluid fill-height fill-width>
        <v-layout align-center justify-center>
          <v-flex xs12 fill-height fill-width>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export const Baseline = {
  name: 'Baseline'
};

export default Baseline;
</script>
