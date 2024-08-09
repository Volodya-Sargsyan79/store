<template>
    <div>
        <v-app-bar app>
          <v-toolbar-title>My App</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn>Login</v-btn>
        </v-app-bar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopBar'
  }
  </script>
  
  <style scoped>
  .v-app-bar {
    background-color: #2196F3;
    color: white;
  }
  </style>