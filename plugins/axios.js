export default function ({
  $axios,
  redirect,
  store
}) {
  $axios.setHeader("Content-Type", "application/json")
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'auth/setToken':
        $axios.setHeader("Authorization", mutation.payload ? `Bearer ${mutation.payload}` : null);
        break;
    }
  });
  $axios.onError(error => {
    // take a message from back, to actions need authorization, then here display notification
    if (error.response && error.response.status === 500) {
      console.log("redirect to login page");
      redirect('/login')
    }
  })
}
