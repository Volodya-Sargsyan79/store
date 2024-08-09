<template>
    <v-container>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-4">
            <v-card-title class="headline text-center">Welcome</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  .v-card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .v-card-subtitle {
    font-size: 1rem;
  }
  </style>