import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./UserDetails.css";
import { IInfoMessage, IUserDetails, MessageType } from "./UserDetailsTypes";
import Navbar from "../common/Navbar/Navbar";

export default function UserDetails() {
  const { id } = useParams();
  const fileUploadRef = useRef<any>();
  const [profileImageURL, setProfileImageURL] = useState<string>();
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [errorMessage, setErrorMessage] = useState<IInfoMessage>();

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchUserImage();
    fetchUserDetails();
  }, []);

  const fileUploadForPreview = () => {
    const uploadedFile = fileUploadRef?.current?.files[0];
    const previewURL = URL.createObjectURL(uploadedFile);

    setProfileImageURL(previewURL);
  };

  const fetchUserDetails = () => {
    axios
      .get(`http://localhost:8000/api/user/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        setUserDetails(response.data);
      });
  };

  const fetchUserImage = async () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const response = (
      await fetch(`http://localhost:8000/api/user/${id}/image`, requestOptions)
    ).blob();
    const imageURL = URL.createObjectURL(await response);

    setProfileImageURL(imageURL);
  };

  const uploadImage = async () => {
    let formData = new FormData();

    setErrorMessage({ message: "", type: "INFO" });

    if (fileUploadRef?.current?.files[0]) {
      formData.append("file", fileUploadRef?.current?.files[0]);
    } else {
      setErrorMessage({ message: "Kindly choose an image.", type: "WARNING" });
      return;
    }

    await axios
      .post(`http://localhost:8000/api/user/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setErrorMessage({
          message: "Image uploaded successfully.",
          type: "SUCCESS",
        });
      })
      .catch(() => {
        setErrorMessage({
          message: "Upload failed due to an API error.",
          type: "ERROR",
        });
      });
  };

  const findClassName = () => {
    switch (errorMessage?.type) {
      case MessageType.Error:
        return "error";
      case MessageType.Success:
        return "success";
      case MessageType.Info:
        return "info";
      case MessageType.Warning:
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className="user-details-container">
      <Navbar />
      <h1 className="user-details-title">User details</h1>
      <div className="user-details-wrapper">
        <img
          src={profileImageURL}
          alt="user-image"
          className="user-profile-image"
        />
        <input
          type="file"
          ref={fileUploadRef}
          className="upload-profile-image"
          onChange={fileUploadForPreview}
        />
        <h1 className="user-full-name">
          {userDetails?.first_name} {userDetails?.last_name}
        </h1>
        <span className="user-email">{userDetails?.email}</span>
        <span className="user-name">{userDetails?.username}</span>
        <button className="upload-btn" onClick={uploadImage}>
          Upload Image
        </button>
        {errorMessage && errorMessage.message && (
          <span className={findClassName()}>{errorMessage.message}</span>
        )}
      </div>
    </div>
  );
}
