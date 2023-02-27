export default defineEventHandler((event) => {
  const query = useQuery(event)
  return {
    data: `Hello ${query.name} 👋`,
  }
})
