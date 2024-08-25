import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  AiOutput: string;
}

export default function OutputSection({ AiOutput }: Props) {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(AiOutput);
    }
  }, [AiOutput]);

  const handleCopy = async () => {
    if (editorRef.current) {
      const markdownContent = editorRef.current.getInstance().getMarkdown();
      try {
        await navigator.clipboard.writeText(markdownContent);
        alert('Content copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2>Your result</h2>
        <Button onClick={handleCopy}>
          <Copy /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
}
