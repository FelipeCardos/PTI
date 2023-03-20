export default function ProductionUnit(props) {
  return (
    <div className='productionUnit'>
      <div>{props.productionUnitName}</div>
      <div>{props.productionUnitLocation}</div>
    </div>
  );
}
