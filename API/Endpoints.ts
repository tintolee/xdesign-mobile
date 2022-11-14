import {Endpoint} from '../types/types';

export const BASE_URL = 'https://api.spacexdata.com/v3';

export const LAUNCHES: Endpoint = {
  url: `${BASE_URL}/launches?limit=#{0}&offset=#{1}&order=#{2}&launch_year=#{3}`,
  method: 'GET',
};

export const LAUNCH: Endpoint = {url: `${BASE_URL}/launches/#{0}`, method: 'GET'};

export const LATEST_LAUNCH: Endpoint = {url: `${BASE_URL}/launches/latest`, method: 'GET'};

export const NEXT_LAUNCH: Endpoint = {url: `${BASE_URL}/launches/next`, method: 'GET'};
