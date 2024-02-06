import express from 'express';
import cors from 'cors';

// Выгрузки данных
// Раздел "Аналитика"
import dataExportBeverages from './data-export-beverages.mjs';
import dataExportCleanings from './data-export-cleanings.mjs';
// Раздел "Состояние оборудования"
import dataExportEvents from './data-export-events.mjs';
import dataExportTime from './data-export-time.mjs';
import dataUsers from './users.mjs';

import avatar from './avatar.mjs';

import entities from './entities.mjs';

// const express = require('express');
// const cors = require('cors');
const app = express();

// Временная переменная. Использую для подмены блокировки кофе-машины
let isBlocked = true;

// const dataExport = require('./data-export');

app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  console.clear();
  console.log("Filters:");
  console.log(req.body?.filter);
  next();
})
// app.use("/api", (req, res, next) => {
//   const { body } = req;
//   console.log(body);
//   next();
// });

const random = () => 1;
// const random = () => (Math.random() * 3 + 1) * 1000;

/*********************
 * AUTH
 *********************/
app.post("/api/login", async (req, res) => {
  const { step, phone, code, password } = req.body;

  console.log("Step:", step);
  console.log("Phone:", phone);
  console.log("Code:", code);
  console.log("Password:", password);

  /**
   * Успешная авторизация пользователя
   */
  const authorized = () => res.status(200).json({
    "user": {
      "firstName": "Николай",
      "lastName": "Лазарев",
      "email": "lazarev.n.f@outlook.com",
      "utc": "+03:00"
    },
    "token": "eyJpdiI6InUvQXgrQlFTVEV0NmJsMUVvWklqMFE9PSIsInZhbHVlIjoidGIzcVZsNktnNnVvcnpESzRvUThOL0ZsWDE1K0hYL255SGpvZ0FDRllRTVhiUSt4R0F0SHNHM1hhQUtaZFpXcTlxRktKTGFsemVQSUNRc2xMdWU0SDYzT0lGdVl5bUVpOHBDWGQ4TFJlSDhXTGRDZ2VNRXZyT3MyN3pweGxUWUoiLCJtYWMiOiJiMTY5ZGJkMzAyNDM1NTdiMmYzOTRhOThlODQ5MTA3Y2RiNzZlOTVjOGJjNzAxZmEzNzZjNjBjMTEwZmE0NWJmIiwidGFnIjoiIn0%3D"
  });

  /**
   * Валидация полей
   */
  if (!phone || phone.length !== 11) return res.status(400).json({
    inputField: "phone",
    error: `Неверный формат телефонного номера - ${phone}.`
  });

  /**
   * Логика каждой отдельной формы
   */
  if (step === 'phone') {

    if (phone !== "79685115871") return res.status(404).json({
      inputField: "phone",
      error: `Пользователь с номером ${phone} не найден в системе.`
    });
    if (phone === "79685115871" && !code && !password) return res.status(200).json({
      nextStep: "phone-sms-code",
      inputField: "code",
      message: `Код с подтверждением отправлен на номер: ${phone}.`
    });
    if (phone === "79685115871" && !code && !password) return res.status(200).json({
      nextStep: "phone-password",
      inputField: "password",
      message: `Введите пароль`
    });

  }
  else if (step === 'phone-password') {

    if (password && password !== 'aleph12345') return res.status(401).json({
      inputField: "password",
      error: "Неверный пароль.",
    });
    else return authorized();

  }
  else if (step === 'phone-sms-code') {
    
    if (phone === "79685115871" && code && code !== '12345') return res.status(401).json({
      inputField: "code",
      error: "Неверный код из SMS.",
    });
    if (phone === "79685115871" && !code) return res.status(200).json({
      nextStep: "phone-sms-code",
      inputField: "code",
      message: `Код с подтверждением отправлен на номер: ${phone}.`
    });
    else return authorized();

  }
  else return res.status(400).json({
    error: "Необходимо указать Step",
  });

  
});

app.post("/api/register", async (req, res) => {
  
});


/*********************
 * ENTITIES
 *********************/
