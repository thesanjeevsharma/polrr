import React from 'react'

import './Footer.scss'

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__top">
        <div className="Footer__left">
          <h2 className="Footer__brand-name">Polrr</h2>
          <p className="Footer__brand-description">
            <a
              className="Footer__link"
              href="https://github.com/thesanjeevsharma/polrr"
              rel="noreferrer"
              target="_blank"
            >
              Open source
            </a>{' '}
            news app for climate change.
          </p>
        </div>
        <div className="Footer__right">
          <div className="Footer__title">Credits</div>
          <a
            className="Footer__link"
            href="https://www.linkedin.com/in/joy-essien/"
            rel="noreferrer"
            target="_blank"
          >
            Joy Essien (Design)
          </a>
        </div>
      </div>
      <div className="Footer__bottom">Made with &#9829;, for the world.</div>
    </div>
  )
}

export default Footer
