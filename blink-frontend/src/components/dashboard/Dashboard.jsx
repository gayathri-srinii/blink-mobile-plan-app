import Navbar from "../Navbar";
import { Carousel, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link, useLocation, Outlet } from "react-router-dom";

import dashboard_spm from "./dashboard_spm.png";
import dashboard_pr from "./dashboard_pr.png";
import dashboard_ae from "./img2.png";
import dashboard_banner from "./dashboard_banner.png";

function Dashboard() {
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {isMainDashboard ? (
          <>
            {/* Hero Banner */}
            <div
              className="hero-banner"
              style={{
                backgroundImage: `url(${dashboard_banner})`,
                marginTop: "70px",
              }}
            ></div>

            {/* Carousel Section */}
            <div className="container my-5 carousel-wrapper shadow-lg rounded-4 p-0">
              <Carousel fade indicators controls interval={3000}>
                <Carousel.Item>
                  <img src={dashboard_spm} alt="Seamless Plan Management" />
                  <Carousel.Caption className="carousel-caption-custom">
                    <h3>Seamless Plan Management</h3>
                    <p>Easily view, add, and customize your mobile plans.</p>
                    <Link to="view-plan" className="btn btn-light btn-sm mt-2">
                      Explore Plans
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img src={dashboard_pr} alt="Personalized Recommendations" />
                  <Carousel.Caption className="carousel-caption-custom">
                    <h3>Personalized Recommendations</h3>
                    <p>Get plans that perfectly fit your usage and lifestyle.</p>
                    <Link
                      to="recommendations"
                      className="btn btn-light btn-sm mt-2"
                    >
                      View Recommendations
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img src={dashboard_ae} alt="Add-ons & Extras" />
                  <Carousel.Caption className="carousel-caption-custom">
                    <h3>Add-ons & Extras</h3>
                    <p>Boost your plan with extra data and OTT packs.</p>
                    <Link to="add-on" className="btn btn-light btn-sm mt-2">
                      Check Add-ons
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>

            {/* Features Section */}
            <div className="container my-5 p-4 feature-container rounded-4 shadow-sm">
              <h2 className="text-center mb-4 fw-bold elegant-heading">
                Blink App Features
              </h2>
              <div className="row">
                {[
                  {
                    title: "Smart Plan Customization",
                    desc: "Design your plan with flexible data, voice, and SMS options.",
                  },
                  {
                    title: "Real-time Usage Tracking",
                    desc: "Monitor your data, calls, and expenses effortlessly.",
                  },
                  {
                    title: "Instant Recharge",
                    desc: "Recharge anytime with one-tap secure payments.",
                  },
                  {
                    title: "Exclusive Rewards",
                    desc: "Earn discounts and cashback for loyal usage.",
                  },
                  {
                    title: "Family Plan Sharing",
                    desc: "Share data and benefits with your loved ones.",
                  },
                  {
                    title: "24/7 Support",
                    desc: "Reach our support team instantly, anytime, anywhere.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <Card className="feature-card h-100 border-0 shadow-sm">
                      <Card.Body className="text-center">
                        <Card.Title className="fw-bold text-dark">
                          {feature.title}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          {feature.desc}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="container my-5 p-4 faq-container rounded-4 shadow-sm">
              <h2 className="text-center mb-4 fw-bold elegant-heading">
                Frequently Asked Questions
              </h2>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How can I upgrade my plan?</Accordion.Header>
                  <Accordion.Body>
                    You can easily upgrade from the “Customize Plan” section in the dashboard.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>What are Blink Add-ons?</Accordion.Header>
                  <Accordion.Body>
                    Add-ons enhance your base plan with extra data, calls, or OTT subscriptions.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Can I use Blink abroad?</Accordion.Header>
                  <Accordion.Body>
                    Yes! Blink provides international roaming packs for affordable global connectivity.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Is payment through Blink safe?</Accordion.Header>
                  <Accordion.Body>
                    100% secure. All transactions are encrypted and verified through trusted gateways.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Can I share plans with family?</Accordion.Header>
                  <Accordion.Body>
                    Yes, Blink Family Plans allow sharing data and benefits with up to 5 members.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>What happens when my plan expires?</Accordion.Header>
                  <Accordion.Body>
                    You’ll get reminders before expiry, and can renew with one tap via the app.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {/* Footer */}
            <footer className="footer text-center text-light py-3 mt-5">
              <p>© 2025 Blink Telecom. All Rights Reserved.</p>
              <p className="small">Follow us on @BlinkConnect | support@blink.in</p>
            </footer>
          </>
        ) : (
          // ✅ Nested routes render here
          <div className="container-fluid mt-5 pt-5 px-4">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
