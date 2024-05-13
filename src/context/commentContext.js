import React, { createContext, useState, useContext } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider for the context
export const CommentProvider = ({ children }) => {
    /* Initialize the list of video IDs for which a comment was posted */
    const [commentPostedVideoIds, setCommentPostedVideoIds] = useState([]);

    /* Initialize the list of deleted commentIDs */
    const [commentIdDeleted, setCommentIdDeleted] = useState([]);

    return (
        <AppContext.Provider value={{
            commentPostedVideoIds,
            setCommentPostedVideoIds,
            commentIdDeleted,
            setCommentIdDeleted
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useCommentContext = () => useContext(AppContext);
