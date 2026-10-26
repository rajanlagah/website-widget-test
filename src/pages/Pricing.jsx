import { useState } from 'react';

const plans = [
  { name: 'Starter', monthly: 999, desc: 'For small teams getting started.', items: ['1 agent', 'Basic inbox', 'Email support', '1,000 contacts'] },
  { name: 'Growth', monthly: 2999, desc: 'For growing teams that need automation.', featured: true, items: ['5 agents', 'Broadcasts', 'Automations', '25,000 contacts', 'Chat support'] },
  { name: 'Pro', monthly: 7999, desc: 'For scale, integrations and control.', items: ['Unlimited agents', 'API access', 'Priority support', 'Unlimited contacts', 'SSO'] },
];

const compare = [
  ['Agents', '1', '5', 'Unlimited'],
  ['Contacts', '1,000', '25,000', 'Unlimited'],
  ['Broadcasts', '—', '✓', '✓'],
  ['Automations', '—', '✓', '✓'],
  ['API access', '—', '—', '✓'],
  ['SSO', '—', '—', '✓'],
  ['Support', 'Email', 'Chat', 'Priority'],
];

const faqs = [
  ['Is there a free trial?', 'Yes — every plan comes with a 14-day free trial. No card required.'],
  ['Can I change plans later?', 'Anytime. Upgrades apply immediately; downgrades take effect next billing cycle.'],
  ['Do you offer refunds?', 'Annual plans can be refunded pro-rata within the first 30 days.'],
  ['What payment methods do you accept?', 'All major cards, UPI and bank transfer for annual plans.'],
];

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="page">
      <div className="hero">
        <h1>Simple, transparent pricing</h1>
        <p className="muted">Dummy page to check the widget survives route changes.</p>
        <div className="toggle">
          <button className={!yearly ? '' : 'secondary'} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? '' : 'secondary'} onClick={() => setYearly(true)}>Yearly · save 20%</button>
        </div>
      </div>

      <div className="grid">
        {plans.map((p) => (
          <div key={p.name} className={'card' + (p.featured ? ' featured' : '')}>
            {p.featured && <span className="badge">Most popular</span>}
            <h3>{p.name}</h3>
            <p className="muted">{p.desc}</p>
            <p className="price">{fmt(yearly ? Math.round(p.monthly * 0.8) : p.monthly)}<span>/mo</span></p>
            <p className="muted small">{yearly ? `Billed ${fmt(Math.round(p.monthly * 0.8 * 12))} yearly` : 'Billed monthly'}</p>
            <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <button className={p.featured ? '' : 'secondary'} style={{ width: '100%' }}>Start free trial</button>
          </div>
        ))}
      </div>

      <h2>Compare plans</h2>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Feature</th>{plans.map((p) => <th key={p.name}>{p.name}</th>)}</tr></thead>
          <tbody>{compare.map(([f, ...v]) => <tr key={f}><td>{f}</td>{v.map((x, i) => <td key={i}>{x}</td>)}</tr>)}</tbody>
        </table>
      </div>

      <h2>Frequently asked questions</h2>
      <div className="faq">
        {faqs.map(([q, a]) => (
          <details key={q} className="card">
            <summary>{q}</summary>
            <p className="muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
