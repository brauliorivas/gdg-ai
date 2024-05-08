"use server";

import { redirect } from "next/navigation";

export async function navigate(id) {
  redirect(`/company/${id}`);
}
