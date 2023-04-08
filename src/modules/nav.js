import Nav from 'react-bootstrap/Nav';

function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/sentence">Sentence</Nav.Link>
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