// import { Web3Storage } from "web3.storage";
// import { WEB3_STORAGE } from "../config";

// function getAccessToken() {
//   // If you're just testing, you can paste in a token
//   // and uncomment the following line:
//   // return 'paste-your-token-here'

//   // In a real app, it's better to read an access token from an
//   // environement variable or other configuration that's kept outside of
//   // your code base. For this to work, you need to set the
//   // WEB3STORAGE_TOKEN environment variable before you run your code.
//   return WEB3_STORAGE;
// }

// function makeStorageClient() {
//   return new Web3Storage({ token: getAccessToken() });
// }

// const storeFiles = async (files) => {
//   try {
//     console.log("choder");
//     console.log(files, "storefiles");
//     const client = makeStorageClient();
//     // const uplaodFile = makeFileObjects(files);
//     const cid = await client.put(uplaodFile);
//     console.log("stored files with cid:", cid);
//     return cid;
//   } catch (error) {
//     console.log(error, "storefileserror");
//   }
// };

// export default storeFiles;
