import React from 'react';

const MessageList = () => {
    const messages = [
        { id: 1, sender: 'User 1', text: 'Hello' },
        { id: 2, sender: 'User 2', text: 'Hi there' },
        { id: 3, sender: 'User 1', text: 'How are you?' },
        // Example array of messages
    ];

    return (
        <div className="message-list">
            {messages.map((message) => (
                <div key={message.id} className="message">
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-text">{message.text}</div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
