import React, { useEffect } from "react";
import axios from 'axios';

function Footer() {

  useEffect(() => {
    var data = '';

    var config = {
      method: 'GET',
      url: 'http://40.114.33.183:8081/learning-service/api/v1/program-types',
      headers: { 
        // 'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer eyJraWQiOiJmNzczNzliNS0zZTY3LTQyM2ItYTQwZS1mNTIwN2I4ZDNhNDMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbG9rIiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL29hdXRoMi1zZXJ2aWNlIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJsb2NhbGUiOiJlbiIsImF1ZCI6Im1vb2RsZSIsIm5iZiI6MTY3NTkyNTQxNiwic2NvcGUiOlsib3BlbmlkIl0sIm5hbWUiOiJhbG9rIiwiZXhwIjoxNjc4OTI1NDE2LCJpYXQiOjE2NzU5MjU0MTYsImZpcnN0X25hbWUiOiJBbG9rIiwiZW1haWwiOiJhbG9rQGdtYWlsLmNvbSJ9.AQ9JEdHo-SV1tMcntpekjFkFiq88B-KImrBinu1qLJNW0O3cjt5Y3URT9BpyvalOfyreOWqajknXx0MGu2ffBOXb4lcQAJ5JSywrYCoBP56H1S44jyz8j3x3JLiDg02MzVqEzpwCFsMIUU0q47AW-LMMtoNAPmsChAcdmiz6SdCYGJJK1yFZ9uDXJhLC7r59DfKnIT4KtrrqlU6H5mqGMc-hdZAMjrQaO5EqphngUqqwOfGkMyZ2t93v4wNE5hQZZeZyv3-_ZL5dglhYVgZRpL5e2Q8n3MGVxvBbUdTDPftkz9HLQgjtbgn1901HnVO7B1u0ZF-nM6XVHBKFg7rKjg'
      },
      // data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])
  
  const Style = {
    backgroundColor: "var(--first-color-alt)",
    textAlign: "center",
    padding: "2% 0"
  };
  return (
    <>
      <div style={Style}>
        <h1>Footer</h1>
      </div>
    </>
  );
}
export default Footer;
