import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
      <nav>
          <Link href='/'>Dashboard</Link>
          <Link href='/tickets'>Tickets</Link>
        </nav>
    </div>
  )
}
