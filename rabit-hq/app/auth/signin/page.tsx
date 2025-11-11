import { redirect } from 'next/navigation'

export default function SignInRedirect() {
  redirect('/ar/auth/signin')
}
