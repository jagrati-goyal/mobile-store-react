export function configureFakeBackend() {
  let users = [
    {
      id: 1,
      username: "admin",
      password: "nimda",
    },
    {
      id: 2,
      username: "test",
      password: "test",
    },
  ];

  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = users.filter((user) => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            // if login details are valid return user details
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            // else return error
            reject("Username or password is incorrect");
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    });
  };
}
