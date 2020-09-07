import router from "../router";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      checkBoxLembrarMe: true,
    };
  },
  methods: {
    async onSubmit() {
      try {
        let response = await axios.post("auth/login", this.login);
        localStorage.setItem("token", response.data.access_token);
        router.push("home");
      } catch {
        localStorage.removeItem("token");
        alert('Usuário ou senha inválidos!');
      }
    },

    onReset() {
      console.log("reset");
    },
  },
};