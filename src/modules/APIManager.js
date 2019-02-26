const remoteURL = "http://localhost:8000/api/v1"

class APIManager {

  constructor(resource) {
    this.resource = resource
  }

  get(id) {
    return fetch(`${remoteURL}/${this.resource}/${id}`).then(data => data.json())
  }

  all() {
    return fetch(`${remoteURL}/${this.resource}/`).then(data => data.json())
  }

  post(item) {
    return fetch(`${remoteURL}/${this.resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(item)
    })
      .then(e => e.json())
  }

  delete(id) {
    return fetch(`${remoteURL}/${this.resource}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`${remoteURL}/${this.resource}`))
      .then(e => e.json())
  }
}

export default APIManager