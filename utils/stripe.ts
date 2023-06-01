export const loadStripe = async () => {
  try {
    const response = await fetch('/api/stripe-load/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json && json.success && json.redirect) {
      window.location.href = json.redirect;
    }
  } catch (e) {
    console.log(e);
  }
};
