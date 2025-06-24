import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getContentBySlug(type: 'services' | 'blog', slug: string) {
  const contentPath = path.join(process.cwd(), 'content', type, `${slug}.mdx`)
  
  if (!fs.existsSync(contentPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(contentPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...data,
    content,
    slug
  }
}

export async function getAllContent(type: 'services' | 'blog') {
  const contentDir = path.join(process.cwd(), 'content', type)
  
  if (!fs.existsSync(contentDir)) {
    return []
  }
  
  const files = fs.readdirSync(contentDir)
  
  const content = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '')
        return getContentBySlug(type, slug)
      })
  )
  
  return content.filter(Boolean)
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/g).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}