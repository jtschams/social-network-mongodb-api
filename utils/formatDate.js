module.exports =  { formatDate(createdAt) {
    const date = new Date(createdAt);
    return`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
}