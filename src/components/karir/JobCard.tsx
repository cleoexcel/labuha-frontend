'use client';

interface JobCardProps {
  title: string;
  location: string;
  deadline: string;
  applyUrl: string;
  cta: string;
  deadlineLabel: string;
}

export default function JobCard({ title, location, deadline, applyUrl, cta, deadlineLabel }: JobCardProps) {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 8,
      padding: 'clamp(16px, 2.5vw, 24px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      transition: 'box-shadow 0.2s, transform 0.2s',
      background: '#fff',
      height: '100%',
    }}
      onMouseOver={e => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Title & Location */}
      <div>
        <h3 style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          {title}
        </h3>
        <p style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', color: 'var(--text-muted)' }}>
          {location}
        </p>
      </div>

      {/* Deadline & CTA */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 'auto' }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{deadlineLabel}</p>
          <p style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', color: 'var(--text)', fontWeight: 500 }}>{deadline}</p>
        </div>
        {applyUrl ? (
          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            {cta}
          </a>
        ) : (
          <span style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', color: '#ccc', whiteSpace: 'nowrap' }}>{cta}</span>
        )}
      </div>
    </div>
  );
}