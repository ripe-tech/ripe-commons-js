export const getRipePulseOptions = (environment, fallback = {}) => {
    switch (environment) {
        case "ci":
        case "test":
            return {
                url: "https://ripe-pulse-ci.platforme.com/"
            };
        case "now":
        case "now-branch":
            return {
                url: "https://ripe-pulse-now.platforme.com/"
            };
        case "sandbox":
            return {
                url: "https://ripe-pulse-sbx.platforme.com/"
            };
        case "stage":
            return {
                url: "https://ripe-pulse-stage.platforme.com/"
            };
        case "production":
            return {
                url: "https://pulse.platforme.com/"
            };
        default:
            return fallback
    }
};
