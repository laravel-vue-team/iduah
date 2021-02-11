export default function ({
  $axios,
  redirect,
  store
}) {
  $axios.setHeader("Content-Type", "application/json")
  $axios.setHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmFmMTAwZi1hMWRmLTQ2MTMtOTEwOS01MWQ3MDUyMGVjYzciLCJqdGkiOiI1MzRjOThkNWNkM2RhNmFhYTlmMWM2ZDVmOWZkZGU1OTg4NGJlYzM1OGQzOWIyODg3OGI3MWQ0MDY2NmJhMWNiYjI3Mzk0YzNlZGJhYmU4NyIsImlhdCI6IjE2MTI4MDU5MjAuNDk0NzgxIiwibmJmIjoiMTYxMjgwNTkyMC40OTQ3ODgiLCJleHAiOiIxNjQ0MzQxOTIwLjQ5MDU2NCIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.rIk44OcKeIM1lZ1ypZRnV-6rh8WTDt4_mK3PJqLqNGvZm4mb8UGowOt-MpxkiciPmw89eoc7O2D2Ogt4rVOIAbNOtfaMbImvD2cwjY9rkzGtfLizjoy1bdhGLvVDYJ-jdi9TiA0SocR4RhZ9Rjh8jFeCzUS7ghIfs_6DMAeai-UUVs9ewlCsZZqBnXBWXU6NZtqCrBbx892GTlzQCqdWg6LkJycPrLsGgFt4FqYZ8BfSz2q8e7x3cyI7FWHcBp8Cwz9kVI6mFR-vRiQyS6SnMt9Musevc7qu5J09lCjrHd4ozn4waY1CS8j6p0zMcVG1286UH0gPbAzbyE9TkDnPceEia3ioHpOryXqIiUrxxxzy4RzP20wdXotNE-obI6uh6nPQlUZqW4C1ljTxfiIHRAdS5j_jHOM4MSsv1sUcJYEe8E_J1DC1JB5qI6fjo0mMlAxLnARGwS9d1fgBhmgOs_42nobe_XVLInLt_PMyuld2kZCXcb3hsfEHiXW530iw4royncLBUx5tUaHFdgvsjsXNtelshdSHgCN1fq1sHhIPaO-onIT6jv2Dv3j-EZbEK8lxwGJ6wsSdmv9p2LfEGl5JTJway8N2yexHep-CF6CHOb9LCs58jLayopBaLWsIXA60vO6gwwoB4YV5w_zAwKSBVrUJKZsXwR9MoC5oWS8")
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'auth/setToken':
        $axios.setHeader("Authorization", mutation.payload ? mutation.payload : null);
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
