import { getCollection } from 'astro:content';

function isArchivedPath(id: string): boolean {
  return id.split('/').includes('archive');
}

export function getPublicBlogPosts() {
  return getCollection('blog', ({ id }) => !isArchivedPath(id));
}

export function getPublicProjects() {
  return getCollection('projects', ({ id, data }) => !data.draft && !isArchivedPath(id));
}