app.get("/api/entities", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json(entities);
  // return res.json({
  //   /**
  //    * Кофе-машины возвращаются сейчас по другому интерфейсу.
  //    * Неактуальная JSON.
  //    */
  //   coffeeMachines: [
  //     { 
  //       id: 1,
  //       modelId: 1,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "21395",
  //     },
  //     { 
  //       id: 2,
  //       modelId: 2,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "21393",
  //     },
  //     { 
  //       id: 3,
  //       modelId: 4,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "4861",
  //     },
  //     { 
  //       id: 4,
  //       modelId: 8,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "7002",
  //     },
  //     { 
  //       id: 5,
  //       modelId: 3,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "3185",
  //     },
  //     { 
  //       id: 6,
  //       modelId: 5,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "12035",
  //     },
  //     { 
  //       id: 7,
  //       modelId: 7,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "18729",
  //     },
  //     { 
  //       id: 8,
  //       modelId: 6,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "18637",
  //     },
  //     { 
  //       id: 9,
  //       modelId: 1,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "12665",
  //     },
  //     { 
  //       id: 10,
  //       modelId: 2,
  //       businessUnitId: 1,
  //       name: "",
  //       finalName: "",
  //       code: "6999",
  //     },
  //   ],
  //   coffeeMachineModels: [
  //     { id: 1, name: "WMF 950 S" },
  //     { id: 2, name: "WMF 1100 S" },
  //     { id: 3, name: "WMF 1300 S" },
  //     { id: 4, name: "WMF 1500 S+" },
  //     { id: 5, name: "WMF 5000 S+" },
  //     { id: 6, name: "WMF 9000 S+" },
  //     { id: 7, name: "WMF 1500 F" },
  //     { id: 8, name: "WMF 9000 F" },
  //   ],
  //   businessUnits: [
  //     { id: 1, parentId: 0, name: "Центральный",     type: 3, chatTelegramId: "123" },
  //     { id: 2, parentId: 0, name: "Северо-Западный", type: 3, chatTelegramId: "123" },
  //     { id: 3, parentId: 0, name: "Южный",           type: 3, chatTelegramId: "123" },
  //     { id: 4, parentId: 0, name: "Приволжский",     type: 3, chatTelegramId: "123" },

  //     /**
  //      * Цвентральный федеральный округ
  //      */
  //     { id: 5, parentId: 1, name: "Москвоская область",    type: 2, chatTelegramId: "123" },
  //     { id: 6, parentId: 1, name: "Белгородская область",  type: 2, chatTelegramId: "123" },
  //     { id: 7, parentId: 1, name: "Владимирская область",  type: 2, chatTelegramId: "123" },

  //     // Города
  //     { id: 8, parentId: 5, name: "Москва",             type: 1, chatTelegramId: "123" },
  //     { id: 9, parentId: 5, name: "Химки",              type: 1, chatTelegramId: "123" },
  //     { id: 10, parentId: 5, name: "Краснознамеснк",    type: 1, chatTelegramId: "123" },
  //     { id: 11, parentId: 5, name: "Краснозаводск",     type: 1, chatTelegramId: "123" },

  //     { id: 12, parentId: 6, name: "Белгород",          type: 1, chatTelegramId: "123" },
  //     { id: 13, parentId: 6, name: "Алексеевка",        type: 1, chatTelegramId: "123" },
  //     { id: 14, parentId: 6, name: "Валуйки",           type: 1, chatTelegramId: "123" },

  //     { id: 15, parentId: 7, name: "Владимир",          type: 1, chatTelegramId: "123" },
  //     { id: 16, parentId: 7, name: "Ростов",            type: 1, chatTelegramId: "123" },
  //     { id: 17, parentId: 7, name: "Суздаль",           type: 1, chatTelegramId: "123" },

  //     // Рестораны
  //     { id: 1001, parentId: 8, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1002, parentId: 8, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1003, parentId: 9, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },
  //     { id: 1004, parentId: 9, name: "Бургер-3034",     type: 0, chatTelegramId: "123",  address: "наб. Ленина, 33" },
  //     { id: 1005, parentId: 10, name: "Бургер-1523",    type: 0, chatTelegramId: "123", address: "бульвар Славы, 60" },
  //     { id: 1006, parentId: 11, name: "Бургер-1418",    type: 0, chatTelegramId: "123", address: "пл. Гагарина, 23" },
  //     { id: 1007, parentId: 12, name: "Бургер-1486",    type: 0, chatTelegramId: "123", address: "въезд Бухарестская, 48" },
  //     { id: 1008, parentId: 13, name: "Бургер-7800",    type: 0, chatTelegramId: "123", address: "спуск Славы, 11" },
  //     { id: 1009, parentId: 14, name: "Бургер-8432",    type: 0, chatTelegramId: "123", address: "въезд Косиора, 47" },
  //     { id: 1010, parentId: 15, name: "Бургер-2315",    type: 0, chatTelegramId: "123", address: "пл. Гоголя, 49" },
  //     { id: 1011, parentId: 16, name: "Бургер-8975",    type: 0, chatTelegramId: "123", address: "пер. Сталина, 41" },
  //     { id: 1012, parentId: 17, name: "Бургер-4931",    type: 0, chatTelegramId: "123", address: "шоссе Ломоносова, 65" },
  //     { id: 1013, parentId: 17, name: "Бургер-7896",    type: 0, chatTelegramId: "123", address: "пер. Ленина, 00" },

  //     /**
  //      * Северо-западный федеральный округ
  //      */
  //     { id: 18, parentId: 2, name: "Республика Карелия", type: 2, chatTelegramId: "123" },
  //     { id: 19, parentId: 2, name: "Архангельская область", type: 2, chatTelegramId: "123" },
  //     { id: 20, parentId: 2, name: "Ленинградская область", type: 2, chatTelegramId: "123" },
  //     { id: 21, parentId: 2, name: "Мурманская область", type: 2, chatTelegramId: "123" },

  //     // Города
  //     { id: 22, parentId: 18, name: "Петрозаводск",      type: 1, chatTelegramId: "123" },
  //     { id: 23, parentId: 18, name: "Кондопога",      type: 1, chatTelegramId: "123" },
  //     { id: 24, parentId: 18, name: "Беломорск",      type: 1, chatTelegramId: "123" },

  //     { id: 25, parentId: 19, name: "Архангельск",      type: 1, chatTelegramId: "123" },
  //     { id: 26, parentId: 19, name: "Мезень",      type: 1, chatTelegramId: "123" },
  //     { id: 27, parentId: 19, name: "Мирный",      type: 1, chatTelegramId: "123" },

  //     { id: 28, parentId: 20, name: "Сосновый Бор",      type: 1, chatTelegramId: "123" },
  //     { id: 29, parentId: 20, name: "Ивангород",      type: 1, chatTelegramId: "123" },

  //     { id: 30, parentId: 21, name: "Мурманск",      type: 1, chatTelegramId: "123" },
  //     { id: 31, parentId: 21, name: "Апатиты",      type: 1, chatTelegramId: "123" },
  //     { id: 32, parentId: 21, name: "Кировск",      type: 1, chatTelegramId: "123" },

  //     // Рестораны
  //     { id: 1014, parentId: 22, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1015, parentId: 22, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1016, parentId: 23, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },
  //     { id: 1017, parentId: 23, name: "Бургер-3034",     type: 0, chatTelegramId: "123",  address: "наб. Ленина, 33" },
  //     { id: 1018, parentId: 24, name: "Бургер-1523",    type: 0, chatTelegramId: "123", address: "бульвар Славы, 60" },
  //     { id: 1019, parentId: 25, name: "Бургер-1418",    type: 0, chatTelegramId: "123", address: "пл. Гагарина, 23" },
  //     { id: 1020, parentId: 26, name: "Бургер-1486",    type: 0, chatTelegramId: "123", address: "въезд Бухарестская, 48" },
  //     { id: 1021, parentId: 26, name: "Бургер-7800",    type: 0, chatTelegramId: "123", address: "спуск Славы, 11" },
  //     { id: 1022, parentId: 27, name: "Бургер-8432",    type: 0, chatTelegramId: "123", address: "въезд Косиора, 47" },
  //     { id: 1023, parentId: 27, name: "Бургер-2315",    type: 0, chatTelegramId: "123", address: "пл. Гоголя, 49" },
  //     { id: 1024, parentId: 28, name: "Бургер-8975",    type: 0, chatTelegramId: "123", address: "пер. Сталина, 41" },
  //     { id: 1025, parentId: 28, name: "Бургер-4931",    type: 0, chatTelegramId: "123", address: "шоссе Ломоносова, 65" },
  //     { id: 1026, parentId: 29, name: "Бургер-7896",    type: 0, chatTelegramId: "123", address: "пер. Ленина, 00" },
  //     { id: 1027, parentId: 30, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1028, parentId: 31, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1029, parentId: 32, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },

  //     /**
  //      * Южный федеральный округ
  //      */
  //     { id: 33, parentId: 3, name: "Республика Адыгея", type: 2, chatTelegramId: "123" },
  //     { id: 34, parentId: 3, name: "Краснодарский край", type: 2, chatTelegramId: "123" },
      
  //     // Города
  //     { id: 35, parentId: 33, name: "Майкоп",      type: 1, chatTelegramId: "123" },
  //     { id: 36, parentId: 33, name: "Адыгейск",      type: 1, chatTelegramId: "123" },

  //     { id: 37, parentId: 34, name: "Краснодар",      type: 1, chatTelegramId: "123" },
  //     { id: 38, parentId: 34, name: "Сочи",      type: 1, chatTelegramId: "123" },
  //     { id: 39, parentId: 34, name: "Новороссийск",      type: 1, chatTelegramId: "123" },

  //     // Рестораны
  //     { id: 1030, parentId: 35, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1031, parentId: 35, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1032, parentId: 35, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },
  //     { id: 1033, parentId: 35, name: "Бургер-3034",     type: 0, chatTelegramId: "123",  address: "наб. Ленина, 33" },
  //     { id: 1034, parentId: 36, name: "Бургер-1523",    type: 0, chatTelegramId: "123", address: "бульвар Славы, 60" },
  //     { id: 1035, parentId: 36, name: "Бургер-1418",    type: 0, chatTelegramId: "123", address: "пл. Гагарина, 23" },
  //     { id: 1036, parentId: 36, name: "Бургер-1486",    type: 0, chatTelegramId: "123", address: "въезд Бухарестская, 48" },
  //     { id: 1037, parentId: 36, name: "Бургер-7800",    type: 0, chatTelegramId: "123", address: "спуск Славы, 11" },
  //     { id: 1038, parentId: 37, name: "Бургер-8432",    type: 0, chatTelegramId: "123", address: "въезд Косиора, 47" },
  //     { id: 1039, parentId: 37, name: "Бургер-2315",    type: 0, chatTelegramId: "123", address: "пл. Гоголя, 49" },
  //     { id: 1040, parentId: 37, name: "Бургер-8975",    type: 0, chatTelegramId: "123", address: "пер. Сталина, 41" },
  //     { id: 1041, parentId: 37, name: "Бургер-4931",    type: 0, chatTelegramId: "123", address: "шоссе Ломоносова, 65" },
  //     { id: 1042, parentId: 38, name: "Бургер-7896",    type: 0, chatTelegramId: "123", address: "пер. Ленина, 00" },
  //     { id: 1043, parentId: 38, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1044, parentId: 39, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1045, parentId: 39, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },

  //     /**
  //      * Пирволжский федеральный округ
  //      */
  //     { id: 40, parentId: 4, name: "Республика Башкортостан", type: 2, chatTelegramId: "123" },
  //     { id: 41, parentId: 4, name: "Оренбургская область", type: 2, chatTelegramId: "123" },

  //     // Города
  //     { id: 42, parentId: 40, name: "Нефтекамск",      type: 1, chatTelegramId: "123" },
  //     { id: 43, parentId: 40, name: "Уфа",      type: 1, chatTelegramId: "123" },

  //     { id: 44, parentId: 41, name: "Медногорск",      type: 1, chatTelegramId: "123" },
  //     { id: 45, parentId: 41, name: "Оренбург",      type: 1, chatTelegramId: "123" },

  //     // Рестораны
  //     { id: 1046, parentId: 42, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  //     { id: 1047, parentId: 42, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  //     { id: 1048, parentId: 42, name: "Бургер-2614",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 78" },
  //     { id: 1049, parentId: 43, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },
  //     { id: 1050, parentId: 43, name: "Бургер-3034",     type: 0, chatTelegramId: "123",  address: "наб. Ленина, 33" },
  //     { id: 1051, parentId: 44, name: "Бургер-1523",    type: 0, chatTelegramId: "123", address: "бульвар Славы, 60" },
  //     { id: 1052, parentId: 44, name: "Бургер-1418",    type: 0, chatTelegramId: "123", address: "пл. Гагарина, 23" },
  //     { id: 1053, parentId: 45, name: "Бургер-1486",    type: 0, chatTelegramId: "123", address: "въезд Бухарестская, 48" },
  //     { id: 1054, parentId: 45, name: "Бургер-7800",    type: 0, chatTelegramId: "123", address: "спуск Славы, 11" },
  //     { id: 1055, parentId: 45, name: "Бургер-8432",    type: 0, chatTelegramId: "123", address: "въезд Косиора, 47" },
      
  //   ],
  //   recipes: [
  //     {
  //       "id": 1,
  //       "name": "Капучино 250мл",
  //     },
  //     {
  //       "id": 2,
  //       "name": "Капучино 300мл",
  //     },
  //     {
  //       "id": 3,
  //       "name": "Латте 250мл",
  //     },
  //     {
  //       "id": 4,
  //       "name": "Латте 300мл",
  //     },
  //     {
  //       "id": 5,
  //       "name": "Эспрессо 20мл",
  //     },
  //     {
  //       "id": 6,
  //       "name": "Эспрессо 40мл",
  //     },
  //     {
  //       "id": 7,
  //       "name": "Американо 200мл",
  //     },
  //     {
  //       "id": 8,
  //       "name": "Американо 300мл",
  //     },
  //     {
  //       "id": 9,
  //       "name": "Флэт Уайт 250мл",
  //     },
  //     {
  //       "id": 10,
  //       "name": "Горячий шоколад 250мл",
  //     },
  //     {
  //       "id": 11,
  //       "name": "Горячий шоколад 300мл",
  //     },
  //     {
  //       "id": 12,
  //       "name": "Макиато 60мл",
  //     }
  //   ],
  //   errors: [
  //     { id: 1, code: "0x01", name: "Ошибка 1" },
  //     { id: 2, code: "0x02", name: "Ошибка 2" },
  //     { id: 3, code: "0x03", name: "Ошибка 3" },
  //     { id: 4, code: "0x04", name: "Ошибка 4" },
  //     { id: 5, code: "0x05", name: "Ошибка 5" },
  //     { id: 6, code: "0x06", name: "Ошибка 6" },
  //     { id: 7, code: "0x07", name: "Ошибка 7" },
  //     { id: 8, code: "0x08", name: "Ошибка 8" },
  //     { id: 9, code: "0x09", name: "Ошибка 9" },
  //     { id: 10, code: "0x0A", name: "Ошибка 10" },
  //     { id: 11, code: "0x0B", name: "Ошибка 11" },
  //     { id: 12, code: "0x0C", name: "Ошибка 12" },
  //   ],
  // })
})

