**Reigster**
----

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  `{
    email: admin@mail.com,
    password: 1234
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      id : 1,
      email: test@mail.com
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**Login**
----

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**
```
  {
    email: admin@mail.com,
    password: 1234
  }
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      access_token : "string"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

  * **Code:** 401 wrong email/password <br />
    **Content:** 
    ```
    { error : "wrong email/password " }
    ```

==================================================

**Get Product**
----

* **URL**
```
  /product
```
* **Method:**
```
  `get`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
          "id": 18,
          "name": "Sepatu",
          "image_url": "https://www.farah.id/assets/images/news/2020/05/20200505081040_normal.jpg",
          "price": 300000,
          "stock": 10,
          "createdAt": "2020-11-17T02:27:09.155Z",
          "updatedAt": "2020-11-17T02:27:09.155Z"
      },
      {
          "id": 19,
          "name": "Tas",
          "image_url": "https://cozmeed.com/wp-content/uploads/2019/11/TAS-SNIPER-PRO-2.jpg",
          "price": 500000,
          "stock": 8,
          "createdAt": "2020-11-17T02:28:40.724Z",
          "updatedAt": "2020-11-17T02:28:40.724Z"
      }
    ]
    ```

==================================================

**Get ProductID**
----

* **URL**
```
  /product/:id
```
* **Method:**
```
  `get`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      id: 18
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    [
      {
          "id": 18,
          "name": "Sepatu",
          "image_url": "https://www.farah.id/assets/images/news/2020/05/20200505081040_normal.jpg",
          "price": 300000,
          "stock": 10,
          "createdAt": "2020-11-17T02:27:09.155Z",
          "updatedAt": "2020-11-17T02:27:09.155Z"
      }
    ]
    ```

==================================================

**Update ProductID**
----

* **URL**
```
  /product/:id
```
* **Method:**
```
  `put`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      "name": "Sepatu",
      "image_url": "https://www.farah.id/assets/images/news/2020/05/20200505081040_normal.jpg",
      "price": 350000,
      "stock": 20,
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
          "id": 18,
          "name": "Sepatu",
          "image_url": "https://www.farah.id/assets/images/news/2020/05/20200505081040_normal.jpg",
          "price": 350000,
          "stock": 20,
          "createdAt": "2020-11-17T02:27:09.155Z",
          "updatedAt": "2020-11-17T02:27:09.155Z"
      }
    ]
    ```

==================================================

**Delete ProductID**
----

* **URL**
```
  /product/:id
```
* **Method:**
```
  `delete`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      id: 18
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
          "name": "Sepatu",
          "msg": "Delete Success
      }
    ]
    ```

==================================================

**Add Cart**
----

* **URL**
```
  /cart
```
* **Method:**
```
  `post`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      ProductId: 18
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 23,
      "UserId": 2,
      "ProductId": 20,
      "quantity": 1,
      "status": "false",
      "updatedAt": "2020-11-18T23:59:54.773Z",
      "createdAt": "2020-11-18T23:59:54.773Z"
    }
    ```

==================================================

**findAll Cart**
----

* **URL**
```
  /cart
```
* **Method:**
```
  `get`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": 23,
        "UserId": 2,
        "ProductId": 20,
        "quantity": 1,
        "status": "false",
        "updatedAt": "2020-11-18T23:59:54.773Z",
        "createdAt": "2020-11-18T23:59:54.773Z"
      },
      {
        "id": 24,
        "UserId": 2,
        "ProductId": 19,
        "quantity": 1,
        "status": "false",
        "updatedAt": "2020-11-18T23:59:54.773Z",
        "createdAt": "2020-11-18T23:59:54.773Z"
      }
    ]
    ```

==================================================

**Update Cart**
----

* **URL**
```
  /cart
```
* **Method:**
```
  `patch`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      quantity: 2
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 23,
      "UserId": 2,
      "ProductId": 20,
      "quantity": 3,
      "status": "false",
      "updatedAt": "2020-11-18T23:59:54.773Z",
      "createdAt": "2020-11-18T23:59:54.773Z"
    }
    ```

==================================================

**Delete Cart**
----

* **URL**
```
  /cart/:id
```
* **Method:**
```
  `patch`
```
* **Data Headers**

  ```
    {
      access_token : "string"
    }
  ```

* **Data Params**

  ```
    {
      id: 2
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      msg: 'sukses delete'
    }
    ```

==================================================