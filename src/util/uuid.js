const UUID_PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

export const uuid = () => {
  return UUID_PATTERN.replace(/[xy]/g, (c) => {
    const r = ((Math.random() * 16) | 0);
    const v = (c === 'x') ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};
