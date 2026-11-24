import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the configured base (needed for GitHub project sites). */
export function url(path = '/'): string {
  if (!path) return '';
  if (/^([a-z]+:|\/\/|#)/i.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Published projects, newest first. */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
}
