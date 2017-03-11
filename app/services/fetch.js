'user-strict';
const baseUrl = 'https://woowha-1370.appspot.com/api';
const headers = new Headers({
  'Content-Type': 'application/json'
});

import {AsyncStorage} from 'react-native';

export async function send(url, method = 'GET', data = null, queryString = null, newHeaders = null) {
    method = method.toUpperCase();
    const request = {method: method};
    if(newHeaders)  request.headers = new Headers(newHeaders);
    else request.headers = headers;

    const token = await AsyncStorage.getItem('token');

    if(token) request.headers.set('Authorization', token);

    if(method === 'POST' || method === 'PUT') {
      if(!newHeaders) request.body = JSON.stringify(data);
      else request.body = data;
    }

    let requestUrl = `${baseUrl}${url}`;
    if(queryString) {
      requestUrl += '?';
      let params = Object.keys(queryString).map((key) => key + '=' + queryString[key]).join('&');
      requestUrl += params;
    }
    console.log(request);
    let httpRequest = new Request(requestUrl, request);
    try {
      let res = await fetch(httpRequest);
      return await res.json();
    } catch(err) {
      return err.json();
    }
}

export function setAuthToken(token) {
  headers.set('Authorization', token);
}

export default {
  send, setAuthToken
}