'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
    getContent: () => string;
};

type RichTextEditorProps = {
    onChange?: (content: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(({ onChange }, ref,) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (editorRef.current && !initialized) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                },
                placeholder: 'Digite aqui...',
            });
            quillRef.current.on('text-change', () => {
                if (onChange) {
                    onChange(quillRef.current!.root.innerHTML);
                }
            });
            setInitialized(true);
        }

        return () => {
            quillRef.current = null; // Cleanup to avoid memory leaks
        };
    }, []);

    // Expose the getContent function to the parent component
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {
                return quillRef.current.root.innerHTML; // Return the HTML content
            }
            return '';
        },
        setContent: (content: string) => {
            if (quillRef.current) {
                quillRef.current.root.innerHTML = content;
            }
        }
    }));

    return <div ref={editorRef} style={{ height: '300px' }} />;
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;