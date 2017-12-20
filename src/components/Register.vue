
<template>
  <div>
    <form>
      <input type="email" name="id" placeholder="Email" v-model="email" required>
      <input type="text" name="id" placeholder="Username" v-model="username" required>
      <input type="password" name="password" placeholder="******" v-model="password" required>
      <button type="submit" @click.prevent="handleClick()">
        submit
      </button>
    </form>
    <p v-if="getRegisterError">{{ getRegisterError }}</p>
    <router-link to="/login">login</router-link>
  </div>
</template>

<script>
import constants from '../constants';

export default {
  name: 'Register',
  data() {
    return {
      password: '',
      username: '',
      email: '',
    };
  },
  methods: {
    /**
     * handle submit button click
     * @return {void}
     */
    handleClick() {
      const { password, username, email } = this;
      const details = {email, username, password, avatar: 'somehost@host.com'};
      this.$store.dispatch({
        type: constants.REGISTER,
        details,
      });
    },
  },
  computed: {
    getRegisterError() {
      return this.$store.getters["error/getRegisterError"]
    }
  }
};
</script>

<style></style>
