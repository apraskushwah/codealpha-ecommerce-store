const API = "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await fetch(`${API}/products`);
  const data = await response.json();
  return data;
};