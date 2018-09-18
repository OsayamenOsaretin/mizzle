<template>
  <div class="home">
    <login v-if="!authenticated" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import login from '../components/Login.vue';

const { mapGetters } = createNamespacedHelpers('account');
export default {
  name: 'Home',

  components: { login },

  computed: {
    ...mapGetters({
      authenticated: 'getAuthenticationState'
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
