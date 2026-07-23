"use strict";

(() => {
    const TOKEN_PATTERN = /^(?:[0-9a-f]{2}){2,}$/i;

    /*
     * Each value has its own random XOR key stored in the first byte.
     * No email address or social destination appears in the HTML.
     */
    const SECURE_ACTIONS = Object.freeze({
        "sales-email-button": Object.freeze({
            type: "email",
            token: "e291838e8791a296918381908783968b8d8c91cc818dcc9883",
            subject: "The Scoop website enquiry"
        }),

        "facebook-button": Object.freeze({
            type: "external",
            token: "2149555551521b0e0e5656560f47404244434e4e4a0f424e4c0e51444e514d440e7572600c6253444055484e4f520c7155580c6d55450e1011111117161519181014151318120e",
            allowedHost: "www.facebook.com"
        }),

        "tiktok-button": Object.freeze({
            type: "external",
            token: "7c1408080c0f4653530b0b0b52081517081317521f1311533c0f14190e121d1d065217141d1243230e414d5a230841262f5145444b3d4b160c484e3610",
            allowedHost: "www.tiktok.com"
        })
    });

    /**
     * Decode a randomly keyed XOR/hex token.
     *
     * This raises the cost of generic scraping, but it remains frontend
     * obfuscation rather than encryption because the browser receives both
     * the token and the decoder.
     */
    function decodeToken(token) {
        if (
            typeof token !== "string" ||
            !TOKEN_PATTERN.test(token)
        ) {
            throw new TypeError("Invalid secure-action token");
        }

        const key = Number.parseInt(token.slice(0, 2), 16);
        const decoded = new Uint8Array((token.length - 2) / 2);

        for (let index = 0; index < decoded.length; index += 1) {
            const offset = 2 + (index * 2);
            const encodedByte = Number.parseInt(
                token.slice(offset, offset + 2),
                16
            );

            decoded[index] = encodedByte ^ key;
        }

        return new TextDecoder("utf-8", {
            fatal: true
        }).decode(decoded);
    }

    function openEmail(action) {
        const address = decodeToken(action.token);
        const subject = encodeURIComponent(action.subject);

        /*
         * The decoded address is kept out of visible text, href attributes,
         * data-* attributes and the rendered DOM.
         */
        window.location.assign(
            `mailto:${address}?subject=${subject}`
        );
    }

    function openExternal(action) {
        const decodedValue = decodeToken(action.token);
        const destination = new URL(decodedValue);

        /*
         * Reject malformed or modified tokens that do not resolve to the
         * explicitly expected HTTPS hostname.
         */
        if (
            destination.protocol !== "https:" ||
            destination.hostname !== action.allowedHost
        ) {
            throw new Error("Rejected unexpected external destination");
        }

        /*
         * The URL is decoded only inside this trusted activation handler.
         * noopener and noreferrer isolate the newly opened page.
         */
        window.open(
            destination.href,
            "_blank",
            "noopener,noreferrer"
        );
    }

    function handleSecureAction(event, action) {
        /*
         * Blocks ordinary script-generated clicks such as element.click() and
         * dispatchEvent(). Full browser automation can still create trusted
         * interaction, so this is an extra barrier rather than authentication.
         */
        if (!event.isTrusted) {
            return;
        }

        try {
            switch (action.type) {
                case "email":
                    openEmail(action);
                    break;

                case "external":
                    openExternal(action);
                    break;

                default:
                    throw new Error("Unsupported secure action");
            }
        } catch (error) {
            console.error(
                "The requested action could not be opened.",
                error
            );
        }
    }

    function initialiseSecureActions() {
        for (const [elementId, action] of Object.entries(SECURE_ACTIONS)) {
            const element = document.getElementById(elementId);

            if (!element) {
                continue;
            }

            element.addEventListener(
                "click",
                (event) => handleSecureAction(event, action)
            );
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseSecureActions,
            { once: true }
        );
    } else {
        initialiseSecureActions();
    }
})();
