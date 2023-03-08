export default function Footer(props) {
  return (
    <footer id='footer-widget'>
      <div
        data-bi-placement='Footer_Responsive'
        className='container-fluid fixed-container'
      >
        <div className='footer-input-boxes'>
          <div className='row gutter'>
            <div className='col-xl-2 visible-xl-block'>
              <div className='h5-style-guide'>Customer Service</div>
              <div className='get-help'>
                <a href='https://customerservice.costco.com/'>
                  <span>Get Help</span>
                </a>
              </div>
            </div>
            <div
              className='col-md-6 col-xl-3 hidden-xs hidden-sm'
              id='footer-find-warehouse-block'
            >
              <label htmlFor='footer-search-field' className='control-label'>
                Find a Warehouse
              </label>
              <form
                id='WarehouseSearchForm'
                action='/warehouse-locations'
                noValidate='novalidate'
                className='form-group'
              >
                <div className='input-group'>
                  <input
                    id='footer-search-field'
                    type='search'
                    name='location'
                    className='form-control'
                    placeholder='City, state or zip'
                    defaultValue
                    title='enter city, state or zip'
                  />
                  <span className='input-group-btn'>
                    <button className='btn search-ico-button' type='submit'>
                      <i className='co-search-thin' aria-hidden='true' />
                      <span className='offscreen'>Find warehouse</span>
                    </button>
                  </span>
                  <input
                    type='submit'
                    id='searchClear'
                    className='hide'
                    defaultValue='Clear'
                    style={{}}
                  />
                  <input
                    type='hidden'
                    id='fromWLocSubmit'
                    name='fromWLocSubmit'
                    defaultValue='true'
                  />
                  <input
                    type='hidden'
                    id='numOfWarehouses'
                    name='numOfWarehouses'
                    defaultValue={10}
                  />
                </div>
              </form>
            </div>
            <div className='col-md-6 col-xl-3' id='footer-email-offers-block'>
              <label htmlFor='footer-email-offers'>Get Email Offers</label>
              <form
                title
                action='/EmailSubscription'
                className='validate'
                id='EmailOffersForm'
                onsubmit='event.preventDefault(); COSTCO.util.signupFormValidation(this);'
              >
                <div className='input-group'>
                  <input
                    type='text'
                    name='emailSignUp'
                    id='footer-email-offers'
                    className='form-control'
                    placeholder='Enter your email'
                    title='enter email address'
                  />
                  <span className='input-group-btn'>
                    <button className='btn btn-primary' type='submit'>
                      Go
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className='col-xl-2 visible-xl-block'>
              <div className='h5-style-guide'>Follow Us</div>
              <ul className='social-icons old-pdp'>
                <li>
                  <a href='//www.facebook.com/costco' className='external'>
                    {" "}
                    <img
                      alt='Facebook'
                      src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-facebook.svg'
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href='//www.pinterest.com/costco' className='external'>
                    {" "}
                    <img
                      alt='Pinterest'
                      src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-pinterest.svg'
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href='//www.instagram.com/Costco/' className='external'>
                    {" "}
                    <img
                      alt='Instagram'
                      src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-instagram.svg'
                    />{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-xl-2 visible-xl-block'>
              <div className='h5-style-guide'>Get the Costco App</div>
              <ul className='social-icons old-pdp'>
                <li>
                  <a href='/costco-app.html'>
                    {" "}
                    <img
                      alt='Costco app'
                      src='https://mobilecontent.costco.com/live/resource/img/static-folder-app-icon/app-icon.png'
                    />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id='footer-list' className='hidden-xs hidden-sm'>
          <div className='footer-items row gutter'>
            <div className='col-sm-3 col-md-3'>
              <ul className='footer-list'>
                <li className='footer-column-title'>
                  <a href='/about.html'>About Us</a>
                </li>
                <li className='visible-xs visible-sm'>
                  <a href='/about.html'>Get To Know Costco</a>
                </li>
                <li>
                  <a href='/charitable-giving.html'>Charitable Contributions</a>
                </li>
                <li>
                  <a href='/company-information.html'>Company Information</a>
                </li>
                <li>
                  <a href='/sustainability-introduction.html'>
                    Sustainability Commitment
                  </a>
                </li>
                <li>
                  <a
                    href='http://phx.corporate-ir.net/phoenix.zhtml?c=83830&p=irol-irhome&cm_re=1_en-_-Bottom_Nav-_-Bottom_investor&lang=en-US'
                    className='external'
                  >
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href='/jobs.html'>Jobs</a>
                </li>
                <li>
                  <a href='/kirkland-signature.html'>Kirkland Signature</a>
                </li>
                <li>
                  <a href='/logo-media-requests.html'>
                    Logo and Media Requests
                  </a>
                </li>
                <li>
                  <a href='https://video.costco.com/c/category/all/'>
                    Product Videos
                  </a>
                </li>
                <li>
                  <a href='/costco-connection-online-edition.html'>
                    The Costco Connection
                  </a>
                </li>
                <li>
                  <a href='/quick-and-easy-recipe-videos.html'>
                    Quick &amp; Easy Recipe Videos
                  </a>
                </li>
                <li>
                  <a href='/my-life.html'>Costco Blog</a>
                </li>
                <li>
                  <a href='/employee-website.html'>Employee Site</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-3 col-md-3'>
              <ul className='footer-list membership'>
                <li className='footer-column-title'>
                  <a href='/membership-information.html'>Membership</a>
                </li>
                <li>
                  <a href='/join-costco.html'>Join Now</a>
                </li>
                <li>
                  <a href='/member-privileges-conditions.html'>
                    Member Privileges
                  </a>
                </li>
                <li>
                  <a href='/executive-rewards.html'>
                    Executive Membership Terms
                  </a>
                </li>
                <li>
                  <a href='/LogonForm?langId=-1&storeId=10301&catalogId=10701'>
                    Sign In or Register
                  </a>
                </li>
                <li>
                  <a href='/credit-card.html'>Credit Card</a>
                </li>
              </ul>
              <ul className='footer-list'>
                <li className='footer-column-title'>
                  <a href='/vendor-inquiries.html'>Vendors &amp; Suppliers</a>
                </li>
                <li className='visible-xs visible-sm'>
                  <a href='/vendor-inquiries.html'>Vendor Inquiries</a>
                </li>
                <li>
                  <a href='/disclosure-regarding-human-trafficking-and-anti-slavery.html'>
                    Supply Chain Disclosure
                  </a>
                </li>
                <li>
                  <a href='/confidential-ethics-hotline-for-suppliers.html'>
                    Ethics Hotline for Suppliers
                  </a>
                </li>
                <li>
                  <a href='/supplier-diversity.html'>Supplier Diversity</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-3 col-md-3'>
              <ul className='footer-list'>
                <li className='footer-column-title'>
                  <a href='https://customerservice.costco.com/'>
                    Customer Service
                  </a>
                </li>
                <li className='visible-xs visible-sm'>
                  <a href='https://customerservice.costco.com/'>
                    Costco Customer Service
                  </a>
                </li>
                <li>
                  <a href='/costco-shop-card'>Costco Shop Card Balance</a>
                </li>
                <li>
                  <a href='/OrderByItemsDisplayView?storeId=10301&catalogId=10701&langId=-1&fromPage=OrderByItemsDisplayView'>
                    Order By Item Number
                  </a>
                </li>
                <li>
                  <a href='/concierge.html'>
                    Concierge Tech Support &amp; Warranty
                  </a>
                </li>
                <li>
                  <a href='/buy-in-bulk.html'>
                    Export &amp; Domestic Volume Sales
                  </a>
                </li>
                <li>
                  <a href='/OrderStatusCmd?storeId=10301&catalogId=10701&langId=-1&orderStatusStyle=strong&URL=OrderStatusSummaryView&cm_re=Common-_-Footer-_-Order_Status'>
                    Order Status
                  </a>
                </li>
                <li>
                  <a href='/fraud-prevention.html'>Preventing Fraud</a>
                </li>
                <li>
                  <a href='https://customerservice.costco.com/app/answers/list/p/281'>
                    Shipping
                  </a>
                </li>
                <li>
                  <a href='/rebates.html'>Rebates</a>
                </li>
                <li>
                  <a href='/recalls.html'>Recalls &amp; Product Notices</a>
                </li>
                <li>
                  <a href='https://customerservice.costco.com/app/answers/list/p/285;288;297'>
                    Returns and Exchanges
                  </a>
                </li>
                <li>
                  <a href='https://customerservice.costco.com/app/answers/detail/a_id/1191'>
                    Returns Policy
                  </a>
                </li>
                <li>
                  <a href='/accessibility.html'>Accessibility</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-3 col-md-3'>
              <ul className='footer-list'>
                <li className='footer-column-title'>
                  Locations &amp; Services
                </li>
                <li>
                  <a href='/warehouse-locations?langId=-1&storeId=10301&catalogId=10701'>
                    Find a Warehouse
                  </a>
                </li>
                <li>
                  <a href='/new-locations.html'>Locations Coming Soon</a>
                </li>
                <li>
                  <a href='/hours-and-holiday-closures.html'>
                    Hours and Holiday Closures
                  </a>
                </li>
                <li>
                  <a href='/gasoline.html'>Gasoline</a>
                </li>
                <li>
                  <a href='/hearing-aid-center.html'>Hearing Aid Center</a>
                </li>
                <li>
                  <a href='/optical.html'>Optical</a>
                </li>
                <li>
                  <a href='/special-events.html'>Special Events</a>
                </li>
                <li>
                  <a href='/grocery-household.html'>CostcoGrocery</a>
                </li>
                <li>
                  <a
                    href='https://sameday.costco.com?zipcode=98101'
                    target='_blank'
                  >
                    Grocery by Instacart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Start FooterAccordion.jspf */}
        <div
          className='accordion panel-group visible-xs-block visible-sm-block'
          id='accordion-footer'
          role='tablist'
          aria-multiselectable='true'
        >
          <div className='panel panel-default'>
            <div
              className='panel-heading collapsed'
              role='tab'
              id='heading-1'
              data-toggle='collapse'
              data-parent='#accordion-footer'
              href='#collapse-1'
              aria-expanded='false'
              aria-controls='collapse-1'
            >
              <p className='panel-title'>
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  data-parent='#accordion-footer'
                  href='#collapse-1'
                  aria-expanded='false'
                  aria-controls='collapse-1'
                >
                  About Us
                </a>
              </p>
            </div>
            <div
              id='collapse-1'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='heading-1'
            >
              <div className='panel-body'>
                <ul className='footer-list'>
                  <li className='footer-column-title'>
                    <a href='/about.html'>About Us</a>
                  </li>
                  <li className='visible-xs visible-sm'>
                    <a href='/about.html'>Get To Know Costco</a>
                  </li>
                  <li>
                    <a href='/charitable-giving.html'>
                      Charitable Contributions
                    </a>
                  </li>
                  <li>
                    <a href='/company-information.html'>Company Information</a>
                  </li>
                  <li>
                    <a href='/sustainability-introduction.html'>
                      Sustainability Commitment
                    </a>
                  </li>
                  <li>
                    <a
                      href='http://phx.corporate-ir.net/phoenix.zhtml?c=83830&p=irol-irhome&cm_re=1_en-_-Bottom_Nav-_-Bottom_investor&lang=en-US'
                      className='external'
                    >
                      Investor Relations
                    </a>
                  </li>
                  <li>
                    <a href='/jobs.html'>Jobs</a>
                  </li>
                  <li>
                    <a href='/kirkland-signature.html'>Kirkland Signature</a>
                  </li>
                  <li>
                    <a href='/logo-media-requests.html'>
                      Logo and Media Requests
                    </a>
                  </li>
                  <li>
                    <a href='https://video.costco.com/c/category/all/'>
                      Product Videos
                    </a>
                  </li>
                  <li>
                    <a href='/costco-connection-online-edition.html'>
                      The Costco Connection
                    </a>
                  </li>
                  <li>
                    <a href='/quick-and-easy-recipe-videos.html'>
                      Quick &amp; Easy Recipe Videos
                    </a>
                  </li>
                  <li>
                    <a href='/my-life.html'>Costco Blog</a>
                  </li>
                  <li>
                    <a href='/employee-website.html'>Employee Site</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='panel panel-default'>
            <div
              className='panel-heading collapsed'
              role='tab'
              id='heading-2'
              data-toggle='collapse'
              data-parent='#accordion-footer'
              href='#collapse-2'
              aria-expanded='false'
              aria-controls='collapse-2'
            >
              <p className='panel-title'>
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  data-parent='#accordion-footer'
                  href='#collapse-2'
                  aria-expanded='false'
                  aria-controls='collapse-2'
                >
                  Membership
                </a>
              </p>
            </div>
            <div
              id='collapse-2'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='heading-2'
            >
              <div className='panel-body'>
                <ul className='footer-list membership'>
                  <li className='footer-column-title'>
                    <a href='/membership-information.html'>Membership</a>
                  </li>
                  <li>
                    <a href='/join-costco.html'>Join Now</a>
                  </li>
                  <li>
                    <a href='/member-privileges-conditions.html'>
                      Member Privileges
                    </a>
                  </li>
                  <li>
                    <a href='/executive-rewards.html'>
                      Executive Membership Terms
                    </a>
                  </li>
                  <li>
                    <a href='/LogonForm?langId=-1&storeId=10301&catalogId=10701'>
                      Sign In or Register
                    </a>
                  </li>
                  <li>
                    <a href='/credit-card.html'>Credit Card</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='panel panel-default'>
            <div
              className='panel-heading collapsed'
              role='tab'
              id='heading-3'
              data-toggle='collapse'
              data-parent='#accordion-footer'
              href='#collapse-3'
              aria-expanded='false'
              aria-controls='collapse-3'
            >
              <p className='panel-title'>
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  data-parent='#accordion-footer'
                  href='#collapse-3'
                  aria-expanded='false'
                  aria-controls='collapse-3'
                >
                  {" "}
                  Vendors &amp; Suppliers
                </a>
              </p>
            </div>
            <div
              id='collapse-3'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='heading-3'
            >
              <div className='panel-body'>
                <ul className='footer-list'>
                  <li className='footer-column-title'>
                    <a href='/vendor-inquiries.html'>Vendors &amp; Suppliers</a>
                  </li>
                  <li className='visible-xs visible-sm'>
                    <a href='/vendor-inquiries.html'>Vendor Inquiries</a>
                  </li>
                  <li>
                    <a href='/disclosure-regarding-human-trafficking-and-anti-slavery.html'>
                      Supply Chain Disclosure
                    </a>
                  </li>
                  <li>
                    <a href='/confidential-ethics-hotline-for-suppliers.html'>
                      Ethics Hotline for Suppliers
                    </a>
                  </li>
                  <li>
                    <a href='/supplier-diversity.html'>Supplier Diversity</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='panel panel-default'>
            <div
              className='panel-heading collapsed'
              role='tab'
              id='heading-4'
              data-toggle='collapse'
              data-parent='#accordion-footer'
              href='#collapse-4'
              aria-expanded='false'
              aria-controls='collapse-4'
            >
              <p className='panel-title'>
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  data-parent='#accordion-footer'
                  href='#collapse-4'
                  aria-expanded='false'
                  aria-controls='collapse-4'
                >
                  Customer Service
                </a>
              </p>
            </div>
            <div
              id='collapse-4'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='heading-4'
            >
              <div className='panel-body'>
                <ul className='footer-list'>
                  <li className='footer-column-title'>
                    <a href='https://customerservice.costco.com/'>
                      Customer Service
                    </a>
                  </li>
                  <li className='visible-xs visible-sm'>
                    <a href='https://customerservice.costco.com/'>
                      Costco Customer Service
                    </a>
                  </li>
                  <li>
                    <a href='/costco-shop-card'>Costco Shop Card Balance</a>
                  </li>
                  <li>
                    <a href='/OrderByItemsDisplayView?storeId=10301&catalogId=10701&langId=-1&fromPage=OrderByItemsDisplayView'>
                      Order By Item Number
                    </a>
                  </li>
                  <li>
                    <a href='/concierge.html'>
                      Concierge Tech Support &amp; Warranty
                    </a>
                  </li>
                  <li>
                    <a href='/buy-in-bulk.html'>
                      Export &amp; Domestic Volume Sales
                    </a>
                  </li>
                  <li>
                    <a href='/OrderStatusCmd?storeId=10301&catalogId=10701&langId=-1&orderStatusStyle=strong&URL=OrderStatusSummaryView&cm_re=Common-_-Footer-_-Order_Status'>
                      Order Status
                    </a>
                  </li>
                  <li>
                    <a href='/fraud-prevention.html'>Preventing Fraud</a>
                  </li>
                  <li>
                    <a href='https://customerservice.costco.com/app/answers/list/p/281'>
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href='/rebates.html'>Rebates</a>
                  </li>
                  <li>
                    <a href='/recalls.html'>Recalls &amp; Product Notices</a>
                  </li>
                  <li>
                    <a href='https://customerservice.costco.com/app/answers/list/p/285;288;297'>
                      Returns and Exchanges
                    </a>
                  </li>
                  <li>
                    <a href='https://customerservice.costco.com/app/answers/detail/a_id/1191'>
                      Returns Policy
                    </a>
                  </li>
                  <li>
                    <a href='/accessibility.html'>Accessibility</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='panel panel-default'>
            <div
              className='panel-heading collapsed'
              role='tab'
              id='heading-5'
              data-toggle='collapse'
              data-parent='#accordion-footer'
              href='#collapse-5'
              aria-expanded='false'
              aria-controls='collapse-5'
            >
              <p className='panel-title'>
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  data-parent='#accordion-footer'
                  href='#collapse-5'
                  aria-expanded='false'
                  aria-controls='collapse-5'
                >
                  Locations &amp; Services
                </a>
              </p>
            </div>
            <div
              id='collapse-5'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='heading-5'
            >
              <div className='panel-body'>
                <ul className='footer-list'>
                  <li className='footer-column-title'>
                    Locations &amp; Services
                  </li>
                  <li>
                    <a href='/warehouse-locations?langId=-1&storeId=10301&catalogId=10701'>
                      Find a Warehouse
                    </a>
                  </li>
                  <li>
                    <a href='/new-locations.html'>Locations Coming Soon</a>
                  </li>
                  <li>
                    <a href='/hours-and-holiday-closures.html'>
                      Hours and Holiday Closures
                    </a>
                  </li>
                  <li>
                    <a href='/gasoline.html'>Gasoline</a>
                  </li>
                  <li>
                    <a href='/hearing-aid-center.html'>Hearing Aid Center</a>
                  </li>
                  <li>
                    <a href='/optical.html'>Optical</a>
                  </li>
                  <li>
                    <a href='/special-events.html'>Special Events</a>
                  </li>
                  <li>
                    <a href='/grocery-household.html'>CostcoGrocery</a>
                  </li>
                  <li>
                    <a
                      href='https://sameday.costco.com?zipcode=98101'
                      target='_blank'
                    >
                      Grocery by Instacart
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='panel panel-default' id='footer-country-select'>
            {" "}
            <div
              className='panel-heading collapsed'
              role='tab'
              id='accordion-footer_heading-6'
              data-toggle='collapse'
              href='#accordion-footer_collapse-6'
              aria-expanded='false'
              aria-controls='accordion-footer_collapse-6'
            >
              {" "}
              <p className='panel-title'>
                {" "}
                <a
                  className='collapsed'
                  role='button'
                  data-toggle='collapse'
                  href='#accordion-footer_collapse-6'
                  aria-expanded='false'
                  aria-controls='accordion-footer_collapse-6'
                >
                  {" "}
                  United States{" "}
                </a>{" "}
              </p>{" "}
            </div>{" "}
            <div
              id='accordion-footer_collapse-6'
              className='panel-collapse collapse'
              role='tabpanel'
              aria-labelledby='accordion-footer_heading-6'
            >
              {" "}
              <div className='panel-body'>
                {" "}
                <div className='footer-flags'>
                  <div className='country-select-instruction'>
                    Select country/region:
                  </div>
                  <ul>
                    <li data-selected='true'>
                      <a
                        href='https://www.costco.com'
                        onclick='COSTCO.util.checkSsoLogin(this);'
                      >
                        United States
                      </a>
                    </li>
                    <li data-selected='false'>
                      <a
                        href='https://www.costco.ca'
                        onclick='COSTCO.util.checkSsoLogin(this);'
                      >
                        Canada
                      </a>
                    </li>
                    <li>
                      <a href='https://www.costco.co.uk'>United Kingdom</a>
                    </li>
                    <li>
                      <a href='https://www.costco.com.mx'>Mexico</a>
                    </li>
                    <li>
                      <a href='https://www.costco.co.kr'>South Korea</a>
                    </li>
                    <li>
                      <a href='https://www.costco.com.tw'>Taiwan</a>
                    </li>
                    <li>
                      <a href='https://www.costco.co.jp'>Japan</a>
                    </li>
                    <li>
                      <a href='https://www.costco.com.au'>Australia</a>
                    </li>
                    <li>
                      <a href='https://www.costco.is'>Iceland</a>
                    </li>
                    <li>
                      <a href='https://www.costco.fr'>France</a>
                    </li>
                    <li>
                      <a href='https://www.costco.es'>Spain</a>
                    </li>
                    <li>
                      <a href='https://www.costco.co.nz'>New Zealand</a>
                    </li>
                    <li>
                      <a href='https://www.costco.se' className='external'>
                        Sweden
                      </a>
                    </li>
                  </ul>
                </div>{" "}
              </div>{" "}
            </div>
          </div>{" "}
        </div>
        {/* End FooterAccordion.jspf */}
        <div id='footer-bottom' className='text-center'>
          <ul className='links'>
            <li>
              <a href='/SiteMapDisplayView'>Site Map</a>
            </li>
            <li>
              <a href='/terms-and-conditions-of-use.html'>
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href='/privacy-policy.html'>Your Privacy Rights</a>
            </li>
            <li>
              <a href='/privacy-policy.html#cppa'>CA Notice</a>
            </li>
            <li>
              <button
                tabIndex={0}
                name='ot-sdk-btn'
                id='ot-sdk-btn'
                style={{ color: "rgb(95, 95, 95)" }}
                className='ot-sdk-show-settings'
                onclick='verifyOTSystemDown(event);'
                data-darkreader-inline-color
              >
                Cookie Settings
              </button>
            </li>
            <li>
              <a href='/DNSMIView'>
                <img
                  alt='California Consumer Privacy Act (CCPA) Opt-Out Icon'
                  style={{
                    width: "30px",
                    height: "14px",
                    marginRight: "8px",
                    marginBottom: "2px",
                  }}
                  src='https://mobilecontent.costco.com/live/resource/img/static-us-landing-pages/icon-privacy-choices.svg'
                />
                Your Privacy Choices
              </a>
            </li>
            <li>
              <a href='#' id='opinionLabFooterLink'>
                Feedback
              </a>
            </li>
          </ul>
          <ul className='social-icons hidden-xl'>
            <li>
              <a href='//www.facebook.com/costco' className='external'>
                <label className='offscreen'>facebook</label>
                <img
                  alt='Facebook'
                  src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-facebook.svg'
                />
              </a>
            </li>
            <li>
              <a href='//www.pinterest.com/costco' className='external'>
                <label className='offscreen'>pinterest</label>
                <img
                  alt='Pinterest'
                  src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-pinterest.svg'
                />
              </a>
            </li>
            <li>
              <a href='//www.instagram.com/Costco/' className='external'>
                <label className='offscreen'>Instagram</label>
                <img
                  alt='Instagram'
                  src='/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-instagram.svg'
                />
              </a>
            </li>
            <li>
              <a href='/costco-app.html'>
                <label className='offscreen'>costco app</label>
                <img
                  alt='Costco app'
                  src='https://mobilecontent.costco.com/live/resource/img/static-folder-app-icon/app-icon.png'
                />
              </a>
            </li>
          </ul>
          <p className='copyright'>
            © 1998 — <span id='copyright-year'>2023</span> Costco Wholesale
            Corporation. <span className='rights'>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
