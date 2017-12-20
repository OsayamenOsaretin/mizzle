<template>
  <div>
    <form>
      <input type="text" name="id" placeholder="Enter email or password" v-model="identification">
      <input type="password" name="password" placeholder="******" v-model="password">
      <button type="submit" @click.prevent="handleClick()">
        submit
      </button>
    </form>
    <p v-if="getLoginError">{{ getLoginError }}</p>
    <router-link to="/register">register</router-link>
    <router-link to="/passwordreset">forgot password?</router-link>
    <button type="submit" @click.prevent="googleSignIn()">
      Google
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import validator from 'validator'
import constants from '../constants';

export default {
  name: 'Login',

  data() {
    return {
      password: '',
      identification: '',
    };
  },

  computed: {
    /**
     * computes login error value
     * @return {String} error messages
     */
    getLoginError() {
      return this.$store.getters["error/getLoginError"];
    },
  },

  methods: {
    /**
     * handle submit button click
     * @return {void}
     */
    handleClick() {
      const { identification, password } = this;
      const details = validator.isEmail(identification) ? {
        email: identification,
        password
      } : {
        username: identification,
        password
      };
      this.$store.dispatch({
        type: constants.LOGIN,
        details
      });
    },

    /**
     * handle google sign in action 
     * @return {void}
     */
    googleSignIn() {
      console.log('log stuff to the console');
    }
  },
};
</script>

<style></style>
