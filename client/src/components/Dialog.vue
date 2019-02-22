<template>
  <div class="dialog-container">
    <div class="dialog">
      <form class="dialog-form" @submit.prevent="handleSubmit">
        <label class="username-label" for="username">
          What is your name?
        </label>
        <input
          id="username"
          class="username-input"
          autofocus
          type="text"
          name="userId"
          :value="username"
          @input="handleInput"
          />
        <button type="submit" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    username: String,
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-username', this.username);
    },
    handleInput(event) {
      const { name, value } = event.target;
      this.$emit('update-input', name, value);
    }
  }
}
</script>

<style scoped>
.dialog-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content:center;
  align-items: center;
}

.dialog {
  width: 500px;
  background-color: white;
  display: flex;
  align-items:  center;
}

.dialog-form {
  width: 100%;
  margin-bottom: 0;
  padding: 20px;
}

.dialog-form > * {
  display: block;
}

.username-label {
  text-align: left;
  font-size: 16px;
}

.username-input {
  width: 100%;
}

.submit-btn {
  width: 100%;
}

</style>
