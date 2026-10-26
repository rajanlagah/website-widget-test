import { useState } from 'react';

const channels = [
  { title: 'Sales', text: 'Talk to us about plans and pricing.', value: 'sales@example.com' },
  { title: 'Support', text: 'Get help with your account.', value: 'support@example.com' },
  { title: 'Phone', text: 'Mon–Fri, 10am–7pm IST.', value: '+91 98765 43210' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="page">
      <div className="hero">
        <h1>Get in touch</h1>
        <p className="muted">Dummy form; also useful for checking the widget doesn't overlap inputs.</p>
      </div>

      <div className="grid">
        {channels.map((c) => (
          <div key={c.title} className="card">
            <h3>{c.title}</h3>
            <p className="muted">{c.text}</p>
            <strong>{c.value}</strong>
          </div>
        ))}
      </div>

      <div className="contact">
        <div className="card">
          <h2>Send us a message</h2>
          {sent ? (
            <p>Thanks! We'll get back to you within one business day. <button className="link" onClick={() => setSent(false)}>Send another</button></p>
          ) : (
            <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="form-row">
                <input placeholder="Name" required />
                <input placeholder="Email" type="email" required />
              </div>
              <input placeholder="Company (optional)" />
              <select defaultValue="">
                <option value="" disabled>What's this about?</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Message" rows={5} required />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
        <div className="card">
          <h2>Office</h2>
          <p>123 Example Street<br />Bengaluru, KA 560001<br />India</p>
          <p className="muted">Hours: Mon–Fri, 10am–7pm IST</p>
        </div>
      </div>

      <div style={{ height: '120vh' }} className="muted">Scroll space to test fixed positioning ↓</div>
    </section>
  );
}
