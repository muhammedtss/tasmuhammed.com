"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- PROJE (LAB) ---
export async function getProjects() {
  try { return await prisma.project.findMany({ orderBy: { createdAt: "desc" } }); } catch (e) { return []; }
}
export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const demoUrl = formData.get("demoUrl") as string;
  const imageUrl = formData.get("imageUrl") as string;
  await prisma.project.create({ data: { title, description, tags, repoUrl, demoUrl, imageUrl } });
  revalidatePath("/lab"); revalidatePath("/admin");
}
export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/lab"); revalidatePath("/admin");
}
export async function clapProject(id: string) {
  await prisma.project.update({ where: { id }, data: { claps: { increment: 1 } } });
  revalidatePath("/lab");
}

// --- TIMELINE ---
export async function getTimeline() {
  try { return await prisma.timelineItem.findMany({ orderBy: { order: "desc" } }); } catch (e) { return []; }
}
export async function createTimelineItem(formData: FormData) {
  const year = formData.get("year") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string) || 0;
  await prisma.timelineItem.create({ data: { year, title, description, order } });
  revalidatePath("/roadmap"); revalidatePath("/admin");
}
export async function deleteTimelineItem(id: string) {
  await prisma.timelineItem.delete({ where: { id } });
  revalidatePath("/roadmap"); revalidatePath("/admin");
}

// --- STACK ---
export async function getStack() {
  try { return await prisma.stackItem.findMany({ orderBy: { category: "asc" } }); } catch (e) { return []; }
}
export async function createStackItem(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  await prisma.stackItem.create({ data: { name, category, level } });
  revalidatePath("/stack"); revalidatePath("/admin");
}
export async function deleteStackItem(id: string) {
  await prisma.stackItem.delete({ where: { id } });
  revalidatePath("/stack"); revalidatePath("/admin");
}

// --- GUESTBOOK ---
export async function getGuestbookEntriesPublic() {
  try { return await prisma.guestbookEntry.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" }, take: 50 }); } catch (e) { return []; }
}
export async function getGuestbookEntriesAdmin() {
  try { return await prisma.guestbookEntry.findMany({ orderBy: { createdAt: "desc" } }); } catch (e) { return []; }
}
export async function createGuestbookEntry(formData: FormData) {
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  if (!author || !content) return { error: "Eksik bilgi" };
  await prisma.guestbookEntry.create({ data: { author, content, approved: false } });
  revalidatePath("/guestbook"); revalidatePath("/admin");
}
export async function toggleGuestbookEntry(id: string, currentStatus: boolean) {
  await prisma.guestbookEntry.update({ where: { id }, data: { approved: !currentStatus } });
  revalidatePath("/guestbook"); revalidatePath("/admin");
}
export async function deleteGuestbookEntry(id: string) {
  await prisma.guestbookEntry.delete({ where: { id } });
  revalidatePath("/guestbook"); revalidatePath("/admin");
}

// --- BLOG ---
export async function getPosts() {
  try { return await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }); } catch (e) { return []; }
}
export async function getPost(slug: string) {
  try { return await prisma.post.findUnique({ where: { slug } }); } catch (e) { return null; }
}
export async function getPostsAdmin() {
  try { return await prisma.post.findMany({ orderBy: { createdAt: "desc" } }); } catch (e) { return []; }
}
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const published = formData.get("published") === 'on';
  await prisma.post.create({ data: { title, content, slug, published } });
  revalidatePath("/blog"); revalidatePath("/admin");
}
export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog"); revalidatePath("/admin");
}
export async function clapPost(id: string) {
  await prisma.post.update({ where: { id }, data: { claps: { increment: 1 } } });
  revalidatePath("/blog");
}

// --- SUPPORTERS (TEŞEKKÜRLER) - İŞTE BU KISIM EKSİKTİ ---
export async function getSupporters() {
  try { return await prisma.supporter.findMany({ orderBy: { createdAt: "asc" } }); } catch (e) { return []; }
}
export async function createSupporter(formData: FormData) {
  const name = formData.get("name") as string;
  const note = formData.get("note") as string;
  const link = formData.get("link") as string;
  if (!name) return;
  await prisma.supporter.create({ data: { name, note: note || null, link: link || null } });
  revalidatePath("/"); revalidatePath("/admin");
}
export async function deleteSupporter(id: string) {
  await prisma.supporter.delete({ where: { id } });
  revalidatePath("/"); revalidatePath("/admin");
}

// --- PROFIL ---
export async function getProfile() {
  try { return await prisma.profile.findFirst(); } catch (e) { return null; }
}
export async function updateProfile(formData: FormData) {
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const location = formData.get("location") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const twitterUrl = formData.get("twitterUrl") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const buyMeACoffeeUrl = formData.get("buyMeACoffeeUrl") as string;
  const spotifySong = formData.get("spotifySong") as string;
  const spotifyArtist = formData.get("spotifyArtist") as string;
  const spotifyUrl = formData.get("spotifyUrl") as string;

  const existing = await prisma.profile.findFirst();
  const data = { headline, bio, imageUrl, location, githubUrl, linkedinUrl, twitterUrl, instagramUrl, buyMeACoffeeUrl, spotifySong, spotifyArtist, spotifyUrl };

  if (existing) { await prisma.profile.update({ where: { id: existing.id }, data }); } 
  else { await prisma.profile.create({ data }); }
  revalidatePath("/"); revalidatePath("/admin");
}