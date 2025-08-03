export const bookmarkFactory = (override?: any) => {
  return {
    title: 'My Docs',
    url: 'https://search.example.com',
    ...override,
  }
}
