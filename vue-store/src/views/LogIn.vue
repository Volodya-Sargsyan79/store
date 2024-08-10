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
    async submitForm() {
      // Clear previous authorization and token
      axios.defaults.headers.common["Authorization"] = ""
      localStorage.removeItem('token')
      this.errors = []

      const formData = {
        username: this.username,
        password: this.password
      }

      try {
        // Send login request
        const loginResponse = await axios.post("/api/v1/token/login/", formData)
        const token = loginResponse.data.auth_token

        // Save token and set authorization header
        this.$store.commit('setToken', token)
        axios.defaults.headers.common["Authorization"] = "Token " + token
        localStorage.setItem("token", token)

        // Retrieve user data
        const userResponse = await axios.get(`/api/v1/users/${this.username}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        // Redirect or handle successful login
        if (userResponse.data.is_admin) {
          this.$store.commit('setUser', userResponse.data);
          this.$router.push('/adminuser');
        } else {
          this.$store.commit('setUser', userResponse.data);
          this.$router.push('/store-owner');
        }

      } catch (error) {
        // Handle errors
        if (error.response) {
          for (const property in error.response.data) {
            this.errors.push(`${property}: ${error.response.data[property]}`)
          }
          console.log(JSON.stringify(error.response.data))
        } else if (error.message) {
          this.errors.push(error.message)
          console.log(JSON.stringify(error.message))
        } else {
          this.errors.push("An unknown error occurred")
          console.log(JSON.stringify(error))
        }
      }
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
  