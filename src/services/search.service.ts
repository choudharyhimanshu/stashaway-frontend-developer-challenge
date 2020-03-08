import { ISearchItem } from '../models/SearchItem';
import to from 'await-to-js';
import { ISearchResponse } from '../models/SearchResponse';

class SearchService {
    private apiBase: string;

    constructor(apiBaseUrl: string) {
        this.apiBase = apiBaseUrl;
    }

    static handleErrorResponse(response: Response): Promise<string> {
        switch (response.status) {
            case 404:
                return Promise.reject(
                    '[API] 404: The server can not find the requested resource.'
                );
            case 500:
                return Promise.reject(
                    '[API] 500: The server met an unexpected condition.'
                );
            default:
                return Promise.reject(
                    `[API] ${response.status}: ${response.statusText}`
                );
        }
    }

    async fetchAllItems(): Promise<ISearchItem[]> {
        const url = new URL(`${this.apiBase}`);

        const response = await fetch(url.toString(), {
            method: 'GET'
        });

        return new Promise<ISearchItem[]>(async (resolve, reject) => {
            if (response && response.ok) {
                const [error, responseBody] = await to<ISearchResponse[]>(
                    response.json()
                );

                if (responseBody) {
                    resolve(
                        responseBody.map((item, index) => {
                            const topTen = item['Top Ten'];
                            return {
                                id: index,
                                variety: item['Variety'],
                                brand: item['Brand'],
                                style:
                                    item['Style'] !== 'NaN'
                                        ? item['Style']
                                        : undefined,
                                country: item['Country'],
                                stars:
                                    item['Stars'] !== 'NaN'
                                        ? Number(item['Stars'])
                                        : undefined,
                                topYear:
                                    topTen !== 'NaN'
                                        ? Number(topTen.split(' ')[0])
                                        : undefined,
                                topRank:
                                    topTen !== 'NaN'
                                        ? Number(topTen.split(' ')[1].slice(1))
                                        : undefined
                            };
                        })
                    );
                } else {
                    reject(error);
                }
            } else {
                reject(SearchService.handleErrorResponse(response));
            }
        });
    }
}

export default new SearchService('http://starlord.hackerearth.com/TopRamen');
