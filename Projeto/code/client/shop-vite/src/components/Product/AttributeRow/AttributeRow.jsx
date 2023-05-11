import { React, useEffect, useState } from "react";
import "./AttributeRow.css";

export default function AttributeRow(props) {
  const [attribute, setAttribute] = useState();
  console.log(props.attribute);

  useEffect(() => {
    setAttribute(props.attribute);
  }, [props.attribute]);
  return (
    <tr className='containerProductProductAttributesInfoRow'>
      <td className='containerProductProductAttributesInfoRowTitle'>
        {props.attribute ? props.attribute[0] : null}
      </td>
      <td className='containerProductProductAttributesInfoRowData'>
        {props.attribute ? props.attribute[1] : null}
      </td>
    </tr>
  );
}
