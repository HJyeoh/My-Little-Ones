import React, { useEffect } from "react";
import "./About.css"; // Import the custom CSS

const About = () => {
  window.scrollTo(0, 0);

  return (
    <div className="about-page">
      {/* Meet Our Team Section */}
      <div className="team-section">
        <h2 className="section-title">MEET OUR TEAM</h2>
        <hr />
        <div className="team-members">
          {/* Member 1 */}
          <div className="team-member">
            <img
              src="/member/member1.jpg"
              alt="Member 1"
              className="member-photo"
            />
            <h3 className="member-name">Yeoh Hao Jing</h3>
            <p className="member-role">Leader</p>
          </div>

          {/* Member 2 */}
          <div className="team-member">
            <img
              src="/member/member2.jpg"
              alt="Member 2"
              className="member-photo"
            />
            <h3 className="member-name">Woo Pei Wen</h3>
            <p className="member-role">Member 2</p>
          </div>

          {/* Member 3 */}
          <div className="team-member">
            <img
              src="/member/member3.jpg"
              alt="Member 3"
              className="member-photo"
            />
            <h3 className="member-name">Liew Choy Yein</h3>
            <p className="member-role">Member 3</p>
          </div>

          {/* Member 4 */}
          <div className="team-member">
            <img
              src="/member/member4.jpg"
              alt="Member 4"
              className="member-photo"
            />
            <h3 className="member-name">Chua Pei Jun</h3>
            <p className="member-role">Member 4</p>
          </div>
        </div>
      </div>

      {/* Why Choose My Little Ones Section */}
      <div className="why-choose">
        <h2 className="section-title">
          Why Choose <span className="highlight">My Little Ones</span>
        </h2>
        <p className="description">
          My Little Ones is your one-stop shop for all things baby and
          maternity. We offer a wide range of products, from adorable clothing
          to essential baby care items. Our carefully selected range is designed
          to support mothers and babies through every stage, ensuring you have
          everything you need to make the parenting journey smoother and more
          enjoyable. Whether you're preparing for a newborn or looking for that
          perfect gift, My Little Ones has got you covered.
        </p>
      </div>

      {/* Enquiries Section */}
      <div className="enquiries">
        <h2 className="section-title">Enquiries</h2>
        <p className="description">
          For any questions or more information, feel free to contact us at:
        </p>
        <p className="email">
          <a href="mailto:catsuperinteresting@usm.my">
            catsuperinteresting@usm.my
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
