<template>
  <div class="support-area">
    <aside class="support-sidebar">
      <h3>Users</h3>
      <ul v-for="room in rooms" :key="room.id">
        <li
          class="room"
          :class="[currentRoom && currentRoom.id === room.id ? 'active' : '']"
         @click="connectToRoom(room.id)"
        >
        {{ room.name }}
        </li>
      </ul>
    </aside>
    <section class="support-session">
      <header class="current-chat">
        <h3 v-if="currentRoom">{{ currentRoom.name }}</h3>
        <h3 v-else>Chat</h3>
      </header>
      <div class="chat-session">
        <div v-for="message in messages" :key="message.id">
          <span :class="[ message.senderId === currentUser.id ? 'support' :
          'user']" class="message">{{ message.text }}</span>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="message-form">
        <input
          class="message-input"
          autofocus
          placeholder="Compose your message and hit ENTER to send"
          v-model="newMessage"
          name="newMessage"
          />
      </form>
    </section>
  </div>
</template>

<script>
import { sendMessage, connectToRoom } from './methods';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

export default {
  name: 'Support',
  data() {
    return {
      newMessage: '',
      currentUser: null,
      currentRoom: null,
      rooms: [],
      messages: [],
    }
  },
  methods: {
    sendMessage,
    connectToRoom,
  },
  mounted() {
    const userId = 'support';

    axios
      .post('http://localhost:5200/users', { userId })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:5200/authenticate',
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: '<your chatkit instance locator>',
          userId,
          tokenProvider,
        });

        return chatManager
          .connect({
            onAddedToRoom: room => {
              this.rooms = [...this.rooms, room];
            },
          })
          .then(currentUser => {
            this.currentUser = currentUser;
            this.rooms = currentUser.rooms;
            if (this.rooms.length >= 1) {
              this.connectToRoom(this.rooms[0].id);
            }
          });
      })
      .catch(console.error);
  }
}
</script>

<style>
.support-area {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.support-sidebar {
  width: 20%;
  background-color: #300d4f;
  height: 100%;
}

.support-sidebar ul {
  list-style: none;
}

.support-sidebar h3 {
  color: white;
  margin-bottom: 0;
  text-align: left;
  padding: 10px 20px;
}

.room {
  font-size: 22px;
  color: white;
  cursor: pointer;
  text-align: left;
  padding: 10px 20px;
  margin-bottom: 10px;
}

.room:hover {
  color: yellowgreen;
}

.room.active {
  background-color: yellowgreen;
  color: white;
}

.support-session {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.current-chat {
  border-bottom: 1px solid #ccc;
  text-align: left;
  padding: 10px 20px;
  display: flex;
}

.current-chat h3 {
  margin-bottom: 0;
}

.chat-session {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}
</style>
