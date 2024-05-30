module.exports =  { formatDate(createdAt) {
    const date = new Date(createdAt);
    return`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  }
}