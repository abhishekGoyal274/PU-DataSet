import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <br></br>
      <br></br>
      <footer
        class="page-footer  card-panel indigo"
        style={{ height: "200px" }}
      >
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">Design Innovation Centre</h5>
              <p class="grey-text text-lighten-4">
                Design Innovation Centre, UIET Chandigarh, India 160014
              </p>
            </div>

            <div class="col l4 offset-l2 s12">
              <ul>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="https://www.facebook.com/dic.uiet/"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="http://diciitbhu.com/"
                  >
                    Google
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright card-panel grey lighten-3">
          <div class="container black-text">
            © 2019 Design and Innovation Centre, Panjab University. All rights
            reserved.
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
