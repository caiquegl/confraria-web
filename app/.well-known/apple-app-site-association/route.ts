const appleAppId = process.env.APPLE_APP_ID;

export function GET() {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: appleAppId
          ? [
              {
                appID: appleAppId,
                paths: ["/events/*"],
              },
            ]
          : [],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
