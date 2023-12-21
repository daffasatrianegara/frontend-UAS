import { instance } from "@/modules/axios";

const login = async (email, password) => {
  try {
    const response = await instance.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const register = async (
  email,
  password,
  username,
  phone_number,
  gender,
  place
) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
      username,
      phone_number,
      gender,
      place,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const addAdmin = async ({ email, password, username, phone_number }) => {
  try {
    const response = instance.post("/auth/add-admin", {
      email,
      password,
      username,
      phone_number,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getProfileById = async (id) => {
  try {
    const response = await instance.get(`/profile/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllDataUsers = async () => {
  try {
    const response = await instance.get("/admin/users");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllDataTodos = async () => {
  try {
    const response = await instance.get("/admin/todos");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const deleteUser = async (id) => {
  try {
    const response = await instance.delete(`/admin/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await instance.delete(`/admin/todo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getDataTodosByUserId = async (id) => {
  try {
    const response = await instance.get(`/todo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getDetailTodoById = async (id) => {
  try {
    const response = await instance.get(`/todo/detail/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const addTodo = async (id, todo, description) => {
  try {
    const response = await instance.post(`/todo/${id}`, { todo, description });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updateTodo = async (id, todo, description) => {
  try {
    const response = await instance.put(`/todo/update/${id}`, {
      todo,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updatePhoto = async (id, formData) => {
  try {
    const response = await instance.put(`/photo/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updateProfile = async (
  id,
  email,
  username,
  phone_number,
  gender,
  place
) => {
  try {
    const response = await instance.put(`/profile/${id}`, {
      email,
      username,
      phone_number,
      gender,
      place,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};



export {
  getProfileById,
  login,
  register,
  addAdmin,
  getAllDataUsers,
  getAllDataTodos,
  deleteUser,
  deleteTodo,
  getDataTodosByUserId,
  getDetailTodoById,
  addTodo,
  updateTodo,
  updatePhoto,
  updateProfile
};
