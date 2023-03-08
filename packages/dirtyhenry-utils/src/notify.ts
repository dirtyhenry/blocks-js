/**
 * Sends a simple message to Slack via [an incoming webhook](https://api.slack.com/messaging/webhooks).
 *
 * @param slackWebhook The Slack webhook URL
 * @param text The text to send
 */
export const notify = async (slackWebhook: URL, text: string) => {
  const response = await fetch(slackWebhook.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status >= 400) {
    console.error(`Status: ${response.status} ${response.statusText}`);
  }

  return response.status;
};
