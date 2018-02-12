/*
Author: Gokturk Enez
Mail: hi@gokturkenez.com.tr
Description: PayU Turkey ALU v3 Node JS Sample Code
*/

var EndPointUrl = 'https://secure.payu.com.tr/order/alu/v3';

SecretKey = 'SECRET_KEY';


var moment = require('moment');
date = moment.utc().format('YYYY-MM-DD HH:mm:ss').toString();
ORDER_REF = Math.floor(Math.random() * Math.floor(1000));


var array = {
    'MERCHANT': "OPU_TEST",
    'LANGUAGE': "TR",
    'ORDER_DATE': date,
    'PAY_METHOD': "CCVISAMC",
    'BACK_REF': "http://www.backref.com.tr",
    'PRICES_CURRENCY': "TRY",
    'SELECTED_INSTALLMENTS_NUMBER': "1",
    'ORDER_SHIPPING': "5",
    'CLIENT_IP': "127.0.0.1",
    'ORDER_REF': "Test"+ORDER_REF,

    'ORDER_PNAME[0]':'Test Ürünü',
    'ORDER_PCODE[0]':'Test Kodu',
    'ORDER_PINFO[0]':'Test Açıklaması',
    'ORDER_PRICE[0]':'5',
    'ORDER_VAT[0]':'18',
    'ORDER_PRICE_TYPE[0]':'NET',
    'ORDER_QTY[0]':'1',

    'ORDER_PNAME[1]':'Test Ürünü-2',
    'ORDER_PCODE[1]':'Test Kodu-2',
    'ORDER_PINFO[1]':'Test Açıklaması-2',
    'ORDER_PRICE[1]':'15',
    'ORDER_VAT[1]':'24',
    'ORDER_PRICE_TYPE[1]':'GROSS',
    'ORDER_QTY[1]':'3',

    'CC_NUMBER':'4355084355084358',
    'EXP_MONTH':'12',
    'EXP_YEAR':'2018',
    'CC_CVV':'000',
    'CC_OWNER':'000',

    'BILL_FNAME':'Ad',
    'BILL_LNAME':'Soyad',
    'BILL_EMAIL':'mail@mail.com',
    'BILL_PHONE':'02129003711',
    'BILL_FAX':'02129003711',
    'BILL_ADDRESS':'Birinci Adres satırı',
    'BILL_ADDRESS2':'İkinci Adres satırı',
    'BILL_ZIPCODE':'34000',
    'BILL_CITY':'ISTANBUL',
    'BILL_COUNTRYCODE':'TR',
    'BILL_STATE':'Ayazağa',

    'DELIVERY_FNAME':'Ad',
    'DELIVERY_LNAME':'Soyad',
    'DELIVERY_EMAIL':'mail@mail.com',
    'DELIVERY_PHONE':'02129003711',
    'DELIVERY_COMPANY':'PayU Ödeme Kuruluşu A.Ş.',
    'DELIVERY_ADDRESS':'Birinci Adres satırı',
    'DELIVERY_ADDRESS2':'İkinci Adres satırı',
    'DELIVERY_ZIPCODE':'34000',
    'DELIVERY_CITY':'ISTANBUL',
    'DELIVERY_STATE':'TR',
    'DELIVERY_COUNTRYCODE':'Ayazağa',

}

hashstring = '';
var sortKeys = require('sort-keys');
sorted = sortKeys(array)
for (var k in sorted) {
    hashstring += array[k].length + array[k] ;
}

var hash = require('crypto')
    , data = hashstring
    , secretkey = SecretKey;

signature = hash.createHmac('md5', secretkey).update(data).digest('hex');
array['ORDER_HASH'] = signature

var request = require("request");
request.post(EndPointUrl, {form:array}, function(error, response, body) {
    console.log(error);
    console.log(body);

});
