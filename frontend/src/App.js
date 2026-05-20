import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const register = async () => {

  try {

    await axios.post(
      "http://127.0.0.1:8000/register",
      {
        email,
        password
      }
    );

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const loginResponse = await axios.post(
      "http://127.0.0.1:8000/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        }
      }
    );

    localStorage.setItem(
      "token",
      loginResponse.data.access_token
    );

    alert("Registration successful");

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert("Registration failed");

  }

};

  const login = async () => {

    try {

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );
      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Login successful");

      window.location.reload();

    } catch (error) {

      alert("Login failed");

    }

  };
  const fetchTasks = async () => {

  try {

    const response = await axios.get(
      "http://127.0.0.1:8000/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTasks(response.data);

  } catch (error) {

    console.log(error);

  }

};
  const fetchUsers = async () => {

  try {

    const response = await axios.get(
      "http://127.0.0.1:8000/admin/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setUsers(response.data);

  } catch (error) {

    console.log(error);
  }

};

  const createTask = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/tasks",
        {
          title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const completeTask = async (task) => {

    try {

      await axios.put(
        `http://127.0.0.1:8000/tasks/${task.id}`,
        {
          title: task.title,
          completed: !task.completed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  useEffect(() => {

    if (token) {

      fetchTasks();

      if (role === "admin") {

        fetchUsers();

  }

}

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333"
          }}
        >
          Task Manager
        </h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px"
          }}
        >

          <button
            onClick={register}
            style={{
              flex: 1,
              backgroundColor: "#52c41a",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
            Register
          </button>

          <button
            onClick={login}
            style={{
              flex: 1,
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );

}

  return (

  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7fb",
      padding: "40px",
      fontFamily: "Arial"
    }}
  >

    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <h1 style={{ color: "#333" }}>
          Task Dashboard
        </h1>

        <button
          onClick={logout}
          style={{
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={createTask}
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Add
        </button>

      </div>

      <div style={{ marginTop: "30px" }}>

        {tasks.length === 0 ? (

          <p>No tasks available</p>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <h3
                    style={{
                      margin: 0,
                      color: "#333"
                    }}
                  >
                    {task.title}
                  </h3>

                  <p
                    style={{
                      marginTop: "8px",
                      color:
                        task.completed
                          ? "green"
                          : "orange",
                      fontWeight: "bold"
                    }}
                  >

                    {task.completed
                      ? "Completed"
                      : "Pending"}

                  </p>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  {!task.completed && (

                    <button
                      onClick={() => completeTask(task)}
                      style={{
                        backgroundColor: "#52c41a",
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      Complete
                    </button>

                  )}

                  <button
                    onClick={() => {

                      const updatedTitle =
                        prompt(
                          "Update task title",
                          task.title
                        );

                      if (!updatedTitle) return;

                      axios.put(
                        `http://127.0.0.1:8000/tasks/${task.id}`,
                        {
                          title: updatedTitle,
                          completed: task.completed
                        },
                        {
                          headers: {
                            Authorization:
                              `Bearer ${token}`
                          }
                        }
                      )
                      .then(() => fetchTasks());

                    }}
                    style={{
                      backgroundColor: "#faad14",
                      color: "white",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

            </div>

      {role === "admin" && (

        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Admin Panel
          </h2>

          {users.map((user) => (

            <div
              key={user.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                borderBottom: "1px solid #ddd"
              }}
            >

              <strong>{user.email}</strong>

              <p>
                Role: {user.role}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

);

}

export default App;