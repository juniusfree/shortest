"use server";

import { redirect } from "next/navigation";
import { createCheckoutSession, createCustomerPortalSession } from "./stripe";
import { currentUser } from "@clerk/nextjs";

export const checkoutAction = async (formData) => {
  const user = await currentUser();
  const priceId = formData.get("priceId") as string;
  await createCheckoutSession({ team: user, priceId });
};

export const customerPortalAction = async () => {
  const user = await currentUser();
  const portalSession = await createCustomerPortalSession(user);
  redirect(portalSession.url);
};
