<template>
  <v-container>
    <v-layout row wrap>
      <v-flex offset-xs1>
        <v-text-field
                label="Name"
                :counter="50"
                v-model="name.name"
                @input="disabled=false"
        >
        </v-text-field>
      </v-flex>
      <v-flex class="text-xs-right text-sm-left">
        <v-btn
                fab small info
                :disabled="btnDisabled"
                :loading="loading1"
                @click="actionUpdate"
                v-tooltip:top="{ html: 'Save Name' }">
          <v-icon dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn
                fab small primary
                :disabled="loading2"
                :loading="loading2"
                @click="actionDelete"
                v-tooltip:top="{ html: 'Delete Name' }">
          <v-icon dark>delete</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['data'],
    data () {
      return {
        name: this.data,
        disabled: true,
        loading1: false,
        loading2: false
      }
    },
    computed: {
      btnDisabled () {
        return this.disabled === true || this.loading1 === true
      }
    },
    methods: {
      actionUpdate () {
        this.loading1 = true

        if (this.name.id >= 0) {
          axios.put('https://hidden-mesa-33270.herokuapp.com/api/name/' + this.name.id, {
            'name': this.name.name
          })
            .then(
              this.$emit('actionSuccess', 1)
            )
            .catch(
              (error) => {
                console.log(error)
              }
            )
        } else {
          axios.post('https://hidden-mesa-33270.herokuapp.com/api/name', {
            'name': this.name.name
          })
            .then(
              (response) => {
                this.$emit('actionSuccess', 2)
                this.name.id = response.data.name.id
              }
            )
            .catch(
              (error) => {
                console.log(error)
              }
            )
        }
        this.loading1 = false
        this.disabled = true
      },
      actionDelete () {
        this.loading2 = true
        if (this.name.id >= 0) {
          axios.delete('https://hidden-mesa-33270.herokuapp.com/api/name/' + this.name.id)
            .then(
              (response) => {
                console.log(response)
                this.loading2 = false
                this.$emit('deleted', this.name.id)
              }
            )
            .catch(
              (error) => {
                this.loading2 = false
                console.log(error)
              }
            )
        } else {
          this.loading2 = false
          this.$emit('deleted', this.name.id)
        }
      }
    }
  }
</script>

<style scoped>

</style>
