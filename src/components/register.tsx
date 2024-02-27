"use client";

import { saveSubscription } from "@/actions";
import { pushSubscriptionOpts } from "@/utils";
import { useEffect, useState } from "react";

export default function Register() {
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    (async function registerServiceWorker() {
      if (!("serviceWorker" in navigator)) {
        return;
      }

      const sw = await navigator.serviceWorker.register("/service-worker.js");
      setSwRegistration(sw);
    })();
  }, []);

  const onClick = async () => {
    const result = await window.Notification.requestPermission();
    console.log(result);

    if (result !== "granted" || swRegistration === null) {
      return alert("You must grant permission to send notifications.");
    }

    const subscription = await swRegistration.pushManager.subscribe(
      pushSubscriptionOpts
    );

    await saveSubscription(subscription);
  };

  return (
    <button
      className="rounded bg-zinc-700 text-white px-4 py-1"
      onClick={onClick}
    >
      Subscribe
    </button>
  );
}
