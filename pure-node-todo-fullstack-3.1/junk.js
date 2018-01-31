Utils.redirectSingleResponse = (id) => {
  return Promise.resolve(Object.assign({}, {
    header: {
      code: 302,
      type: 'text/html',
      message: 'Redirect',
      redirect: `/${id}`
    }
  }))
}
