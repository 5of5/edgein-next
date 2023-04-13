import { PlanTypes } from "@/utils/constants"


export const loadStripe = async (plan: PlanTypes = 'premium') => {
  try {
    const response = await fetch("/api/stripe_load/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });
    const json = await response.json();
    if (json && json.success && json.redirect) {
      window.location.href = json.redirect;
    }
  } catch (e) {
    console.log(e);
  }  
}
