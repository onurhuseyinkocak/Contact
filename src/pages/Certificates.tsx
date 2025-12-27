import CertificateCard from '../components/CertificateCard'

// I replaced the link system with modal info cards.
const Certificates = () => {
  const certs = [
    {
      id: 'google-ux',
      title: 'Google UX Sertifikası',
      details: 'Completed Google UX Design certificate through Coursera in 2024.',
    },
    {
      id: 'react',
      title: 'React Bootcamp',
      details: 'Finished 3-month intensive React Bootcamp at Siliconmade Academy.',
    },
    {
      id: 'ts',
      title: 'TypeScript Course',
      details: 'Learned advanced TypeScript patterns and best practices in 2025.',
    },
  ]

  return (
    <div>
      <h2>My Certificates</h2>
      <p>Click on any certificate to see more details.</p>
      <div className="card-grid">
        {certs.map(cert => (
          <CertificateCard
            key={cert.id}
            title={cert.title}
            details={cert.details}
          />
        ))}
      </div>
    </div>
  )
}

export default Certificates
