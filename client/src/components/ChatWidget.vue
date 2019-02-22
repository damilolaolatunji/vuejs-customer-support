<template>
  <div class="chat-widget">
    <header class="chat-header">
      <h2>Got Questions? Chat with us</h2>
    </header>
    <section class="chat-body">
      <div v-for="message in messages" :key="message.id">
        <span :class="[ message.senderId === currentUser.id ? 'user' :
        'support']" class="message">{{ message.text }}</span>
      </div>
    </section>

    <form @submit.prevent="handleSubmit" class="message-form">
      <input
        class="message-input"
        autofocus
        name="newMessage"
        placeholder="Compose your message and hit ENTER to send"
        :value="newMessage"
        @input="handleInput"
        />
    </form>
  </div>
</template>

<script>
export default {
  name: 'ChatWidget',
  props: {
    newMessage: String,
    messages: Array,
    currentUser: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    handleInput(event) {
      const { name, value } = event.target;
      this.$emit('update-input', name, value);
    },
    handleSubmit() {
      this.$emit('send-message');
    }
  }
}
</script>
