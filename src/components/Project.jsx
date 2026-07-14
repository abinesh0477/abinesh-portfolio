function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <h2>Projects</h2>

      <div style={styles.card}>
        <h3>Rental Property Portal</h3>
        <p>React | Spring Boot | MySQL</p>
      </div>

      <div style={styles.card}>
        <h3>Employee Management System</h3>
        <p>Angular | Spring Boot</p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 50px",
  },
  card: {
    border: "1px solid #e2e8f0",
    padding: "20px",
    marginBottom: "20px",
  },
};

export default Projects;