const plans = [
  { name: 'Starter', price: '₹999', items: ['1 agent', 'Basic inbox'] },
  { name: 'Growth', price: '₹2,999', items: ['5 agents', 'Broadcasts', 'Automations'] },
  { name: 'Pro', price: '₹7,999', items: ['Unlimited agents', 'API access', 'Priority support'] },
];
export default function Pricing() {
  return (
    <section className="page">
      <h1>Pricing</h1>
      <p className="muted">Dummy page to check the widget survives route changes.</p>
      <div className="grid">
        {plans.map((p) => (
          <div key={p.name} className="card">
            <h3>{p.name}</h3>
            <p className="price">{p.price}<span>/mo</span></p>
            <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
