import { useParams } from "react-router-dom";
import { create, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

const initialStateValues = {
  isLoggedIn: false,
  token: "",
};

export const authStore = create()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        logOut: () => {
          set({
            ...initialStateValues,
          });
        },
        logIn: (payload) =>
          set({
            isLoggedIn: true,
            token: payload.token,
          }),
      }),
      {
        name: "auth-storage-client",
      }
    )
  )
);

export const getAuthState = () => {
  return authStore.getState();
};

// const [title, description] = useStore(
//   (state) => [state.title, state.description],
//   shallow
// );
