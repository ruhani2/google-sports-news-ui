"use client";
// import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// import components
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import Link from "next/link";

const HomePage = () => {
  const [newsResponse, setNewsResponse] = useState({
    news: [],
    message: "",
  });

  const [showLoader, setShowLoader] = useState(false);

  const fetchSportsNews = () => {
    setShowLoader(true);
    fetch("http://localhost:3000/news")
      .then((response) => response.json())
      .then((response) => {
        setNewsResponse(response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (newsResponse.news.length > 0) {
      setShowLoader(false);
    }
  }, [newsResponse]);

  return (
    <div className="container">
      <Button
        as="a"
        variant="info"
        className="mt-5"
        onClick={() => fetchSportsNews()}
      >
        Fetch Sports News
      </Button>
      <br />

      {showLoader && (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {newsResponse.news.length > 0 && (
        <Table striped bordered hover className="mt-5" responsive="md">
          <thead>
            <tr>
              <th>Title</th>
              <th>Article Link</th>
            </tr>
          </thead>

          <tbody>
            {newsResponse.news.map((news_object, index) => {
              return (
                <tr key={index}>
                  <td>{news_object.title}</td>
                  <td>
                    <Link href={news_object.link}>article link</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HomePage;
