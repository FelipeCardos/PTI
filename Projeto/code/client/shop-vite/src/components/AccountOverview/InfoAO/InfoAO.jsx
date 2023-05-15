import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./InfoAO.css";

export default function InfoAO(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAccountEmail, setDeleteAccountEmail] = useState("");
  const [deleteAccountEmailCorrect, setDeleteAccountEmailCorrect] =
    useState(false);
  const [formDataAccount, setFormDataAccount] = useState({
    name: myUserVariable.name,
    email: myUserVariable.email,
    phone: myUserVariable.phone,
    fiscal_identifier: myUserVariable.fiscal_identifier,
    address: "",
  });
  const [formDataPassword, setFormDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDeleteAccountEmailCorrect(deleteAccountEmail === myUserVariable.email);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [deleteAccountEmail]);

  function handleEdit(event) {
    event.preventDefault();
    console.log(myUserVariable);
    console.log(formDataAccount);
    if (editMode) {
      async () => {
        //FALTA FORÇAR O LOGOUT E LOGIN PARA ATUALIZAR O CONTEXTO
        await axios.put(
          "http://localhost:3000/api/v1/users/" + myUserVariable.id,
          formDataAccount,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
      };
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
              name='name'
            />
            <label htmlFor='name'>Your Email:</label>
            <input
              type='text'
              readOnly={!editMode || !(myUserVariable.provider === "local")}
              value={formDataAccount.email}
              onChange={handleChangeDataAccount}
              name='email'
            />
            <label htmlFor='name'>Your Phone:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.phone}
              onChange={handleChangeDataAccount}
              name='phone'
            />
            <label htmlFor='name'>Your Fiscal Identifier:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.fiscal_identifier}
              onChange={handleChangeDataAccount}
              name='fiscal_identifier'
            />
            <label htmlFor='name'>Your Address:</label>
            <input
              type='text'
              readOnly={!editMode}
              value={formDataAccount.address}
              onChange={handleChangeDataAccount}
              name='address'
            />
          </form>
        </div>
        <div className='containerInfoAOButtons'>
          <button className='containerInfoAOEdit' onClick={handleEdit}>
            {editMode ? "Save" : "Edit"}
          </button>
          {myUserVariable.provider === "local" && (
            <button
              className='containerInfoAOChangePassword'
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          )}
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
                <strong> email</strong> below.
              </p>
              <label htmlFor='currentPassword'></label>
              <input
                type='text'
                id='currentPassword'
                name='currentPassword'
                value={deleteAccountEmail}
                onChange={(event) => setDeleteAccountEmail(event.target.value)}
              />
              <div className='containerInfoAOModalFormButtons'>
                <button
                  className='confirmDeleteAccount'
                  disabled={!deleteAccountEmailCorrect}
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
