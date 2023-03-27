export default function Product(props) {
  return (
    <div className='product'>
      <img src={props.productImage} alt='' />
      <div>
        <div>{props.productName}</div>
        <div>{props.productPrice}</div>
        <div>{props.productStock}</div>
        <div>
          {Array.from({ length: props.productRating }, (_, index) => {
            return <span className='fa fa-star'></span>;
          })}
        </div>
      </div>
    </div>
  );
}
