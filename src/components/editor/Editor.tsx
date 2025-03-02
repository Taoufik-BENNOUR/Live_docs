'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';
import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin } from '@liveblocks/react-lexical';
import Loader from '../ui/Loader';
import { useSyncStatus } from '@liveblocks/react';
import FloatingToolbar from './plugins/FloatingToolbar';
import { useThreads } from '@liveblocks/react/suspense';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({roomId,currentUserType}:{roomId:string,currentUserType:UserType}) {
  const {threads} = useThreads()
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable:currentUserType ==='editor'
  })
const syncStatus  = useSyncStatus()
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
          <ToolbarPlugin />
          {/* {currentUserType ==='editor' && <DeleteModal roomId={roomId} /> } */}
        <div className='editor-wrapper flex flex-col items-center justify-start'>
          {syncStatus  === 'synchronized' || syncStatus  === 'synchronizing' ?
           <Loader/> 
           : 
           <div className="editor-inner min-w-[1100px] h-[1100px]">
           <RichTextPlugin
             contentEditable={
               <ContentEditable className="editor-input h-full" />
             }
             placeholder={<Placeholder />}
             ErrorBoundary={LexicalErrorBoundary}
           />
           {currentUserType === 'editor' && <FloatingToolbar /> }
           <HistoryPlugin />
           <AutoFocusPlugin />
         </div>           
          }
          {/* <LiveblocksPlugin>
            <FloatingComposer/>
            <FloatingThreads threads={threads}/>
          </LiveblocksPlugin> */}
        </div>
      </div>
    </LexicalComposer>
  );
}
