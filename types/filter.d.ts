/* eslint-disable camelcase */
export type FilterParams = {
    "filters[]": string[];
    filter_operator: string;
    token: string;
    number_records: number;
    start_record: number;
    sort?: string;
};
/* eslint-enable camelcase */

export declare function filterToParams(
    options: Record<string, unknown>,
    nameAlias: Record<string, string>,
    nameFunc: Record<string, () => unknown>,
    filterFields: Record<string, string>,
    keywordFields: Record<string, string[]>,
    {
        imperfectFilterFields,
        keywords
    }: {
        imperfectFilterFields: Record<string, string>;
        keywords: Record<string, () => unknown>;
    } = {},
    removeFunc: Record<string, () => boolean>
): FilterParams;
