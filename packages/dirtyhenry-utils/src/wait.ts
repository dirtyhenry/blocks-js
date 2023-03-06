export const wait = (durationInMilliSeconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), durationInMilliSeconds);
  });
};
