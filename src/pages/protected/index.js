import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Protected() {
  const { status, data } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.replace('/')
    }
  }, [status])
  if (status !== 'unauthenticated') {
    return <div>ini di lindungi</div>
  }
}
