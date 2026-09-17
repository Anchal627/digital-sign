const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  console.log("Register data:", userData);

  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  console.log("Register response:", data);

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};
