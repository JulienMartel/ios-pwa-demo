function urlBase64ToUint8Array(b64String: string) {
  const base64 = b64String
    .padEnd(b64String.length + ((4 - (b64String.length % 4)) % 4), "=")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = Buffer.from(base64, "base64").toString("binary");
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
}

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_VAPID_PUBLIC_KEY not set");
}

export const pushSubscriptionOpts: PushSubscriptionOptionsInit = {
  applicationServerKey: urlBase64ToUint8Array(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  ),
  userVisibleOnly: true,
};
