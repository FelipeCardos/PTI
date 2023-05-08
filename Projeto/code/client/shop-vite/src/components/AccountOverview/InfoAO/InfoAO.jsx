import axios from "axios";
import { React, useEffect, useState } from "react";
import "./InfoAO.css";

export default function InfoAO(props) {
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [deleteAccountPasswordCorrect, setDeleteAccountPasswordCorrect] =
    useState(false);
  const [formDataAccount, setFormDataAccount] = useState({
    name: "",
    email: "",
    phone: "",
    fiscal_identifier: "",
    address: "",
  });
  const [formDataPassword, setFormDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(deleteAccountPassword);
      // Send the inputted password to the backend to check if it is correct
      setDeleteAccountPasswordCorrect(deleteAccountPassword === "1234");
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [deleteAccountPassword]);

  function handleEdit(event) {
    event.preventDefault();
    if (editMode) {
      //POST REQUEST TO UPDATE USER INFO IN DATABASE USING AXIOS
    }
    setEditMode(!editMode);
  }

  function handleChangePassword() {
    props.toggleModal();
    setChangePassword(!changePassword);
  }

  function handleChangePasswordConfirm() {
    event.preventDefault();
    //POST REQUEST TO CHANGE USER PASSWORD IN DATABASE USING AXIOS
  }

  function handleDeleteAccount() {
    props.toggleModal();
    setDeleteAccount(!deleteAccount);
  }

  function handleDeleteAccountConfirmation() {
    event.preventDefault();
    console.log("ola");
    //DELETE REQUEST TO DELETE USER ACCOUNT IN DATABASE USING AXIOS
  }

  function handleChangeDataAccount(event) {
    const { name, value } = event.target;
    setFormDataAccount((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleChangeDataPassword(event) {
    const { name, value } = event.target;
    setFormDataPassword((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className='containerInfoAO'>
        <div className='containerInfoAOTitle'>Account Information</div>
        <hr className='containerInfoAOHr' />
        <div className='containerInfoAOFields'>
          <form action='' className='containerInfoAOFieldsForm'>
            <label htmlFor='name'>Your Name:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.name}
              onChange={handleChangeDataAccount}
            />
            <label htmlFor='name'>Your Email:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.email}
              onChange={handleChangeDataAccount}
            />
            <label htmlFor='name'>Your Phone:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.phone}
              onChange={handleChangeDataAccount}
            />
            <label htmlFor='name'>Your Fiscal Identifier:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.fiscal_identifier}
              onChange={handleChangeDataAccount}
            />
            <label htmlFor='name'>Your Address:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.address}
              onChange={handleChangeDataAccount}
            />
          </form>
        </div>
        <div className='containerInfoAOButtons'>
          <button className='containerInfoAOEdit' onClick={handleEdit}>
            {editMode ? "Save" : "Edit"}
          </button>
          <button
            className='containerInfoAOChangePassword'
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <button
            className='containerInfoAODeleteAccount'
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
      {changePassword && (
        <div className='containerInfoAOChangePasswordModal'>
          <div className='containerInfoAOChangePasswordModalTitle'>
            Change Password
          </div>
          <hr className='containerInfoAOChangePasswordModalHr' />
          <div className='containerInfoAOChangePasswordModalFields'>
            <form action='' className='containerInfoAOChangePasswordForm'>
              <label htmlFor='currentPassword'>Current Password:</label>
              <input
                type='text'
                id='currentPassword'
                name='currentPassword'
                value={formDataPassword.currentPassword}
                onChange={handleChangeDataPassword}
              />
              <label htmlFor='newPassword'>New Password:</label>
              <input
                type='text'
                id='newPassword'
                name='newPassword'
                value={formDataPassword.newPassword}
                onChange={handleChangeDataPassword}
              />
              <div className='containerInfoAOModalFormButtons'>
                <button
                  className='confirmChangePassword'
                  onClick={handleChangePasswordConfirm}
                >
                  CONFIRM
                </button>
                <button
                  className='cancelChangePassword'
                  onClick={handleChangePassword}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteAccount && (
        <div className='containerInfoAODeleteAccountModal'>
          <div className='containerInfoAODeleteAccountModalTitle'>
            Delete Account
          </div>
          <hr className='containerInfoAODeleteAccountModalHr' />
          <div className='containerInfoAODeleteAccountModalFields'>
            <form action='' className='containerInfoAODeleteAccountForm'>
              <p className='containerInfoAODeleteAccountFormParagraph'>
                Are you sure you want to delete your account? This action cannot
                be undone. In order to delete your account, please type your
                password below.
              </p>
              <label htmlFor='currentPassword'></label>
              <input
                type='text'
                id='currentPassword'
                name='currentPassword'
                value={deleteAccountPassword}
                onChange={(event) =>
                  setDeleteAccountPassword(event.target.value)
                }
              />
              <div className='containerInfoAOModalFormButtons'>
                <button
                  className='confirmDeleteAccount'
                  disabled={!deleteAccountPasswordCorrect}
                  onClick={handleDeleteAccountConfirmation}
                >
                  DELETE
                </button>
                <button
                  className='cancelDeleteAccount'
                  onClick={handleDeleteAccount}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
