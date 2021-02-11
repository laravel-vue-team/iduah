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
  })
  $axios.onError(error => {
    if (error.response && error.response.status === 500) {
      console.log("redirect to login page");
      redirect('/login')
    }
  })
}
