Mendapatkan informasi daftar pekerjaan yang tersedia
Endpoint : GET /api/jobs

Response Body Success :

```json
[
  {
    "id": 1,
    "title": "kerjaan1",
    "description": "blablabla",
    "location": "jakarta",
    "salary": 10000000,
    "company_id": 1,
    "created_at": "2023-11-15T16:47:28.444Z",
    "updated_at": "2023-11-15T16:47:28.444Z"
  },
  {
    "id": 27,
    "title": "kerjaan3",
    "description": "blablabla",
    "location": "jogja",
    "salary": 1000000,
    "company_id": 3,
    "created_at": "2023-11-16T03:55:27.094Z",
    "updated_at": "2023-11-16T03:55:27.094Z"
  },
  {
    "id": 21,
    "title": "kerjaan21",
    "description": "blablabla",
    "location": "palembang",
    "salary": 1000000,
    "company_id": 21,
    "created_at": "2023-11-15T17:58:22.103Z",
    "updated_at": "2023-11-16T03:57:27.209Z"
  }
]
```

Response Body Error :

```json
{
  "message": "error.message"
}
```

Mendapatkan detail informasi pekerjaan berdasarkan ID
Endpoint GET /api/jobs/:id

Response Body Succes:

```json
[
  {
    "id": 1,
    "title": "kerjaan1",
    "description": "blablabla",
    "location": "jakarta",
    "salary": 10000000,
    "company_id": 1,
    "created_at": "2023-11-15T16:47:28.444Z",
    "updated_at": "2023-11-15T16:47:28.444Z"
  }
]
```

Response Body Error :

```json
{
  "message": "error.message"
}
```

Membuat pekerjaan baru
Endpoint : POST /jobs

Request Body :

```json
{
  "title": "kerjaan30",
  "description": "blablabla",
  "location": "banten",
  "salary": 1000000,
  "company_id": 30,
  "created_at": "NOW()",
  "updated_at": "NOW()"
}
```

Response Body Success :

```json
{
  "message": "Job created"
}
```

Response Body Error :

```json
{
  "message": "error.message"
}
```

Mengupdate informasi pekerjaan berdasarkan ID
Endpoint : PUT /jobs/:id

Request Body :

```json
{
  "title": "kerjaan28",
  "description": "blablabla",
  "location": "bandung",
  "salary": 1000000,
  "company_id": 28,
  "updated_at": "NOW()"
}
```

Response Body Success :

```json
{
  "message": "Job updated"
}
```

Response Body Error :

```json
{
  "message": "error.message"
}
```

Menghapus pekerjaan berdasarkan ID
Endpoint : DELETE /api/jobs/:id

Response Body Success :

```json
{
  "message": "Job deleted"
}
```

Response Body Error :

```json
{
  "message": "error.message"
}
```
