<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Add Owner</v-card-title>
          <v-divider></v-divider>
          <v-form @submit.prevent="submitForm" class="pa-3">
            <v-text-field
              label="Username"
              v-model="username"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              label="Email"
              v-model="email"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              label="Password"
              type="password"
              v-model="password1"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              label="Repeat Password"
              type="password"
              v-model="password2"
              outlined
              dense
            ></v-text-field>
            <v-checkbox
              label="Admin"
              v-model="is_admin"
              class="ml-3"
            ></v-checkbox>
            <v-checkbox
              label="Store Owner"
              v-model="is_store_owner"
              class="ml-3"
            ></v-checkbox>

            <v-alert type="error" v-if="errors.length" dismissible>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="error in errors" :key="error">
                    {{ error }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-alert>
            <v-col class="d-flex justify-center" style="gap: 20px">
              <v-btn type="submit" color="success" style="width: 150px"
                >Add User</v-btn
              >
              <v-btn color="grey" @click="$router.push('/adminuser')"
                >Cancel</v-btn
              >
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from "axios";

export default {
  name: "AddOwner",
  data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: "",
      is_admin: false,
      is_store_owner: false,
      errors: [],
    };
  },
  mounted() {
    const checkboxesInput = document.querySelectorAll(
      ".v-selection-control__input input"
    );
    checkboxesInput.forEach((checkboxesInput) => {
      checkboxesInput.style.opacity = "1";
      checkboxesInput.style.borderRadius = "0%";
    });
    const checkbox = document.querySelectorAll(".v-label");
    checkbox.forEach((checkbox) => {
      checkbox.style.marginLeft = "10px";
    });

    const input = document.querySelectorAll(".v-selection-control__input");
    input.forEach((input) => {
      input.style.borderRadius = "0%";
    });
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.username === "") {
        this.errors.push("The username is missing");
      }

      if (this.email === "") {
        this.errors.push("The email is missing");
      }

      if (this.password1 === "") {
        this.errors.push("The password is too short");
      }

      if (this.password1 !== this.password2) {
        this.errors.push("The passwords are not matching");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password1,
          is_admin: this.is_admin,
          is_store_owner: this.is_store_owner,
        };

        axios
          .post("/api/v1/users/add-store-owner/", formData)
          .then((response) => {
            this.$router.push("/adminuser");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log("Error response:", error.response);
            } else if (error.message) {
              console.log("Error message:", error.message);
              this.errors.push("Something went wrong. Please try again!");
            } else {
              console.log("Error:", error);
              this.errors.push("Something went wrong. Please try again!");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
</style>

