const baseApi = import.meta.env.VITE_BASE_API;
// console.log("base api " ,baseApi);


export const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/products`);
    
    if (res?.ok) {
      const data = await res.json();
      return  data;
    }
  } catch (error) {
    throw new Error(error?.message || "Error while fetching Products");
  }
};

export const updateProduct = async ({ id, data }) => {
  try {
    const res = await fetch(`${baseApi}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res?.ok) {
      const data = await res.json()   
      // console.log("updatedata ",data);
         
            return data;
    }
  } catch (error) {
    throw new Error(
      error?.message || `error when updating product data with id : ${id}`
    );
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${baseApi}/products/${id}`, { method: "DELETE" });
    if (res?.ok) {
      const data = await res.json()
            return data;
    }
  } catch (error) {
    throw new Error(
      error?.message || `Error when deleting product with id ${id}. try Again !`
    );
  }
};
