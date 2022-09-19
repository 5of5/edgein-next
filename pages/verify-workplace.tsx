import { DashboardLayout } from "@/components/Dashboard/DashboardLayout"
import { FC, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"

type Props = {}

const VerifyWorkplace: FC<Props> = ({ }) => {
  const [error, setError] = useState('')

  const router = useRouter()


  const verifyToken = useCallback(async () => {
    const token = router.query.token as string

    const resp = await fetch(`/api/verify_workplace?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    if (resp.ok) {
      router.push('/organization')
      return
    }

    if (resp.status === 400)
      setError((await resp.json()).message)

  }, [router])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <DashboardLayout>
        <div className="col-span-3">
          <div className="p-5 bg-white shadow-md rounded-lg text-center">
            {
              !error ?
                <p className="text-dark-500 text-lg font-semibold">Please wait while we verify your workplace!</p>
                : <p className="text-red-500 text-lg font-semibold">{error}</p>
            }
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default VerifyWorkplace