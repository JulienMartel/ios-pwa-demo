import { sendNotification } from "@/actions";

type Props = { subId: string };

export default async function Registered({ subId }: Props) {
  return (
    <>
      <form action={sendNotification.bind(null, subId)}>
        <button
          className="rounded bg-zinc-700 text-white px-4 py-1"
          type="submit"
        >
          Send Notification
        </button>
      </form>
      <code className="text-zinc-400 text-xs text-center">{subId}</code>
    </>
  );
}
