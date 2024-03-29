/* tslint:disable */
/* eslint-disable */
/**
 * ExperimentManagement API
 * ExperimentManagement API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AllDataDto,
  CourseDto,
  ExperimentContentDto,
  ExperimentDto,
} from '../models/index';
import {
    AllDataDtoFromJSON,
    AllDataDtoToJSON,
    CourseDtoFromJSON,
    CourseDtoToJSON,
    ExperimentContentDtoFromJSON,
    ExperimentContentDtoToJSON,
    ExperimentDtoFromJSON,
    ExperimentDtoToJSON,
} from '../models/index';

export interface CreateCourseRequest {
    courseDto: CourseDto;
}

export interface CreateExperimentRequest {
    experimentDto: ExperimentDto;
}

export interface CreateExperimentContentRequest {
    experimentContentDto: ExperimentContentDto;
}

export interface DeleteCourseRequest {
    id: number;
}

export interface DeleteExperimentRequest {
    id: number;
}

export interface DeleteExperimentContentRequest {
    id: number;
}

export interface ExportDataRequest {
    type: string;
    courseIds?: Array<number>;
    experimentIds?: Array<number>;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * POST courses/add
     */
    async createCourseRaw(requestParameters: CreateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CourseDto>> {
        if (requestParameters['courseDto'] == null) {
            throw new runtime.RequiredError(
                'courseDto',
                'Required parameter "courseDto" was null or undefined when calling createCourse().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/courses/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CourseDtoToJSON(requestParameters['courseDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CourseDtoFromJSON(jsonValue));
    }

    /**
     * POST courses/add
     */
    async createCourse(requestParameters: CreateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseDto> {
        const response = await this.createCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST experiments/add
     */
    async createExperimentRaw(requestParameters: CreateExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExperimentDto>> {
        if (requestParameters['experimentDto'] == null) {
            throw new runtime.RequiredError(
                'experimentDto',
                'Required parameter "experimentDto" was null or undefined when calling createExperiment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/experiments/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExperimentDtoToJSON(requestParameters['experimentDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExperimentDtoFromJSON(jsonValue));
    }

    /**
     * POST experiments/add
     */
    async createExperiment(requestParameters: CreateExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExperimentDto> {
        const response = await this.createExperimentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * POST experiment-contents/add
     */
    async createExperimentContentRaw(requestParameters: CreateExperimentContentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExperimentContentDto>> {
        if (requestParameters['experimentContentDto'] == null) {
            throw new runtime.RequiredError(
                'experimentContentDto',
                'Required parameter "experimentContentDto" was null or undefined when calling createExperimentContent().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/experiment-contents/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExperimentContentDtoToJSON(requestParameters['experimentContentDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExperimentContentDtoFromJSON(jsonValue));
    }

    /**
     * POST experiment-contents/add
     */
    async createExperimentContent(requestParameters: CreateExperimentContentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExperimentContentDto> {
        const response = await this.createExperimentContentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * DELETE courses/delete/{id}
     */
    async deleteCourseRaw(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteCourse().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/courses/delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * DELETE courses/delete/{id}
     */
    async deleteCourse(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        const response = await this.deleteCourseRaw(requestParameters, initOverrides);
    }

    /**
     * DELETE experiments/delete/{id}
     */
    async deleteExperimentRaw(requestParameters: DeleteExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteExperiment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments/delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * DELETE experiments/delete/{id}
     */
    async deleteExperiment(requestParameters: DeleteExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        const response = await this.deleteExperimentRaw(requestParameters, initOverrides);
    }

    /**
     * DELETE experiment-contents/delete/{id}
     */
    async deleteExperimentContentRaw(requestParameters: DeleteExperimentContentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteExperimentContent().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiment-contents/delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * DELETE experiment-contents/delete/{id}
     */
    async deleteExperimentContent(requestParameters: DeleteExperimentContentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        const response = await this.deleteExperimentContentRaw(requestParameters, initOverrides);
    }

    /**
     * GET export/{type}
     */
    /**
     * Builds the URL for exporting data based on request parameters.
     */
    async buildExportDataUrl(requestParameters: ExportDataRequest): Promise<string> {
        // Ensure required parameter 'type' is not null or undefined.
        if (requestParameters['type'] == null) {
            throw new Error('Required parameter "type" was null or undefined when building URL for exportData().');
        }

        // Base URL path
        let urlPath = `/export/{type}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters['type'])));

        // Initialize query parameters
        const queryParameters: any = {};

        if (requestParameters['courseIds'] != null) {
            queryParameters['courseIds'] = requestParameters['courseIds'];
        }

        if (requestParameters['experimentIds'] != null) {
            queryParameters['experimentIds'] = requestParameters['experimentIds'];
        }

        // Build query string from queryParameters
        const queryString = Object.entries(queryParameters)
            .map(([key, value]) => {
                // 检查 value 是否是 string, number 或 boolean 类型
                // 如果是, 直接使用
                // 如果不是, 可以转换成字符串，或者使用默认值
                let safeValue;
                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    safeValue = value;
                } else {
                    // 根据你的需求处理非预期类型的情况
                    // 例如，可以转换成字符串，或者使用一个默认值
                    // 这里我们选择将 value 转换为字符串
                    safeValue = String(value);
                }

                return `${encodeURIComponent(key)}=${encodeURIComponent(safeValue)}`;
            })
            .join('&');


        // Construct full URL
        const fullUrl = `${urlPath}${queryString ? `?${queryString}` : ''}`;

        // Return the constructed URL
        return fullUrl;
    }

    /**
     * A simplified function that returns the URL string instead of making an API call.
     */
    async exportDataUrl(requestParameters: ExportDataRequest): Promise<string> {
        return this.buildExportDataUrl(requestParameters);
    }

    /**
     * GET data/all
     */
    async getAllDataRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AllDataDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/data/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AllDataDtoFromJSON(jsonValue));
    }

    /**
     * GET data/all
     */
    async getAllData(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AllDataDto> {
        const response = await this.getAllDataRaw(initOverrides);
        return await response.value();
    }

}
