const baseUrl = "http://localhost:5000";
//Register method.
export async function registerUser(userData) {
  return (
    await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
  ).json();
}
//log in method.....
export async function loginUser(userData) {
  return (
    await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
  ).json();
}
//Fetching user info.
export async function getUser() {
  return await (
    await fetch(baseUrl + "/auth/getUser", { credentials: "include" })
  ).json();
}
//Getting users active items.
export async function getUserActiveSells(id) {
  return (
    await fetch(`${baseUrl}/products/sells/active/${id}`, {
      credentials: "include",
    })
  ).json();
}
//Getting users archieved items
export async function getUserArchivedSells() {
  return (
    await fetch(`${baseUrl}/products/sells/archived`, {
      credentials: "include",
    })
  ).json();
}
//Gathers users wishlist.
export async function getUserWishlist() {
  return (
    await fetch(`${baseUrl}/products/wishlist/getWishlist`, {
      credentials: "include",
    })
  ).json();
}
//Editing profile information.
export async function editUserProfile(id, data) {
  return (
    await fetch(`/user/edit-profile/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
  ).json();
}
//Fetching uder info.
export async function getUserById(id) {
  return await (
    await fetch(baseUrl + `/user/getUserById/${id}`, { credentials: "include" })
  ).json();
}
