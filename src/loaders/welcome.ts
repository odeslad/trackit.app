export const Loader = async () => {
  const date = new Date();
  return { message: `Flight Status ready from loader at ${date.toISOString()}` };
}