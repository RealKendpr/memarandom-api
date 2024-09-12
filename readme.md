# Memarandom API

Generate random memes from my very own collection of memes.

## How to use?

You can generate a random meme by making a **GET** request to the endpoint below:

```
GET https://memarandom.onrender.com/api-get/
```

_\*no parameters needed_

### Example Request

Using cURL:

```bash
curl -X GET "https://memarandom.onrender.com/api-get/"
```

Using Fetch in javascript:

```js
fetch("https://memarandom.onrender.com/api-get")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Response

After making a request, the API will return a response in a JSON format:

```json
{
  "_id": "string",
  "meme_url": "string",
  "reactions": number
}
```

#### Definitions

- \_id: (string) This is random generated object id.
- meme_url: (string) A direct link to the image.

  - This can be used as an image source for HTML `<img>` element.

    ```html
    <img
      src="https://drive.google.com/thumbnail?id=1UNEqLElGpcbxPDnDbhdy0-QWqKGlOm0L"
      alt="A meme"
    />
    ```

  - The memes are stored in google drive, so the link will be a google google drive link. <br/>
    By default the image will be a small but you can get it larger by adding `&w=1000` at the end of the **google drive url**. <br/>
    The _1000_ is a pixel value.

    **Example:** `https://drive.google.com/thumbnail?id=1UNEqLElGpcbxPDnDbhdy0-QWqKGlOm0L&w=1000`

- reactions: (number) A number of reactions that the meme have got. _A this time, we cannot update this number, so it's better to be left alone._ **This feature is to be implemented.**

## How were the memes collected?

The memes generated through this API are ones that I personally considered entertaining or funny and have collected from a variety of different social media platforms. Some memes may offend or hurt the feelings of other people.
