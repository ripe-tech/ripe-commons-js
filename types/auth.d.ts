/* eslint-disable camelcase */
export type RipeAccount = {
    username?: string;
    email?: string;
    github_login?: string;
    description?: string;
    google_id?: string;
    created?: number;
    modified?: number;
    enabled?: boolean;
    avatar_url?: string;
    twitter_username?: string;
    meta?: {
        brand_t?: string | string[];
        phone_number?: string;
        linkedin_username?: string;
        name?: string;
        company_url?: string;
        company?: string;
        twitter_username?: string;
        github_username?: string;
        birth_date?: string;
        position?: string;
        nationality?: string;
        [x: string]: unknown;
    };
    last_login?: number;
    roles?: number[];
    facebook_id?: string;
    live_id?: string;
    type?: number;
    id?: number;
};
/* eslint-enable camelcase */

export type RipeAcl = {
    acl: string[];
    tokens: string[];
};

export type RipeAuth = {
    account: RipeAccount;
    acl: RipeAcl;
};

export declare function getRipeAuth(req: unknown): RipeAuth;
export declare function getReqToken(req: unknown): string;
