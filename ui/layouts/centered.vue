<template>
  <v-app light>
    <div class="app-background"></div>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export const Centered = {
  name: 'Centered'
};

export default Centered;
</script>
