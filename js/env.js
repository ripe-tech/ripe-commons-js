export const getRipeCoreOptions = (environment, fallback = {}) => {
    switch (environment) {
        case "ci":
        case "test":
            return {
                url: "https://ripe-core-ci.platforme.com/api/",
                webUrl: "https://ripe-core-ci.platforme.com/"
            };
        case "now":
        case "now-branch":
            return {
                url: "https://ripe-core-now.platforme.com/api/",
                webUrl: "https://ripe-core-now.platforme.com/"
            };
        case "sandbox":
            return {
                url: "https://ripe-core-sbx.platforme.com/api/",
                webUrl: "https://ripe-core-sbx.platforme.com/"
            };
        case "stage":
            return {
                url: "https://ripe-core-stage.platforme.com/api/",
                webUrl: "https://ripe-core-stage.platforme.com/"
            };
        case "production":
            return {
                url: "https://api.platforme.com/api/",
                webUrl: "https://api.platforme.com/"
            };
        default:
            return fallback;
    }
};

export const getRipeIdOptions = (environment, fallback) => {
    switch (environment) {
        case "now-branch":
            return {
                clientId: "3b7f6c17f5047b341f1f79a67c153dc0",
                clientSecret: "752ec9a665655836540b35bc4e5de5bc7166075f7762256f21ee7e967349712c",
                redirectUrl: `${window.location.protocol}//${window.location.hostname}/oauth`
            };
        case "localhost":
            return {
                clientId: "3b7f6c17f5047b341f1f79a67c153dc0",
                clientSecret: "752ec9a665655836540b35bc4e5de5bc7166075f7762256f21ee7e967349712c",
                redirectUrl: `http://localhost:${window.location.port}/oauth`
            };
        default:
            return fallback;
    }
};

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
            return fallback;
    }
};

export const getRipeWhiteAdminOptions = (environment, fallback) => {
    switch (environment) {
        case "ci":
        case "test":
            return {
                baseUrl: "https://ripe-white-admin-ci.platforme.com/"
            };
        case "now":
        case "now-branch":
            return {
                baseUrl: "https://ripe-white-admin-sbx.platforme.com/"
            };
        case "sandbox":
            return {
                baseUrl: "https://ripe-white-admin-sbx.platforme.com/"
            };
        case "stage":
            return {
                baseUrl: "https://ripe-white-admin-stage.platforme.com/"
            };
        case "production":
            return {
                baseUrl: "https://white-admin.platforme.com/"
            };
        default:
            return fallback;
    }
};

export const getRipeWhiteOptions = (environment, fallback) => {
    switch (environment) {
        case "ci":
        case "test":
            return {
                baseUrl: "https://ripe-white-ci.platforme.com/"
            };
        case "now":
        case "now-branch":
            return {
                baseUrl: "https://ripe-white-now.platforme.com/"
            };
        case "sandbox":
            return {
                baseUrl: "https://ripe-white-sbx.platforme.com/"
            };
        case "stage":
            return {
                baseUrl: "https://ripe-white-stage.platforme.com/"
            };
        case "production":
            return {
                baseUrl: "https://ripe-white.platforme.com/"
            };
        default:
            return fallback;
    }
};
