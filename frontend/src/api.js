const API_URL = "http://localhost:5000/api";
// User Authentication
export const registerUser = async (userData) => {
  console.log(userData);
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = response.json();
  console.log(data);
  return data;
  // return response.json();
};
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};
