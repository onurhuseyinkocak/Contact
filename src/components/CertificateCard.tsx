import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  title: string
  details?: string
  link?: string
}

const CertificateCard = ({ title, details, link }: Props) => {
  const [open, setOpen] = useState(false)

  const cardContent = (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (!link) setOpen(true)
      }}
    >
      <h3>{title}</h3>
    </motion.div>
  )

  return (
    <>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}

      {!link && open && (
        <motion.div 
          className="modal" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
        >
          <motion.div 
            className="modal-content" 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{title}</h2>
            <p>{details}</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default CertificateCard