app.put("/api/entities/coffee-machines", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
})

app.post("/api/coffee-machine/remote-action", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  const { id, action } = req.body;
  // console.clear();
  isBlocked = !isBlocked;
  console.log("Blocking coffee machine...", id, action);
  switch (action) {
    case 'shutdown': return;
    case 'restart': return;
    case 'block': return res.status(202).json({
      coffeeMachine: {
        id,
        isBlocked,
      }, 
      message: "Кофе-машина успешно заблокирована"
    });  
  }
})

/*********************
 * OVERVIEW
 *********************/

app.post("/api/analytics/trends/overview/dispensings-by-day", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByDay: {
      currentWeek: [13, 50, 32, 40, 35, 17, 28],
      previousWeek: [17, 43, 47, 45, 26, 25, 23],
    }
  });
});

app.post("/api/analytics/trends/overview/consumptions", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    consumptions: {
      water: 506.39,
      milk: 183.14,
      coffee: 48.94,
      chocolate: 1.92,
    }
  });
});

app.post("/api/analytics/trends/overview/cleanings", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    cleanings: {
      currentWeek: 0.94,
      previousWeek: 1.07,
    }
  });
});

app.post("/api/analytics/trends/overview/dispensings-by-hierarchy-level", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsPerMachineAverage: [
      { name: 'Москва', value: 312 },
      { name: 'Санкт-Петербург', value: 201 },
      { name: 'Воронеж', value: 48 },
    ]
  });
});

