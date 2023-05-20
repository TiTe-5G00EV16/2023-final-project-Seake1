const baseUrl = "http://localhost:10000";
//Gathering all categories to all category.
export async function getAll(page, category, query) {
  if (query !== "" && query !== undefined) {
    return (
      await fetch(`${baseUrl}/products?page=${page}&search=${query}`, {
        credentials: "include",
      })
    ).json();
  } else if (category && category !== "all") {
    return (
      await fetch(`${baseUrl}/products/${category}?page=${page}`, {
        credentials: "include",
      })
    ).json();
  } else {
    return (
      await fetch(`${baseUrl}/products?page=${page}`, {
        credentials: "include",
      })
    ).json();
  }
}

export async function getSpecific(id) {
  return (
    await fetch(`${baseUrl}/products/specific/${id}`, {
      credentials: "include",
    })
  ).json();
}
//Creating new listing.
export async function createProduct(product) {
  return (
    await fetch(`${baseUrl}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}
//Editing product information
export async function editProduct(id, product) {
  return (
    await fetch(`${baseUrl}/products/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}
//Activating item from archieved list
export async function activateSell(id) {
  return (await fetch(`/products/enable/${id}`)).json();
}
//Archieving item
export async function archiveSell(id) {
  return (await fetch(`/products/archive/${id}`)).json();
}
//Wishlisting item.
export async function wishProduct(id) {
  return (
    await fetch(`${baseUrl}/products/wish/${id}`, { credentials: "include" })
  ).json();
}
