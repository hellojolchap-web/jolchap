import { getSettings, getCategories } from "@/lib/queries";
import { MenuBuilder } from "./MenuBuilder";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const [settings, categories] = await Promise.all([getSettings(), getCategories()]);
  return <MenuBuilder initial={settings} categories={categories} />;
}
