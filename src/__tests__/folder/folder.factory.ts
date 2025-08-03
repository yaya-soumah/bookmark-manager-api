export const folderFactory = (override?: any) => {
  return {
    name: 'my favorites',
    ...override,
  }
}
