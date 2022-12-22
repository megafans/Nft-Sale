import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const Home = ({ title, description, imageUrl }) => {
  return (
    <div className="homeSec DBlock">
      <Container>
        <div className="homeDiv DBlock">
          <Row className="align-items-center flex-wrap-reverse">
            <Col sm={12} md={6}>
              <div className="homeContent">
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="homeBtnsDiv">
                  <Link to="/sign-up">
                    Buy NFT
                    <span>
                      <AiOutlineRight />
                    </span>
                  </Link>
                  {/* <Link to='/sign-in' className='outline'>
                    Login{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </Link> */}
                </div>
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className="homeImage DFlex justify-content-center">
                <img src={imageUrl} alt="homeImg" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
