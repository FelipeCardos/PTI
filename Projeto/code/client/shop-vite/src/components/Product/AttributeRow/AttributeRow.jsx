import { React, useEffect, useState } from "react";
import "./AttributeRow.css";

export default function AttributeRow({ attribute }) {
  return (
    <tr className='containerProductProductAttributesInfoRow'>
      <td className='containerProductProductAttributesInfoRowTitle'>
        {attribute.title}
      </td>
      <td className='containerProductProductAttributesInfoRowData'>
        {attribute.content}
      </td>
    </tr>
  );
}
