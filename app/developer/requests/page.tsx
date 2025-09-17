import { getRequestsAction } from '@/actions/developer.action';
import CollapsibleText from '@/components/reusable/CollapsibleText';
import ErrorPage from '@/components/reusable/ErrorPage';
import { RequestWithClient } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { User,  Clipboard,  X } from 'lucide-react';  

const Requests = async () => {
    const response = await getRequestsAction();

    if (!response.success) {
        return <ErrorPage message={response.message} />;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-10 space-y-8">
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Clipboard size={24} className="text-gray-600" />
                Requests to You
            </h1>

            {response.requests?.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-10 space-y-6 text-center">
                    {/* Empty illustration */}
                    <div className="w-48 h-48">
                        <img
                            src="https://undraw.co/illustration/empty_4zx0"   
                            alt="No requests illustration"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-gray-600 text-lg">
                        Looks like no one has sent you a request yet.
                    </p>

                    <Link
                        href="/developer/profile"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        <User size={20} />
                        <span>Fill your profile to get noticed</span>
                    </Link>

                </div>
            ) : (
                <div className="space-y-6">
                    {response.requests?.map((req: RequestWithClient) => (
                        <div
                            key={req.id}
                            className="bg-white p-6 rounded-xl border border-gray-200"
                        >
                            {/* Top Section (Profile + Job Info) */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                {/* Profile Image / Initials */}
                                {req.client.user.profileImage ? (
                                    <Image
                                        src={req.client.user.profileImage}
                                        width={64}
                                        height={64}
                                        alt="profile pic"
                                        className="rounded-full size-16 object-cover"
                                    />
                                ) : (
                                    <div className="size-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold text-lg">
                                        {req.client.user.firstName?.[0] ?? ''}
                                        {req.client.user.lastName?.[0] ?? ''}
                                    </div>
                                )}

                                {/* Client Info */}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                        {req.client.user.firstName} {req.client.user.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        has sent you a request for the job{' '}
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
                            </div>

                            {/* Message */}
                            <div className="mt-4 sm:mt-6 pl-0 sm:pl-20">
                                <CollapsibleText text={req.message ?? ''} />
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                                <button className="px-4 py-2 text-sm rounded-2xl bg-green-600 text-white hover:bg-green-700 cursor-pointer transition w-full sm:w-auto flex items-center justify-center gap-1">
                                    <User size={16} /> {/* Replace with relevant Lucide icon */}
                                    Accept
                                </button>
                                <button className="px-4 py-2 text-sm rounded-2xl bg-red-600 text-white hover:bg-red-700 cursor-pointer transition w-full sm:w-auto flex items-center justify-center gap-1">
                                    <X size={16} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Requests;
