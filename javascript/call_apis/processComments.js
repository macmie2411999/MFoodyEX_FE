// -byMacMie

let processlistComments = {

    sortCommentsByRating: function (listComments) {
        // Sort the comments based on the ratingComment property in ascending order
        const sortedComments = listComments.sort((a, b) => a.ratingComment - b.ratingComment);

        // Return the sorted comments
        return sortedComments;
    },

    classifyCommentsByRating: function (listComments) {
        // Initialize an array to store comments based on rating
        const commentsByRating = [[], [], [], [], []];

        // Iterate through each comment in listComments
        for (const comment of listComments) {
            // Get the rating of the comment
            const rating = comment.ratingComment;

            // Add the comment to the array corresponding to the rating
            commentsByRating[rating - 1].push(comment);
        }

        // Return the array containing comments classified by rating
        return commentsByRating;
    },

    cutComments: function (listComments, n) {
        // Check if listComments has more than n elements
        if (listComments.length > n) {
            // Return an array containing the first n elements from listComments
            return listComments.slice(0, n);
        } else {
            // Return the original listComments if it has n or fewer elements
            return listComments;
        }
    },

    isArrayNull: function (arr) {
        return arr === null;
    },

    isArrayEmpty: function (arr) {
        return arr.length === 0;
    },

    isArrayNullOrEmpty: function (arr) {
        return arr === null || arr.length === 0;
    }

}