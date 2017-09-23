<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
                large info
                @click="getString"
                :loading="loading"
                :disabled="loading">
          Get Random String
        </v-btn>
        <h5 class="info--text pl-5 pa-4">{{ string }}</h5>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        string: 'No String',
        loading: false
      }
    },
    methods: {
      getString () {
        this.loading = true
        axios.post('https://api.random.org/json-rpc/1/invoke', {
          'jsonrpc': '2.0',
          'method': 'generateStrings',
          'params': {
            'apiKey': 'f95d86b1-6c38-4ca5-a32c-aaadfd57a4df',
            'n': 1,
            'length': 20,
            'characters': 'abcdefghijklmnopqrstuvwxyz',
            'replacement': true
          },
          'id': 1
        })
          .then(
          (response) => {
            this.loading = false
            this.string = response.data.result.random.data[0]
          }
        )
          .catch(
            (response) => {
              this.loading = false
              this.string = 'Error !! Check Console Log'
              console.log(response)
            }
          )
      }
    }
  }
</script>

<style>

</style>
