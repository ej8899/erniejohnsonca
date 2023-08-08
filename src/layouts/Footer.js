const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer__builder">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="social-links scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <a target="_blank" rel="nofollow" href={global.config.link.twitter}>
                  <i aria-hidden="true" className="fab fa-twitter" />
                </a>
                <a target="_blank" rel="nofollow" href={global.config.link.linkedin}>
                      <i aria-hidden="true" className="fab fa-linkedin-in" />
                </a>
                <a target="_blank" rel="nofollow" href={global.config.link.youtube}>
                      <i aria-hidden="true" className="fab fa-youtube" />
                </a>
                <a target="_blank" rel="nofollow" href={global.config.link.github}>
                      <i aria-hidden="true" className="fab fa-github" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="copyright-text align-center scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                © {currentYear} <strong>ERNIEJOHNSON.CA</strong>. All rights reserved
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="copyright-text align-right scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                Developed by <strong>ERNIEJOHNSON.CA</strong> - version {global.config.appVersion}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
