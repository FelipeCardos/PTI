let udata = {
  value: null,
  get() {
    return this.value;
  },
  set(value) {
    this.value = value;
  },
  apiGet() {
    axios
      .get("http://localhost:3000/api/v1/auth/user", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          udata.setUid(res.data.user);
        }
      });
  },
};

export default udata;