/*********************
 * SALES
 *********************/

app.post("/api/analytics/trends/sales/dispensings-by-date", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByDate: [
      { date: "2023-11-01", dispensings: 159 },
      { date: "2023-11-02", dispensings: 175 },
      { date: "2023-11-03", dispensings: 122 },
      { date: "2023-11-04", dispensings: 133 },
      { date: "2023-11-05", dispensings: 102 },
      { date: "2023-11-06", dispensings: 142 },
      { date: "2023-11-07", dispensings: 143 },
      { date: "2023-11-08", dispensings: 125 },
      { date: "2023-11-09", dispensings: 149 },
      { date: "2023-11-10", dispensings: 184 },
      { date: "2023-11-11", dispensings: 187 },
      { date: "2023-11-12", dispensings: 188 },
      { date: "2023-11-13", dispensings: 142 },
      { date: "2023-11-14", dispensings: 162 },
      { date: "2023-11-15", dispensings: 164 },
      { date: "2023-11-16", dispensings: 200 },
      { date: "2023-11-17", dispensings: 163 },
      { date: "2023-11-18", dispensings: 130 },
      { date: "2023-11-19", dispensings: 131 },
      { date: "2023-11-20", dispensings: 147 },
      { date: "2023-11-21", dispensings: 149 },
      { date: "2023-11-22", dispensings: 102 },
      { date: "2023-11-23", dispensings: 193 },
      { date: "2023-11-24", dispensings: 166 },
      { date: "2023-11-25", dispensings: 144 },
      { date: "2023-11-26", dispensings: 173 },
      { date: "2023-11-27", dispensings: 197 },
      { date: "2023-11-28", dispensings: 187 },
      { date: "2023-11-29", dispensings: 175 },
      { date: "2023-11-30", dispensings: 181 },
    ],
  });
});

