import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./PreviewLocalImpactReport.css";

export default function PreviewLocalImpactReport({
  handlePreviewLocalImpactReport,
}) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  return (
    <div className='containerPreviewLocalImpactReport'>
      <div className='containerPreviewLocalImpactReportTitle'>
        Preview Local Impact Report
      </div>
      <div className='containerPreviewLocalImpactReportCloseButton'>
        <button onClick={handlePreviewLocalImpactReport}>
          <i className='fa fa-times'></i>
        </button>
      </div>
    </div>
  );
}
