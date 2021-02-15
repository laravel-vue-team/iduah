export default function ({ store, redirect }) {
  if (!store.getters["auth/isAuth"] && !store.getters["auth/isLoading"]) {
    return redirect('/login');
  }
}
