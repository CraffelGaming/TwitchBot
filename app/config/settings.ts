export default {
    hostname : "localhost",
    port : process.env.PORT ?? 443,
    secret: "LEFFARC",
    favicon: "/public/images/favicon.png",
    key : "/ssl/craffel.de_private_key.key",
    cert : "/ssl/craffel.de_ssl_certificate.cer"
}
