import Nav from 'react-bootstrap/Nav';
import LottieAnimation from "../modules/DogAnimate";

function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <div className='navLogo'>
      <LottieAnimation></LottieAnimation>
      </div>
      <Nav.Item>
        <Nav.Link href="/">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/sentence">Reading</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cards">Flashcards</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/stats">
          Stats
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;