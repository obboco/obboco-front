import { User } from '@/types/User';
import { useStore } from 'vuex';
import { inject, watch } from 'vue';

export function useAuth() {
  const auth: any = inject('auth');

  const store = useStore();

  const setUser = (user: User) => {
    store.commit('auth/set', {
      given_name: auth.user.given_name,
      family_name: auth.user.family_name,
      picture: auth.user.picture,
      locale: auth.user.locale,
      email: auth.user.email
    } as User);
  };

  const removeUser = () => {
    store.commit('auth/remove');
  };

  const getUser = (): User => {
    return store.getters['auth/user'] as User;
  };

  const authUser = () => {
    watch(
      () => auth.user,
      () => {
        if (auth.user) {
          setUser(auth.user);
        } else {
          removeUser();
        }
      }
    );
  };

  return { authUser, getUser };
}
