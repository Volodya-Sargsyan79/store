<template>
    <v-app>
      <v-container>
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-4">
              <v-card-title class="headline text-center">Login</v-card-title>
              <v-card-subtitle class="text-center mb-4">Please enter your credentials</v-card-subtitle>
              <v-card-actions>
                <v-form @submit.prevent="submitForm">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    required
                    class="my-3"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    required
                    class="my-3"
                    outlined
                  ></v-text-field>
                  <v-btn type="submit" color="primary" class="mt-3" block>Login</v-btn>
                </v-form>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'LogIn',
    data() {
      return {
        username: '',
        password: '',
        errors: []
      }
    },
    methods: {
      submitForm() {
        // Clear previous authorization and token
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem('token')
  
        const formData = {
          username: this.username,
          password: this.password
        }
  
        // Send login request
        axios.post("/api/v1/token/login/", formData)
          .then(response => {
            const token = response.data.auth_token
  
            // Save token and set authorization header
            this.$store.commit('setToken', token)
            axios.defaults.headers.common["Authorization"] = "Token " + token
            localStorage.setItem("token", token)
  
            // Redirect to admin user page
            this.$router.push('/adminuser')
            
          })
          .catch(error => {
            // Handle errors
            this.errors = []
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
              console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
              console.log(JSON.stringify(error.message))
            } else {
              console.log(JSON.stringify(error))
            }
          })
      }
    }
  }
  </script>
  
  <style scoped>
  .v-card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .v-card-subtitle {
    font-size: 1rem;
  }
  .v-text-field {
    width: 100%;
  }
  .v-btn {
    font-weight: bold;
  }
  .fill-height {
    min-height: 100vh;
  }
  .v-card-actions {
    display: grid !important;
  }
  </style>
  