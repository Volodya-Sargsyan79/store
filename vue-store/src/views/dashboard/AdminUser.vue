<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-toolbar>
            <v-toolbar-title>Admin</v-toolbar-title>
          </v-toolbar>
        </v-col>
  
        <v-col cols="12">
          <v-subheader>Store owners</v-subheader>
  
          <v-btn color="primary" :to="{ name: 'AddOwner' }">Add store owner</v-btn>
  
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="search"
                  label="Enter username . . ."
                  append-icon="mdi-magnify"
                  aria-label="Search"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-btn color="success" @click="performSearch">Search</v-btn>
              </v-col>
            </v-row>
          </v-form>
  
          <v-data-table
            :headers="headers"
            :items="owners"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.type="{ item }">
              <td>{{ item.is_admin ? 'Admin' : 'Store owner' }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import axios from "axios";
export default {
  name: "AdminUser",
  data() {
    return {
        search:'',
      owners: [],
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Type', value: 'type' },
      ],

    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/v1/owners/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.owners = response.data;
      } catch (error) {
        console.log(error.response || error);
      }
    },
  },
};
</script>

<style scoped>

</style>

