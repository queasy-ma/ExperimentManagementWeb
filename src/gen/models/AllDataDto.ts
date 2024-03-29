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

import { mapValues } from '../runtime';
import type { CourseDto } from './CourseDto';
import {
    CourseDtoFromJSON,
    CourseDtoFromJSONTyped,
    CourseDtoToJSON,
} from './CourseDto';

/**
 * 
 * @export
 * @interface AllDataDto
 */
export interface AllDataDto {
    /**
     * 
     * @type {Array<CourseDto>}
     * @memberof AllDataDto
     */
    courses?: Array<CourseDto>;
}

/**
 * Check if a given object implements the AllDataDto interface.
 */
export function instanceOfAllDataDto(value: object): boolean {
    return true;
}

export function AllDataDtoFromJSON(json: any): AllDataDto {
    return AllDataDtoFromJSONTyped(json, false);
}

export function AllDataDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllDataDto {
    if (json == null) {
        return json;
    }
    return {
        
        'courses': json['courses'] == null ? undefined : ((json['courses'] as Array<any>).map(CourseDtoFromJSON)),
    };
}

export function AllDataDtoToJSON(value?: AllDataDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'courses': value['courses'] == null ? undefined : ((value['courses'] as Array<any>).map(CourseDtoToJSON)),
    };
}

