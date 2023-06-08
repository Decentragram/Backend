import { Web3Storage } from "web3.storage";
import { WEB3_STORAGE } from "../config";
import { File } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return WEB3_STORAGE;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(images) {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  let files = [];
  for (let i = 0; i < images.length; i++) {
    const file = new File([images[i].buffer], images[i].originalname);
    files.push(file);
  }
  // const files = [
  //   new File(['contents-of-file-1'], 'plain-utf8.txt'),
  //   new File([buffer], 'hello.json')
  // ]
  return files;
}

const storeFiles = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
};

export default storeFiles;
