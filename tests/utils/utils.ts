export const generateUniqueEmail = () => {
  const timestamp = new Date().getTime();
  const uniqueEmail = `user_${timestamp}@example.com`;
  return uniqueEmail;
};
