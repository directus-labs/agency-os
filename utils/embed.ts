//Generate the Youtube, Vimeo, or Loom embed URL based on an URL from the user
export function generateVideoEmbed(url: string) {
  if (url.includes('youtube.com')) {
    return `https://www.youtube.com/embed/${url.split('v=')[1]}`
  }
  // Handle youtu.be links
  else if (url.includes('youtu.be')) {
    return `https://www.youtube.com/embed/${url.split('be/')[1]}`
  } else if (url.includes('vimeo.com')) {
    return `https://player.vimeo.com/video/${url.split('vimeo.com/')[1]}`
  } else if (url.includes('loom.com')) {
    return `https://www.loom.com/embed/${url.split('loom.com/share/')[1]}`
  } else {
    return url
  }
}
