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
        case "localhost":
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
        case "localhost":
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

export const getRipeWhiteOptions = (environment, fallback = {}) => {
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
        case "localhost":
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
                baseUrl: "https://white.platforme.com/"
            };
        default:
            return fallback;
    }
};

export const getRipeWhiteAdminOptions = (environment, fallback = {}) => {
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
        case "localhost":
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

export const getRipeConfigOptions = (environment, fallback = {}) => {
    switch (environment) {
        case "ci":
        case "test":
        case "localhost":
        case "now":
        case "now-branch":
        case "sandbox":
        case "stage":
            return {
                url: "https://master--ripe-config.netlify.app/"
            };
        case "production":
            return {
                url: "https://config.platforme.com/"
            };
        default:
            return fallback;
    }
};

export const getRipeConfigPublicOptions = (environment, fallback = {}) => {
    switch (environment) {
        case "ci":
        case "test":
        case "now":
        case "now-branch":
        case "localhost":
        case "sandbox":
        case "stage":
            return {
                url: "https://master--ripe-config-public.netlify.app/"
            };
        case "production":
            return {
                url: "https://config-public.platforme.com/"
            };
        default:
            return fallback;
    }
};
