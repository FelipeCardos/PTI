import "./Footer.css";

export default function Footer(props) {
  return (
    <div className='footer-clean'>
      <footer>
        <div className='row justify-content-center'>
          <div className='col-sm-4 col-md-3 item'>
            <h3>About</h3>
            <ul>
              <li>
                <a href='#'>Company</a>
              </li>
              <li>
                <a href='#'>Team</a>
              </li>
              <li>
                <a href='#'>Legacy</a>
              </li>
            </ul>
          </div>
          <div className='col-lg-3 item social'>
            <a href='#'>
              <i className='fab fa-github' />
            </a>
            <p className='copyright'>LocalShop © 2023</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
