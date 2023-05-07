import axios from "axios";
import { React, useEffect, useState } from "react";
import "./InfoAO.css";
import InfoAOFields from "./InfoAOFields/InfoAOFields";

export default function InfoAO(props) {
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(deleteAccountPassword);
      // GET REQUEST IS INPUT PASSWORD IS CORRECT if request then setDeleteAccountPassword(true)
      setDeleteAccountPassword(deleteAccountPassword);
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

  function handleDeleteAccount() {
    props.toggleModal();
    setDeleteAccount(!deleteAccount);
  }

  return (
    <>
      <div className='containerInfoAO'>
        <div className='containerInfoAOTitle'>Account Information</div>
        <hr className='containerInfoAOHr' />
        <div className='containerInfoAOFields'>
          <InfoAOFields editMode={editMode} />
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
              <label htmlFor='currentPassword'></label>
              <input type='text' id='currentPassword' name='currentPassword' />
              <label htmlFor='newPassword'></label>
              <input type='text' id='newPassword' name='newPassword' />
            </form>
            <button
              className='cancelDeleteAccount'
              onClick={handleChangePassword}
            >
              CANCEL
            </button>
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
              <label htmlFor='currentPassword'></label>
              <input type='text' id='currentPassword' name='currentPassword' />
              <button
                className='confirmDeleteAccount'
                active={deleteAccountPassword}
              ></button>
            </form>
            <button
              className='cancelDeleteAccount'
              onClick={handleDeleteAccount}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}
