const DEFAULT_APPLE_APP_ID = "2P9S4R6AY3.com.caiquegl22.appconfraria";

export function appleAppSiteAssociation() {
  const appId = process.env.APPLE_APP_ID?.trim() || DEFAULT_APPLE_APP_ID;

  return {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [appId],
          components: [
            {
              "/": "/events/*",
              comment: "Eventos compartilhados",
            },
          ],
        },
        {
          appID: appId,
          paths: ["/events/*"],
        },
      ],
    },
  };
}

export function appleAppSiteAssociationResponse() {
  return Response.json(appleAppSiteAssociation(), {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Type": "application/json",
    },
  });
}
