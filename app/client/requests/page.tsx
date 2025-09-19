import { getClientRequestsAction } from '@/actions/client.actions'
import CollapsibleText from '@/components/reusable/CollapsibleText'
import ErrorPage from '@/components/reusable/ErrorPage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RequestWithDev } from '@/types/type'
import { Clipboard, User } from 'lucide-react'

const statusClasses: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ACCEPTED: 'bg-green-100 text-green-800 border-green-200',
  REJECTED: 'bg-red-100 text-red-800 border-red-200',
}

const Requests = async () => {
  const response = await getClientRequestsAction()

  if (!response.success) {
    return <ErrorPage message={response.message} />
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-10 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Clipboard size={24} className="text-gray-600" />
        Your Requests
      </h1>

      {response.requests?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="w-48 h-48">
            <Image fill src="/assets/empty.svg" alt="No requests illustration" className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-600 text-lg">You haven not sent any requests yet.</p>
          <div className="flex items-center gap-3">
            <Link href="/client/post-job" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
              <User size={20} />
              <span className='text-sm sm:text-lg'>Post a job</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {response.requests?.map((req: RequestWithDev) => (
            <div key={req.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {req.developer?.user?.profileImage ? (
                  <Image src={req.developer.user.profileImage} width={64} height={64} alt="profile pic" className="rounded-full size-16 object-cover" />
                ) : (
                  <div className="size-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold text-lg">
                    {(req.developer?.user?.firstName?.[0] ?? '')}
                    {(req.developer?.user?.lastName?.[0] ?? '')}
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {req.developer?.user?.firstName} {req.developer?.user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    you sent a request for the job{' '}
                    <Link
                      href={`/job/?_id=${req.jobId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      View Job
                    </Link>
                  </p>
                </div>

                <span className={`text-xs sm:text-sm px-3 py-1 rounded-full border flex-shrink-0 ${statusClasses[req.status] ?? 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  {req.status}
                </span>
              </div>

              {/* Message */}
              {req.message && (
                <div className="mt-4 sm:mt-6 pl-0 sm:pl-20">
                  <CollapsibleText text={req.message ?? ''} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Requests