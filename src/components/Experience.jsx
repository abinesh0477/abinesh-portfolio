function Experience() {
  return (
    <section style={styles.section}>
      <h2>Experience</h2>
      <h3>Trainee Software Engineer – Aadasteck</h3>
      <p>Apr 2025 – Present</p>
      <ul>
        <li>Developed REST APIs using Spring Boot</li>
        <li>Built responsive UI using React & Angular</li>
        <li>Worked with MySQL & Oracle databases</li>
      </ul>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 50px",
    backgroundColor: "#f8fafc",
  },
};

export default Experience;