// import { token_admin, token_user } from './default_tokens';
import { product_getAll_local, comment_getAll_local } from './default_apis.js';

const token_user = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFVzZXJcIjoyMTUyMzEsXCJlbWFpbFVzZXJcIjpcInJvYmluc29uaGFua0BnbWFpbC5jb21cIixcInBhc3N3b3JkVXNlclwiOlwiJDJhJDEyJGlYUGthTjBFeS5MRmhQTGJEZGcwU3VvMDdNQ3lEazlGNEFhQk1DWXNFWVRVdzZIRGV0UURtXCIsXCJuYW1lVXNlclwiOlwiUm9iaW5zb24gSGFua1wiLFwicGhvbmVOdW1iZXJVc2VyXCI6XCI4OTM0MTE4MzAwNVwiLFwiYWRkcmVzc1VzZXJcIjpcIlRleGFzLCBVU0FcIixcInJvbGVVc2VyXCI6XCJBRE1JTlwiLFwibGlzdENyZWRpdENhcmRzXCI6W3tcImlkQ2FyZFwiOjQzMDcxMSxcIm5hbWVVc2VyQ2FyZFwiOlwiUm9iaW5zb24gSGFua1wiLFwibnVtYmVyQ2FyZFwiOlwiNjU4OTY1MjM0MzU0ODg5NlwiLFwiZXhwaXJhdGlvbkNhcmRcIjpcIjAxLzAxLzIzXCIsXCJzZWN1cml0eUNvZGVDYXJkXCI6XCI3MTRcIn1dLFwibGlzdENhcnRzXCI6W3tcImlkQ2FydFwiOjM1MDA2MCxcInF1YW50aXR5QWxsUHJvZHVjdHNJbkNhcnRcIjoxLFwidG90YWxTYWxlUHJpY2VDYXJ0XCI6NTAuMCxcInRvdGFsRnVsbFByaWNlQ2FydFwiOjUwLjAsXCJsaXN0RGV0YWlsUHJvZHVjdENhcnRzXCI6W3tcImlkRGV0YWlsUHJvZHVjdENhcnRNRm9vZHlcIjp7XCJpZENhcnRcIjozNTAwNjAsXCJpZFByb2R1Y3RcIjo1MzAwMjJ9LFwicXVhbnRpdHlEZXRhaWxQcm9kdWN0Q2FydFwiOjEsXCJzYWxlUHJpY2VEZXRhaWxQcm9kdWN0Q2FydFwiOjUwLjAsXCJmdWxsUHJpY2VEZXRhaWxQcm9kdWN0Q2FydFwiOjUwLjB9XX1dLFwibGlzdENvbW1lbnRzXCI6W3tcImlkQ29tbWVudFwiOjYwODc1MSxcInJhdGluZ0NvbW1lbnRcIjo0LFwiY29udGVudENvbW1lbnRcIjpcIlRoZSBwcm9kdWN0cyBpcyBPS0FZXCJ9LHtcImlkQ29tbWVudFwiOjYwODc1NCxcInJhdGluZ0NvbW1lbnRcIjozLFwiY29udGVudENvbW1lbnRcIjpcIlRoZSBwcm9kdWN0IGlzIG9rYXksIGJ1dCBJIGV4cGVjdGVkIGJldHRlciBxdWFsaXR5IGZvciB0aGUgcHJpY2UuXCJ9LHtcImlkQ29tbWVudFwiOjYwODgwMixcInJhdGluZ0NvbW1lbnRcIjo1LFwiY29udGVudENvbW1lbnRcIjpcIkknbSBpbXByZXNzZWQgd2l0aCB0aGUgdmFyaWV0eSBvZiB2ZWdhbiBvcHRpb25zIGF2YWlsYWJsZS4gVGhlIHF1YWxpdHkgaXMgdG9wLW5vdGNoLlwifSx7XCJpZENvbW1lbnRcIjo2MDg5MjYsXCJyYXRpbmdDb21tZW50XCI6MyxcImNvbnRlbnRDb21tZW50XCI6XCJUaGUgZ29vZHMgYXJlIHNhdGlzZmFjdG9yeS4gVGhleSBtZWV0IG15IGJhc2ljIG5lZWRzLlwifV19IiwiaWF0IjoxNjg0NTMwMzY2LCJleHAiOjE2ODQ1NTkxNjZ9.Ryjzx1p1qojsDJ0_XVi2thacIbSzZo3zBwFRsZSling";

var arrayAllComments = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllComments");

// Check arrays valid
if(arrayAllComments === null || arrayAllComments.length === 0 ) {
    console.log("MFoody - arrayAllComments is not valid!");
    // Automatically call APIs when page is loaded
    getAllCommentsApi();
    arrayAllComments = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllComments");
}

// Call APIs
function getAllCommentsApi() {
    let promise = axios({
        url: comment_getAll_local,
        method: 'GET',
        headers: {
            // 'Authorization': 'Bearer ' + token_current_admin
            'Authorization': 'Bearer ' + token_user
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        console.log(res.data);

        // Save to Cookies
        customLocalStorage.saveItemToLocalStorage(res.data, "MFoody - arrayAllComments");
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};