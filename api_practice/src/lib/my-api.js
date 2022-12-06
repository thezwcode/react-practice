const FIREBASE_DOMAIN =
  "https://react-guide-b3165-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];
  for (const key in data) {
    const quoteObj = { id: key, ...data[key] };
    transformedQuotes.push(quoteObj);
  }
  return transformedQuotes;
};

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add quote.");
  }

  return null;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.message || "Could not get this quote.");
  }

  const loadedQuote = { id: quoteId, ...data };
  return loadedQuote;
}

export async function getAllComments(quoteId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/quotes/${quoteId}/comments.json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.message || "Could not get comments for this quote.");
  }

  const transformedComments = [];
  for (const key in data) {
    const commentObj = { id: key, ...data[key] };
    transformedComments.push(commentObj);
  }
  return transformedComments;
}

export async function addComment(commentData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/quotes/${commentData.quoteId}/comments.json`,
    {
      method: "POST",
      body: JSON.stringify(commentData.comment),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw Error(data.message || "Could not add comment.");
  }

  return null;
}
