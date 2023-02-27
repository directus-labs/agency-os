import { slugify } from './strings'

// Generate table of contents from an HTML string
export function generateToc(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3')
  const toc = []
  headings.forEach((heading) => {
    const id = slugify(heading.innerText)
    const text = heading.innerText
    const depth = heading.tagName.toLowerCase()
    toc.push({ id, text, depth })
  })
  return toc
}

// Add IDs to headings in an HTML string
export function addHeadings(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3')
  headings.forEach((heading) => {
    const id = slugify(heading.innerText)
    heading.id = id
  })
  return doc.body.innerHTML
}
