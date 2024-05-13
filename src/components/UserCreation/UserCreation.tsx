import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./UserCreation.css";
import Navbar from "../../components/common/Navbar/Navbar";
import { IFormData } from "./UserCreationTypes";

export default function UserCreation() {
  const accessToken: string | null = localStorage.getItem("accessToken");

  const [userList, setUserList] = useState<IFormData[]>();
  const [formInputData, setFormInputData] = useState<IFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isValidData()) {
      await axios.post("http://localhost:8000/api/user", formInputData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: { data: any }) => {
        setUserList(response.data);
      });
  }, []);

  const isValidData = () => {
    return (
      formInputData.first_name.trim() !== "" &&
      formInputData.last_name.trim() !== "" &&
      formInputData.email.trim() !== "" &&
      formInputData.password.trim() !== "" &&
      formInputData.username.trim() !== ""
    );
  };

  const routeTo = (id: string) => {
    navigate(`/user-details/${id}`);
  };

  return (
    <div className="parent-container">
      <Navbar />
      <div className="main-container">
        <div className="container">
          <div className="title-container">
            <h2>User List</h2>
          </div>
          <div className="user-list-container">
            <ol>
              {userList?.map((user: IFormData, index: number) => (
                <li onClick={() => routeTo(user.id as string)} key={index}>
                  {user.first_name} {user.last_name}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="title-container">
            <h2>Create User</h2>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-items-container">
              <div className="label-wrapper">
                <label>First name</label>
                <label>Last name</label>
                <label>Email</label>
                <label>Username</label>
                <label>Password</label>
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setFormInputData({
                      ...formInputData,
                      first_name: event.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setFormInputData({
                      ...formInputData,
                      last_name: event.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  required
                  onChange={(event) =>
                    setFormInputData({
                      ...formInputData,
                      email: event.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setFormInputData({
                      ...formInputData,
                      username: event.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  required
                  onChange={(event) =>
                    setFormInputData({
                      ...formInputData,
                      password: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
