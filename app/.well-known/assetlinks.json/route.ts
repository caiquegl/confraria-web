const packageName =
  process.env.ANDROID_PACKAGE_NAME ?? "com.caiquegl22.appconfraria";
const fingerprints = (process.env.ANDROID_SHA256_CERT_FINGERPRINTS ?? "")
  .split(",")
  .map((fingerprint) => fingerprint.trim())
  .filter(Boolean);

export function GET() {
  return Response.json(
    fingerprints.map((fingerprint) => ({
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageName,
        sha256_cert_fingerprints: [fingerprint],
      },
    })),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
