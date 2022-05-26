import Loadable from "react-loadable";

export const Chat = Loadable({
  loader: () => import("./Chat"),
  loading: () => null,
  modules: ["Chat"],
});

export const CreateRoom = Loadable({
  loader: () => import("./CreateRoom"),
  loading: () => null,
  modules: ["CreateRoom"],
});

export const JoinRoom = Loadable({
  loader: () => import("./JoinRoom"),
  loading: () => null,
  modules: ["JoinRoom"],
});

export const Login = Loadable({
  loader: () => import("./Login"),
  loading: () => null,
  modules: ["Login"],
});