app.post("/api/analytics/trends/sales/dispensings-by-cup-size", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByCupSize: [
      { cupSize: "S", dispensings: 315 },
      { cupSize: "M", dispensings: 200 },
      { cupSize: "L", dispensings: 146 },
    ],
  });
});

app.post("/api/analytics/trends/sales/dispensings-by-recipe", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByRecipe: [
      // ["Американо 200мл", "Капучино 400мл", "Капучино 200мл", "Латте 400мл", "Эспрессо 20мл", "Эспрессо 40мл"]
      // [315, 280, 245, 200, 146, 99]
      { recipe: "Американо 200мл", dispensings: 315 },
      { recipe: "Капучино 400мл", dispensings: 280 },
      { recipe: "Капучино 200мл", dispensings: 245 },
      { recipe: "Латте 400мл", dispensings: 200 },
      { recipe: "Эспрессо 20мл", dispensings: 146 },
      { recipe: "Эспрессо 40мл", dispensings: 99 },
    ],
  });
});

app.post("/api/analytics/trends/sales/dispensings-by-weekday-and-time", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensings: {
      mon: [13, 20, 35, 22, 35, 20, 40, 12, 47, 42, 10, 12, 22, 27, 14, 50, 16, 34, 33, 7	, 20, 28, 43, 31],
      tue: [38, 35, 26, 26, 45, 40, 24, 44, 15, 50, 47, 44, 17, 45, 35, 12, 41, 7	, 43, 5	, 31, 5	, 12, 50],
      wed: [15, 7	, 17, 35, 21, 50, 24, 28, 37, 10, 26, 50, 33, 38, 46, 48, 9	, 25, 37, 25, 50, 45, 48, 8],
      thu: [21, 38, 47, 6, 11, 11, 34, 21, 41, 49, 10, 39, 49, 11, 43, 15, 10, 38, 47, 7, 9, 18, 32, 44],
      fri: [48, 35, 47, 34, 44, 35, 44, 21, 30, 37, 28, 15, 18, 6, 22, 8, 28, 38, 23, 40, 21, 32, 9, 32],
      sat: [22, 33, 13, 6, 15, 38, 18, 31, 29, 26, 18, 36, 16, 16, 21, 30, 46, 39, 29, 14, 9, 39, 8, 14],
      sun: [49, 5, 49, 15, 8, 7, 33, 41, 34, 31, 34, 12, 34, 38, 45, 6, 36, 50, 41, 20, 35, 26, 23, 11],
    },
  });
});

app.post("/api/analytics/trends/sales/dispensings-previous-vs-current", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByWeek: {
      previous: 223,
      current: 527,
    },
  });
});

