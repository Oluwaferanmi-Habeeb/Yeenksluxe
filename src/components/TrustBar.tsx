const items = [
  { number: '01', title: 'Nationwide delivery', copy: 'Tracked delivery across Nigeria.' },
  { number: '02', title: 'Fit support', copy: 'Speak with us before choosing a size.' },
  { number: '03', title: 'Easy exchanges', copy: 'Size exchanges on unworn pieces.' },
  { number: '04', title: 'Direct assistance', copy: 'Fast help through WhatsApp.' },
];

export default function TrustBar() {
  return (
    <section className="trust-section reveal-on-scroll" aria-label="Shopping benefits">
      <div className="container trust-grid">
        {items.map(item => (
          <div className="trust-item" key={item.number}>
            <span>{item.number}</span>
            <div><h3>{item.title}</h3><p>{item.copy}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
