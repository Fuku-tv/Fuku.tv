import * as React from 'react';

import './AboutScreen.scss';

const Header: React.FC = () => {
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);

  return (
    <div className="about-inner-wrapper">
      <section id="about-fuku">
        <div className="logo">
          <span className="logo__icon">{fukuIcon}</span>
          <span>fuku</span>
        </div>
        <div className="pronuciation">
          [ foo-koo ] • <span>adjective</span>
        </div>
        <div className="definition">Fuku (pronounced foo-koo) is the romanization of the Japanese Kanji for “good fortune.”</div>
      </section>
      <section id="team">
        <h2>Team</h2>
        <div className="team-members-container">
          <article className="team-member">
            <h3>Jason Pullara</h3>
            <div className="position">Founder</div>
          </article>
          <article className="team-member">
            <h3>Ernie Francis</h3>
            <div className="position">IT Manager</div>
          </article>
          <article className="team-member">
            <h3>James Oliva</h3>
            <div className="position">UI Manager</div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Header;
const fukuIcon = (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.27 507.85">
    <g id="fuku">
      <path
        d="M134.87,14.08c10.78,3.56,10.78,3.66,2.66,12.32a4.92,4.92,0,0,0-1.37,3c-.07,25.64-.06,51.28-.06,77.66,10.24,0,20.16.08,30.07-.13,1.07,0,2.31-1.59,3.1-2.7,1.71-2.42,3.17-5,4.91-7.79l36.33,27.76c0,.5.13,1,0,1.09-6.85,5.4-9.54,13.17-12.58,21-13.6,34.91-34.13,65.8-56.24,95.74-1,1.31-1.9,2.65-3.11,4.35,6.28,3,12.25,5.8,18.15,8.73a259,259,0,0,1,55.65,36.86c2.55,2.22,3.19,3.86,1.53,7.07-7.49,14.46-14.68,29.09-22.26,44.21-16-18.49-33.77-34-55.35-46.21V521.92H92.54V300.61L28.79,357.49c-3.37-8.1-6.15-14.76-8.92-21.41v-38C74.47,259,115.76,208.57,147.74,148.9H24.14v-42H92.56V101c0-18.49,0-37,0-55.47,0-10.49.19-21,.3-31.46Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M92.87,14.08c-.11,10.48-.27,21-.3,31.46,0,18.49,0,37,0,55.47v5.91H24.14v42h123.6C115.76,208.57,74.47,259,19.87,298.08v-284Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M266.76,498.51V520H229.9V293.27H507.56V510.94H470.77V498.51Zm203.45-35.67V412.51H386.3v50.33ZM348.68,412.47H267.14v50.22h81.54Zm121.65-84.11H386.39v48.35h83.94Zm-121.67.09H267.15v48.17h81.51Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M474.24,132.1V254.76H254.09V132.1Zm-36.81,87.63c0-16.26-.16-32.06.1-47.85.08-4.39-1.11-5.6-5.55-5.58-45.14.16-90.27.1-135.4.11-1.78,0-3.55.16-5.35.24v53.08Z"
        transform="translate(-19.87 -14.08)"
      />
      <path d="M216.45,88.78V48.12H516.13V88.78Z" transform="translate(-19.87 -14.08)" />
    </g>
  </svg>
);
