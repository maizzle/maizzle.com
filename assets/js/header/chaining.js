const classList = element => {
  if (element !== undefined) {
    const list = element.classList

    return {
      toggleClass: function (c) { list.toggle(c); return this },
      addClass: function (c) { list.add(c); return this },
      removeClass: function (c) { list.remove(c); return this }
    }
  }
}

export default classList