app.post("/api/analytics/trends/sales/dispensings-by-path", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  return res.json({
    dispensingsByPath: [
      { name: "Москва", dispensings: 360 },
      { name: "Санкт-Петербург", dispensings: 270 },
    ],
  });
});

/*********************
 * DAYLY-REPORTS
 *********************/

app.post("/api/analytics/dayly-reports/dispensings-by-restaurant", async (req, res) => {
  const { body } = req;
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    dispensingsByRestaurant: [
      { name: "Бургер-РУС 3276", dispensings: 848 },
      { name: "Бургер-РУС 2000", dispensings: 700 },
      { name: "Бургер-РУС 1723", dispensings: 403 },
      { name: "Бургер-РУС 1313", dispensings: 710 },
      { name: "Бургер-РУС 1400", dispensings: 560 },
      { name: "Бургер-РУС 1500", dispensings: 320 },
      { name: "Бургер-РУС 3276", dispensings: 848 },
      { name: "Бургер-РУС 2000", dispensings: 700 },
      { name: "Бургер-РУС 1723", dispensings: 403 },
      { name: "Бургер-РУС 1313", dispensings: 710 },
      { name: "Бургер-РУС 1400", dispensings: 560 },
      { name: "Бургер-РУС 1500", dispensings: 320 },
    ],
  });
});

app.post("/api/analytics/dayly-reports/cleanings-by-restaurant", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    cleaningsByRestaurant: [
      { name: "Бургер-РУС 3276", cleanings:  0.95 },
      { name: "Бургер-РУС 2000", cleanings:  0.45 },
      { name: "Бургер-РУС 1723", cleanings:  0.4  },
      { name: "Бургер-РУС 1313", cleanings:  0.2  },
      { name: "Бургер-РУС 1400", cleanings:  0.56 },
      { name: "Бургер-РУС 1500", cleanings:  1.20 },
    ],
  });
});

app.post("/api/analytics/dayly-reports/dispensings-by-hour", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    dispensingsByHour: [
      { hour: "00", dispensings: 7 },
      { hour: "01", dispensings: 13 },
      { hour: "02", dispensings: 12 },
      { hour: "03", dispensings: 23 },
      { hour: "04", dispensings: 4 },
      { hour: "05", dispensings: 11 },
      { hour: "06", dispensings: 16 },
      { hour: "07", dispensings: 7 },
      { hour: "08", dispensings: 4 },
      { hour: "09", dispensings: 15 },
      { hour: "10", dispensings: 16 },
      { hour: "11", dispensings: 30 },
      { hour: "12", dispensings: 24 },
      { hour: "13", dispensings: 17 },
      { hour: "14", dispensings: 21 },
      { hour: "15", dispensings: 40 },
      { hour: "16", dispensings: 15 },
      { hour: "17", dispensings: 16 },
      { hour: "18", dispensings: 30 },
      { hour: "19", dispensings: 24 },
      { hour: "20", dispensings: 17 },
      { hour: "21", dispensings: 21 },
      { hour: "22", dispensings: 40 },
      { hour: "23", dispensings: 32 },
    ],
  });
});

app.post("/api/analytics/dayly-reports/dispensings-by-weekday", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    dispensingsByWeekday: {
      mon: 246,
      tue: 217,
      wed: 310,
      thu: 280,
      fri: 190,
      sat: 256,
      sun: 263,
    },
  });
});

app.post("/api/analytics/dayly-reports/dispensings-by-recipe", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    dispensingsByRecipe: [
      { recipe: "Американо 200мл", dispensings: 513 },
      { recipe: "Капучино 200мл", dispensings: 217 },
      { recipe: "Капучино 200мл", dispensings: 310 },
      { recipe: "Капучино 200мл", dispensings: 280 },
      { recipe: "Капучино 200мл", dispensings: 190 },
      { recipe: "Капучино 200мл", dispensings: 256 },
      { recipe: "Капучино 200мл", dispensings: 263 },
    ],
  });
});

app.post("/api/analytics/dayly-reports/dispensings-by-cup-size", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.json({
    dispensingsByCupSize: [
      { cupSize: "Small", dispensings: 300 },
      { cupSize: "Medium", dispensings: 500 },
      { cupSize: "Large", dispensings: 200 },
    ],
  });
});

/*********************
 * DATA-EXPORT
 *********************/
app.post("/api/analytics/data-export/beverages", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { pagination: {activePage, perPage}, orderBy } = req.body.filters;
  const from = (activePage - 1) * perPage;
  const to = from + perPage;
  const dataExportBeveragesCopy = [...dataExportBeverages];
  if (orderBy.column) sortTable(dataExportBeveragesCopy, orderBy.column, orderBy.order);
  const beverages = dataExportBeveragesCopy.slice(from, to);
  return res.json({
    pagesTotal: Math.ceil(dataExportBeveragesCopy.length / perPage),
    beverages,
  });
});

