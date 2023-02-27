export default function useFiles() {
  const { $config } = useNuxtApp()

  function fileUrl(fileId) {
    return `${$config.directusUrl}/assets/${fileId}`
  }

  return {
    fileUrl,
  }
}
