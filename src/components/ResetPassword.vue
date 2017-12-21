<template>
  <div>
    <form>
      <input type="email" name="email" placeholder="Please Enter Email" v-model="email">
      <button type="submit" @click.prevent="handleClick()">
        submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',

  data() {
    return {
      email: ''
    };
  },

  methods: {
    /**
     * handles button click for reset password
     * @returns {void}
     */
    handleClick() {
      const { email  } = this;
      console.log('attempts to reset password', email);
    }
  }
}
</script>

<style></style>
