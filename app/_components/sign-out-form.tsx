import { signOut } from '@/lib/auth'

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit">ログアウト</button>
    </form>
  )
}
