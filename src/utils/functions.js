/* eslint-disable no-param-reassign */
export const cleanResponse = (response) => {
  let cleaned;
  if (Array.isArray(response)) {
    cleaned = [...response];
    cleaned.forEach((doc) => {
      doc.id = doc._id;
      delete doc._id;
      delete doc.__v;
    });
  } else {
    cleaned = { ...response };
    cleaned.id = cleaned._id;
    delete cleaned._id;
    delete cleaned.__v;
  }

  return cleaned;
};

export const tempFunc = () => null;
