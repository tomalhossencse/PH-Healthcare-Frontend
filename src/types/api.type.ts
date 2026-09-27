export interface IMetaData {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}
export interface IApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: IMetaData;
    data: T;
}
