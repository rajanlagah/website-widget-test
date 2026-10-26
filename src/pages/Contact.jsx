export default function Contact() {
  return (
    <section className="page">
      <h1>Contact</h1>
      <p className="muted">Dummy form; also useful for checking the widget doesn't overlap inputs.</p>
      <form className="form" onSubmit={(e) => { e.preventDefault(); alert('Submitted (dummy)'); }}>
        <input placeholder="Name" />
        <input placeholder="Email" type="email" />
        <textarea placeholder="Message" rows={5} />
        <button type="submit">Send</button>
      </form>
      <div style={{ height: '120vh' }} className="muted">Scroll space to test fixed positioning ↓</div>
    </section>
  );
}
