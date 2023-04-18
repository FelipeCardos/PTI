let uid = {
  value: null,
  get() {
    return this.value;
  },
  set(value) {
    this.value = value;
  },
};

export default uid;
