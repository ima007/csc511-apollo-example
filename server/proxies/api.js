'use strict';

const proxyPath = '/api';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  //let proxy = require('http-proxy').createProxyServer({});
  /*
  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader(
      'Authorization',
      'Bearer EHzXnG2FpEPqKFgSMR5M6gN_lKrSdMIPcf0bDSqFrqTuixEIN2hM3a8BoAqlB-8jK66xSSSCx3L9yDKZlU_XtRWxPbvy0l4GqzRAzD6Es0FD1Kh1Vz4fNhxmSJ2XXXYx'
    );
    proxyReq.setHeader('Content-Type', 'application/graphql');
    proxyReq.setHeader('Origin', 'https://api.yelp.com/v3/graphql');
  });
*/

  const express = require('express');
  const curlRequest = require('curl-request');
  app.use(express.json());
  app.post(proxyPath, function(req, res, next) {
    // include root path in proxied request
    req.url = proxyPath + '/' + req.url;

    const curl = new curlRequest();
    console.log('=======');
    console.log(req.body);
    console.log(req.body.variables);
    req.body.variables = JSON.stringify(req.body.variables);
    console.log('========');
    curl
      .setHeaders([
        'Authorization: Bearer EHzXnG2FpEPqKFgSMR5M6gN_lKrSdMIPcf0bDSqFrqTuixEIN2hM3a8BoAqlB-8jK66xSSSCx3L9yDKZlU_XtRWxPbvy0l4GqzRAzD6Es0FD1Kh1Vz4fNhxmSJ2XXXYx'
      ])
      .setBody(req.body)
      .post('https://api.yelp.com/v3/graphql')
      .then(({ statusCode, body, headers }) => {
        //res.json(body);
        res.send(body);
        console.log(statusCode, body, headers);
      })
      .catch(e => {
        console.log(e);
      });

    //req.url = 'https://api.yelp.com/v3/graphql';
    //console.log(req.url);
    //req.headers['Authorization'] =
    //'Bearer EHzXnG2FpEPqKFgSMR5M6gN_lKrSdMIPcf0bDSqFrqTuixEIN2hM3a8BoAqlB-8jK66xSSSCx3L9yDKZlU_XtRWxPbvy0l4GqzRAzD6Es0FD1Kh1Vz4fNhxmSJ2XXXYx';
    /*proxy.web(req, res, {
      changeOrigin: true,
      target: 'https://api.yelp.com/v3/graphql'
    });*/
  });
};
