import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { ADD_POST } from '../graphql/mutation';
import { useMutation } from '@apollo/client';
import client from '../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
};

function PostBox() {
    const { data: session } = useSession();

    const [addPost] = useMutation(ADD_POST);

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>();
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        watch,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        try {
            //Query for the subreddit topic...
            const {
                data: { getSubredditListByTopic },
            } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: { topic: data.subreddit },
            });

            const subRedditExists = getSubredditListByTopic.length > 0;

            if (!subRedditExists) {
                // create subreddit....
            } else {
                // use existing subreddit...
            }
        } catch (err) {}
    };

    return (
        <form
            className="sticky top-16 z-50 bg-white border border-gray-300 rounded-md py-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex items-center space-x-3">
                <Avatar />
                <input
                    {...register('postTitle', { required: true })}
                    className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
                    disabled={!session}
                    type="text"
                    placeholder={
                        session
                            ? 'Create a post by entering a title!'
                            : 'Sign in to post'
                    }
                />
                <PhotographIcon
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`h-6 text-gray-300 cursor-pointer ${
                        imageBoxOpen && 'text-blue-300'
                    }`}
                />
                <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
            </div>
            {!!watch('postTitle') && (
                <div className="flex flex-col py-2">
                    {/* Body */}
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body</p>
                        <input
                            {...register('postBody')}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="Text(optional)"
                        />
                    </div>
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit</p>
                        <input
                            {...register('subreddit', { required: true })}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="i.e. reactjs"
                        />
                    </div>
                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <input
                                {...register('postImage')}
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                type="text"
                                placeholder="Optional..."
                            />
                        </div>
                    )}
                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="space-y-2 p-2 text-red-500">
                            {errors.postTitle?.type === 'required' && (
                                <p>A post title is required</p>
                            )}
                            {errors.subreddit?.type === 'required' && (
                                <p>A subreddit is required</p>
                            )}
                        </div>
                    )}
                    {!!watch('postTitle') && (
                        <button
                            type="submit"
                            className="w-full rounded-full bg-blue-400 text-white p-2"
                        >
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    );
}

export default PostBox;