/**
 * Sends a simple message to Slack via [an incoming webhook](https://api.slack.com/messaging/webhooks).
 *
 * @param slackWebhook The Slack webhook URL
 * @param text The text to send
 */
export const notify = (slackWebhook: URL, text: string) => {
  fetch(slackWebhook.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      if (response.status >= 400) {
        console.error(`Status: ${response.status} ${response.statusText}`);
      } else {
        console.log(`Status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
