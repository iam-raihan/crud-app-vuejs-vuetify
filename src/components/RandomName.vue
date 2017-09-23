<template>
  <v-container>
    <v-flex xs12>
      <v-btn
              large info @click="getAllNames"
              :loading="loading"
              :disabled="loading">
        Get All Names
      </v-btn>
      <v-btn
              fab small info dark
              @click="addNameComponent"
              v-tooltip:right="{ html: 'Add New Name' }">
        <v-icon>add</v-icon>
      </v-btn>
      <name-component
              v-for="name in names"
              :key="name.id"
              :data="name"
              @deleted="nameDeleted($event)"
              @actionSuccess="actionSuccess($event)"
      ></name-component>
    </v-flex>
    <v-snackbar
            :timeout="snackbar.time"
            info top
            v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn
              flat small dark
              @click.native="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import NameComponent from './NameComponent.vue'
  import axios from 'axios'

  export default {
    components: {
      'name-component': NameComponent
    },
    data () {
      return {
        names: [],
        loading: false,
        snackbar: {
          show: false,
          text: '',
          time: 2000
        }
      }
    },
    methods: {
      getAllNames () {
        this.loading = true
        this.names = []
        axios.get('http://localhost/demo-app-backend/public/api/name')
          .then(
            (response) => {
              this.loading = false
              const allNames = []
              response.data.names.map((el) => {
                allNames.push({
                  id: el.id,
                  name: el.name
                })
              })
              this.names = allNames
              this.snackbar.text = 'Read Operation'
              this.snackbar.show = true
            }
          )
          .catch(
            (error) => {
              this.loading = false
              console.log(error)
            }
          )
      },
      addNameComponent () {
        let exists = false
        this.names.map((el) => {
          if (el.id === -1) {
            exists = true
          }
        })
        if (!exists) {
          this.names.unshift(
            {
              id: -1,
              name: ''
            }
          )
        }
      },
      nameDeleted (id) {
        const index = this.names.findIndex((el) => {
          return el.id === id
        })
        this.names.splice(index, 1)
        this.snackbar.text = 'Delete Operation'
        this.snackbar.show = true
      },
      actionSuccess (action) {
        this.snackbar.text = action === 1 ? 'Update Operation' : 'Create Operation'
        this.snackbar.show = true
      }
    }
  }
</script>

<style>

</style>
