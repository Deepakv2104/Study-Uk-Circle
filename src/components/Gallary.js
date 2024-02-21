import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import e1 from '../assets/img/e1.webp'
import e2 from '../assets/img/e2.webp'
import e3 from '../assets/img/e3.webp'
import e4 from '../assets/img/e4.webp'
import e5 from '../assets/img/e5.webp'
import '../styles/Gallary.css'
import e6 from '../assets/img/e6.webp'


import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Gallary = () => {

  const Data = [
    {
      title: "PRE-DEPARTURE EVENTS 2023: MUMBAI",
      description: "11 September 2023 @ Cricket Club of IndiaThe inspiring words & invaluable insights of Shri Mangal Prabhat Lodha, Chandan Taparia, Idzes Kundan & our student panel brought our Pre-Departure Event series to an impactful end.",
      imgUrl: e1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: e2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: e3,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: e4,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: e5,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: e6,
    },
  ];

  return (
    <section className="project" id="gallery">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Gallary</h2>
                <p>Immerse yourself in our diverse gallery. Explore a visual journey showcasing the vibrant experiences of our community members. From stays and jobs to mentorship and events, our gallery captures the essence of each unique connection and opportunity. Discover the richness of our platform and be inspired by the stories within our gallery at WorldLynk.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          Data.map((Data, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...Data}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
     
    </section>
  )
}

export default Gallary;
