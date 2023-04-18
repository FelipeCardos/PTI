import axios from "axios";

let udata = {
  get() {
    async () => {
      await axios
        .get("http://localhost:3000/api/v1/auth/user", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data.user;
          }
        });
    };
  },
};

export default udata;
