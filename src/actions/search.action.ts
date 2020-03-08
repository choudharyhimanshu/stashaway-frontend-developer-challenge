import { Dispatch } from 'react';
import to from 'await-to-js';

import { ISearchRequest } from '../models/SearchRequest';
import { ISearchItem } from '../models/SearchItem';
import searchService from '../services/search.service';

export enum ESearchActionType {
    FETCHING = 'SEARCH_FETCHING',
    SUCCESS = 'SEARCH_SUCCESS',
    ERROR = 'SEARCH_ERROR'
}

export interface ISearchActionData {
    searchResults?: ISearchItem[];
    errorMessage: string;
}

export interface ISearchAction {
    type: ESearchActionType;
    data: ISearchActionData;
}

export const fetchItems = (dispatch: Dispatch<ISearchAction>) => {
    return async (searchRequest: ISearchRequest) => {
        dispatch({
            type: ESearchActionType.FETCHING,
            data: { searchResults: [], errorMessage: '' }
        });

        const [error, response] = await to<ISearchItem[]>(
            searchService.fetchAllItems()
        );

        if (error) {
            dispatch({
                type: ESearchActionType.ERROR,
                data: { errorMessage: error.toString() }
            });
        } else {
            const filteredDocuments = response
                ? response.filter(item => {
                      if (
                          searchRequest.variety &&
                          !item.variety
                              .toLowerCase()
                              .includes(searchRequest.variety.toLowerCase())
                      ) {
                          return false;
                      }
                      if (
                          searchRequest.year &&
                          ((item.topYear &&
                              item.topYear !== Number(searchRequest.year)) ||
                              !item.topYear)
                      ) {
                          return false;
                      }
                      return true;
                  })
                : undefined;
            dispatch({
                type: ESearchActionType.SUCCESS,
                data: { searchResults: filteredDocuments, errorMessage: '' }
            });
        }
    };
};