app.post("/api/analytics/data-export/cleanings", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  // const { activePage, perPage } = req.body.filters.pagination;
  const { pagination: {activePage, perPage}, orderBy } = req.body.filters;
  const from = (activePage - 1) * perPage;
  const to = from + perPage;
  const dataExportCleaningsCopy = [...dataExportCleanings];
  if (orderBy.column) sortTable(dataExportCleaningsCopy, orderBy.column, orderBy.order);
  const cleanings = dataExportCleaningsCopy.slice(from, to);
  return res.json({
    pagesTotal: Math.ceil(dataExportCleaningsCopy.length / perPage),
    cleanings,
    // dispensingsByRecipe: [
    //   { recipe: "Американо 200мл", dispensings: 513 },
    //   { recipe: "Капучино 200мл", dispensings: 217 },
    //   { recipe: "Капучино 200мл", dispensings: 310 },
    //   { recipe: "Капучино 200мл", dispensings: 280 },
    //   { recipe: "Капучино 200мл", dispensings: 190 },
    //   { recipe: "Капучино 200мл", dispensings: 256 },
    //   { recipe: "Капучино 200мл", dispensings: 263 },
    // ],
  });
});

// Округ	Город	Ресторан	Модель машины	Номер машины	Дата	Рецепт	Размер чашки	Количество

/*********************
 * MAINTENANCE
 *********************/
app.post("/api/maintenance/working-hours/overview/downtime-by-hour", async (req, res) => {

  return res.json({
    downtimeByHour: {
      // По индексу 0 - ошибки в период с 0:00 - 0:59:59
      // По индексу 1 - ошибки в период с 1:00 - 1:59:59
      // ...
      // По индексу 23 - ошибки в период с 23:00 - 23:59:59
      previousWeek: [0.29,0.34,0.1,1,1.2,0.45,0.13,0.47,0.22,0.05,0.9,0.36,0.2,0.71,0.8,0.05,0.9,0.36,0.2,0.71,0.8],
      currentWeek: [0.5,0.6,0.2,1,0.3,0.4,0.45,0.15,0.7,0.8,0.32,0.17,0.26,0.37,0.40,0.05,0.9,0.36,0.2,0.71,0.8],
    }
  })
});

app.post("/api/maintenance/working-hours/overview/downtime-causes", async (req, res) => {
  
  return res.json({
    downtimeCauses: [
      { cause: "поломка", time: 26 },
      { cause: "обслуживание", time: 74 },
    ],
  })
});

app.post("/api/maintenance/working-hours/overview/downtime-errors", async (req, res) => {
  return res.json({
    downtimeErrors: [
      { cause: "1", time: 315 },
      { cause: "-1", time: 280 },
      { cause: "7", time: 245 },
      { cause: "65", time: 200 },
      { cause: "13", time: 146 },
      { cause: "44", time: 99 },
    ],
  })
});

app.post("/api/maintenance/working-hours/overview/downtime-by-weekday", async (req, res) => {
  return res.json({
    downtimeByWeekday: {
      mon: [13, 20, 35, 22, 35, 20, 40, 12, 47, 42, 10, 12, 22, 27, 14, 50, 16, 34, 33, 7	, 20, 28, 43, 31],
      tue: [38, 35, 26, 26, 45, 40, 24, 44, 15, 50, 47, 44, 17, 45, 35, 12, 41, 7	, 43, 5	, 31, 5	, 12, 50],
      wed: [15, 7	, 17, 35, 21, 50, 24, 28, 37, 10, 26, 50, 33, 38, 46, 48, 9	, 25, 37, 25, 50, 45, 48, 8],
      thu: [21, 38, 47, 6, 11, 11, 34, 21, 41, 49, 10, 39, 49, 11, 43, 15, 10, 38, 47, 7, 9, 18, 32, 44],
      fri: [48, 35, 47, 34, 44, 35, 44, 21, 30, 37, 28, 15, 18, 6, 22, 8, 28, 38, 23, 40, 21, 32, 9, 32],
      sat: [22, 33, 13, 6, 15, 38, 18, 31, 29, 26, 18, 36, 16, 16, 21, 30, 46, 39, 29, 14, 9, 39, 8, 14],
      sun: [49, 5, 49, 15, 8, 7, 33, 41, 34, 31, 34, 12, 34, 38, 45, 6, 36, 50, 41, 20, 35, 26, 23, 11],
    },
  })
});

app.post("/api/maintenance/working-hours/overview/downtime-by-week", async (req, res) => {
  return res.json({
    downtimeByWeek: {
      current: 250, // Время простоя в секундах
      previous: 223, // Время простоя в секундах
    }
  })
});

app.post("/api/maintenance/working-hours/overview/downtime-by-business-unit", async (req, res) => {
  return res.json({
    downtimeByBuisnessUnit: [
      { name: "Москва", downtime: 365 },
      { name: "Санкт-Петербург", downtime: 275 },
      { name: "Воронеж", downtime: 700 },
    ],
  })
});


app.post("/api/maintenance/data-export/time", async (req, res) => {

  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { pagination: {activePage, perPage}, orderBy } = req.body.filters;
  // const { activePage, perPage } = req.body.filters.pagination;
  // console.log(req.body.filters.pagination);
  const from = (activePage - 1) * perPage;
  const to = from + perPage;
  const dataExportTimeCopy = [...dataExportTime];
  if (orderBy.column) sortTable(dataExportTimeCopy, orderBy.column, orderBy.order);
  const time = dataExportTimeCopy.slice(from, to);
  // const beverages = dataExportBeverages.slice(from, to);
  return res.json({
    pagesTotal: Math.ceil(dataExportTimeCopy.length / perPage),
    time,
  });

});

