export async function addToWL(coin: any, user: any) {
  const response = await fetch(`/api/watchList/add`, {
    method: "POST",
    body: JSON.stringify({
      coin,
      user,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await response.json();
  return getWL(user);
}
export async function removeFromWL(coin: any, user: any) {
  const response = await fetch(`/api/watchList/remove`, {
    method: "POST",
    body: JSON.stringify({
      coin,
      user,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.json();
  return getWL(user);
}
export async function getWL(user: any) {
  const response = await fetch(`/api/watchList/get`, {
    method: "POST",
    body: JSON.stringify({
      user,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.watchListCoins;
}
