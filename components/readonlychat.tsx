import React from 'react';


const ReadOnlyChat: React.FC<{messages: any}> = ({messages}) => {
  return (
    <div className="flex gap-2 flex-col m-10">
      {messages ? JSON.parse(messages).filter((m: any) => m.role !== 'system').map((m: any) => (
        <React.Fragment key={m.id}>
          <div className="text-sm">
            <div className="font-bold">{m.role === 'user' ? 'You' : 'Assistant'}:</div>
            <div className="m-2">{m.content}</div>
          </div>
        </React.Fragment>
      )) : 'No data available'}
    </div>
  )
}

export default ReadOnlyChat;