import { React, useEffect, useState } from "react";
import "./AttributeRow.css";

export default function AttributeRow() {
  return (
    <tr className='containerProductProductAttributesInfoRow'>
      <td className='containerProductProductAttributesInfoRowTitle'>title</td>
      <td className='containerProductProductAttributesInfoRowData'>data</td>
    </tr>
  );
}
