const chat = {
  type: 'dump',
  users: [],
  messages: [],

  addUser (item) {
    this.users.push(item)
  },

  removeUser (name) {
    this.users = this.users.filter(user => user.name !== name)
  },

  addMessage (item) {
    this.messages.push(item)
  }
}

module.exports = chat
