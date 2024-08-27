'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        
        if (promptId) getPromptDetails(); // call the getPromptDetails function when the promptId is available / prompt exists
    }, [promptId]);

    const updatePrompt = async (event) => {
        event.preventDefault();
        setSubmitting(true); 
        
        if(!promptId) return alert('Missing Prompt ID'); // return an alert if the promptId is missing

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('Error updating prompt:', error);
        } finally {
            setSubmitting(false);
    }
};
    
  return (
    <Form 
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  );
};
export default EditPrompt;