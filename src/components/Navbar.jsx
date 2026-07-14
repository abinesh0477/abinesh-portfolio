function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Abinesh A</h2>
      <div>
        <a href="#about" style={styles.link}>About</a>
        <a href="#projects" style={styles.link}>Projects</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 50px",
    backgroundColor: "#0f172a",
    color: "white",
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;