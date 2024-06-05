module.exports = (req, res) => {
  try {
    const routes = {
      "/api/users": {
        "/api/users": {
          get: {
            description: "Get all users.",
            requirements: {}
          },
          post: {
            description: "Create new user.",
            requirements: {
              body: {
                username: "string",
                email: "string"
              }
            }
          },
        },
        "/api/users/:userId": {
          get: {
            description: "Get one user by id.",
            requirements: {
              pathParameters: [ "userId" ]
            }
          },
          put: {
            description: "Edit User by Id.  Accepts one or both properties on body.",
            requirements: {
              pathParameters: [ "userId" ],
              body: {
                username: "string",
                email: "string"
              }
            }
          },
          delete: {
            description: "Delete user by id.  Deletes any thoughts created by user.  Removes user from all friend lists.",
            requirements: {
              pathParameters: [ "userId" ]
            }
          },
        },
        "/api/users/:userId/friends/:friendId": {
          post: {
            description: "Add two users to eachother's friend lists by id's.",
            requirements: {
              pathParameters: [ "userId", "friendId" ]
            }
          },
          delete: {
            description: "Remove two users from eachother's friend lists by id's.",
            requirements: {
              pathParameters: [ "userId", "friendId" ]
            }
          },
        },
      },
      "/api/thoughts": {
        "/api/thoughts": {
          get: {
            description: "Get all thoughts",
            requirements: {}
          },
          post: {
            description: "Create a new thought",
            requirements: {
              body: {
                thoughtText: "string",
                userId: "string"
              }
            }
          }
        },
        "/api/thoughts/:thoughtId": {
          get: {
            description: "Get one thought by id.",
            requirements: {
              pathParameters: [ "thoughtId" ]
            }
          },
          put: {
            description: "Edit thought by id.  Can accept one or both properties on body.",
            requirements: {
              pathParameters: [ "thoughtId" ],
              body: {
                thoughtText: "string",
                userId: "string"
              }
            }
          },
          delete: {
            description: "Delete thought by id.",
            requirements: {
              pathParameters: [ "thoughtId" ]
            }
          }
        },
        "/api/thoughts/:thoughtId/reactions": {
          post: {
            description: "Create an new reaction to a thought.",
            requirements: {
              pathParameters: [ "thoughtId" ],
              body: {
                userId: "string",
                reactionBody: "string"
              }
            }
          },
        },
        "/api/thoughts/:thoughtId/reactions/:reactionId": {
          get: {
            description: "Delete a reaction by id.",
            requirements: {
              pathParameters: [ "thoughtId", "reactionId" ]
            }
          },
        },
      }
    };
    return res.status(404).json(routes);
  } catch (err) {
    return res.status(500).json(err);
  }
}