app.post("/api/maintenance/data-export/events", async (req, res) => {

  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { pagination: {activePage, perPage}, orderBy } = req.body.filters;
  // const { activePage, perPage } = req.body.filters.pagination;
  const from = (activePage - 1) * perPage;
  const to = from + perPage;
  const dataExportEventsCopy = [...dataExportEvents];
  if (orderBy.column) sortTable(dataExportEventsCopy, orderBy.column, orderBy.order);
  const events = dataExportEventsCopy.slice(from, to);
  // const beverages = dataExportBeverages.slice(from, to);


  return res.json({
    pagesTotal: Math.ceil(dataExportEventsCopy.length / perPage),
    events,
  });
  
});

app.post("/api/modal-box/events-history", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  // const { pagination: {activePage, perPage}, orderBy } = req.body.filters;
  return res.json({
    eventsHistory: [
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      { 
        errorCode: "69",
        errorDesc: "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        datetime: "20.06.2023 14:44",
        utc: "20.06.2023 14:44",
        duration: "29 дней, 8ч",
      },
      
    ],
  })
});

/*********************
 * ADMINISTRATION
 *********************/
app.post("/api/administration/company-structure", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  return res.status(200).json({
    users: dataUsers
  })
});

app.post("/api/administration/company-structure/remove-user", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { userId, businessUnitId } = req.body;
  let user, buIndex;
  if (!userId || !businessUnitId) return res.status(400);
  user = dataUsers.find(u => u.id === userId);
  if (user === undefined) return res.status(404);
    buIndex = user.businessUnitsIds.indexOf(businessUnitId);
  if (buIndex === -1) return res.status(404);
  user.businessUnitsIds.splice(buIndex, 1);
  return res.status(200).json({
    users: dataUsers
  });
  
});

app.post("/api/administration/company-structure/add-user", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { userId, businessUnitId } = req.body;
  let user;
  if (userId && businessUnitId) {
    user = dataUsers.find(u => u.id === userId);
    user.businessUnitsIds.push(businessUnitId);
    // userIndex = dataUsers.findIndex(u => u.id === userId)
    // if (userIndex !== -1) dataUsers.splice(userIndex, 1);
  }
  else return res.status(400);
  if (user === undefined) return res.status(404);
  return res.status(200).json({
    users: dataUsers
  });
});

let randomUserId = 10000
app.post("/api/administration/company-structure/create-user", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()));
  const { fullName, phone } = req.body;
  if (!fullName || !phone) return res.status(400);
  const user = {
    id: (++randomUserId).toString(),
    fullName,
    phone,
    email: "",
    utc: "+03:00",
    businessUnitsIds: [
    ],
  }
  dataUsers.push(user);
  return res.status(200).json(dataUsers);
})

/*********************
 * PROFILE
 *********************/
const user = {
  fullName: "Ярослав Лазарев",
  email: "yaroslav.f@outlook.com",
  phone: "79685115872",
  org: "ООО ВымпелКом",
  avatar: avatar,
  utc: "+03:00",
};

app.get("/api/profile", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  console.log(user);
  return res.json(user)
})

app.put("/api/profile", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  const { 
    fullName, 
    email, 
    emailCode,
    phone, 
    smsCode,
    avatar,
    utc,
  } = req.body;
  if (fullName) Object.assign(user, { fullName });
  if (avatar) Object.assign(user, { avatar });
  if (email && emailCode === '12345') Object.assign(user, { email });
  if (phone && smsCode === '12345') Object.assign(user, { phone });
  if (org) Object.assign(user, { org });
  if (utc) Object.assign(user, { utc });
  // Object.assign(user, req.body);

  return res.json(user);
})

app.post("/api/profile/request-sms-code", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  const { phone } = req.body;
  if (phone) res.status(200).json({ message: `Код с подтверждением отправлен на номер ${phone}` });
  return res.status(200).json({ message: `Код с подтверждением отправлен на номер ${user.phone}` });
  // 400 - Не прошел валидацию
  // 500 - Не получилось отправить код
})

app.post("/api/profile/request-email-code", async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  const { email } = req.body;
  if (email) res.status(200).json({ message: `Код с подтверждением отправлен на почту ${email}` });
  return res.status(200).json({ message: `Код с подтверждением отправлен на почту ${user.email}` });

})

app.post('/api/feedback', async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), random()))
  console.clear();
  console.log(req.body);
  return res.status(200).json('ok');
})

// app.put("/api/profile/email", async (req, res) => {
//   await new Promise(resolve => setTimeout(() => resolve(), random()))
//
//
// })


app.listen(9000, () => console.log("Server is listening on port 9000!"));

function sortTable(data, column, order) {
  data.sort((a, b) => {
    if (a[column] < b[column]) return order === 'desc' ? -1 : 1;
    else if (a[column] > b[column]) return order === 'desc' ? 1 : -1;
    return 0;
  })
}

