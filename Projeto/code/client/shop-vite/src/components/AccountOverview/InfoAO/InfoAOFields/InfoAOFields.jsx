import { React, useEffect, useState } from "react";

export default function InfoAOFields(props) {
  return (
    <form action='' className='containerInfoAOFieldsForm'>
      <label htmlFor='name'>Your Name:</label>
      <input type='text' readOnly={!props.editMode} />
      <label htmlFor='name'>Your Email:</label>
      <input type='text' readOnly={!props.editMode} />
      <label htmlFor='name'>Your Phone:</label>
      <input type='text' readOnly={!props.editMode} />
      <label htmlFor='name'>Your Fiscal Identifier:</label>
      <input type='text' readOnly={!props.editMode} />
      <label htmlFor='name'>Your Address:</label>
      <input type='text' readOnly={!props.editMode} />
    </form>
  );
}
