<template>
  <div class="customer-chat">
    <h1>Customer Service</h1>
    <p>
      Customers can interact with support using the chat widget in the
      bottom right corner
    </p>

    <ChatWidget
      v-if="currentUser"
      :newMessage="newMessage"
      :currentUser="currentUser"
      :messages="messages"
      @send-message="sendMessage"
      @update-input="handleInput"
      />

    <button v-else @click="showDialog" class="contact-btn">
      Contact Support
    </button>

    <Spinner v-if="isLoading" name="three-bounce" color="#300d4f" />

    <Dialog
      v-if="isDialogOpen"
      :username="userId"
      @update-input="handleInput"
      @submit-username="launchChat"
      />
  </div>
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'
import Dialog from './components/Dialog.vue';
import Spinner from 'vue-spinkit'
import { sendMessage, showDialog, launchChat, createRoom, addSupportStaffToRoom,
connectToRoom, handleInput } from './methods.js';

export default {
  name: 'Customer',
  components: {
    Dialog,
    ChatWidget,
    Spinner,
  },
  data() {
    return {
      title: 'Customer Support',
      userId: '',
      currentUser: null,
      currentRoom: null,
      newMessage: '',
      messages: [],
      isDialogOpen: false,
      isLoading: false,
    }
  },
  methods: {
    sendMessage,
    showDialog,
    handleInput,
    launchChat,
    createRoom,
    addSupportStaffToRoom,
    connectToRoom,
  }
}
</script>
