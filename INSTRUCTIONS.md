# Практична робота №3 — серверний вебдодаток Express

Тема: **білий ведмідь**  
Додаткове обов'язкове поле варіанту: **eatenFish** — кількість з'їденої риби за день, кг.

## Як запустити

1. Встанови залежності:

```bash
npm install
```

2. Перевір код і збери проєкт:

```bash
npm run build
```

3. Запусти тести:

```bash
npm test
```

4. Запусти сервер:

```bash
npm start
```

5. Відкрий Swagger UI:

```text
http://localhost:5000/api-docs
```

## Основні API-адреси

- `POST /api/polar-bears` — створити білого ведмедя
- `GET /api/polar-bears` — отримати всіх білих ведмедів
- `GET /api/polar-bears/:id` — отримати одного білого ведмедя за ID
- `PUT /api/polar-bears/:id` — повністю оновити запис
- `PATCH /api/polar-bears/:id` — частково оновити запис
- `DELETE /api/polar-bears/:id` — видалити запис
- `HEAD /api/polar-bears` — отримати заголовки
- `OPTIONS /api/polar-bears` — отримати список дозволених методів

## Приклади POST-записів для Swagger/Postman

```json
{
  "name": "Арктик",
  "age": 7,
  "height": 150,
  "weight": 430,
  "gender": "male",
  "eatenFish": 14,
  "image": "wildest-arctic.webp",
  "description": "Дорослий самець білого ведмедя, який живе на морському льоду."
}
```

```json
{
  "name": "Сніжинка",
  "age": 5,
  "height": 135,
  "weight": 260,
  "gender": "female",
  "eatenFish": 10,
  "image": "miller1fe2160d51d.webp",
  "description": "Самка білого ведмедя з дитинчатами."
}
```

```json
{
  "name": "Нанук",
  "age": 3,
  "height": 120,
  "weight": 210,
  "gender": "male",
  "eatenFish": 8,
  "image": "hunting-practice.webp",
  "description": "Молодий білий ведмідь, який пересувається кригою."
}
```

## Фото

Фото збережені в папці:

```text
public/images
```

Їх можна відкрити через сервер, наприклад:

```text
http://localhost:5000/images/wildest-arctic.webp
```
