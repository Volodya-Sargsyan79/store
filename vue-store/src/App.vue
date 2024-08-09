<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Store</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="$store.state.isAuthenticated">
        <v-btn v-if="$store.state.userRole === 'admin'" to="/adminuser" text>Admin</v-btn>
        <v-btn v-else to="/adminuser" text>Store Owner</v-btn>
        <v-btn text @click="logout">Log out</v-btn>
      </template>

      <template v-else>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/log-in" text>Log in</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <v-col class="text-center">Copyright (c) 2024</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue'
import axios from "axios"

export default {
  name: 'App',
  components:{
    TopBar
  }, 
  mounted() {
    // this.getUser()
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  methods: {
    logout() {
      axios
        .post("/api/v1/token/logout/")
        .then(response => {
          axios.defaults.headers.common["Authorization"] = ""

          localStorage.removeItem("token")

          this.$store.commit('removeToken')

          this.$router.push('/')
        })
        .catch(error => {
          console.error("Logout error:", error)
          if (error.response && error.response.status === 401) {
            // Handle 401 error specifically
            this.$router.push('/log-in')
          } else {
            // Handle other errors
            alert("An error occurred during logout.")
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
